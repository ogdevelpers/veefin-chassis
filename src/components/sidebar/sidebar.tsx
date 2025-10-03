 
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[35vw] sm:min-w-[400px] bg-[#232228] z-50 transform transition-transform duration-300 ease-in-out ${
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
              background: 'linear-gradient(0deg, #9FE779, #9FE779), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
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
           {typeof content === 'string' ? (
             content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-[18px] leading-relaxed text-gray-300">
                    {paragraph}
                </p>
             ))
           ) : (
             content
           )}
        </div>
      </div>
    </>
  );
}