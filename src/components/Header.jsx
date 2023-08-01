export default function Header({ children }) {
  return (
    <header className="sticky top-0 right-0 bg-slate-500 h-24 flex justify-center items-center gap-24 w-screen">
      {children}
    </header>
  );
}
