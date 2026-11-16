import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Terms of Service | AutoFlow AI Platform Agreement',
  description: 'Terms of service, subscription billing policies, acceptable use guidelines, and customer intellectual property rights.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10 text-xs text-zinc-300 leading-relaxed font-sans">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Organization</span>
            <span>/</span>
            <span className="text-zinc-200">Terms of Service</span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-500 mt-2 font-mono">
              Last updated: January 2026 • Effective Date: January 1, 2026
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the AutoFlow platform (including our API endpoints, dashboard, embed scripts, and webhook receivers), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, organization, or other legal entity, you represent that you possess the legal authority to bind that entity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            2. Customer Intellectual Property & Data Rights
          </h2>
          <p>
            You retain exclusive ownership, title, and all intellectual property rights to any documents, PDF policies, customer emails, and conversational data uploaded to or ingested by AutoFlow. AutoFlow claims no ownership over your vector embeddings or proprietary company policies.
          </p>
          <p>
            We do not use customer data, policy documents, or inbound webhook messages to train foundational or public AI models.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            3. Subscription Billing & Cancellations
          </h2>
          <p>
            AutoFlow provides subscription plans (Starter, Pro Automation, and Enterprise Scale) billed monthly or annually in advance via Stripe. Subscriptions automatically renew at the conclusion of each billing period unless cancelled through the dashboard prior to the renewal date.
          </p>
          <p>
            If a recurring payment fails, account features (such as Unipile email automation and custom chatbot embeddings) will enter a past-due grace period before temporary suspension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            4. Acceptable Use Policy
          </h2>
          <p>
            You agree not to utilize AutoFlow to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Dispatch unsolicited spam emails or violate CAN-SPAM / GDPR marketing regulations.</li>
            <li>Ingest or vectorize illegal, defamatory, infringing, or malicious content.</li>
            <li>Attempt to reverse-engineer, decompile, or bypass vector namespace isolation boundaries.</li>
            <li>Interfere with the stability or performance of our shared multi-tenant infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            5. Service Availability & SLA
          </h2>
          <p>
            AutoFlow targets a 99.9% uptime availability for its API endpoints and vector querying services. Planned maintenance windows are communicated in advance via the System Status page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono">
            6. Limitation of Liability
          </h2>
          <p>
            In no event shall AutoFlow AI Platforms Inc., its affiliates, directors, or employees be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business interruption, resulting from the use or inability to use our services.
          </p>
        </section>

        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs">
          <span>Questions regarding our terms?</span>
          <Link href="/support" className="text-indigo-400 hover:text-indigo-300 font-mono underline">
            Contact Legal & Support →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
