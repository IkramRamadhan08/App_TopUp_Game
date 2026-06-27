import { useState } from "react";
import axios from "axios";

export const useTransaksi = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitTransaksi = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/transaksi", data);
      setInvoice(response.data.invoice);
      return response.data.invoice;
    } finally {
      setLoading(false);
    }
  };

  return { invoice, loading, submitTransaksi };
};
