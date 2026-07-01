import React from 'react';
import { Link } from 'react-router-dom';

interface QuickActionCardProps {
  icon: string;
  label: string;
  href: string;
  id: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, label, href, id }) => (
  <Link
    to={href}
    id={id}
    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-150 hover:bg-gray-50 active:scale-[0.98]"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);
