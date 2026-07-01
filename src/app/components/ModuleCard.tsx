import React from 'react';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  icon: string;
  label: string;
  description: string;
  href: string;
  enabled: boolean;
}

const ChevronRight: React.FC = () => (
  <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const ModuleCard: React.FC<ModuleCardProps> = ({
  icon,
  label,
  description,
  href,
  enabled,
}) => {
  if (!enabled) {
    return (
      <div
        className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 opacity-50"
        aria-disabled="true"
      >
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-400">
          Soon
        </span>
      </div>
    );
  }

  return (
    <Link
      to={href}
      id={`dashboard-${label.toLowerCase()}-module`}
      className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm transition-transform duration-150 active:scale-[0.98]"
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <ChevronRight />
    </Link>
  );
};
