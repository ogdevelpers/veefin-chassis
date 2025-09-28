
interface LineSvgProps {
  title: string;
}

const LineSvg: React.FC<LineSvgProps> = ({ title }) => {
  return (
    <div className="flex items-center w-full relative">
      {/* Left vertical border line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300"></div>

      <svg className="flex-grow h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#E5E7EB" strokeWidth="1" />
      </svg>
      <span className="px-2 text-white text-sm font-semibold whitespace-nowrap uppercase tracking-wider">
        {title}
      </span>
      <svg className="flex-grow h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#E5E7EB" strokeWidth="1" />
      </svg>

      {/* Right vertical border line */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300"></div>
    </div>
  );
};

export default LineSvg;