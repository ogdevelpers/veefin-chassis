
const Spinner: React.FC<{ size?: number; color?: string; message?: string }> = ({ 
  size = 40, 
  color = "#27A689",
  message = "Processing..."
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
    {/* Spinner Container with glow effect */}
    <div className="relative">
      {/* Outer glow circle */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{ 
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          width: size * 2,
          height: size * 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Spinner SVG */}
      <svg
        width={size * 1.5}
        height={size * 1.5}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin relative z-10"
        style={{ display: 'block' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
    </div>
    
    {/* Loading Message */}
    {message && (
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-white animate-pulse">
          {message}
        </p>
        <p className="text-sm text-gray-400">
          Please wait while we process your request
        </p>
      </div>
    )}
  </div>
);

export default Spinner;
