"use client";

import { useState } from "react";
import { College } from "@/lib/types";
import { predictColleges } from "@/lib/api";
import CollegeCard from "@/components/college/CollegeCard";

export default function Predictor() {
  const [exam, setExam] = useState("JEE_MAIN");
  const [rank, setRank] = useState<number | "">("");
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rank === "") return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await predictColleges(exam, Number(rank));
      setResults(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
        <h1 className="text-5xl font-black text-white mb-6">
          College <span className="gradient-text">Predictor</span> Tool
        </h1>
        <p className="text-slate-400 text-lg">
          Enter your entrance exam details and rank to discover colleges where you have a high probability of admission.
        </p>
      </div>

      <div className="max-w-xl mx-auto glass-card p-8 mb-16 animate-fade-in-up stagger-1 border-cyan-500/20">
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Select Entrance Exam</label>
            <select 
              className="select-field"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            >
              <option value="JEE_MAIN">JEE Main</option>
              <option value="JEE_ADVANCED">JEE Advanced</option>
              <option value="WBJEE">WBJEE</option>
              <option value="MHT_CET">MHT-CET</option>
              <option value="BITSAT">BITSAT</option>
              <option value="VITEEE">VITEEE</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Your All India Rank (AIR)</label>
            <input 
              type="number" 
              placeholder="e.g. 5000" 
              className="input-field"
              value={rank}
              onChange={(e) => setRank(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary py-4 text-lg" disabled={loading}>
            {loading ? "Calculating..." : "Predict Colleges →"}
          </button>
        </form>
      </div>

      {searched && (
        <div className="animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {results.length > 0 
                ? `Top Predictions for Rank ${rank}` 
                : "No Exact Matches Found"}
            </h2>
            <span className="px-4 py-1 bg-slate-800 rounded-full text-slate-400 text-sm border border-slate-700">
              {results.length} colleges found
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          ) : !loading && (
            <div className="text-center py-20 glass-card">
              <div className="text-6xl mb-6">📉</div>
              <h3 className="text-xl font-bold text-white mb-2">Keep your options open</h3>
              <p className="text-slate-400">Try searching for a different exam or adjusting your rank range.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
