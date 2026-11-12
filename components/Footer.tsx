import Link from 'next/link';

export default function Footer() {
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
              <li><Link href="/#features" className="hover:text-zinc-200 transition-colors">Vector Knowledge Base</Link></li>
              <li><Link href="/#features" className="hover:text-zinc-200 transition-colors">Unipile Email Sync</Link></li>
              <li><Link href="/#features" className="hover:text-zinc-200 transition-colors">AI Playground</Link></li>
              <li><Link href="/dashboard" className="hover:text-zinc-200 transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[11px] font-mono font-medium text-zinc-200 uppercase tracking-widest mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-200 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Webhook Inbound Spec</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Pinecone Vector Indexing</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[11px] font-mono font-medium text-zinc-200 uppercase tracking-widest mb-3">
              Organization
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Security & Privacy</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-mono">
          <p>© {new Date().getFullYear()} AutoFlow AI Platforms Inc. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All systems operational</span>
            </span>
            <span>•</span>
            <span>Enterprise Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
