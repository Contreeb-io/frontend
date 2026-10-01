const cardClassName =
  'relative aspect-[700/570] w-[min(700px,72vw)] shrink-0 overflow-hidden rounded-[clamp(24px,2.8vw,40px)]';

const images = [
  { src: '/reasons/education.jpg', position: 'object-center' },
  { src: '/reasons/celebration.jpg', position: 'object-center' },
  { src: '/reasons/care.jpg', position: 'object-center' },
] as const;

export default function Reasons() {
  return (
    <section
      aria-labelledby="reasons-heading"
      className="overflow-hidden bg-[#fcfcfc] pt-[clamp(96px,13.2vw,190px)] pb-[clamp(110px,14vw,200px)]"
    >
      <div aria-hidden="true" className="reasons-viewport w-full [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] max-[1400px]:[mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        <div className="mx-auto w-[min(700px,72vw)]">
          <div className="reasons-track">
            {[...images, ...images].map((image, index) => (
              <div className={cardClassName} key={`${image.src}-${index}`}>
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover ${image.position}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(72px,8.4vw,122px)] max-w-[940px] px-6 text-center">
        <h2
          id="reasons-heading"
          className="font-outfit mx-auto max-w-[650px] text-[clamp(40px,4.45vw,64px)] leading-[1.13] font-semibold tracking-[-0.035em] text-[#0a0a0a]"
        >
          Built for every<br />reason to care.
        </h2>
        <p className="font-inter mx-auto mt-8 max-w-[850px] text-[clamp(18px,1.67vw,24px)] leading-[1.5] text-[#818181] max-[640px]:mt-6">
          Whether it’s a dream, an emergency, a celebration, a community cause,
          or something deeply personal, Contreebute gives everyone a place to
          raise support for what matters.
        </p>
      </div>
    </section>
  );
}
