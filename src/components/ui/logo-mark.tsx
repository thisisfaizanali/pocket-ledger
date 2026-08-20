type Props = {
  size?: number;
  className?: string;
};

function LogoMark({ size = 26, className }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="13" width="4" height="7" rx="2" fill="white" />
        <rect x="10" y="8" width="4" height="12" rx="2" fill="white" />
        <rect x="16" y="4" width="4" height="16" rx="2" fill="white" fillOpacity="0.9" />
      </svg>
    </span>
  );
}

export default LogoMark;
