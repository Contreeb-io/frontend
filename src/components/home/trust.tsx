import DotGrid from '@/components/backgrounds/DotGrid';

const dotPositions = [
  [0.096, 0.124],
  [0.274, 0.137],
  [0.477, 0.07],
  [0.8, 0.057],
  [0.95, 0.177],
  [0.654, 0.196],
  [0.05, 0.377],
  [0.194, 0.441],
  [0.359, 0.337],
  [0.504, 0.344],
  [0.861, 0.35],
  [0.652, 0.513],
  [0.453, 0.603],
  [0.799, 0.683],
  [0.118, 0.759],
  [0.95, 0.759],
  [0.398, 0.87],
  [0.649, 0.954],
] as const;

export default function Trust() {
  return (
    <section id="about" className="font-outfit relative isolate flex min-h-80 w-full items-center justify-center overflow-hidden bg-[#FFFEFC] px-5 py-20 sm:min-h-102.5 sm:px-8 sm:py-28 lg:min-h-145 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-size:56px_56px] sm:[background-size:clamp(64px,8.4vw,120px)_80px]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E2E2E2 1px, transparent 1px), linear-gradient(to bottom, #E2E2E2 1px, transparent 1px)',
          backgroundPosition: 'center center',
          maskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
        <DotGrid
          dotSize={5}
          baseColor="#3E4793"
          activeColor="#3E4793"
          positions={dotPositions}
          proximity={110}
          shockRadius={170}
          shockStrength={2}
        />
      </div>
      <h2 className="pointer-events-none relative w-full max-w-6xl text-left text-[clamp(2rem,4vw,3rem)] leading-[1.15] md:text-center font-semibold tracking-tight md:text-[clamp(2rem,6vw,5rem)] md:leading-[1.18]">
        <span className="block text-[#737373]">Built on trust.</span>
        <span className="mt-2 block max-w-[12ch] text-balance text-[#0A0A0A] md:mx-auto md:mt-0 md:max-w-none">Backed by transparency.</span>
      </h2>
    </section>
  );
}
