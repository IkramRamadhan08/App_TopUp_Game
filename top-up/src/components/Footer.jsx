import React, { useState } from 'react'

const faqs = [
  {
    q: "Bagaimana cara top up di AKS Store?",
    a: "Pilih game yang ingin di-top up, masukkan ID dan server, pilih nominal, lalu selesaikan pembayaran melalui metode yang tersedia.",
  },
  {
    q: "Metode pembayaran apa saja yang ada di AKS Store?",
    a: "Kami menerima berbagai metode pembayaran melalui Midtrans (DANA, GoPay, OVO, transfer bank, QRIS, dan lainnya).",
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
      <div className="bg-gray-800 text-white p-4 rounded-lg mt-6">

<footer className="bg-gray-900 text-white mt-10">
  <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold text-lg mb-2">Kamu Punya Pertanyaan?</h3>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              className="w-full bg-gray-800 p-3 rounded-lg text-left hover:bg-gray-700 transition flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{faq.q}</span>
              <span className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openIndex === i && (
              <div className="bg-gray-700 p-3 rounded-b-lg text-sm text-gray-200 mt-0">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-semibold text-lg mb-2">Hubungi Kami</h3>
      <p className="text-sm">WhatsApp: +62 812-xxxx-xxxx</p>
      <p className="text-sm">Email: support@aksstore.com</p>
      <p className="text-sm">Alamat: Jl. Game Center No. 99, Bekasi</p>
    </div>
  </div>

  <div className="bg-gray-800 text-center py-3 mt-4">
    <p className="text-sm">&copy; 2026 AKS Store. All rights reserved.</p>
  </div>
</footer>
</div>


  
  )
}

export default Footer;
