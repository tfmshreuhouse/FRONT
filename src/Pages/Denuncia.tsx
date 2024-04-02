import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../index.css';
import { Button } from 'primereact/button';

const DenunciaView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motivoDenuncia: '',
    justificacionDenuncia: '',
  });
  const [denunciaId, setDenunciaId] = useState<string | null>(null);

  useEffect(() => {
    const urlParts = location.pathname.split('/');
    const idFromUrl = urlParts[urlParts.length - 1];
    setDenunciaId(idFromUrl);
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert("denuncia exitosa");
    // Aquí puedes realizar acciones con los datos, como enviarlos al servidor
  };

  const handleVolverClick = () => {
    navigate('/home/infoInmueble/1/${id}');
  };

  return (
    <div className="main-container">
      <h2 className="titulo-container">Denuncia publicacion</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-fluid grid">
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-4">
              <label htmlFor="motivoDenuncia" className="label-style">Motivo de Denuncia</label>
          </div>
          <div className="field col-12 lg:col-4">
              <select
                className='input-div'
                name="motivoDenuncia"
                value={formData.motivoDenuncia}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un motivo</option>
                <option value="acoso">Acoso</option>
                <option value="fraude">Fraude</option>
                <option value="otro">Otro</option>
              </select>
          </div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-4">
              <label htmlFor="justificacionDenuncia" className="label-style">Justificación de la Denuncia</label>
          </div>
          <div className="field col-12 lg:col-4">
              <textarea
                name="justificacionDenuncia"
                className='text-area-div'
                placeholder="Ingrese justificación"
                value={formData.justificacionDenuncia}
                onChange={handleChange}
                required
                style={{ width: '100%', height: '100%' }}
              />
          </div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-4">
              <Button
                type="submit"
                label="Denunciar"
                className="button-blue"
              />
          </div>
          <div className="field col-12 lg:col-4">
              <Button
                type="button"
                icon="pi pi-angle-left"
                label="Volver"
                className="button-red"
                onClick={handleVolverClick}
              />
          </div>
          <div className="field col-12 lg:col-2"></div>
        </div>
      </form>
    </div>
  );
};

export default DenunciaView;