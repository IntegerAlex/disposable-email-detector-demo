"use client";

import { useState } from 'react';

type CheckEmailState = {
  isLoading: boolean;
  error: string | null;
  isDisposable: boolean | null;
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<CheckEmailState>({
    isLoading: false,
    error: null,
    isDisposable: null
  });

  const checkEmail = async () => {
    if (!email) {
      setState(prev => ({ ...prev, error: 'Please enter an email address' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check email');
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        isDisposable: data.isDisposable,
        error: null
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'An error occurred'
      }));
    }
  };

  const handleRetry = () => {
    setState({
      isLoading: false,
      error: null,
      isDisposable: null
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Email Checker</h1>
          <p className="mt-2 text-gray-600">Verify if an email address is disposable</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                text-gray-900 bg-white placeholder-gray-400"
              disabled={state.isLoading}
            />
            {state.isDisposable !== null && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {state.isDisposable ? (
                  <span className="text-red-500">⚠️</span>
                ) : (
                  <span className="text-green-500">✓</span>
                )}
              </div>
            )}
          </div>

          {!state.isDisposable && state.isDisposable !== null ? (
            <button
              onClick={handleRetry}
              className="w-full p-4 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white 
                transition-colors flex items-center justify-center gap-2"
            >
              <span>✓ Valid Email - Check Another</span>
            </button>
          ) : (
            <button
              onClick={state.isDisposable ? handleRetry : checkEmail}
              disabled={state.isLoading}
              className={`w-full p-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                ${state.isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : state.isDisposable
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
              {state.isLoading ? (
                <>
                  <span>Checking</span>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : state.isDisposable ? (
                '⚠️ Disposable Email - Try Another'
              ) : (
                'Check Email'
              )}
            </button>
          )}

          {state.error && (
            <div className="p-4 text-sm text-red-600 bg-red-100 rounded-lg">
              {state.error}
            </div>
          )}

          {!state.error && state.isDisposable !== null && (
            <div className={`p-4 text-sm rounded-lg ${
              state.isDisposable
                ? 'text-red-600 bg-red-50 border border-red-200'
                : 'text-green-600 bg-green-50 border border-green-200'
            }`}>
              {state.isDisposable 
                ? 'This appears to be a disposable email address. Please use a permanent email.'
                : 'This appears to be a valid, non-disposable email address.'}
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 space-y-2">
        <div className="flex items-center justify-center space-x-4">
          <a 
            href="https://github.com/IntegerAlex/disposable-email-detector" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
          <a 
            href="https://github.com/IntegerAlex/disposable-email-detector/issues/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            Report Issue
          </a>
        </div>
      </footer>

      {/* New Sticky Sub-footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-2 px-4 text-sm text-gray-600">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>Built by</span>
          <a 
            href="https://realtalkportfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Akshat Kotpalliwar
          </a>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 12.5l6-6-1.41-1.41L8.5 9.67 6.91 8.08 5.5 9.5l3 3z"/>
            </svg>
            Open to Job Opportunities
          </span>
          <span>•</span>
          <a 
            href="https://github.com/IntegerAlex" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
