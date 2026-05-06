"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { College } from "@/lib/types";
import { getCollegeById } from "@/lib/api";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await getCollegeById(id as string);
        setCollege(data);
      } catch (err: any) {
        setError(err.message || "Failed to load college details");
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
      <div className="h-64 bg-slate-800 rounded-3xl mb-8" />
      <div className="h-12 w-1/3 bg-slate-800 rounded mb-4" />
      <div className="h-6 w-full bg-slate-800 rounded mb-2" />
      <div className="h-6 w-full bg-slate-800 rounded" />
    </div>
  );

  if (error || !college) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
      <p className="text-slate-400">{error || "College not found"}</p>
      <a href="/" className="mt-8 inline-block btn-primary">Back to Home</a>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div 
        className="relative h-80 rounded-3xl overflow-hidden mb-12 border border-slate-700 shadow-2xl animate-fade-in-up bg-cover bg-center"
        style={{ backgroundImage: `url(${college.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585'})`, backgroundColor: '#0f172a' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">{college.type}</span>
                <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-md text-yellow-400 text-xs font-bold rounded-full border border-slate-700">★ {college.rating} Rating</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{college.name}</h1>
              <p className="text-slate-300 text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {college.location}, {college.state}
              </p>
            </div>
            <div className="flex gap-4">
              <a 
                href={college.admissionUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center"
              >
                Apply Now
              </a>
              <button className="btn-secondary">Download Brochure</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in-up stagger-1">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 italic text-sm">i</span>
              Overview
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {college.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 text-sm">📚</span>
              Courses Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.courses.map((course, index) => (
                <div key={index} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl">🎓</div>
                  <span className="font-medium text-slate-200">{course}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar - Stats */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-6">Key Statistics</h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Placement Percentage</p>
                <div className="flex items-center gap-4">
                  <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${college.placementPercentage}%` }} />
                  </div>
                  <span className="text-lg font-black text-cyan-400">{college.placementPercentage}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Avg Package</p>
                  <p className="text-xl font-black text-white">{college.avgPackage} LPA</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Annual Fees</p>
                  <p className="text-xl font-black text-white">₹{Math.round(college.fees/1000)}K</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <p className="text-[10px] text-indigo-400 uppercase font-black mb-1">Admission Cutoff ({college.examType})</p>
                <p className="text-xl font-black text-white">AIR {college.examCutoffRank}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">📧</span>
                admissions@{college.name.toLowerCase().replace(/ /g, "")}.edu
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">🌐</span>
                www.{college.name.toLowerCase().replace(/ /g, "")}.edu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
