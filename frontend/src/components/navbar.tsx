import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl"><Link href={"/"}>Home</Link></span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/ide">
                Practise
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
