import Script from "next/script";
import { site } from "@/lib/site";

function getGtmId(): string | undefined {
  return process.env.NEXT_PUBLIC_GTM_ID || site.analytics.gtmId || undefined;
}

/** GTM <head> loader. Place inside <body> so afterInteractive can attach. */
export function GoogleTagManager() {
  const gtmId = getGtmId();
  if (!gtmId) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}

/** GTM <noscript> iframe. Place immediately after the opening <body>. */
export function GoogleTagManagerNoscript() {
  const gtmId = getGtmId();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
