export default function DuskAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#2a3340_0%,#1a1f27_42%,#141820_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 20% 0%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(201,162,39,0.10), transparent 50%), radial-gradient(ellipse 80% 45% at 50% 100%, rgba(120,140,170,0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath fill='none' stroke='%23c9a227' stroke-opacity='0.22' stroke-width='0.5' d='M0 36h200M0 72h200M0 108h200M0 144h200M0 180h200M36 0v200M72 0v200M108 0v200M144 0v200M180 0v200'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
}
