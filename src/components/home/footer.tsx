type FooterProps = {
  userGuideHref?: string;
  termsHref?: string;
  privacyHref?: string;
};

export default function Footer({
  userGuideHref,
  termsHref,
  privacyHref,
}: FooterProps) {
  const links = [
    { label: 'User Guide', href: userGuideHref },
    { label: 'Terms of Service', href: termsHref },
    { label: 'Privacy Policy', href: privacyHref },
  ];

  return (
    <footer id="footer" className="font-inter relative isolate min-h-[616px] w-full overflow-hidden bg-[#fcfcfc] text-[#0a0a0a]">
      <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(24px,5.76vw,83px)] pt-[75px] max-[640px]:pt-14">
        <div className="flex items-center justify-between gap-8 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-8">
          <a href="#home" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#23205e]">
            <img src="/footer/logo-blue.svg" alt="Contreebute" width="106" height="46" className="block shrink-0" />
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 max-[640px]:justify-start">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-disabled={href ? undefined : true}
                    className="inline-flex min-h-11 items-center rounded-sm px-2 py-2 text-xl leading-[1.5] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23205e] [&[href]]:hover:underline max-[640px]:px-0 max-[640px]:pr-4 max-[640px]:text-base"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex items-center justify-between gap-8 max-[900px]:flex-col max-[900px]:items-start max-[640px]:mt-16">
          <div className="flex min-w-0 items-center gap-6">
            <img
              src="/footer/dpc-certified.png"
              alt="Ghana Data Protection Commission certification badge"
              width="80"
              height="88"
              loading="lazy"
              className="block h-[88px] w-20 shrink-0 object-contain"
            />
            <p className="max-w-[520px] text-xl leading-[1.5] max-[640px]:text-base">
              Certified by Ghana Data Protection Commission.
            </p>
          </div>
          <p className="shrink-0 text-xl leading-[1.5] max-[640px]:text-base">
            © {new Date().getFullYear()} Contreebute LTD
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[66px] left-1/2 -z-10 aspect-[3741/378] w-[clamp(780px,129.86vw,1870px)] -translate-x-1/2 bg-[#7d7c7c] [mask-position:center] [mask-repeat:no-repeat] [mask-size:100%_100%] max-[640px]:bottom-8"
        style={{ maskImage: 'url(/footer/wordmark-mask.png)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[308px] bg-gradient-to-b from-transparent via-[#fcfcfc]/90 via-[70%] to-[#fcfcfc] max-[640px]:h-44"
      />
    </footer>
  );
}
