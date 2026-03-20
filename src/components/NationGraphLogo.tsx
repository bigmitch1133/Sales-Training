export default function NationGraphLogo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "small" | "default" | "large" | "hero";
}) {
  const sizes = {
    small: { icon: 28, text: "text-lg", gap: "gap-2" },
    default: { icon: 36, text: "text-2xl", gap: "gap-2.5" },
    large: { icon: 48, text: "text-4xl", gap: "gap-3" },
    hero: { icon: 72, text: "text-6xl md:text-7xl", gap: "gap-4" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Bar chart icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Row 1 (top) */}
        <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.4" />
        <rect x="10" y="0" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.5" />
        <rect x="20" y="0" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.6" />
        <rect x="30" y="0" width="8" height="8" rx="1.5" fill="#e8890a" />
        {/* Row 2 */}
        <rect x="0" y="10" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.4" />
        <rect x="10" y="10" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.6" />
        <rect x="20" y="10" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="30" y="10" width="8" height="8" rx="1.5" fill="#e8890a" />
        {/* Row 3 */}
        <rect x="0" y="20" width="8" height="8" rx="1.5" fill="#bf5700" opacity="0.5" />
        <rect x="10" y="20" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="30" y="20" width="8" height="8" rx="1.5" fill="#e8890a" />
        {/* Row 4 (bottom) */}
        <rect x="0" y="30" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="10" y="30" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="20" y="30" width="8" height="8" rx="1.5" fill="#e8890a" />
        <rect x="30" y="30" width="8" height="8" rx="1.5" fill="#e8890a" />
      </svg>
      {/* Text */}
      <span className={`${s.text} font-brand font-bold tracking-tight text-white`}>
        <span className="font-semibold">Nation</span>Graph
      </span>
    </div>
  );
}
