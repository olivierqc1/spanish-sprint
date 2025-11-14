// src/contexts/ToastContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const ToastContext = createContext({});

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastContext.Provider value={{}}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);