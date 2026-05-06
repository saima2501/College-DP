import React from "react";
import Link from "next/link";
import { College } from "@/lib/types";

interface CollegeCardProps {
  college: College;
  onCompare?: (id: string) => void;
  isCompared?: boolean;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, onCompare, isCompared }) => {
  const imageUrl = college.imageUrl || `https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop`; 

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = "none";
    if (target.parentElement) {
      target.parentElement.style.background = "linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0e7490 100%)";
    }
  };

  return (
    <div className="premium-card group flex flex-col h-full animate-fade-in-up">
      {/* Top Image Section */}
      <div className="relative h-56 w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0e7490 100%)" }}>
        <img 
          src={imageUrl} 
          alt={college.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="glass-tag !bg-cyan-500/20 !border-cyan-500/30 !text-cyan-400 font-black">
            {college.type}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700 flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-white font-bold text-xs">{college.rating}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white leading-tight line-clamp-2 text-glow">
            {college.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-slate-950/40">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-6">
          <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {college.location}, {college.state}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="stat-box">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Avg Package</span>
            <span className="text-lg font-black text-white">{college.avgPackage} <span className="text-xs text-slate-500 font-normal">LPA</span></span>
          </div>
          <div className="stat-box">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Annual Fees</span>
            <span className="text-lg font-black text-white">₹{Math.round(college.fees / 1000)}k</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <Link 
              href={`/college/${college.id}`}
              className="flex-[2] btn-premium py-2.5 text-[10px] tracking-widest uppercase font-black"
            >
              Details
            </Link>
            <button
              onClick={() => onCompare?.(college.id)}
              className={`flex-1 py-2.5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                isCompared 
                  ? "bg-cyan-500 border-cyan-500 text-white" 
                  : "bg-transparent border-slate-800 text-slate-500 hover:border-cyan-500 hover:text-cyan-400"
              }`}
            >
              {isCompared ? "Added" : "Compare"}
            </button>
          </div>
          <a 
            href={college.admissionUrl || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full btn-premium-primary !py-2.5 text-[10px] tracking-widest uppercase font-black text-center block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
