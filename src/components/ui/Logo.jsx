import { Link } from "@/lib/router";

export default function Logo({ href = "/", size = 36, withName = false }) {
  const name = process.env.REACT_APP_NAME || "Admin";
  const src = process.env.REACT_APP_IMAGE_URL || "/assets/logo.png";
  return (
    <Link to={href} className="brand-logo" aria-label={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        height={size}
        style={{ height: size, width: "auto", maxWidth: size * 3 }}
      />
      {withName && <span className="brand-name">{name}</span>}
    </Link>
  );
}
