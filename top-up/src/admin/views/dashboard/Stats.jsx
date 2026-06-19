import React, { useEffect, useState } from 'react'
import { FaUser, FaExchangeAlt, FaBox, FaWallet } from 'react-icons/fa'
import axios from 'axios'


const statsCardStyle =
  'bg-blue-800 rounded-xl shadow-md p-6 hover:scale-[1.02] transition-all duration-300 ease-in-out border-l-[5px] border-yellow-400'

const Stats = () => {
  const [data, setData] = useState({
    users: 0,
    transaksi: 0,
    produk: 0,
    revenue: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/stats')
        setData(res.data)
      } catch (err) {
        console.error('Gagal memuat data dashboard:', err)
      }
    }

    fetchData()
  }, [])



  const stats = [
    {
      label: 'Admin',
      value: data.users,
      icon: <FaUser className="text-white" />,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      label: 'Transaksi',
      value: data.transactions,
      icon: <FaExchangeAlt className="text-white" />,
      color: 'from-green-400 to-emerald-500',
    },
    {
      label: 'Produk',
      value: data.products,
      icon: <FaBox className="text-white" />,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      label: 'Pendapatan',
      value: 'Rp ' + Number(data.revenue).toLocaleString('id-ID'),
      icon: <FaWallet className="text-white text-3xl" />,
      color: 'from-slate-500 to-indigo-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stats.map((item, index) => (
        <div key={index} className={statsCardStyle}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white text-sm font-medium mb-1 uppercase">{item.label}</h4>
              <p className="text-3xl font-bold text-white">{item.value}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
      
    </div>

  
  )
}

export default Stats
