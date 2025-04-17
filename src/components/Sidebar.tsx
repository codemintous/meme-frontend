import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Info, Plus, Rocket, Search, TrendingUp, Trophy, User, UserPlus, UsersRound, } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed w-[280px] h-screen bg-black  text-white p-4 flex flex-col border-r border-white/20">
      {/* Logo Section */}
      <div className='flex flex-row justify-between items-center mb-8'>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
          <h1 className="text-xl font-bold">MYMEMES</h1>
        </div>
        <ChevronLeft/>
      </div>


      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">

              <Search className='h-5 w-5' />
              Explore
            </Link>
          </li>
          <li>
            <Link href="/trending" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">
              <TrendingUp className='h-5 w-5' />
              Trending
            </Link>
          </li>
          <li>
            <Link href="/my-memes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">
              <UsersRound className='h-5 w-5' />
              My Memes
            </Link>
          </li>
          <li>
            <Link href="/launchpad" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">
              <Rocket className='h-5 w-5' />
              Launchpad
            </Link>
          </li>
          <li>
            <Link href="/rankings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">
              <Trophy className='h-5 w-5' />
              Rankings
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10">
              <Info className='h-5 w-5' />
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-4">
        <button className="flex gap-2 items-center justify-center w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700">
          <Plus className='h-5 w-5' /> Create Meme
        </button>
        <div className="flex gap-2">
          <button className="flex gap-2 items-center bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700">
            <User className='h-5 w-5' />
            Login
          </button>
          <button className="flex gap-2 items-center bg-black text-white border border-white/20 rounded-lg py-2 px-4 hover:bg-white/10">
            <UserPlus className='h-5 w-5' />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 