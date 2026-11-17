'use client';

import React, { useEffect, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

type ToastListener = (toasts: ToastItem[]) => void;

let toastsState: ToastItem[] = [];
let listeners: ToastListener[] = [];

function notify() {
  listeners.forEach((listener) => listener([...toastsState]));
}

function addToast(type: ToastType, message: string, duration = 4000): string {
  const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const item: ToastItem = { id, type, message, duration };
  toastsState = [item, ...toastsState];
  notify();
  return id;
}

function removeToast(id: string) {
  toastsState = toastsState.filter((t) => t.id !== id);
  notify();
}

export const toast = {
  success: (message: string, duration = 4000) => addToast('success', message, duration),
  error: (message: string, duration = 5000) => addToast('error', message, duration),
  warning: (message: string, duration = 4500) => addToast('warning', message, duration),
  info: (message: string, duration = 4000) => addToast('info', message, duration),
  dismiss: (id: string) => removeToast(id),
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleUpdate = (updated: ToastItem[]) => {
      setToasts(updated);
    };
    listeners.push(handleUpdate);
    setToasts([...toastsState]);

    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} item={t} onDismiss={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onDismiss();
    }, 200);
  }, [onDismiss]);

  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(() => {
      handleClose();
    }, item.duration);

    return () => clearTimeout(timer);
  }, [item.duration, handleClose]);

  const typeStyles = {
    success: {
      border: 'border-emerald-500/40',
      bg: 'bg-zinc-950/95',
      glow: 'shadow-[0_8px_30px_rgb(16,185,129,0.12)]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      bar: 'bg-emerald-400',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      label: 'Success',
    },
    error: {
      border: 'border-rose-500/40',
      bg: 'bg-zinc-950/95',
      glow: 'shadow-[0_8px_30px_rgb(244,63,94,0.12)]',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
      bar: 'bg-rose-500',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
      label: 'Error',
    },
    warning: {
      border: 'border-amber-500/40',
      bg: 'bg-zinc-950/95',
      glow: 'shadow-[0_8px_30px_rgb(245,158,11,0.12)]',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      bar: 'bg-amber-400',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      label: 'Notice',
    },
    info: {
      border: 'border-sky-500/40',
      bg: 'bg-zinc-950/95',
      glow: 'shadow-[0_8px_30px_rgb(14,165,233,0.12)]',
      iconBg: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
      bar: 'bg-sky-400',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      label: 'Info',
    },
  }[item.type];

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-xl border ${typeStyles.border} ${typeStyles.bg} ${typeStyles.glow} backdrop-blur-xl p-3.5 shadow-2xl transition-all duration-200 transform ${
        isClosing ? 'opacity-0 translate-x-4 scale-95' : 'opacity-100 translate-x-0 scale-100'
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeStyles.iconBg}`}>
          {typeStyles.icon}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
            {typeStyles.label}
          </div>
          <p className="text-xs text-zinc-200 font-sans leading-relaxed break-words">
            {item.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-zinc-500 hover:text-zinc-200 p-1 rounded-md transition-colors shrink-0 -mr-1 -mt-1 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Auto-Dismiss Progress Bar */}
      {item.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800/60 overflow-hidden">
          <div
            className={`h-full ${typeStyles.bar} transition-all ease-linear`}
            style={{
              animationName: 'toastProgress',
              animationDuration: `${item.duration}ms`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
            }}
          />
        </div>
      )}
    </div>
  );
}
