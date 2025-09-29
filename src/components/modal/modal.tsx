
const MyModal = ({ isOpen, onClose, title='Veefin', children }: { isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 mx-auto rounded-lg shadow-lg bg-[#111] dark:bg-[#111] overflow-y-auto">
        {/* Close Button */}
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
        </button>

        {/* Heading */}
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            background: "linear-gradient(0deg, #9FE779, #9FE779), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h2>
        
        {/* Modal Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyModal;