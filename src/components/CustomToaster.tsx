'use client';

import { Toaster, toast } from 'react-hot-toast';

// Simple Toast Component
const CustomToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#333',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        },
        success: {
          duration: 4000,
          icon: '✓',
          style: {
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
          },
        },
        error: {
          duration: 5000,
          icon: '✕',
          style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
          },
        },
      }}
    />
  );
};

// Simple Toast Functions
export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  loading: (message: string) => {
    return toast.loading(message);
  },
};

export default CustomToaster;
