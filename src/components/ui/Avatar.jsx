export default function Avatar({ user, size = 40, src, className = "", alt, ...rest }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || user?.avatar?.url || "/assets/avatar3.png"}
      alt={alt || `${user?.firstName || "User"} avatar`}
      width={size}
      height={size}
      className={`ui-avatar ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    />
  );
}
