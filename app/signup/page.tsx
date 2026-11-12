'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { registerUser, AuthStorage } from '../../lib/api';

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const token = AuthStorage.getToken();
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (!res.success) {
        setError(res.error || 'Failed to create account.');
        setLoading(false);
        return;
      }

      setSuccess('Account created successfully. Redirecting to workspace...');

      if (res.token) {
        AuthStorage.setToken(res.token);
      }
      if (res.user) {
        AuthStorage.setUser(res.user);
      }

      setTimeout(() => {
        router.push('/dashboard');
      }, 400);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Create your account
            </h1>
            <p className="mt-1.5 text-xs text-zinc-400">
              Start building autonomous AI pipelines in seconds.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-3 rounded-md bg-rose-950/40 border border-rose-900/80 text-rose-300 text-xs font-mono">
                {error}
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-5 p-3 rounded-md bg-emerald-950/40 border border-emerald-900/80 text-emerald-300 text-xs font-mono">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Divyanshu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-xs transition-colors"
                />
                <p className="mt-1 text-[10px] font-mono text-zinc-500">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-xs transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs tracking-tight transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create Free Account'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-zinc-200 hover:text-white underline underline-offset-2">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
