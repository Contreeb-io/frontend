import TrustFeature from './trust-feature';

type VerificationCardProps = {
  state: 'verified' | 'pending';
  className: string;
};

function StatusMark({ complete }: { complete: boolean }) {
  return complete ? (
    <span className="verification-card__mark verification-card__mark--complete">
      <img src="/trust/check.svg" alt="" width="12" height="12" />
    </span>
  ) : <span className="verification-card__mark verification-card__mark--pending" />;
}

function VerificationCard({ state, className }: VerificationCardProps) {
  const complete = state === 'verified';

  return (
    <div className={`verification-card ${className}`}>
      <div className="verification-card__header">
        <div>
          <p className="verification-card__title">Community Education Fund</p>
          <div className="verification-card__creator">
            <img src="/trust/ama-mensah.png" alt="" width="32" height="32" />
            <div>
              <p>Ama Mensah</p>
              <small>Campaign creator</small>
            </div>
          </div>
        </div>
        <img src={complete ? '/trust/seal-check-alt.svg' : '/trust/circle-dashed.svg'} alt="" width="32" height="32" />
      </div>
      <div className="verification-card__divider"><img src="/trust/card-divider.svg" alt="" width="400" height="1" /></div>
      <div className="verification-card__statuses">
        <div><span>Identity check</span><span><StatusMark complete />Campaign creator</span></div>
        <div><span>Verification</span><span><StatusMark complete={complete} />Details verified</span></div>
        <div><span>Campaign status</span><span><StatusMark complete={complete} />Ready to receive donations</span></div>
      </div>
    </div>
  );
}

export default function Verified() {
  return (
    <TrustFeature
      id="verified-heading"
      variant="verification"
      title="Know who's behind the campaign"
      description="For campaigns that require verification, creators confirm their identity before funds can be received. A verified status helps donors understand when those checks have been completed."
    >
      <div className="verification-visual">
        <VerificationCard state="pending" className="verification-card--top-back" />
        <VerificationCard state="verified" className="verification-card--main" />
        <VerificationCard state="pending" className="verification-card--right" />
        <VerificationCard state="pending" className="verification-card--left" />
        <VerificationCard state="verified" className="verification-card--lower" />
        <div className="verification-visual__fade-left" />
        <div className="verification-visual__fade-right" />
        <div className="verification-visual__fade-bottom" />
      </div>
    </TrustFeature>
  );
}
