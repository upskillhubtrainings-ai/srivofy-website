<?php
/**
 * Contact form mail settings (server-side only — never sent to browsers).
 *
 * - to:    inbox that receives enquiries.
 * - from:  must be a real mailbox on YOUR domain (created in Hostinger
 *          hPanel → Emails), otherwise Hostinger may reject or spam-filter it.
 * - allowed_origins: sites allowed to post to the form.
 */

if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    http_response_code(404);
    exit;
}

return [
    'to' => 'inquiry@srivofy.com',
    'from' => 'inquiry@srivofy.com',
    'from_name' => 'Srivofy Website',
    'subject_prefix' => '[srivofy.com] New enquiry',
    'allowed_origins' => [
        'https://www.srivofy.com',
        'https://srivofy.com',
    ],
    // Maximum submissions per visitor IP within the window below.
    'rate_limit' => 5,
    'rate_window_seconds' => 600,
];
