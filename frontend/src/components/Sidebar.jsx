export default function Sidebar({ children }) {
  return (
    <div className="p-2 py-14 w-64 h-full bg-gray-100 flex flex-col justify-between fixed">
      {children}
    </div>
  );
}
