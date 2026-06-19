import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, category }) => (
  <section id={category.toLowerCase()} className="my-8">
    <h2 className="text-2xl font-bold mb-4">{category}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={(name, option) => alert(`Beli ${name} - ${option}`)} />
      ))}
    </div>
  </section>
);

export default ProductList;
