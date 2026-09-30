const cardClassName =
  'relative aspect-[700/570] w-[min(700px,72vw)] shrink-0 overflow-hidden rounded-[clamp(24px,2.8vw,40px)]';

export default function Reasons() {
  return (
    <section
      aria-labelledby="reasons-heading"
      className="overflow-hidden bg-[#fcfcfc] pt-[clamp(96px,13.2vw,190px)] pb-[clamp(110px,14vw,200px)]"
    >
      <div aria-hidden="true" className="relative left-1/2 flex w-max -translate-x-1/2 gap-[clamp(14px,1.7vw,24px)]">
        <div
          className={`${cardClassName} opacity-60 [mask-image:linear-gradient(to_right,transparent_0%,black_58%)]`}
        >
          <img
            src="/reasons/education.jpg"
            alt=""
            loading="lazy"
            className="h-full w-full scale-[1.015] object-cover object-center blur-[2px]"
          />
        </div>
        <div className={cardClassName}>
          <img
            src="/reasons/celebration.jpg"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className={`${cardClassName} opacity-60 [mask-image:linear-gradient(to_left,transparent_0%,black_58%)]`}
        >
          <img
            src="/reasons/care.jpg"
            alt=""
            loading="lazy"
            className="h-full w-full scale-[1.015] object-cover object-center blur-[2px]"
          />
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
