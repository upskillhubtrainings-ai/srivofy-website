<?php
/**
 * Srivofy "free 15-minute consultation" booking mailer (Hostinger PHP).
 *
 * Receives the JSON posted by the booking popup, validates it and emails the
 * request to the inbox set in contact-config.php. Nothing is stored; the team
 * confirms the slot by email or WhatsApp. Replies { "ok": true } or
 * { "ok": false, "error": "..." }.
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

// Keep these lists in step with src/config/booking.ts.
$topics = [
    'Social Media Autopilot',
    'AI + WhatsApp Agent',
    'Website Development',
    'AI Voice Agents',
    'Document Processing',
    'Not sure yet: general automation check',
];
$slots = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

$name = clean_line($data['name'] ?? '', 120);
$email = clean_line($data['email'] ?? '', 160);
$phone = clean_line($data['phone'] ?? '', 30);
$topic = clean_line($data['topic'] ?? '', 80);
$date = clean_line($data['date'] ?? '', 10);
$time = clean_line($data['time'] ?? '', 5);
$business = clean_line($data['business'] ?? '', 160);
$timezone = clean_line($data['timezone'] ?? '', 60);
$note = trim(strip_tags(is_string($data['note'] ?? null) ? $data['note'] : ''));
$note = mb_substr($note, 0, 1000);

$errors = [];
if ($name === '') $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (!preg_match('/^\+?[0-9 ()\-]{7,20}$/', $phone)) $errors[] = 'phone';
if (!in_array($topic, $topics, true)) $errors[] = 'topic';
if (!in_array($time, $slots, true)) $errors[] = 'time';

// Date: a real Monday–Saturday between tomorrow and 30 days ahead (India time).
$ist = new DateTimeZone('Asia/Kolkata');
$day = DateTime::createFromFormat('!Y-m-d', $date, $ist);
$today = new DateTime('today', $ist);
if (!$day || $day->format('Y-m-d') !== $date) {
    $errors[] = 'date';
} else {
    $diff = (int) $today->diff($day)->format('%r%a');
    if ($diff < 1 || $diff > 30 || $day->format('N') === '7') $errors[] = 'date';
}
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.']);
}

// Simple per-IP rate limit, shared with the contact form.
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
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again later or WhatsApp us.']);
}
$hits[] = $now;
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

$when = $day->format('l, j F Y') . ' at ' . $time . ' IST';
$subject = '[srivofy.com] Free consultation request — ' . $day->format('j M') . ' ' . $time . ' IST — ' . $name;
$body = implode("\n", [
    'New request for a free 15-minute consultation',
    str_repeat('-', 40),
    'Requested slot: ' . $when,
    'Visitor time zone: ' . ($timezone !== '' ? $timezone : '-'),
    'Topic:          ' . $topic,
    '',
    'Name:           ' . $name,
    'Phone:          ' . $phone,
    'Email:          ' . $email,
    'Business:       ' . ($business !== '' ? $business : '-'),
    '',
    'Note:',
    $note !== '' ? $note : '-',
    '',
    str_repeat('-', 40),
    'Next step: confirm this slot with the visitor by email or WhatsApp.',
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
    respond(500, ['ok' => false, 'error' => 'The mail server could not send your request.']);
}

// Confirmation to the visitor. Fixed text only, so the form can't be used to send other mail.
$replySubject = 'We got your request: free consultation on ' . $day->format('j M') . ' at ' . $time . ' IST';
$replyBody = implode("\n", [
    'Hi ' . $name . ',',
    '',
    'Thank you for booking a free 15-minute consultation with Srivofy.',
    '',
    'Requested time: ' . $when,
    'Topic: ' . $topic,
    '',
    'We will confirm the slot by email or WhatsApp within one working day.',
    'If you need to change the time, just reply to this email.',
    '',
    'To get the most from the call, think about the one task that takes most of your time each week:',
    'replying to messages, missed calls, social media posts or paperwork.',
    '',
    'Srikanth',
    'Srivofy, AI Automation Agency',
    'https://srivofy.com · WhatsApp +91-7207382886',
]);
@mail(
    $email,
    '=?UTF-8?B?' . base64_encode($replySubject) . '?=',
    $replyBody,
    implode("\r\n", [
        'From: Srivofy <' . $config['from'] . '>',
        'Reply-To: ' . $config['to'],
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: Srivofy-Website',
    ]),
    '-f' . $config['from']
);

respond(200, ['ok' => true]);
