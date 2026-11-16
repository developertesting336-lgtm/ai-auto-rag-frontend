import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Vector Knowledge Base | AutoFlow AI Platform',
  description: 'Vectorize enterprise policy documents into Pinecone DB with Cloudflare R2 storage and Google Gemini dense embeddings.',
};

export default function VectorKnowledgeBasePage() {
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
            <span className="text-zinc-200">Vector Knowledge Base</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Enterprise Vector Knowledge Base
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Transform complex PDF policies, HR guidelines, SLAs, and technical manuals into dense vector embeddings for instantaneous semantic search and contextual customer chatbot answers.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto"
            >
              Open Knowledge Base →
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold font-mono text-xs">
              PDF
            </div>
            <h3 className="text-sm font-bold text-zinc-100">Automated PDF Parsing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Upload any PDF document. AutoFlow extracts text, strips irrelevant markup, segments content into semantic chunks, and stores the binary safely in Cloudflare R2.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs">
              768
            </div>
            <h3 className="text-sm font-bold text-zinc-100">Gemini Dense Embeddings</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Powered by Google Gemini&apos;s <code className="text-zinc-300">text-embedding-004</code>. Captures nuanced conceptual intent rather than relying on brittle keyword searches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono text-xs">
              PDB
            </div>
            <h3 className="text-sm font-bold text-zinc-100">Pinecone Serverless Index</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sub-50ms cosine similarity queries partitioned by company namespaces, ensuring complete data isolation and lightning-fast customer responses.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">
            How Grounded Responses Work (RAG Pipeline)
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            When a customer asks a question, AutoFlow retrieves the top matching policy chunks and injects them as verified grounding context into Gemini 1.5 Flash:
          </p>

          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`// 1. Convert question to dense vector
const queryVector = await getGeminiEmbedding(customerQuestion);

// 2. Query company's isolated Pinecone namespace
const searchResults = await pineconeNamespace.query({
  vector: queryVector,
  topK: 5,
  includeMetadata: true
});

// 3. Synthesize grounded answer
const aiResponse = await geminiModel.generateContent({
  systemPrompt: "Answer strictly based on the following verified policies...",
  contents: [searchResults.map(c => c.text), customerQuestion]
});`}
          </pre>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-white">Start Building Your Knowledge Base</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Upload your company terms, privacy guidelines, and SLA policies to deploy an accurate customer chatbot in minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white font-semibold text-xs transition-colors"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
