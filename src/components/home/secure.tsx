import TrustFeature from './trust-feature';

function PaymentNotification({ className }: { className: string }) {
  return (
    <div className={`payment-notification ${className}`}>
      <span className="payment-notification__icon">
        <img src="/trust/money-wavy.svg" alt="" width="64" height="64" />
      </span>
      <span className="payment-notification__details">
        <strong>Payment received</strong>
        <span>12th May, 2026</span>
      </span>
      <span className="payment-notification__amount">GHS 500</span>
    </div>
  );
}

export default function Secure() {
  return (
    <TrustFeature
      id="secure-heading"
      variant="payment"
      title="Secure Payments"
      description="Donations are processed through trusted payment partners using secure payment infrastructure."
    >
      <div className="payment-visual">
        <img className="payment-visual__orbit payment-visual__orbit--left" src="/trust/ellipse-15.png" alt="" width="285" height="540" />
        <img className="payment-visual__orbit payment-visual__orbit--right" src="/trust/ellipse-16.png" alt="" width="285" height="540" />
        <PaymentNotification className="payment-notification--back" />
        <PaymentNotification className="payment-notification--middle" />
        <PaymentNotification className="payment-notification--front" />
        <img className="payment-visual__lock" src="/trust/lock-key.svg" alt="" width="120" height="120" />
      </div>
    </TrustFeature>
  );
}
