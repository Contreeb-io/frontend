import type { ReactNode } from 'react';
import './trust-safety.css';

type TrustFeatureProps = {
  id: string;
  title: string;
  description: string;
  variant: 'verification' | 'payment' | 'review';
  children: ReactNode;
};

export default function TrustFeature({ id, title, description, variant, children }: TrustFeatureProps) {
  return (
    <section className={`trust-feature trust-feature--${variant}`} aria-labelledby={id}>
      <div className="trust-feature__layout">
        <div className="trust-feature__copy">
          <h2 id={id} className="trust-feature__title">{title}</h2>
          <p className="trust-feature__description">{description}</p>
        </div>
        <div className="trust-feature__visual" aria-hidden="true">{children}</div>
      </div>
    </section>
  );
}
