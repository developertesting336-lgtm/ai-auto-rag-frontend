import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Unipile Email Sync & Automation | AutoFlow AI Platform',
  description: 'Connect corporate mailboxes with Unipile, stream inbound email webhooks, and trigger AI auto-replies based on company policies.',
};

export default function UnipileEmailSyncPage() {
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
            <span className="text-zinc-200">Unipile Email Sync</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Unipile Email Sync & AI Auto-Responder
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Connect your corporate email inboxes via Unipile, stream incoming webhook events, evaluate custom AI prompt filtering rules, and send automated policy-grounded replies.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto"
            >
              Open Email Hub →
            </Link>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-indigo-400 font-mono text-xs font-bold uppercase">Universal Sync</div>
            <h3 className="text-sm font-bold text-zinc-100">Any Email Provider</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unipile seamlessly bridges Google Workspace, Microsoft 365, Exchange, Outlook, and standard IMAP/SMTP accounts into a unified JSON webhook pipeline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-emerald-400 font-mono text-xs font-bold uppercase">Dedicated Token</div>
            <h3 className="text-sm font-bold text-zinc-100">Multi-Tenant Routing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Each user receives a unique webhook URL (<code className="text-zinc-300">/api/email/webhook/:token</code>). The system instantly matches millions of incoming emails to the proper account.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-purple-400 font-mono text-xs font-bold uppercase">Rule Engine</div>
            <h3 className="text-sm font-bold text-zinc-100">AI Filtering Prompts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instruct the AI on which emails to ignore (receipts, newsletters, spam) and which to answer using verified policy documents from Pinecone DB.
            </p>
          </div>
        </div>

        {/* Inbound Email Dashboard Feature Highlight */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">
            Developer-Grade Inbound Email Dashboard
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AutoFlow provides a full-featured Email Hub inside your dashboard:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-semibold text-zinc-200">Live Inbound Feed & Search</span>
              <p className="text-xs text-zinc-500">Search incoming emails by sender, email address, subject, or content preview in real time.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-semibold text-zinc-200">Show from Unipile (Live Sync)</span>
              <p className="text-xs text-zinc-500">Opening any email queries Unipile&apos;s live API endpoints, displaying real-time headers, labels, and message body.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-semibold text-zinc-200">Raw Webhook JSON Inspector</span>
              <p className="text-xs text-zinc-500">Inspect the complete PostgreSQL JSONB payload for complete developer auditability and debugging.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-semibold text-zinc-200">1-Click Webhook Simulator</span>
              <p className="text-xs text-zinc-500">Generate realistic test incoming emails immediately without waiting for real customer traffic.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-white">Connect Unipile to AutoFlow Today</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Copy your dedicated webhook endpoint and start automating customer support emails in minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white font-semibold text-xs transition-colors"
            >
              Open Email Automation Dashboard →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
