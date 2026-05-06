"use client";

import { useState, useEffect } from "react";
import { College, CollegesResponse } from "@/lib/types";
import { getColleges } from "@/lib/api";
import CollegeCard from "@/components/college/CollegeCard";

export default function Home() {
  const [data, setData] = useState<CollegesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const result = await getColleges({
          name: search,
          location: location,
          maxFees: maxFees === "" ? undefined : Number(maxFees),
          page,
          limit: 12,
        });
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load colleges");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchColleges, 500);
    return () => clearTimeout(timer);
  }, [search, location, maxFees, page]);

  const handleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Dynamic Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Elite College Explorer
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            YOUR FUTURE, <br />
            <span className="gradient-text text-glow">REIMAGINED.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Discover India's top-tier engineering institutions. Analyze placement trends, compare fees, and secure your academic legacy.
          </p>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="premium-card p-4 md:p-6 mb-16 flex flex-col md:flex-row gap-4 items-center animate-fade-in-up stagger-1 border-slate-700/50 shadow-2xl">
          <div className="flex-grow relative w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by college name, location, or state..." 
              className="input-field pl-12 h-14 !bg-slate-900/80 !rounded-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select 
              className="select-field h-14 !bg-slate-900/80 !rounded-2xl"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
          <div className="w-full md:w-64">
            <select 
              className="select-field h-14 !bg-slate-900/80 !rounded-2xl"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value === "" ? "" : Number(e.target.value))}
            >
              <option value="">Unlimited Fees</option>
              <option value="100000">Under 1 Lakh</option>
              <option value="200000">Under 2 Lakhs</option>
              <option value="300000">Under 3 Lakhs</option>
              <option value="500000">Under 5 Lakhs</option>
            </select>
          </div>
        </div>

        {/* Comparison Floating Bar */}
        {compareIds.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 premium-card px-8 py-5 flex items-center gap-10 border-cyan-500 shadow-[0_20px_50px_rgba(34,211,238,0.3)] animate-float">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-white uppercase tracking-widest">Compare Stack:</span>
              <div className="flex -space-x-3">
                {compareIds.map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-slate-950 flex items-center justify-center text-xs font-black text-white shadow-xl">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <a 
              href={`/compare?ids=${compareIds.join(",")}`}
              className="btn-premium-primary text-xs tracking-widest uppercase py-3 px-8"
            >
              Start Comparison
            </a>
          </div>
        )}

        {/* College Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[450px] bg-slate-800/10 rounded-3xl animate-pulse border border-slate-800/50" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 premium-card max-w-lg mx-auto">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-400 font-black uppercase text-sm mb-4 tracking-widest">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-premium">Retry Connection</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in-up stagger-2">
              {data?.data.map((college) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  onCompare={handleCompare}
                  isCompared={compareIds.includes(college.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-6">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-premium !py-3 !px-8 disabled:opacity-20"
                >
                  ← Prev
                </button>
                <div className="text-slate-500 font-black text-xs uppercase tracking-widest">
                  {page} / {data.pagination.totalPages}
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page === data.pagination.totalPages}
                  className="btn-premium !py-3 !px-8 disabled:opacity-20"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
