import { ChevronDown } from 'lucide-react';
import WaitlistForm from '@/components/home/waitlist-form';

const linkClassName =
  'inline-flex min-h-11 items-center rounded-sm text-base focus-visible:outline-2 focus-visible:outline-offset-4';

const navigationLinkClassName =
  `${linkClassName} text-white focus-visible:outline-white max-[760px]:text-[#27275f] max-[760px]:focus-visible:outline-[#5659b4]`;

const backgroundClassName =
  'pointer-events-none absolute inset-0 z-0 bg-[url(/hero-image.jpg)] bg-no-repeat [background-size:110%_auto] [background-position:35%_-8svh] blur-[1px] saturate-[1.12] brightness-[1.08] max-[1024px]:[background-size:auto_88%] max-[1024px]:[background-position:center_-8svh] max-[760px]:[background-size:auto_66%] max-[760px]:[background-position:center_top]';

const tintClassName =
  'pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(88,76,178,.58),rgba(82,95,167,.35)_54%,rgba(68,107,176,.42))]';

const gradientClassName =
  'pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(36,46,117,.06)_0%,rgba(53,54,140,.22)_25%,rgba(66,58,143,.62)_42%,rgba(72,71,158,.88)_55%,rgba(72,71,158,.97)_70%,#5256a8_100%)] max-[760px]:bg-[linear-gradient(to_bottom,rgba(36,46,117,.12)_0%,rgba(53,54,140,.38)_27%,rgba(72,71,158,.88)_48%,#5256a8_70%)]';

const trustLinksClassName =
  'absolute top-[calc(100%+8px)] right-0 z-40 w-60 rounded-2xl border border-[#e5e6f2] bg-white p-2 shadow-[0_16px_36px_rgba(18,20,75,.2)] max-[760px]:static max-[760px]:mb-2 max-[760px]:w-full max-[760px]:border-0 max-[760px]:border-l-2 max-[760px]:rounded-none max-[760px]:shadow-none';

function NavigationLinks() {
  return (
    <ul className="flex items-center gap-[clamp(20px,2.6vw,40px)] max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-0">
      <li><a href="#about" className={navigationLinkClassName}>About</a></li>
      <li><a href="#faqs" className={navigationLinkClassName}>FAQs</a></li>
      <li><a href="#contact" className={navigationLinkClassName}>Contact</a></li>
      <li className="relative">
        <details className="group/trust">
          <summary className={`${navigationLinkClassName} cursor-pointer list-none gap-2 [&::-webkit-details-marker]:hidden`}>
            Trust and safety
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform group-open/trust:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <ul className={trustLinksClassName}>
            {[
              ['Verified creators', '#verified-heading'],
              ['Secure payments', '#secure-heading'],
              ['Campaign review', '#review-heading'],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${linkClassName} w-full rounded-lg px-3 text-[#27275f] hover:bg-[#f0f1fb] focus-visible:outline-[#5659b4]`}
                  onClick={(event) => {
                    event.currentTarget.closest('details')?.removeAttribute('open');
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
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate min-h-svh overflow-hidden bg-[#5256a8] text-white">
      <div aria-hidden="true" className={backgroundClassName} />
      <div aria-hidden="true" className={tintClassName} />
      <div aria-hidden="true" className={gradientClassName} />

      <header className="relative z-40 px-[clamp(32px,5.55vw,80px)] pt-12 max-[1024px]:px-8 max-[760px]:px-6 max-[760px]:pt-7">
        <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between gap-8">
          <a href="#home" className={`${linkClassName} shrink-0 text-white focus-visible:outline-white`}>
            <img src="/logo.png" alt="Contreebute" className="block h-auto w-[200px] max-[760px]:w-[150px]" />
          </a>
          <nav aria-label="Main navigation" className="max-[760px]:hidden">
            <NavigationLinks />
          </nav>
          <details className="group/menu relative hidden max-[760px]:block">
            <summary className="font-inter inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
              Menu
              <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open/menu:rotate-180 motion-reduce:transition-none" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute top-[calc(100%+8px)] right-0 z-40 w-[min(280px,calc(100vw_-_48px))] rounded-2xl border border-[#e5e6f2] bg-white px-4 py-2 shadow-[0_16px_36px_rgba(18,20,75,.2)]"
              onClick={(event) => {
                if (event.target instanceof Element && event.target.closest('a')) {
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }
              }}
            >
              <NavigationLinks />
            </nav>
          </details>
        </div>
      </header>

      <div className="absolute top-[57.5%] left-1/2 z-30 w-[calc(100%_-_48px)] max-w-[900px] -translate-x-1/2 text-center max-[1024px]:w-[calc(100%_-_64px)] max-[1024px]:max-w-[800px] max-[760px]:relative max-[760px]:top-auto max-[760px]:left-auto max-[760px]:mx-auto max-[760px]:mt-[clamp(260px,35svh,330px)] max-[760px]:w-[calc(100%_-_48px)] max-[760px]:max-w-[560px] max-[760px]:translate-x-0 max-[760px]:pb-16">
        <h1 id="hero-heading" className="font-outfit m-0 text-[clamp(50px,4.86vw,70px)] leading-[1.06] font-medium tracking-[-0.035em] max-[1024px]:text-[clamp(44px,5.2vw,60px)] max-[760px]:text-[clamp(38px,9.2vw,54px)] max-[760px]:leading-[1.08]">
          Raise funds with confidence.
        </h1>
        <p className="font-inter mx-auto mt-6 max-w-[600px] text-lg leading-[1.55] text-pretty max-[760px]:text-base">
          Contreebute helps individuals, communities and organizations raise funds
          for life&apos;s important moments through a secure, transparent and
          trusted crowdfunding platform.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
