import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white p-2 shadow-md">
      <div className="container mx-auto flex w-full items-center justify-between">
        <Link href="/" className="font-black text-slate-600">
          LOGO
        </Link>
        <div className="flex items-center gap-x-4">
          <Link href="/" className="text-lg font-semibold text-slate-600">
            Home
          </Link>
          <Link href="/users" className="text-lg font-semibold text-slate-600">
            Users
          </Link>
          <Link href="/register" className="text-lg font-semibold text-slate-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
