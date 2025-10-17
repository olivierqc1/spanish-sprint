// src/lib/notifications.ts
import toast from 'react-hot-toast';

export const notify = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      style: {
        background: '#ef4444',
        color: '#fff',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
    });
  },

  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },
};

export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Une erreur inconnue est survenue';
};
