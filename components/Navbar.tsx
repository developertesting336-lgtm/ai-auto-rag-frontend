'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthStorage, User } from '../lib/api';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(AuthStorage.getUser());
  }, []);

  const handleLogout = () => {
    AuthStorage.clear();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-white text-zinc-950 flex items-center justify-center font-bold text-xs tracking-tighter shrink-0 transition-transform group-hover:scale-105">
              AF
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              AutoFlow
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
              v2.0
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
            <Link href="/#features" className="hover:text-zinc-100 transition-colors">
              Platform
            </Link>
            <Link href="/#architecture" className="hover:text-zinc-100 transition-colors">
              Architecture
            </Link>
            <Link href="/#pricing" className="hover:text-zinc-100 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-100 text-zinc-950 hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <span>Dashboard</span>
                  <span className="text-zinc-500 font-mono text-[10px]">→</span>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                  <span className="text-xs font-medium text-zinc-400">
                    {user.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-mono text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-zinc-100 text-zinc-950 hover:bg-white shadow-xs transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-5 space-y-2 text-xs">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Platform
          </Link>
          <Link
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Architecture
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Pricing
          </Link>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md font-medium bg-zinc-100 text-zinc-950"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 rounded-md font-medium text-rose-400 hover:bg-zinc-900"
                >
                  Sign out ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md font-medium text-zinc-300 border border-zinc-800 hover:bg-zinc-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md font-medium bg-zinc-100 text-zinc-950"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
