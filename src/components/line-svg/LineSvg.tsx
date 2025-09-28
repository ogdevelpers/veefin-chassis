interface LineSvgProps {
  title: string;
  tilt?: "letaHai" | "khadaHai"; // optional prop
}

const LineSvg: React.FC<LineSvgProps> = ({ title, tilt = "letaHai" }) => {
  if (tilt === "khadaHai") {
    return (
      <div className="flex flex-col items-center h-full relative">
        {/* Top horizontal border (thicker now) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gray-300"></div>

        <svg className="flex-grow w-1" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="4" x2="0.5" y2="87" stroke="#fff" strokeWidth="1" />
        </svg>

        <span className="py-2 text-white text-md font-semibold whitespace-nowrap uppercase tracking-wider transform rotate-90">
          {title}
        </span>

        <svg className="flex-grow w-1" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="13" x2="0.5" y2="94" stroke="#fff" strokeWidth="1" />
        </svg>

        {/* Bottom horizontal border (thicker now) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gray-300"></div>
      </div>
    );
  }

  // Default: letaHai (horizontal)
  return (
    <div className="flex items-center w-full relative">
      {/* Left vertical border line (thicker now) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-gray-300"></div>

      <svg className="flex-grow h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
        <line x1="2" y1="0.5" x2="99" y2="0.5" stroke="#fff" strokeWidth="1" />
      </svg>
      <span className="px-2 text-white text-sm font-semibold whitespace-nowrap uppercase tracking-wider">
        {title}
      </span>
      <svg className="flex-grow h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
        <line x1="0" y1="0.5" x2="98" y2="0.5" stroke="#fff" strokeWidth="1" />
      </svg>

      {/* Right vertical border line (thicker now) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-gray-300"></div>
    </div>
  );
};

export default LineSvg;
