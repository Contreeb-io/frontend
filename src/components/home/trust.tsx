import Cubes from '@/components/backgrounds/Cubes';

export default function Trust() {
  return (
    <section id="about" className="font-outfit relative isolate flex min-h-80 w-full items-center justify-center overflow-hidden bg-white px-5 py-20 sm:min-h-102.5 sm:px-8 sm:py-28 lg:min-h-145 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-45">
        <Cubes gridSize={8} maxAngle={38} radius={2.5} cellGap={10} />
      </div>
      <h2 className="pointer-events-none relative w-full max-w-6xl text-left text-[clamp(2rem,4vw,3rem)] leading-[1.15] md:text-center font-semibold tracking-tight md:text-[clamp(2rem,6vw,5rem)] md:leading-[1.18]">
        <span className="block text-[#737373]">Built on trust.</span>
        <span className="mt-2 block max-w-[12ch] text-balance text-[#0A0A0A] md:mx-auto md:mt-0 md:max-w-none">Backed by transparency.</span>
      </h2>
    </section>
  );
}
