import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Compliance & Regulatory Standards | AutoFlow AI',
  description: 'GDPR, CCPA, and SOC 2 compliance certifications, data residency policies, and data processing addendums.',
};

export default function CompliancePage() {
  const frameworks = [
    {
      title: 'GDPR (General Data Protection Regulation)',
      badge: 'EU Standard',
      description: 'Full compliance with European Union privacy laws. Supports Right to Access, Right to Rectification, and complete Right to Erasure (deleting policies removes all R2 binaries and Pinecone vectors).',
    },
    {
      title: 'CCPA / CPRA',
      badge: 'California Privacy',
      description: 'Strict adherence to California Consumer Privacy Act regulations. AutoFlow does not sell personal information or customer email contents to third parties.',
    },
    {
      title: 'SOC 2 Type II Controls',
      badge: 'Security & Availability',
      description: 'Continuous automated compliance tracking covering Security, Confidentiality, and Availability trust service criteria across cloud infrastructure.',
    },
    {
      title: 'Data Processing Addendum (DPA)',
      badge: 'Contractual Standard',
      description: 'Pre-signed enterprise DPA incorporating European Commission Standard Contractual Clauses (SCCs) available for all paid subscription tiers.',
    },
  ];

  const subprocessors = [
    { name: 'Aiven Cloud', purpose: 'Managed PostgreSQL database hosting', location: 'European Union / US' },
    { name: 'Pinecone Systems', purpose: 'Serverless vector database indexing', location: 'United States' },
    { name: 'Cloudflare Inc. (R2)', purpose: 'Encrypted binary PDF document storage', location: 'Global Edge' },
    { name: 'Google Cloud Platform', purpose: 'Gemini embedding & Flash inference APIs', location: 'Global' },
    { name: 'Stripe, Inc.', purpose: 'Payment processing & recurring billing', location: 'United States' },
  ];

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
            <span className="text-zinc-200">Compliance</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Compliance & Regulatory Standards
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Adhering to international data protection mandates and industry-recognized trust principles.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-full shrink-0">
              GDPR • CCPA Ready
            </span>
          </div>
        </div>

        {/* Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworks.map((fw, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-100">{fw.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {fw.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{fw.description}</p>
            </div>
          ))}
        </div>

        {/* Subprocessor Transparency List */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">
            Authorized Cloud Subprocessors
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AutoFlow engages industry-leading, enterprise-grade cloud service providers to maintain platform availability:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Subprocessor</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Data Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {subprocessors.map((sub, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 font-semibold text-zinc-200">{sub.name}</td>
                    <td className="py-2.5 px-3 text-zinc-400">{sub.purpose}</td>
                    <td className="py-2.5 px-3 text-zinc-500">{sub.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request DPA */}
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Need a signed Data Processing Addendum (DPA)?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">We execute standard SCC-compliant DPAs for enterprise and European clients.</p>
          </div>
          <Link
            href="/support"
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0"
          >
            Request DPA Document →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
