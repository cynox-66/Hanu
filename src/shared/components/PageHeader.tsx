import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  backTo?: string;
  action?: React.ReactNode;
}

/**
 * Reusable page header for all full-screen feature pages.
 * Provides consistent back navigation, title, and optional action slot.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, backTo, action }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-white px-4 pb-3 pt-3 shadow-sm">
      <button
        onClick={handleBack}
        className="-ml-2 rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
        aria-label="Go back"
      >
        <svg
          className="h-6 w-6 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 className="flex-1 text-xl font-bold text-gray-900">{title}</h1>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
};
