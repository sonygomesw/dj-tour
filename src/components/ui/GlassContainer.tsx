interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}
export function GlassContainer({
  children,
  className = "",
  hover = true,
  onClick,
}: GlassContainerProps) {
  return (
    <div
      className={` relative backdrop-blur-2xl bg-black/[0.02] rounded-2xl overflow-hidden border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-500 ${hover ? "hover:shadow-[0_12px_48px_rgba(139,92,246,0.15),0_4px_24px_rgba(0,0,0,0.1)]" : ""} ${className} `}
      onClick={onClick}
    >
      {" "}
      {/* Subtle top highlight */}{" "}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />{" "}
      {/* Subtle noise texture */}{" "}
      <div
        className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />{" "}
      {/* Content */} <div className="relative z-10"> {children} </div>{" "}
    </div>
  );
}
