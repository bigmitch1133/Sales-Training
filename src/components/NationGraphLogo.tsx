export default function NationGraphLogo({
  className = "",
  size = "default",
  iconOnly = false,
}: {
  className?: string;
  size?: "small" | "default" | "large" | "hero";
  iconOnly?: boolean;
}) {
  const sizes = {
    small: { icon: 24, text: "text-lg", gap: "gap-2" },
    default: { icon: 32, text: "text-2xl", gap: "gap-2.5" },
    large: { icon: 44, text: "text-4xl", gap: "gap-3" },
    hero: { icon: 72, text: "text-6xl md:text-7xl", gap: "gap-4" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Stylized N icon — connected dots forming an N/graph shape */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lines connecting the dots */}
        <path
          d="M10 38 L10 16 L24 32 L24 16"
          stroke="#e8930c"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Additional right stroke */}
        <path
          d="M24 16 L38 32 L38 10"
          stroke="#e8930c"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Dots at each vertex */}
        <circle cx="10" cy="38" r="4.5" fill="#e8930c" />
        <circle cx="10" cy="16" r="4.5" fill="#e8930c" />
        <circle cx="24" cy="32" r="4.5" fill="#e8930c" />
        <circle cx="24" cy="16" r="4.5" fill="#e8930c" />
        <circle cx="38" cy="32" r="4.5" fill="#e8930c" />
        <circle cx="38" cy="10" r="4.5" fill="#e8930c" />
      </svg>
      {/* Text */}
      {!iconOnly && (
        <span className={`${s.text} font-brand font-semibold tracking-tight text-white`}>
          NationGraph
        </span>
      )}
    </div>
  );
}
