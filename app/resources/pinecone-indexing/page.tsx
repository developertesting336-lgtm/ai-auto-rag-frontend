import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Pinecone Vector Indexing | AutoFlow v2.0 Architecture',
  description: 'Deep dive into PDF document chunking, Google Gemini dense vector embeddings, and Pinecone DB multi-tenant indexing.',
};

export default function PineconeIndexingPage() {
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
            <span className="text-zinc-200">Pinecone Vector Indexing</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Pinecone Vector Knowledge Base Architecture
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                How AutoFlow ingests enterprise PDF policies, computes dense geometric embeddings with Gemini, and performs sub-millisecond semantic retrieval in Pinecone DB.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/80 px-3 py-1.5 rounded-full shrink-0">
              Metric: Cosine • 768-Dim
            </span>
          </div>
        </div>

        {/* 4-Stage Ingestion Pipeline */}
        <div className="space-y-6">
          <h2 className="text-base font-bold text-zinc-100">The 4-Stage Vectorization Pipeline</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center font-mono text-xs font-bold">1</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Binary Ingest & R2 Storage</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                When you upload a policy PDF, it is validated and uploaded to Cloudflare R2 binary object storage with an immutable hash-based key. A permanent reference URL is saved in PostgreSQL.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center font-mono text-xs font-bold">2</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Text Extraction & Semantic Chunking</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The document is extracted with <code className="text-zinc-300">pdf-parse</code> and segmented into overlapping text chunks (500 tokens with 80-token overlap). This preserves contextual continuity across page and paragraph boundaries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center font-mono text-xs font-bold">3</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Google Gemini Dense Embeddings</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Each chunk is passed to the Google Gemini embedding model (<code className="text-zinc-300">text-embedding-004</code>), generating a 768-dimensional dense numerical vector representing its semantic meaning.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center font-mono text-xs font-bold">4</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Pinecone Namespace Indexing</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Vectors are upserted into the <code className="text-zinc-300">company-policies</code> index. Chunks are strictly isolated into distinct company namespaces (<code className="text-zinc-300">company_&#123;id&#125;</code>) to prevent multi-tenant cross-talk.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Company Scoping Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h2 className="text-base font-bold text-zinc-100">Multi-Tenant Namespace Scoping</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            In AutoFlow, a single user or organization can operate multiple companies simultaneously. Pinecone vector queries are strictly partitioned by company ID:
          </p>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
            <div className="text-zinc-500">// Pinecone Vector Query Scoping</div>
            <div>const index = pinecone.Index(&apos;company-policies&apos;);</div>
            <div className="text-emerald-400">const namespace = index.namespace(`company_&#36;&#123;companyId&#125;`);</div>
            <div>const results = await namespace.query(&#123;</div>
            <div className="pl-4">vector: queryEmbedding,</div>
            <div className="pl-4">topK: 5,</div>
            <div className="pl-4">includeMetadata: true</div>
            <div>&#125;);</div>
          </div>

          <p className="text-xs text-zinc-500">
            Guarantees 100% data isolation: Company A&apos;s chatbot will never retrieve or disclose policy chunks belonging to Company B.
          </p>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Upload your first policy document</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Drag and drop any PDF in your dashboard to vectorize it into Pinecone in seconds.</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors shrink-0"
          >
            Go to Knowledge Base →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
