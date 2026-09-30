import TrustFeature from './trust-feature';

const documents = [
  'reviewed', 'neutral', 'reviewed', 'neutral',
  'neutral', 'reviewed', 'neutral', 'reviewed',
  'reviewed', 'neutral', 'reviewed', 'neutral',
] as const;

function CampaignDocument({ state, index }: { state: 'reviewed' | 'neutral'; index: number }) {
  return (
    <div className={`campaign-document campaign-document--${state} campaign-document--${index}`}>
      <img src="/trust/document.svg" alt="" width="157" height="177" />
      <div className="campaign-document__content">
        <span className="campaign-document__thumbnail" />
        <span className="campaign-document__lines">
          <i /><i /><i className="campaign-document__line--short" />
          <img src="/trust/document-divider.svg" alt="" width="128" height="1" />
          <i className="campaign-document__line--medium" /><i /><i className="campaign-document__line--tiny" /><i /><i /><i className="campaign-document__line--medium" />
        </span>
      </div>
      {state === 'reviewed' && <img className="campaign-document__seal" src="/trust/seal-check.svg" alt="" width="104" height="104" />}
    </div>
  );
}

export default function Review() {
  return (
    <TrustFeature
      id="review-heading"
      variant="review"
      title="Campaign Review"
      description="Every campaign is reviewed before it goes live to help maintain a trusted fundraising environment."
    >
      <div className="review-visual">
        {documents.map((state, index) => <CampaignDocument key={index} state={state} index={index} />)}
      </div>
    </TrustFeature>
  );
}
