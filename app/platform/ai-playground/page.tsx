import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'AI Model Playground | AutoFlow Developer Console',
  description: 'Interactive LLM prompt playground with latency benchmarking, token counter, and multi-model fallbacks.',
};

export default function AiPlaygroundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Platform</span>
            <span>/</span>
            <span className="text-zinc-200">AI Playground</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Developer AI Model Playground
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Test LLM inference with Google Gemini and OpenAI models. Measure latency, token consumption, and inspect raw output in real time.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto"
            >
              Open Live Playground →
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-emerald-400 font-mono text-xs font-bold uppercase">Sub-200ms Latency</div>
            <h3 className="text-sm font-bold text-zinc-100">Gemini 3.8 & Flash Lite</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ultra-fast generation speeds suitable for real-time customer chatbots, classification pipelines, and inline autocompletions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-indigo-400 font-mono text-xs font-bold uppercase">Bring Your Own Key</div>
            <h3 className="text-sm font-bold text-zinc-100">BYOK Architecture</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Use your own Gemini or OpenAI API keys stored safely in your database, giving you complete control over token budgets and rate limits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-purple-400 font-mono text-xs font-bold uppercase">Telemetry</div>
            <h3 className="text-sm font-bold text-zinc-100">Instant Metrics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every inference request reports duration in milliseconds and token counts, helping you optimize prompt engineering and costs.
            </p>
          </div>
        </div>

        {/* Playground Preview Graphic / Terminal Mockup */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2">playground-console.ts</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">gemini-3.8-flash • 142ms</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
              <div className="text-zinc-500">// System Prompt</div>
              <div className="text-zinc-400">Extract policy refund constraints from the text and summarize into 3 bullet points:</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300 space-y-2">
              <div className="text-zinc-500">// Model Response (78 tokens)</div>
              <div>• Full refund if cancelled within 30 days</div>
              <div>• 50% prorated credit between 31-60 days</div>
              <div>• Non-refundable after 60 days of deployment</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-white">Try the Playground Live</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Test custom system prompts, compare models, and benchmark responses in your dashboard.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white font-semibold text-xs transition-colors"
            >
              Open AI Playground in Dashboard →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
