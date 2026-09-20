import { ChevronDown } from 'lucide-react';
import WaitlistForm from '@/components/home/waitlist-form';

const linkClassName =
  'inline-flex min-h-11 items-center rounded-sm text-sm text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="font-outfit relative isolate flex min-h-155 flex-col overflow-hidden bg-[#6360F0]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-105 bg-[url('/hero-image.jpg')] bg-cover bg-center opacity-80 blur-[2px]"
      />
      <header className="relative z-10 px-5 py-5 sm:px-8 lg:px-14">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <a href="#home" className={`${linkClassName} shrink-0 self-start`}>
            <img
              src="/logo.png"
              alt="Contreebute"
              className="h-auto w-36 object-contain text-white"
            />
          </a>
          <ul className="relative flex flex-wrap items-center gap-x-5 gap-y-1 sm:gap-x-7 lg:gap-x-8">
            <li>
              <a href="#about" className={linkClassName}>
                About
              </a>
            </li>
            <li>
              <a href="#faqs" className={linkClassName}>
                FAQs
              </a>
            </li>
            <li>
              <a href="#contact" className={linkClassName}>
                Contact
              </a>
            </li>
            <li className="sm:relative">
              <details className="group">
                <summary
                  className={`${linkClassName} cursor-pointer list-none gap-2 [&::-webkit-details-marker]:hidden`}
                >
                  Trust and safety
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <ul className="absolute left-0 z-20 mt-2 w-60 rounded-2xl border border-white/20 bg-[#514DCB] p-2 shadow-lg sm:right-0 sm:left-auto">
                  {[
                    ['Verified creators', '#verified-heading'],
                    ['Secure payments', '#secure-heading'],
                    ['Campaign review', '#review-heading'],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className={`${linkClassName} w-full rounded-lg px-3 hover:bg-white/10`}
                        onClick={(event) => {
                          event.currentTarget
                            .closest('details')
                            ?.removeAttribute('open');
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      </header>
      <div className="relative mx-auto mt-auto w-full max-w-5xl px-5 pt-40 pb-20 text-center text-white sm:px-8 lg:px-14">
        <h1
          id="hero-heading"
          className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          Raise funds with confidence.
        </h1>
        <p className="font-inter mx-auto mt-5 max-w-[46ch] text-sm leading-relaxed text-pretty sm:text-base">
          Contreebute helps individuals, communities and organizations raise funds
          for life&apos;s important moments through a secure, transparent and
          trusted crowdfunding platform.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
