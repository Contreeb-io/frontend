import { ChevronDown } from 'lucide-react';
import WaitlistForm from '@/components/home/waitlist-form';
import styles from './hero.module.css';

const linkClassName =
  'inline-flex min-h-11 items-center rounded-sm text-base text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

function NavigationLinks() {
  return (
    <ul className={styles.navigationLinks}>
      <li><a href="#about" className={linkClassName}>About</a></li>
      <li><a href="#faqs" className={linkClassName}>FAQs</a></li>
      <li><a href="#contact" className={linkClassName}>Contact</a></li>
      <li className={styles.trustItem}>
        <details className="group">
          <summary className={`${linkClassName} cursor-pointer list-none gap-2 [&::-webkit-details-marker]:hidden`}>
            Trust and safety
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <ul className={styles.trustLinks}>
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
    <section id="home" aria-labelledby="hero-heading" className={styles.hero}>
      <div aria-hidden="true" className={styles.background} />
      <div aria-hidden="true" className={styles.imageTint} />
      <div aria-hidden="true" className={styles.gradient} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#home" className={`${linkClassName} shrink-0`}>
            <img src="/logo.png" alt="Contreebute" className={styles.logo} />
          </a>
          <nav aria-label="Main navigation" className={styles.desktopNavigation}>
            <NavigationLinks />
          </nav>
          <details className={styles.mobileNavigation}>
            <summary className={styles.mobileMenuToggle}>
              Menu
              <ChevronDown aria-hidden="true" className="size-4" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className={styles.mobileMenu}
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

      <div className={styles.content}>
        <h1 id="hero-heading" className={styles.title}>
          Raise funds with confidence.
        </h1>
        <p className={styles.description}>
          Contreebute helps individuals, communities and organizations raise funds
          for life&apos;s important moments through a secure, transparent and
          trusted crowdfunding platform.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
