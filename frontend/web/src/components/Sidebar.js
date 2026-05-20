import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Denúncias</li>
        </ul>
      </nav>
    </aside>
  );
}
