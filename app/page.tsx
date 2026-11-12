import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Minimalist vector stroke icons (No emojis)
function IconDocument({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function IconMailWebhook({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconCpu({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  );
}

function IconShieldCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconCheck({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            HERO SECTION (LINEAR / VERCEL STYLE)
        ========================================================================= */}
        <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden border-b border-zinc-900">
          {/* Subtle Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-zinc-700/10 via-zinc-800/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 mb-8 hover:border-zinc-700 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>AutoFlow v2.0 Platform is live</span>
              <span className="text-zinc-600">→</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              Autonomous AI Workflows for Modern Teams
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Connect corporate email pipelines with Unipile, vectorize policy documents directly into Pinecone DB, and orchestrate intelligent AI agents from a developer-grade console.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs tracking-tight transition-colors shadow-xs text-center"
              >
                Start Free Trial
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white font-medium text-xs tracking-tight transition-colors text-center"
              >
                Open Dashboard
              </Link>
            </div>

            {/* Interactive SaaS Window Preview Mockup */}
            <div className="mt-16 max-w-4xl mx-auto rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-950 p-5 sm:p-7 text-left space-y-6">
                {/* Console header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 text-xs font-mono text-zinc-400">workspace.telemetry.console</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    All Systems Operational
                  </span>
                </div>

                {/* 3 Telemetry Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="text-[10px] uppercase text-zinc-500 tracking-wider">Company Knowledge</div>
                    <div className="font-semibold text-zinc-200">Policy Vector Store</div>
                    <div className="text-[11px] text-zinc-500">PDF to Pinecone DB index</div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="text-[10px] uppercase text-zinc-500 tracking-wider">Email Integration</div>
                    <div className="font-semibold text-zinc-200">Unipile Webhooks</div>
                    <div className="text-[11px] text-zinc-500">Inbound / Outbound Sync</div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="text-[10px] uppercase text-zinc-500 tracking-wider">AI Inference</div>
                    <div className="font-semibold text-zinc-200">Gemini 2.0 Flash</div>
                    <div className="text-[11px] text-zinc-500">Sub-200ms latency</div>
                  </div>
                </div>

                {/* Live Pipeline Event Stream */}
                <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/60 font-mono text-xs space-y-2">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    Real-time Workflow Execution Log
                  </div>
                  <div className="text-zinc-400 leading-relaxed text-[11px] space-y-1">
                    <p className="text-zinc-500">
                      <span className="text-emerald-400">[webhook]</span> POST /api/email/webhook → 200 OK
                    </p>
                    <p className="text-zinc-400">
                      <span className="text-indigo-400">[vector-search]</span> Querying Pinecone index &quot;company-policies&quot; for context match...
                    </p>
                    <p className="text-zinc-300">
                      <span className="text-purple-400">[agent-response]</span> Prompt synthesized with Google Gemini 2.0 Flash (138 tokens)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PLATFORM CAPABILITIES (BENTO GRID - DEVELOPER-GRADE)
        ========================================================================= */}
        <section id="features" className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Architecture & Capabilities
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
              Built for high reliability, security, and low latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <IconDocument className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Pinecone Vector Knowledge Base
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Upload organizational policies and corporate guidelines in PDF format. Documents are vectorized into Pinecone DB to provide grounded, hallucination-free AI responses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <IconMailWebhook className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Unipile Email Synchronization
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seamlessly configure your Unipile API Key and receive real-time incoming corporate email events via a dedicated webhook endpoint.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <IconCpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Multi-Model Inference Console
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Test and deploy prompts across Gemini 2.0 Flash, Gemini 1.5 Pro, and OpenAI GPT-4o models directly from your integrated playground.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HOW IT WORKS PIPELINE
        ========================================================================= */}
        <section id="architecture" className="py-20 bg-zinc-900/30 border-y border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                Execution Flow
              </h2>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
                From document upload to autonomous execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-semibold text-zinc-500">01 / Profile</div>
                <h4 className="text-xs font-semibold text-zinc-200">Register Organization</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Establish your company workspace and generate secure API keys for integrations.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-semibold text-zinc-500">02 / Knowledge</div>
                <h4 className="text-xs font-semibold text-zinc-200">Vectorize Policies</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Upload corporate PDF documents to create dense vector embeddings in Pinecone DB.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-semibold text-zinc-500">03 / Automate</div>
                <h4 className="text-xs font-semibold text-zinc-200">Stream Webhooks</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Connect Unipile webhooks to trigger AI context retrieval and generate replies on autopilot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRICING TIERS
        ========================================================================= */}
        <section id="pricing" className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Subscription Plans
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
              Transparent, scalable pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Starter</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">For evaluating capabilities</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-zinc-100">$0</span>
                  <span className="text-xs font-mono text-zinc-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>1 Company Profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Up to 5 PDF Policy Uploads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Standard Gemini 2.0 Inference</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full py-2 rounded-md border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-center text-xs font-medium text-zinc-200 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier (Highlighted) */}
            <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-700 flex flex-col justify-between space-y-6 relative shadow-xl">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-100 text-zinc-950 font-semibold">
                Recommended
              </span>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">Professional</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">For growing businesses</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-white">$29</span>
                  <span className="text-xs font-mono text-zinc-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unlimited PDF Policy Documents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Unipile Webhook Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Multi-Key API Vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gemini + OpenAI Models</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full py-2 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-center text-xs font-semibold transition-colors"
              >
                Start 14-Day Pro Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Enterprise</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Dedicated SLA & volume</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-zinc-100">$99</span>
                  <span className="text-xs font-mono text-zinc-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Custom Dedicated Pinecone Index</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Dedicated Inbound Webhook Cluster</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>99.9% Uptime SLA</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full py-2 rounded-md border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-center text-xs font-medium text-zinc-200 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
