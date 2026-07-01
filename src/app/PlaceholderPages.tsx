import React from 'react';

const ComingSoonPage: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
  <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <span className="text-4xl">{icon}</span>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">This module is coming in a future sprint.</p>
  </div>
);

export const OrdersPage: React.FC = () => <ComingSoonPage title="Orders" icon="📄" />;

export const ReportsPage: React.FC = () => <ComingSoonPage title="Reports" icon="📈" />;

export const SettingsPage: React.FC = () => <ComingSoonPage title="Settings" icon="⚙" />;
