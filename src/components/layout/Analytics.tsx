"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const { googleAnalyticsId: GA_ID, metaPixelId: PIXEL_ID } = siteConfig.analytics;

/**
 * Google Analytics 4 + Meta Pixel, loaded on every page after the page is
 * interactive. IDs come from siteConfig.analytics ("" disables a tool).
 *
 * The site navigates between pages without full reloads, so page views for
 * those in-site navigations are sent here. (GA4's "enhanced measurement"
 * also detects them; we only add the Meta Pixel page view manually.)
 */
export function Analytics() {
  const pathname = usePathname();
  const firstView = useRef(true);

  useEffect(() => {
    if (firstView.current) {
      firstView.current = false; // the initial PageView is sent by the base code
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}

/** Report a successful contact-form enquiry as a lead to both tools. */
export function trackLead(service: string) {
  window.gtag?.("event", "generate_lead", { service });
  window.fbq?.("track", "Lead", { content_name: service });
}
