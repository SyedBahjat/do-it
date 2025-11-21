"use client";

import { Play, Clock, FileText, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-white/60">Ready to transcribe your next session?</p>
        </div>
        <Link href="/session" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all shadow-lg shadow-primary/20">
          <Play className="w-5 h-5 fill-current" />
          <span>Start New Session</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sessions", value: "12", icon: Clock },
          { label: "Hours Transcribed", value: "4.5", icon: FileText },
          { label: "Saved Records", value: "8", icon: FileText },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <stat.icon className="w-6 h-6 text-white/80" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-green-500/20 text-green-400 rounded-lg">
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Sessions</h3>
          <button className="text-sm text-primary hover:text-primary/80">View All</button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="glass glass-hover p-4 rounded-xl flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Weekly Team Sync</h4>
                  <p className="text-sm text-white/40">Today, 10:00 AM • 45 mins</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-white/40" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
