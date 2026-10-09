/** Shimmering placeholder shown where a value is still on its way from the backend (never a fake "0"). */
export default function Skeleton({ width = "100%", height = 16, radius, className = "", style }) {
  return (
    <span
      className={`skeleton ${className}`}
      aria-hidden="true"
      style={{ width, height, ...(radius ? { borderRadius: radius } : null), ...style }}
    />
  );
}
