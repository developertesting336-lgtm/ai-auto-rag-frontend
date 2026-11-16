'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white text-zinc-950 flex items-center justify-center font-bold text-xs tracking-tighter">
                AF
              </div>
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                AutoFlow
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                v2.0
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Enterprise AI workflow automation platform. Vectorize company policies, stream email webhooks, and orchestrate autonomous AI agents.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[11px] font-mono font-medium text-zinc-200 uppercase tracking-widest mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/platform/vector-knowledge-base" className="hover:text-zinc-200 transition-colors">Vector Knowledge Base</Link></li>
              <li><Link href="/platform/unipile-email-sync" className="hover:text-zinc-200 transition-colors">Unipile Email Sync</Link></li>
              <li><Link href="/platform/ai-playground" className="hover:text-zinc-200 transition-colors">AI Playground</Link></li>
              <li><Link href="/dashboard" className="hover:text-zinc-200 transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[11px] font-mono font-medium text-zinc-200 uppercase tracking-widest mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/resources/api-reference" className="hover:text-zinc-200 transition-colors">API Reference</Link></li>
              <li><Link href="/resources/webhook-spec" className="hover:text-zinc-200 transition-colors">Webhook Inbound Spec</Link></li>
              <li><Link href="/resources/pinecone-indexing" className="hover:text-zinc-200 transition-colors">Pinecone Vector Indexing</Link></li>
              <li><Link href="/status" className="hover:text-zinc-200 transition-colors">System Status</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[11px] font-mono font-medium text-zinc-200 uppercase tracking-widest mb-3">
              Organization
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/security" className="hover:text-zinc-200 transition-colors">Security & Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-200 transition-colors">Terms of Service</Link></li>
              <li><Link href="/compliance" className="hover:text-zinc-200 transition-colors">Compliance</Link></li>
              <li><Link href="/support" className="hover:text-zinc-200 transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-mono">
          <p>© {year} AutoFlow AI Platforms Inc. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/status" className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems operational</span>
            </Link>
            <span>•</span>
            <span>Enterprise Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
