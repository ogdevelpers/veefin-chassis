
const Spinner: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = "#27A689" }) => (
  <div className="flex items-center justify-center">
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
      style={{ display: 'block' }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

export default Spinner;
