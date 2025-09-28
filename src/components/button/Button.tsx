 
export default function Button({ children, handleClick }: { handleClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={handleClick} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
      {children}
    </button>
  );
}