import React from 'react';
import DashboardStats from './Stats';
import { BarChart3 } from 'lucide-react';
import TotalPendapatanCard from './TotalPendapatancard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-1">📊 Dashboard</h1>
          <p className="text-gray-600 text-sm">
            Selamat datang kembali! Berikut adalah ringkasan statistik & performa sistem Anda.
          </p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 gap-2 text-blue-700 hover:text-blue-900 transition">
          <BarChart3 size={26} />
          <span className="text-base font-semibold">Lihat Statistik</span>
        </div>
      </div>

      {/* Stats Section */}
      <section className="mb-10">
        <DashboardStats />
      </section>

      {/* Section Tambahan */}
      
    </div>
  );
};

export default Dashboard;
