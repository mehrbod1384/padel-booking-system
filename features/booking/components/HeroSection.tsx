export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <img
        src="/padel-racket.png"
        alt="Court"
        className="h-80 w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute left-8 top-10 z-10">
        <p className="text-lime-300 text-xs font-medium">PADEL COURTS</p>

        <h1 className="mt-2 text-4xl font-bold leading-none text-white">
          Book your
          <br />
          <span className="text-lime-300">court</span>
        </h1>

        <p className="mt-4 max-w-xs text-sm text-zinc-400 w-50">
          Choose your court, select a time and book instantly
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
    </div>
  );
}
