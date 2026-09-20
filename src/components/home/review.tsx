import { BadgeCheck } from 'lucide-react';

const reviewCards = [
  true, false, true, false,
  false, true, false, true,
  true, false, true, false,
];

export default function Review() {
  return (
    <section
      aria-labelledby="review-heading"
      className="bg-[#F9F3E9] px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-8 lg:gap-12">
        <div className="w-full max-w-md">
          <h2
            id="review-heading"
            className="font-outfit text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold tracking-tight text-[#0A0A0A]"
          >
            Campaign Review
          </h2>
          <p className="font-inter mt-3 max-w-[27ch] text-lg leading-[1.5] text-[#737373] sm:text-xl lg:text-[22px]">
            Every campaign is reviewed before it goes live to help maintain a
            trusted fundraising environment.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="mx-auto grid w-full max-w-[560px] grid-cols-4 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-6 lg:gap-x-5 lg:gap-y-7"
        >
          {reviewCards.map((isActive, index) => (
            <div
              key={index}
              className={`relative ${isActive ? (index >= 8 ? 'opacity-70' : '') : 'opacity-35'}`}
            >
              <img
                src={isActive ? '/review-active.png' : '/review-inactive.png'}
                alt=""
                width={157}
                height={177}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              {isActive && (
                <BadgeCheck
                  className="absolute top-1/2 left-1/2 size-[60%] -translate-x-1/2 -translate-y-1/2 fill-[#DCFCE7]/60 text-[#86EFAC]"
                  strokeWidth={1.5}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
