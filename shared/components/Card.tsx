export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      bg-white/70 backdrop-blur-lg 
      border border-gray-200 
      rounded-2xl p-4 
      shadow-md hover:shadow-xl 
      transition-all
    ">
      {children}
    </div>
  );
}