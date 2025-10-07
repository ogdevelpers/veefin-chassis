
const MyModal = ({ isOpen, onClose, title='Veefin', hideTitle = false, children }: { isOpen: boolean; onClose: () => void; title?: string; hideTitle?: boolean; children: React.ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 backdrop-blur-lg">
      <div className="relative w-full mt-40 max-w-[75vw] p-6 mx-auto rounded-lg shadow-lg bg-[#111] dark:bg-[#111] overflow-y-auto">
        {/* Close Button
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-3 right-3 hover:text-white"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        {/* Close Button */}
        <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110 flex-shrink-0 absolute text-white-700 top-3 right-3 hover:text-white"
            style={{ backgroundColor: '#27A689' }}
            aria-label="Close sidebar"
          >
            X
          </button>

        {/* Heading */}
        {!hideTitle && (
          <h2
            className="text-2xl font-bold mb-4 color-[#27A689]"
            style={{
              background: "linear-gradient(0deg, #27A689, #27A689), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
        )}
        
        {/* Modal Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyModal;