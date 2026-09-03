interface LogoProps {
  className?: string;
}

// Placeholder wordmark. Inline SVG so it inherits the parent text color
// (currentColor) and the dot picks up the theme accent — readable in both
// light and dark modes with no asset swaps. Replace with your own logo.
export const Logo = ({ className = "h-8 w-auto" }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 32"
    className={className}
    aria-label="YourApp"
    role="img"
  >
    <rect x="1" y="4" width="24" height="24" rx="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="13" cy="16" r="5" className="fill-primary" />
    <text
      x="34"
      y="23"
      fill="currentColor"
      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
      fontSize="17"
      fontWeight="700"
    >
      YourApp
    </text>
  </svg>
);

export default Logo;
