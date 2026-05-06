import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-slate-950/40 backdrop-blur-3xl border border-slate-800/50 rounded-[2rem] px-8 h-20 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter leading-none">
                COLLEGE<span className="text-cyan-400">D</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 leading-none mt-1">
                Elite Platform
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-all">Explorer</Link>
            <Link href="/compare" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-all">Comparison</Link>
            <Link href="/predictor" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-all">Rank Predictor</Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block h-6 w-[1px] bg-slate-800" />
            <button className="btn-premium-primary !py-2.5 !px-6 text-[10px] uppercase tracking-widest font-black">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
