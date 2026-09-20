import { LockKeyhole } from 'lucide-react';

type SecureProps = {
  imageSrc?: string;
};

export default function Secure({ imageSrc }: SecureProps) {
  return (
    <section
      aria-labelledby="secure-heading"
      className="bg-[#F9F3E9] px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-8 lg:gap-12">
        <div className="w-full max-w-md">
          <h2
            id="secure-heading"
            className="font-outfit text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold tracking-tight text-[#0A0A0A]"
          >
            Secure Payments
          </h2>
          <p className="font-inter mt-3 max-w-[25ch] text-lg leading-[1.5] text-[#737373] sm:text-xl lg:text-[22px]">
            Donations are processed through trusted payment partners using
            secure payment infrastructure.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="mx-auto flex aspect-[560/340] w-full max-w-[640px] items-center justify-center"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt=""
              width={520}
              height={300}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex size-28 items-center justify-center rounded-full bg-[#EDE6DA] sm:size-36">
              <LockKeyhole
                className="size-12 text-[#737373] sm:size-16"
                strokeWidth={1.25}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
