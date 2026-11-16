import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Security & Privacy | AutoFlow AI Enterprise Protection',
  description: 'Enterprise-grade security architecture, zero-training data commitment, and end-to-end encryption standards.',
};

export default function SecurityPrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Organization</span>
            <span>/</span>
            <span className="text-zinc-200">Security & Privacy</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Enterprise Security & Data Privacy
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Our architectural commitment to protecting corporate intellectual property, employee communications, and vector knowledge bases.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-full shrink-0">
              AES-256 • TLS 1.3 Enforced
            </span>
          </div>
        </div>

        {/* 6 Key Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Zero-Training Data Commitment</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your company documents, uploaded PDF policies, and inbound customer emails are strictly never used to train public or foundational AI models. Inference occurs purely in-memory.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Multi-Tenant Vector Partitioning</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every organization operates within an isolated Pinecone vector namespace (<code className="text-zinc-300">company_&#123;id&#125;</code>). Semantic searches cannot access, cross-reference, or leak data across distinct companies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>End-to-End Encryption</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All communications with the AutoFlow API and website chatbot scripts require modern TLS 1.3. Stored database records and Cloudflare R2 binary files are encrypted at rest with AES-256.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>PCI-DSS Level 1 via Stripe</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Payment credentials, credit card numbers, and billing details are processed exclusively through Stripe&apos;s certified PCI-DSS Level 1 infrastructure. AutoFlow never stores raw payment card data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Granular Scoped API Keys</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Website chatbot keys (<code className="text-zinc-300">af_live_...</code>) only possess query permissions for their designated company policy vectors. They have zero administrative or destructive permissions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Bcrypt Password Security & JWT</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              User credentials are salted and hashed using bcrypt with adaptive cost factors. User sessions utilize stateless cryptographically signed JWT tokens with strict expiry controls.
            </p>
          </div>
        </div>

        {/* Contact Security Team */}
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Have a security question or need a vendor assessment?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Our security team responds to security questionnaires and audit inquiries within 24 hours.</p>
          </div>
          <Link
            href="/support"
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0"
          >
            Contact Security Team →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
