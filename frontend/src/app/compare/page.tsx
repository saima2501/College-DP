"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { College } from "@/lib/types";
import { compareColleges } from "@/lib/api";

export default function Compare() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",");
    if (!ids || ids.length < 2) {
      setError("Please select at least 2 colleges to compare.");
      setLoading(false);
      return;
    }

    const fetchComparison = async () => {
      try {
        const data = await compareColleges(ids);
        setColleges(data);
      } catch (err: any) {
        setError(err.message || "Failed to load comparison data");
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, [searchParams]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
      Loading comparison table...
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
      <p className="text-slate-400 mb-8">{error}</p>
      <a href="/" className="btn-primary">Back to Explorer</a>
    </div>
  );

  const metrics = [
    { label: "Rating", key: "rating" as keyof College, prefix: "★ " },
    { label: "Annual Fees", key: "fees" as keyof College, prefix: "₹", format: (v: number) => v.toLocaleString() },
    { label: "Avg Package", key: "avgPackage" as keyof College, suffix: " LPA" },
    { label: "Placements", key: "placementPercentage" as keyof College, suffix: "%" },
    { label: "Exam Type", key: "examType" as keyof College },
    { label: "Cutoff Rank", key: "examCutoffRank" as keyof College, prefix: "AIR " },
    { label: "Location", key: "location" as keyof College },
    { label: "Type", key: "type" as keyof College },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-white mb-12 animate-fade-in-up">
        College <span className="text-cyan-400">Comparison</span>
      </h1>

      <div className="overflow-x-auto animate-fade-in-up stagger-1">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-6 text-left bg-slate-900/50 border-b border-slate-800 w-64">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Metric</span>
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="p-6 text-center bg-slate-900/50 border-b border-slate-800 min-w-[280px]">
                  <h3 className="text-lg font-bold text-white mb-2">{college.name}</h3>
                  <p className="text-xs text-slate-400">{college.location}, {college.state}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {metrics.map((metric) => (
              <tr key={metric.label} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-6 font-bold text-slate-400 text-sm">{metric.label}</td>
                {colleges.map((college) => (
                  <td key={college.id} className="p-6 text-center">
                    <span className={`text-lg font-semibold ${metric.key === 'rating' ? 'text-yellow-400' : 'text-slate-200'}`}>
                      {metric.prefix}{metric.format ? metric.format(college[metric.key] as number) : college[metric.key]}{metric.suffix}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-6 font-bold text-slate-400 text-sm">Courses</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {college.courses.slice(0, 3).map((course, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 bg-slate-800 rounded-md text-slate-400 border border-slate-700">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-slate-800 rounded-md text-slate-400">+{college.courses.length - 3} more</span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6"></td>
              {colleges.map((college) => (
                <td key={college.id} className="p-6 text-center">
                  <a href={`/college/${college.id}`} className="btn-secondary text-xs px-4 py-2">View Full Details</a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
