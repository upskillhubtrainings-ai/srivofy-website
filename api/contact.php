<?php
/**
 * Srivofy contact form mailer for Hostinger (PHP web hosting).
 *
 * Receives the JSON posted by the Contact page, validates it and emails it
 * to the inbox set in contact-config.php using PHP mail(). Always replies
 * with JSON: { "ok": true } or { "ok": false, "error": "..." }.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

$config = require __DIR__ . '/contact-config.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Only accept submissions from the site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, ['ok' => false, 'error' => 'Origin not allowed.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST; // fallback for form-encoded posts
}

// Honeypot: silently accept bot submissions without sending anything.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

/** Single-line clean-up: trims, strips tags and removes line breaks (prevents header injection). */
function clean_line($value, int $max): string
{
    $v = is_string($value) ? $value : '';
    $v = trim(strip_tags($v));
    $v = preg_replace('/[\r\n\t]+/', ' ', $v) ?? '';
    return mb_substr($v, 0, $max);
}

$name = clean_line($data['name'] ?? '', 120);
$email = clean_line($data['email'] ?? '', 160);
$company = clean_line($data['company'] ?? '', 160);
$service = clean_line($data['service'] ?? '', 80);
$challenge = clean_line($data['challenge'] ?? '', 300);
$message = trim(strip_tags(is_string($data['message'] ?? null) ? $data['message'] : ''));
$message = mb_substr($message, 0, 4000);

$errors = [];
if ($name === '') $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($service === '') $errors[] = 'service';
if (mb_strlen($message) < 10) $errors[] = 'message';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.']);
}

// Simple per-IP rate limit stored in the system temp folder.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/srivofy_rl_' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_file($bucket)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($bucket))),
        fn ($t) => $t > $now - (int) $config['rate_window_seconds']
    );
}
if (count($hits) >= (int) $config['rate_limit']) {
    respond(429, ['ok' => false, 'error' => 'Too many messages. Please try again later or email us directly.']);
}
$hits[] = $now;
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

$subject = $config['subject_prefix'] . ' — ' . $service . ' — ' . $name;
$body = implode("\n", [
    'New enquiry from the Srivofy website',
    str_repeat('-', 40),
    'Name:       ' . $name,
    'Email:      ' . $email,
    'Company:    ' . ($company !== '' ? $company : '-'),
    'Service:    ' . $service,
    'Challenge:  ' . ($challenge !== '' ? $challenge : '-'),
    '',
    'Message:',
    $message,
    '',
    str_repeat('-', 40),
    'Sent: ' . gmdate('Y-m-d H:i') . ' UTC',
]);

$headers = [
    'From: ' . $config['from_name'] . ' <' . $config['from'] . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: Srivofy-Website',
];

$sent = mail(
    $config['to'],
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . $config['from']
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'The mail server could not send your message.']);
}

respond(200, ['ok' => true]);
