import React from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { DataViewLayoutOptions } from 'primereact/dataview';
import '../index.css';

const PanelUsuario = () => {
  interface Product {
    name: string;
    category: string;
    inventoryStatus: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }

  const products: Product[] = [
    { name: 'Producto 1', category: 'Categoria 1', inventoryStatus: 'IN_STOCK', price: 10, rating: 4, description: 'Descripción del producto 1', image: 'producto1.jpg' },
    { name: 'Producto 2', category: 'Categoria 2', inventoryStatus: 'OUT_OF_STOCK', price: 20, rating: 3, description: 'Descripción del producto 2', image: 'producto2.jpg' },
  ];

  const renderListItem = (product: Product) => (
    <div className="product-grid-item card border-1 row">
      <div className="col-8">
            <i className="pi pi-tag product-category-icon"/>
            <span className="product-category">{product.category}</span>
          <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
          <img src={`images/product/${product.image}`} alt={product.name} />
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <Rating value={product.rating} readOnly />
      </div>
      <div className="col-4">
          <span className="product-price">${product.price}</span>
          <Button type="button" label="Add To Cart" icon="pi pi-shopping-cart" disabled={product.inventoryStatus === 'OUT_OF_STOCK'} />
      </div>
    </div>
  );

  return (
    <div className="card product">
      <DataView value={products} layout={'grid'} itemTemplate={renderListItem} />
    </div>
  );
};

export default PanelUsuario;
