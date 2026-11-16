'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('technical');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does AutoFlow handle email webhooks from Unipile?',
      a: 'Unipile dispatches real-time HTTPS POST requests to your dedicated endpoint (/api/email/webhook/:token). Our system parses the headers, saves the email and body preview into your database, and evaluates custom AI prompt rules to determine whether to auto-reply or ignore.',
    },
    {
      q: 'Can I connect multiple companies and separate knowledge bases?',
      a: 'Yes. AutoFlow is built from the ground up with multi-tenant company isolation. Each organization you register maintains its own isolated Pinecone vector namespace and generates dedicated chatbot keys.',
    },
    {
      q: 'What happens when my payment is overdue?',
      a: 'If a Stripe recurring charge fails, your account enters a 3-day grace period. During this period, automated replies remain active while an alert is displayed in the dashboard. After the grace period, automated features are paused until payment is updated.',
    },
    {
      q: 'How do I embed the chatbot widget on my website?',
      a: 'Simply paste the 1-line script tag (<script src=".../embed/chatbot.js" data-api-key="af_live_..."></script>) right before the closing </body> tag of your website HTML or Webflow/Shopify theme.',
    },
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
            <span className="text-zinc-200">Support</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Developer Support & Help Desk
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Our engineering team is here to assist with webhook setup, vector knowledge base indexing, and custom AI prompt engineering.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Support Desk: Online</span>
            </div>
          </div>
        </div>

        {/* SLA Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400">Starter Tier</span>
            <div className="text-lg font-bold text-zinc-100">Standard Support</div>
            <p className="text-xs text-zinc-400 leading-relaxed">Guaranteed response within 24 business hours via email tickets.</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/60 border border-indigo-900/60 space-y-2">
            <span className="text-[10px] font-mono uppercase text-indigo-400">Pro Automation</span>
            <div className="text-lg font-bold text-zinc-100">Priority Response</div>
            <p className="text-xs text-zinc-400 leading-relaxed">Guaranteed response within 4 hours, plus direct engineer ticket routing.</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-mono uppercase text-emerald-400">Enterprise</span>
            <div className="text-lg font-bold text-zinc-100">24/7 Dedicated SLA</div>
            <p className="text-xs text-zinc-400 leading-relaxed">1-hour critical response SLA with dedicated Slack/Discord channel access.</p>
          </div>
        </div>

        {/* Form & Contact Options Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit Inquiry Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-5">
            <div>
              <h2 className="text-base font-bold text-zinc-100">Submit an Inquiry</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in the details below and an engineer will reply directly to your email.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-sm font-semibold text-emerald-200">Inquiry Received!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Thank you for reaching out. A ticket has been created and our team will get back to you at <span className="text-zinc-200 font-mono">{email}</span> within your plan&apos;s SLA window.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Topic Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 font-mono"
                  >
                    <option value="technical">Technical Support & API</option>
                    <option value="unipile">Unipile Email Webhooks</option>
                    <option value="billing">Billing, Payments & Invoices</option>
                    <option value="enterprise">Enterprise Custom SLA</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your question, request, or issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Submit Support Ticket
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-zinc-100">Frequently Asked Questions</h2>
              <p className="text-xs text-zinc-400 mt-1">Quick answers to common developer questions.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="font-mono text-zinc-500 text-sm">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>

                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
              <span>Checking service availability?</span>
              <Link href="/status" className="text-indigo-400 hover:text-indigo-300 font-mono underline">
                View Live System Status →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
