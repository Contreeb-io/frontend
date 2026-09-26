import VerifiedCreatorCard from '@/components/home/verified-creator-card';

const cardPositions = [
  'left-[8%] top-[14%] -rotate-[17deg]',
  'right-0 top-[10%] rotate-[5deg]',
  'left-0 top-[58%] rotate-[5deg]',
  'right-[15%] top-[50%] rotate-[5deg]',
];

export default function Verified() {
  return (
    <section
      aria-labelledby="verified-heading"
      className="bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
        <div className="w-full max-w-md">
          <h2
            id="verified-heading"
            className="font-outfit max-w-[14ch] text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold tracking-tight text-[#0A0A0A]"
          >
            Verified Campaign Creators
          </h2>
          <p className="font-inter mt-3 max-w-[28ch] text-lg leading-[1.5] text-[#737373] sm:text-xl lg:text-[22px]">
            Campaign creators may be asked to verify their identity before
            receiving donations.
          </p>
        </div>
        <div
          role="img"
          aria-label="Illustration of four verified campaign creator profiles"
          className="@container relative mx-auto aspect-[440/260] w-full max-w-[560px]"
        >
          <div aria-hidden="true">
            {cardPositions.map((position) => (
              <VerifiedCreatorCard
                key={position}
                name="Kwame Bio"
                age={24}
                className={`absolute w-[42%] ${position}`}
                avatarSrc="/avatar.jpg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
