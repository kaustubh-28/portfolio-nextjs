export default function BackgroundGrid() {
  return (
    <>
      {/* Center vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: `
              radial-gradient(
                circle at center,
                rgba(255,255,255,0.035) 0%,
                rgba(255,255,255,0.015) 30%,
                transparent 70%
              )
            `,
        }}
      />

      {/* Engineering grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.015) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.015) 1px,
                transparent 1px
              )
            `,
          backgroundSize: "20px 20px",
        }}
      />
    </>
  );
}
