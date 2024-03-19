import React from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { DataViewLayoutOptions } from 'primereact/dataview';
import '../index.css';
import { Fieldset } from 'primereact/fieldset';

const PanelUsuario = () => {
  interface Product {
    name: string;
    category: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }

  const products: Product[] = [
    { name: 'Apartamento maria paula', category: 'Apartamento', price: 300.000, rating: 3, description: 'Aprtamentos con 3 habitacion en el conjunto residencial maria paula', image: 'https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png' },
    { name: 'casa colinas del igua', category: 'Casa', price: 800.000, rating: 1, description: 'Casa de dos pisos con 4 habitaciones ', image: 'https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png' },
  ];

  const renderListItem = (product: Product) => (
    <div className="field col-12 lg:col-12 product-grid-item border-1 row">
      <div className="field col-12 lg:col-2" style={{ marginTop: '12px' }}>
        <img 
          src={`${product.image}`} 
          alt={product.name} 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>
      <div className="field col-12 lg:col-7">
        <i className="pi pi-tag product-category-icon" />
        <span className="product-category">{product.category}</span>
        <div className="product-name">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <Rating value={product.rating} readOnly />
      </div>
      <div className="field col-12 lg:col-3 d-flex flex-column justify-content-between">
        <div style={{ marginBottom: '8px' }}><Button type="submit" className="button-blue" label="Ver usuario" icon="pi pi-user" /></div>
        <div style={{ marginBottom: '8px' }}><Button type="submit" className="button-blue" label="Aceptar" icon="pi pi-check" /></div>
        <div ><Button type="submit" className="button-blue" severity="danger" label="Rechazar" icon="pi pi-times" /></div>
      </div>
    </div>
  );
  

  return (
    <div className="main-container">
      <Fieldset legend="Solicitudes de reserva en mis inmuebles" toggleable>
        <p className="m-0">
              <DataView value={products} layout={'grid'} itemTemplate={renderListItem} />
        </p>
      </Fieldset>
      <Fieldset legend="Mis solicitudes de reserva" toggleable>
      <p className="m-0">
          
            <DataView value={products} layout={'grid'} itemTemplate={renderListItem} />
      </p>
  </Fieldset>
  </div>
  );
};

export default PanelUsuario;
