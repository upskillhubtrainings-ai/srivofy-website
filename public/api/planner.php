<?php
/**
 * Srivofy free Weekly Content Planner: lead mailer (Hostinger PHP).
 *
 * Receives the name and WhatsApp number from the planner form and emails the
 * lead to the inbox set in contact-config.php. The page then starts the PDF
 * download. Replies { "ok": true } or { "ok": false, "error": "..." }.
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

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, ['ok' => false, 'error' => 'Origin not allowed.']);
}

$raw = file_get_contents('php://input', false, null, 0, 10000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
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
$phone = clean_line($data['phone'] ?? '', 30);
$email = clean_line($data['email'] ?? '', 160);
$page = clean_line($data['page'] ?? '', 120);

$errors = [];
if ($name === '') $errors[] = 'name';
if (!preg_match('/^\+?[0-9 ()\-]{7,20}$/', $phone)) $errors[] = 'phone';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.']);
}

// Simple per-IP rate limit, shared with the other forms.
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
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again later.']);
}
$hits[] = $now;
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

$digits = preg_replace('/\D/', '', $phone) ?? '';
$subject = '[srivofy.com] New planner lead — ' . $name;
$body = implode("\n", [
    'Someone downloaded the free Weekly Content Planner',
    str_repeat('-', 40),
    'Name:      ' . $name,
    'WhatsApp:  ' . $phone,
    'Email:     ' . ($email !== '' ? $email : '-'),
    'Page:      ' . ($page !== '' ? $page : '-'),
    '',
    'Follow up on WhatsApp: https://wa.me/' . $digits,
    'Suggested message: Hi ' . $name . ', hope the planner helps! What kind of business do you run?',
    '',
    str_repeat('-', 40),
    'Sent: ' . gmdate('Y-m-d H:i') . ' UTC',
]);

$headers = [
    'From: ' . $config['from_name'] . ' <' . $config['from'] . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: Srivofy-Website',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
}

$sent = mail(
    $config['to'],
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . $config['from']
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'The mail server could not send your request.']);
}

respond(200, ['ok' => true]);
