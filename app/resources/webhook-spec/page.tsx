import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Webhook Inbound Spec | AutoFlow v2.0 Developer Documentation',
  description: 'Technical specifications, event schema, and high-scale multi-tenant routing for Unipile inbound email webhooks.',
};

export default function WebhookSpecPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Resources</span>
            <span>/</span>
            <span className="text-zinc-200">Webhook Inbound Spec</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Unipile Inbound Webhook Specification
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Technical protocol for real-time email ingestion, high-scale multi-tenant account resolution, and automated AI policy replies.
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/80 px-3 py-1.5 rounded-full shrink-0">
              Protocol: HTTPS POST • JSON
            </span>
          </div>
        </div>

        {/* Multi-Tenant Identification Architecture */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">
            High-Scale Multi-Tenant Identification Strategy
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            When scaling to millions of connected inboxes, payload inspection alone can create bottlenecks. AutoFlow implements a dual-tier identity resolution strategy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Primary: Dedicated URL Token (O(1))</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Endpoint: /api/email/webhook/:token
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Every user is assigned a cryptographically unique 128-bit webhook token (<code className="text-zinc-300">whk_...</code>). When Unipile posts to this URL, our database index resolves the tenant in sub-millisecond O(1) time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Secondary: Account ID Fallback</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Endpoint: /api/email/webhook
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                If the generic webhook URL is used, AutoFlow inspects the payload&apos;s <code className="text-zinc-300">account_id</code> parameter and matches it against indexed integration records in PostgreSQL.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Events */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-zinc-100">Supported Unipile Webhook Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                mail_received
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fired when an incoming email lands in the connected mailbox (Google Workspace, Outlook, IMAP). Triggers storage and AI reply evaluation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
                message_received
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generic messaging event dispatched for multi-channel communication streams (LinkedIn InMail, WhatsApp).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                email_sent
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Acknowledges outbound responses sent by human agents or automated AI pipelines, updating the thread status in PostgreSQL.
              </p>
            </div>
          </div>
        </div>

        {/* Database Persistence Fields */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">
            Database Storage Schema (inbound_emails table)
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every webhook dispatch is parsed and committed to PostgreSQL with the following structured columns:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">id</td>
                  <td className="py-2.5 px-3 text-zinc-500">UUID</td>
                  <td className="py-2.5 px-3">Primary key generated by PostgreSQL (gen_random_uuid())</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">message_id</td>
                  <td className="py-2.5 px-3 text-zinc-500">VARCHAR(255)</td>
                  <td className="py-2.5 px-3">Unique Unipile message ID used for live API queries</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">from_name / from_email</td>
                  <td className="py-2.5 px-3 text-zinc-500">VARCHAR(255)</td>
                  <td className="py-2.5 px-3">Sender name and verified email address</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">subject</td>
                  <td className="py-2.5 px-3 text-zinc-500">TEXT</td>
                  <td className="py-2.5 px-3">Email subject line</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">snippet</td>
                  <td className="py-2.5 px-3 text-zinc-500">TEXT</td>
                  <td className="py-2.5 px-3">Clean plain-text preview snippet without HTML tags</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">body</td>
                  <td className="py-2.5 px-3 text-zinc-500">TEXT</td>
                  <td className="py-2.5 px-3">Complete email body text</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">raw_payload</td>
                  <td className="py-2.5 px-3 text-zinc-500">JSONB</td>
                  <td className="py-2.5 px-3">Full raw webhook event payload for developer auditability</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-indigo-400 font-semibold">reply_status</td>
                  <td className="py-2.5 px-3 text-zinc-500">VARCHAR(50)</td>
                  <td className="py-2.5 px-3">Status: &apos;received&apos;, &apos;auto_replied&apos;, or &apos;ignored&apos;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Simulator Link */}
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Want to test the webhook pipeline?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Use the 1-click Inbound Webhook Simulator in your dashboard to generate test payloads.</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0"
          >
            Open Email Dashboard →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
