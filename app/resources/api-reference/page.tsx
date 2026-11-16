import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'API Reference | AutoFlow v2.0 Developer Documentation',
  description: 'Complete REST API documentation for AutoFlow AI, chatbot embedding, email webhooks, and vector knowledge base.',
};

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Resources</span>
            <span>/</span>
            <span className="text-zinc-200">API Reference</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                AutoFlow REST API Reference
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Interact programmatically with your company chatbots, ingest email webhook payloads, and query vector-indexed knowledge bases.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>API Version: v2.0 (REST)</span>
            </div>
          </div>
        </div>

        {/* Base URL & Authentication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Base Server URL</span>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300 select-all">
              https://ai-auto-rag-backend.vercel.app
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              All requests should be sent over HTTPS. Standard JSON request and response bodies are used throughout.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Authentication Headers</span>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div><span className="text-zinc-500">Bearer Token:</span> Authorization: Bearer &lt;jwt_token&gt;</div>
              <div><span className="text-zinc-500">Chatbot Client Key:</span> x-api-key: af_live_...</div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Client API keys are scoped to your company vector space and can be generated from the dashboard.
            </p>
          </div>
        </div>

        {/* Section 1: Chatbot Query API */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-800/80">
                POST
              </span>
              <span className="font-mono text-sm text-zinc-100 font-semibold">
                /api/chatbot/query
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">Public • Scoped via x-api-key</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Sends a user query to the company AI assistant. The backend vectorizes the question with Google Gemini embeddings, runs cosine similarity search in Pinecone DB against your uploaded policy documents, and formulates a grounded answer.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400">Request Example (cURL)</span>
              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`curl -X POST https://ai-auto-rag-backend.vercel.app/api/chatbot/query \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: af_live_9f81a7b..." \\
  -d '{
    "message": "What is your refund and cancellation policy?",
    "history": []
  }'`}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400">Response Example (200 OK)</span>
              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
{`{
  "success": true,
  "reply": "According to Section 4.2 of the Enterprise Service Agreement, cancellations requested within 30 days are entitled to a full prorated refund.",
  "sources": [
    {
      "title": "Enterprise Terms & Refund Policy.pdf",
      "score": 0.941
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Section 2: Inbound Webhook API */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-400 font-mono text-xs font-bold border border-indigo-800/80">
                POST
              </span>
              <span className="font-mono text-sm text-zinc-100 font-semibold">
                /api/email/webhook/:token
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">Unipile Dispatcher • Multi-Tenant</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Receives incoming email notifications dispatched from Unipile. Automatically resolves account identity via token in O(1) time, logs sender, preview, and full body to PostgreSQL, and invokes AI auto-responder rules.
          </p>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Expected Unipile Payload Schema</span>
            <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`{
  "event": "mail_received",
  "account_id": "acc_01j7h892...",
  "data": {
    "id": "msg_01k99281...",
    "from": { "name": "Sarah Connor", "email": "sarah@cyberdyne.com" },
    "to": [{ "email": "support@yourdomain.com" }],
    "subject": "Inquiry regarding SOC 2 compliance reports",
    "snippet": "Hello, Could you provide your latest SOC 2 Type II audit report?",
    "body": "Hello Team,\\n\\nCould you please share your latest security audit?\\n\\nBest,\\nSarah"
  }
}`}
            </pre>
          </div>
        </div>

        {/* Section 3: Embed Script 1-Liner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-100">
              Client Website Chatbot Widget (Embed)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              1-Line HTML
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Embed the responsive floating chatbot bubble onto any external HTML website, WordPress, Webflow, Shopify, or React application:
          </p>
          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto select-all">
{`<script src="https://ai-auto-rag-backend.vercel.app/embed/chatbot.js" data-api-key="YOUR_CHATBOT_API_KEY"></script>`}
          </pre>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-white">Ready to test in the interactive dashboard?</h2>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto">
            Log in to your AutoFlow dashboard to generate client API keys, configure custom AI auto-responder prompts, and monitor live inbound emails.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white font-semibold text-xs transition-colors"
            >
              Open Developer Dashboard →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
