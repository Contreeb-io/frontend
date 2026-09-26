export default function Transparent() {
  return (
    <section
      aria-labelledby="transparent-heading"
      className="bg-[#FFFEFC] px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10"
    >
      <div className="mx-auto min-h-56 max-w-7xl sm:min-h-64">
        <div className="w-full max-w-md">
          <h2
            id="transparent-heading"
            className="font-outfit text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold tracking-tight text-[#0A0A0A]"
          >
            <span className="block">Transparent</span>
            <span className="block">Fundraising</span>
          </h2>
          <p className="font-inter mt-3 max-w-[28ch] text-lg leading-[1.5] text-[#737373] sm:text-xl lg:text-[22px]">
            Know who you&apos;re supporting and contribute with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
