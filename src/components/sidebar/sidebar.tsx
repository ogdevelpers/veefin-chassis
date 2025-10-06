 
interface SidebarProps {
  title: string;
  content: string | any;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ title, content, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity bg-black/20 backdrop-blur-lg"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
          className={`fixed top-0 right-0 h-full w-full sm:w-[35vw] sm:min-w-[400px] bg-[#232228] z-50 transform transition-transform duration-500 ease-[cubic-bezier(.175,.885,.32,1.275)] ${ // <- PUNCHY STYLE APPLIED HERE
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} 
        style={{
          boxShadow: '-10px 0px 24px 0px rgba(127, 185, 97, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-7 border-b border-gray-700">
          <h2 
            className="text-3xl font-semibold uppercase tracking-wide flex-1 mr-4"
            style={{
              background: 'linear-gradient(0deg, #27A689, #27A689), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {title}
          </h2>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110 flex-shrink-0"
            style={{ backgroundColor: '#27A689' }}
            aria-label="Close sidebar"
          >
            X
          </button>
        </div>
        
        {/* Content */}
          <div className="p-7 overflow-y-auto h-[calc(100%-104px)] flex flex-col gap-7 text-white">
            {typeof content === 'string' ? parseContent(content) : content}
          </div>
      </div>
    </>
  );
}



const parseContent = (content: string) => {
  const lines = content.split('\n');
  const elements: any[] = [];
  let currentParagraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={key++} className="text-[18px] leading-relaxed text-gray-300">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      flushParagraph();
      return;
    }

    // Check for bullet points (• or -)
    if (trimmed.startsWith('•') || trimmed.match(/^-\s/)) {
      flushParagraph();
      const bulletText = trimmed.replace(/^[•-]\s*/, '');
      elements.push(
        <li key={key++} className="text-[18px] leading-relaxed text-gray-300 ml-6">
          {bulletText}
        </li>
      );
      return;
    }

    // Check for headings (lines ending with colon or ALL CAPS followed by colon)
    const headingMatch = trimmed.match(/^([A-Z][^:]+):(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const [, headingText, restText] = headingMatch;
      
      elements.push(
        <h3 key={key++} className="text-[20px] font-semibold text-white mt-4 mb-2">
          {headingText}
        </h3>
      );
      
      if (restText.trim()) {
        currentParagraph.push(restText.trim());
      }
      return;
    }

    // Regular text - accumulate into paragraph
    currentParagraph.push(trimmed);
  });

  // Flush any remaining paragraph
  flushParagraph();

  return elements;
};