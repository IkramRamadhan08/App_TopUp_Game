import React from 'react'

const Footer = () => {
  return (
      <div className="bg-gray-800 text-white p-4 rounded-lg mt-6">

<footer className="bg-gray-900 text-white mt-10">
  <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold text-lg mb-2">Kamu Punya Pertanyaan?</h3>
      <div className="space-y-2">
        <button className="w-full bg-gray-800 p-3 rounded-lg text-left hover:bg-gray-700 transition">
          Bagaimana cara top up di Hadi Store?
        </button>
        <button className="w-full bg-gray-800 p-3 rounded-lg text-left hover:bg-gray-700 transition">
          Metode pembayaran apa saja yang ada di Hadi Store?
        </button>
      </div>
    </div>

    <div>
      <h3 className="font-semibold text-lg mb-2">Hubungi Kami</h3>
      <p className="text-sm">WhatsApp: +62 812-xxxx-xxxx</p>
      <p className="text-sm">Email: support@ourastore.com</p>
      <p className="text-sm">Alamat: Jl. Game Center No. 99, Jakarta</p>
    </div>
  </div>

  <div className="bg-gray-800 text-center py-3 mt-4">
    <p className="text-sm">&copy; 2025 Hadi Store. All rights reserved.</p>
  </div>
</footer>
</div>


  
  )
}

export default Footer;
