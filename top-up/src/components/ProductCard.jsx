import React, { useState } from 'react';

const ProductCard = ({ product, onBuy }) => {
  const [selectedOption, setSelectedOption] = useState(product.options[0]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-500">{product.description}</p>
      <div className="my-2">
        <label htmlFor={`options-${product.id}`} className="block text-sm font-medium text-gray-700">
          Pilih Jumlah:
        </label>
        <select
          id={`options-${product.id}`}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {product.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <p className="text-blue-600 font-bold mt-2">Rp{product.price[selectedOption]}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => onBuy(product.name, selectedOption)}
      >
        Beli
      </button>
    </div>
  );
};

export default ProductCard;
