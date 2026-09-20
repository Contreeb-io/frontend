type FooterProps = {
  imageSrc?: string;
  ellipseSrc?: string;
  gradient?: string;
  userGuideHref?: string;
  termsHref?: string;
  privacyHref?: string;
};

export default function Footer({
  imageSrc = '/contreebute.png',
  ellipseSrc = '/ellipse.png',
  gradient,
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
    <footer className="font-inter relative isolate min-h-[306px] overflow-hidden bg-[#F9F3E9] px-5 pt-20 pb-16 text-sm leading-5 text-[#27252D] sm:px-8 sm:pt-28 lg:px-14">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-30 h-auto w-[120%] min-w-[900px] max-w-none -translate-x-1/2 translate-y-[35%] opacity-15"
        />
      )}
      {ellipseSrc && (
        <img
          src={ellipseSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        />
      )}
      {gradient && <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: gradient }}
      />}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="shrink-0">{new Date().getFullYear()} Contreebute</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-disabled={href ? undefined : true}
                  className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 enabled:hover:underline [&[href]]:hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
