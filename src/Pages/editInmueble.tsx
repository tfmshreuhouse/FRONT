import { useRef, useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
import tipoMoneda from '../assets/tipoMoneda.json';

function EditInmueble() {
    
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    let idInmueble = !isNaN(parseInt(segments[segments.length - 1])) ? parseInt(segments[segments.length - 1]) : 0;
    const titulo = idInmueble != null && idInmueble != 0 ? "Modificar del inmueble" : "Creacion del inmueble";
    const navigate = useNavigate();

    const [Id, setId] = useState<number | null>(null);
    const [idDetalle, setIdDetalle] = useState<number | null>(null);
    const [idpublicacion, setIdPublicacion] = useState<number | null>(null);
    const [Images, setImages] = useState<any[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [Nombre, setNombre] = useState('');
    const [Pisos, setPisos] = useState<number>(0);
    const [Habitaciones, setHabitaciones] = useState<number>(0);
    const [BanosCom, setBanosCom] = useState<number>(0);
    const [BanosMed, setBanosMed] = useState<number>(0);
    const [tipoInmueble, setTipoInmueble] = useState(null);
    const [tipoInmuebleOptions, setTipoInmuebleOptions] = useState<{ value: number; label: string }[]>([]);
    const [Descripcion, setDescripcion] = useState('');
    const [Cocina, setCocina] = useState('');
    const [Lavado, setLavado] = useState('');
    const [Patio, setPatio] = useState('');
    const [Balcon, setBalcon] = useState('');
    const [Estacionamiento, setEstacionamiento] = useState('');
    const [Elevador, setElevador] = useState('');
    const [Piscina, setPiscina] = useState('');
    const [AreaPublicas, setAreaPublicas] = useState('');
    const [Fumar, setFumar] = useState('');
    const [Mascotas, setMascotas] = useState('');
    const [Reuniones, setReuniones] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Indicaciones, setIndicaciones] = useState('');
    const [Status, setStatus] = useState(null);
    const [Precio, setPrecio] = useState<number>(0);
    const [Capacidad, setCapacidad] = useState<number>(0);
    const [moneda, setMoneda] = useState(null);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const currentDate: Date = new Date();
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [success, setSuccess] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);

    const optionsStatus = [
        {label: 'Oculto', value: 0},
        {label: 'Publicado', value: 1},
        {label: 'Reservado', value: 2}
      ];   

    const [formCompleted, setFormCompleted] = useState(false);

    const token: string | null = localStorage.getItem('jwt');

    const p = require('countries-cities-geo');

    useEffect(() => {
        const obtenerDatosTipoInmueble = async () => {            
            
            if (idInmueble != 0) {

                setId(idInmueble);
                
                try {
                    if (!token) {
                        console.error('Token de autorización no encontrado en el localStorage');
                        return;
                    }
    
                    const response = await axios.get<{ success: boolean; data: any }>(
                        process.env.REACT_APP_API_URL + "/rest/inmuebles/"+ idInmueble,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    setNombre(response.data.data.Nombre);
                    setDireccion(response.data.data.Direccion);
                    setTipoInmueble(response.data.data.TiposInmueble.id);
                    setSelectedCountry(response.data.data.Pais);
                    setSelectedCity(response.data.data.Ciudad);
                    setPisos(response.data.data.DetallesInmueble.pisos);
                    setHabitaciones(response.data.data.DetallesInmueble.habitaciones);
                    setBanosCom(response.data.data.DetallesInmueble.banosCompletos);
                    setBanosMed(response.data.data.DetallesInmueble.banosMedios);
                    setCocina(response.data.data.DetallesInmueble.cocina.toString());
                    setLavado(response.data.data.DetallesInmueble.lavado.toString());
                    setPatio(response.data.data.DetallesInmueble.patio.toString());
                    setBalcon(response.data.data.DetallesInmueble.balcon.toString());
                    setEstacionamiento(response.data.data.DetallesInmueble.estacionamiento.toString());
                    setElevador(response.data.data.DetallesInmueble.elevador.toString());
                    setPiscina(response.data.data.DetallesInmueble.piscina.toString());
                    setAreaPublicas(response.data.data.DetallesInmueble.areasPublicas.toString());
                    setFumar(response.data.data.DetallesInmueble.fumar.toString());
                    setMascotas(response.data.data.DetallesInmueble.mascotas.toString());
                    setReuniones(response.data.data.DetallesInmueble.reuniones.toString());
                    setDescripcion(response.data.data.DetallesInmueble.descripcion);
                    setIndicaciones(response.data.data.DetallesInmueble.indicaciones);
                    setStatus(response.data.data.DetallesInmueble.status);
                    setIdDetalle(response.data.data.DetallesInmueble.id);

                    const images = response.data.data.ImagnenesInmuebles.map((image: any) => image.URL);
                    setImageUrls(images);                   
                    setImages(images);
                    setImagePreviews(images);

                    setPrecio(response.data.data.Publicaciones?.[0]?.costo);
                    setCapacidad(response.data.data.Publicaciones?.[0]?.PAX);
                    setIdPublicacion(response.data.data.Publicaciones?.[0]?.id);
                    setMoneda(response.data.data.Publicaciones?.[0]?.moneda);

                } catch (error) {
                    console.error('Error al cargar tipos de inmueble:', error);
                }
            }
        };

        cargarTipoInmueble();
        obtenerDatosTipoInmueble();
    }, []);

    const handleVolverClick = () => {
        navigate('/home/infoInmueble/2/' + idInmueble + "/0");
      };

      useEffect(() => {
        const countries = p.getCountryNames();
      
        const filteredCountries = countries.filter((country: string) => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]*$/.test(country));
      
        const formattedCountries = filteredCountries.map((country: string) => ({
          value: country,
          label: country
        }));
      
        setCountryOptions(formattedCountries);
      }, []);
    
      useEffect(() => {
        if (selectedCountry) {
          const cities = p.getCities(selectedCountry);

          if (cities) {
            const formattedCities = cities.map((city: any) => ({
              value: city,
              label: city
            }));
            
            setCityOptions(formattedCities);
          } else {
            setCityOptions([]);
          }
        }
      }, [selectedCountry]);

    const UploadImage = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "sharehouse/subfolder"); 
        formData.append("upload_preset", "sharehouse");        
        const { data } = await axios.post(
            "https://api.cloudinary.com/v1_1/dcdrax4ou/image/upload", formData
        );
        return { publicId: data?.public_id, url: data.secure_url }
    };

    const cargarTipoInmueble = async () => {
        try {

            if (!token) {
                console.error('Token de autorización no encontrado en el localStorage');
                return;
            }

            const response = await axios.get<{ success: boolean; data: { id: number; tipo: string }[] }>(
                process.env.REACT_APP_API_URL + "/rest/tipos-inmuebles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const optionstipo = [];

            for(let i=0; i<response.data.data.length; i++){
                let label = response.data.data[i].tipo
                let value = response.data.data[i].id
                optionstipo.push({ label: `${label}`, value: value });
            }

            setTipoInmuebleOptions(optionstipo);
        } catch (error) {
            console.error('Error al cargar tipos de inmueble:', error);
        }
    };

    const GuardarInmueble = async (e: any) => {

        if (!token) {
            console.error('Token de autorización no encontrado en el localStorage');
            return;
        }

        e.preventDefault();

        if(idInmueble != 0)
        {
            try {
                debugger;
                let arr = [];
                for (let i = 0; i < Images.length; i++) {

                    if (typeof Images[i] !== 'string') {
                        const data = await UploadImage(Images[i]);
                        arr.push(data.url);
                    }else{
                        arr.push(Images[i]);
                    }
                }
           

                const formDataDatail = {
                    id: idDetalle,
                    pisos: Pisos,
                    habitaciones: Habitaciones,
                    banosCompletos: BanosCom,
                    banosMedios: BanosMed,
                    cocina: parseInt(Cocina),
                    lavado: parseInt(Lavado),
                    patio: parseInt(Patio),
                    balcon: parseInt(Balcon),
                    estacionamiento: parseInt(Estacionamiento),
                    elevador: parseInt(Elevador),
                    piscina: parseInt(Piscina),
                    areasPublicas: parseInt(AreaPublicas),
                    fumar: parseInt(Fumar),
                    mascotas: parseInt(Mascotas),
                    reuniones: parseInt(Reuniones),
                    descripcion: Descripcion,
                    indicaciones: Indicaciones,
                    status: Status == true ? 1: 0
                };

                const responseDetail = await axios.patch(
                    process.env.REACT_APP_API_URL + "/rest/DetallesInmuebles",
                    formDataDatail,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );                
                
                const FormDataInmueble = {
                    id: idInmueble,
                    Nombre: Nombre,
                    Pais: selectedCountry,
                    Ciudad: selectedCity,
                    Direccion: Direccion,
                    TiposInmuebleId: tipoInmueble,
                    DetallesInmuebles: idDetalle,
                    UserId: 1
                };

                const responseInmueble = await axios.patch(
                    process.env.REACT_APP_API_URL + "/rest/inmuebles",
                    FormDataInmueble,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );                
                
                const FormDataPublicacion = {
                    id: idpublicacion,
                    fechaActiva: currentDate,
                    fechaInactiva: Status != 1 ? currentDate : null,
                    PAX: Capacidad,
                    moneda: moneda, 
                    costo: Precio,
                    descripcion: Descripcion,
                    indicaciones: Indicaciones,
                    status: Status,
                    Inmuebles: idInmueble
                };

                const responsePublicacion = await axios.patch(
                    process.env.REACT_APP_API_URL + "/rest/publicacion",
                    FormDataPublicacion,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );    

                for(let i = 0; i < arr.length; i++){

                    if(imageUrls.includes(arr[i])){
                        const FormDataImage = {
                            URL: arr[i],
                            status: 1,
                            InmuebleId: idInmueble
                        };                
                        
                        const response = await axios.patch(
                            process.env.REACT_APP_API_URL + "/rest/ImagnenesInmuebles",
                            FormDataImage,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                    }
                    else
                    {
                        const FormDataImage = {
                            URL: arr[i],
                            status: 1,
                            InmuebleId: idInmueble
                        };                    
                        
                        const response = await axios.post(
                            process.env.REACT_APP_API_URL + "/rest/ImagnenesInmuebles",
                            FormDataImage,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                    }                    
                }
                for(let i = 0; i < imageUrls.length; i++){

                    if(!arr.includes(imageUrls[i])){
                        const FormDataImage = {
                            URL: imageUrls[i],
                            status: 0,
                            InmuebleId: idInmueble
                        };                
                        
                        const response = await axios.patch(
                            process.env.REACT_APP_API_URL + "/rest/ImagnenesInmuebles",
                            FormDataImage,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                    }
                }
                setSuccess(true);
            } catch (error) {
                console.log(error);
                setFailure(true);
            }
        }
        else
        {
            try{
                
                let arr = [];
                for (let i = 0; i < Images.length; i++) {
                    const data = await UploadImage(Images[i]);
                    arr.push(data.url);
                }           

                const formDataDatail = {
                    pisos: Pisos,
                    habitaciones: Habitaciones,
                    banosCompletos: BanosCom,
                    banosMedios: BanosMed,
                    cocina: parseInt(Cocina),
                    lavado: parseInt(Lavado),
                    patio: parseInt(Patio),
                    balcon: parseInt(Balcon),
                    estacionamiento: parseInt(Estacionamiento),
                    elevador: parseInt(Elevador),
                    piscina: parseInt(Piscina),
                    areasPublicas: parseInt(AreaPublicas),
                    fumar: parseInt(Fumar),
                    mascotas: parseInt(Mascotas),
                    reuniones: parseInt(Reuniones),
                    descripcion: Descripcion,
                    indicaciones: Indicaciones,
                    status: Status == true ? 1 : 0
                };

                const response = await axios.post(
                    process.env.REACT_APP_API_URL + "/rest/DetallesInmuebles",
                    formDataDatail,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

               

                const FormDataInmueble = {
                    Nombre: Nombre,
                    Pais: selectedCountry,
                    Ciudad: selectedCity,
                    Direccion: Direccion,
                    TiposInmuebleId: tipoInmueble,
                    DetallesInmuebles: response.data.data.id,
                    UserId: 1
                };

                const responseInmueble = await axios.post(
                    process.env.REACT_APP_API_URL + "/rest/inmuebles",
                    FormDataInmueble,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setId(parseInt(responseInmueble.data.data.id));
                idInmueble = parseInt(responseInmueble.data.data.id);

                const FormDataPublicacion = {
                    fechaActiva: currentDate,
                    fechaInactiva: null,
                    PAX: Capacidad,
                    moneda: moneda, 
                    costo: Precio,
                    descripcion: Descripcion,
                    indicaciones: Indicaciones,
                    status: Status,
                    Inmuebles: idInmueble
                };

                const responsePubli = await axios.post(
                    process.env.REACT_APP_API_URL + "/rest/publicacion",
                    FormDataPublicacion,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                for(let i = 0; i < arr.length; i++){

                    const FormDataImage = {
                        URL: arr[i],
                        status: 1,
                        InmuebleId: idInmueble
                    };                    
                    
                    const response = await axios.post(
                        process.env.REACT_APP_API_URL + "/rest/ImagnenesInmuebles",
                        FormDataImage,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }
                setSuccess(true);
            }catch(err){
                alert.call(err);
                setFailure(true);
            }
        }
        
    };   

    const handleFileSelect = () => {
        document.getElementById('file-input')?.click();
    };
    
    const handleFileChange = (event: any) => {
        const files = event.target.files;
        if (files) {
            const selectedImages = Array.from(files).filter(file => file instanceof Blob) as Blob[];
            const previews = selectedImages.map(image => URL.createObjectURL(image));
            setImages(prevState => [...prevState, ...selectedImages]);
            setImagePreviews(prevState => [...prevState, ...previews]);
        }
    };

    const handleRemoveImage = (index: number) => {

        const updatedImages = [...Images];
        const updatedPreviews = [...imagePreviews];
        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);
        
        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    useEffect(() => {
        // Verificar si todos los campos del formulario están llenos
        const isFormCompleted = () => {
            if (
                Nombre !== "" &&
                Direccion !== "" &&
                tipoInmueble !== null &&
                selectedCountry !== null &&
                selectedCity !== null &&
                Cocina !== "" &&
                Lavado !== "" &&
                Patio !== "" &&
                Balcon !== "" &&
                Estacionamiento !== "" &&
                Elevador !== "" &&
                Piscina !== "" &&
                AreaPublicas !== "" &&
                Fumar !== "" &&
                Mascotas !== "" &&
                Reuniones !== "" &&
                Descripcion !== "" &&
                Indicaciones !== "" &&
                Images.length > 0
            ) {
                return true;
            } else {
                return false;
            }
        };

        // Actualizar estado de formCompleted
        setFormCompleted(isFormCompleted());
    }, [Nombre, Direccion, tipoInmueble, selectedCountry, selectedCity, Pisos, Habitaciones, BanosCom, BanosMed, Cocina, Lavado, Patio, Balcon, Estacionamiento, Elevador, Piscina, AreaPublicas, Fumar, Mascotas, Reuniones, Descripcion, Indicaciones, Images]);

    const handleErrorAlertClose = () => {
    setFailure(false); 
    };

    const handleSuccessAlertClose = () => {
        navigate('/home/infoInmueble/1/'+Id);
      };
        
    return (
        <>
            <div className="main-container">
                <Fieldset legend={titulo}>
                    <form onSubmit={GuardarInmueble}>
                        <div className="p-fluid grid">                            
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-10">
                                <span className="p-float-label">
                                    <InputText 
                                        id="Name" 
                                        value={Nombre} 
                                        onChange={(e) => setNombre(e.target.value)} 
                                        className="Name" 
                                        aria-describedby="username-help" 
                                    />
                                    <label htmlFor="firstName">Nombre</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">
                                    <InputText 
                                        id="Direccion" 
                                        value={Direccion} 
                                        onChange={(e) => setDireccion(e.target.value)} 
                                        className="Direccion" 
                                    />
                                    <label>Direccion</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">                                     
                                    <Dropdown
                                        value={tipoInmueble}
                                        options={tipoInmuebleOptions}
                                        onChange={(e) => setTipoInmueble(e.value)}                                        
                                        optionLabel="label"
                                        placeholder="Seleccione"
                                        className="TipoInmueble"
                                    />
                                    <label>Tipo de Inmueble</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">
                                    <Dropdown
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.value)}
                                    options={countryOptions}
                                    optionLabel="label"
                                    placeholder="Seleccione"
                                    />
                                    <label>Pais</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">
                                    <Dropdown
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.value)}
                                    options={cityOptions}
                                    optionLabel="label"
                                    placeholder="Seleccione"
                                    appendTo="self"
                                    />
                                    <label>Ciudad</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                        value={Pisos} 
                                        onValueChange={(e: any) => setPisos(e.value)} 
                                        className="Pisos" 
                                        useGrouping={false} min={0} 
                                    />
                                    <label>Pisos</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                        value={Habitaciones} 
                                        onValueChange={(e: any) => setHabitaciones(e.value)} 
                                        className="Habitaciones" 
                                        min={0} 
                                    />
                                    <label>Habitaciones</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                        value={BanosCom} 
                                        onValueChange={(e: any) => setBanosCom(e.value)} 
                                        className="BanosCom" 
                                        min={0} 
                                    />
                                    <label>Baños Completos</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                        value={BanosMed} 
                                        onValueChange={(e: any) => setBanosMed(e.value)} 
                                        className="BanosMed" 
                                        min={0} 
                                    />
                                    <label>Baños Medios</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Cocina</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Cocina1" 
                                        name="Cocina" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setCocina(e.value)} 
                                        checked={Cocina === '1'} 
                                    />
                                    <label htmlFor="Cocina1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Cocina2" 
                                        name="Cocina" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setCocina(e.value)} 
                                        checked={Cocina === '0'} 
                                    />
                                    <label htmlFor="Cocina2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-1"></div>                            
                            <div className="field col-12 lg:col-1"></div>                            
                            <div className="field col-12 lg:col-2">
                                <label>Lavado</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Cocina1" 
                                        name="Lavado" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setLavado(e.value)} 
                                        checked={Lavado === '1'} 
                                    />
                                    <label htmlFor="Lavado1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Lavado2" 
                                        name="Lavado" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setLavado(e.value)} 
                                        checked={Lavado === '0'} 
                                    />
                                    <label htmlFor="Lavado2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Patio</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Patio1" 
                                        name="Patio" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setPatio(e.value)} 
                                        checked={Patio === '1'} 
                                    />
                                    <label htmlFor="Patio1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Patio2" 
                                        name="Patio" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setPatio(e.value)} 
                                        checked={Patio === '0'} 
                                    />
                                    <label htmlFor="Patio2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Balcon</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Balcon1" 
                                        name="Balcon" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setBalcon(e.value)} 
                                        checked={Balcon === '1'} 
                                    />
                                    <label htmlFor="Balcon1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Balcon2" 
                                        name="Balcon" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setBalcon(e.value)} 
                                        checked={Balcon === '0'} 
                                    />
                                    <label htmlFor="Balcon2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Estacionamiento</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Estacionamiento1" 
                                        name="Estacionamiento" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setEstacionamiento(e.value)} 
                                        checked={Estacionamiento === '1'} 
                                    />
                                    <label htmlFor="Estacionamiento1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Estacionamiento2" 
                                        name="Estacionamiento" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setEstacionamiento(e.value)} 
                                        checked={Estacionamiento === '0'} 
                                    />
                                    <label htmlFor="Estacionamiento2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Elevador</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Elevador1" 
                                        name="Elevador" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setElevador(e.value)} 
                                        checked={Elevador === '1'} 
                                    />
                                    <label htmlFor="Elevador1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Elevador2" 
                                        name="Elevador" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setElevador(e.value)} 
                                        checked={Elevador === '0'} 
                                    />
                                    <label htmlFor="Elevador2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>                            
                            <div className="field col-12 lg:col-2">
                                <label>Piscina</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Piscina1" 
                                        name="Piscina" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setPiscina(e.value)} 
                                        checked={Piscina === '1'} 
                                    />
                                    <label htmlFor="Piscina1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Piscina2" 
                                        name="Piscina" value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setPiscina(e.value)} 
                                        checked={Piscina === '0'} 
                                    />
                                    <label htmlFor="Piscina2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Area Publicas</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="AreaPublicas1" 
                                        name="AreaPublicas" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setAreaPublicas(e.value)} 
                                        checked={AreaPublicas === '1'} 
                                    />
                                    <label htmlFor="AreaPublicas1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="AreaPublicas2" 
                                        name="AreaPublicas" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setAreaPublicas(e.value)} 
                                        checked={AreaPublicas === '0'} 
                                    />
                                    <label htmlFor="AreaPublicas2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Fumar</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Fumar1" 
                                        name="Fumar" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setFumar(e.value)} 
                                        checked={Fumar === '1'} 
                                    />
                                    <label htmlFor="Fumar1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Fumar2" 
                                        name="Fumar" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setFumar(e.value)} 
                                        checked={Fumar === '0'} 
                                    />
                                    <label htmlFor="Fumar2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Mascotas</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Mascotas1" 
                                        name="Mascotas" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setMascotas(e.value)} 
                                        checked={Mascotas === '1'} 
                                    />
                                    <label htmlFor="Mascotas1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Mascotas2" 
                                        name="Mascotas" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setMascotas(e.value)} 
                                        checked={Mascotas === '0'} 
                                    />
                                    <label htmlFor="Mascotas2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-2">
                                <label>Reuniones</label>
                                <div className="flex align-items-center">
                                    <RadioButton 
                                        inputId="Reuniones1" 
                                        name="Reuniones" 
                                        value="1" 
                                        onChange={(e: RadioButtonChangeEvent) => setReuniones(e.value)} 
                                        checked={Reuniones === '1'} 
                                    />
                                    <label htmlFor="Reuniones1" className="ml-2">Si</label>
                                    <RadioButton 
                                        inputId="Reuniones2" 
                                        name="Reuniones" 
                                        value="0" 
                                        onChange={(e: RadioButtonChangeEvent) => setReuniones(e.value)} 
                                        checked={Reuniones === '0'} 
                                    />
                                    <label htmlFor="Reuniones2" className="ml-2">No</label>
                                </div>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">
                                    <InputTextarea 
                                        value={Descripcion} 
                                        onChange={(e) => setDescripcion(e.target.value)} 
                                        rows={5} 
                                        cols={30} 
                                        className="Descripcion" 
                                    />
                                    <label>Descripcion</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-5">
                                <span className="p-float-label">
                                    <InputTextarea 
                                        value={Indicaciones} 
                                        onChange={(e) => setIndicaciones(e.target.value)} 
                                        rows={5} 
                                        cols={30} 
                                        className="Indicaciones" 
                                    />
                                    <label>Indicaciones</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-3">                           
                                <span className="p-float-label">
                                    <Dropdown 
                                        value={Status} 
                                        options={optionsStatus} 
                                        onChange={(e) => setStatus(e.value)}
                                        optionLabel="label"
                                        placeholder="Seleccione" 
                                    />
                                    <label>Estado</label>   
                                </span>                            
                            </div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                         value={Capacidad} 
                                         onValueChange={(e: any) => setCapacidad(e.value)} 
                                         className="Capacidad" 
                                         useGrouping={false} min={0} 
                                    />
                                    <label>capacidad</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-3">                           
                                <span className="p-float-label">
                                    <Dropdown 
                                        value={moneda} 
                                        options={tipoMoneda.tiposMoneda} 
                                        onChange={(e) => setMoneda(e.value)}
                                        optionLabel="label"
                                        placeholder="Seleccione" 
                                    />
                                    <label>Moneda</label>   
                                </span>                            
                            </div>
                            <div className="field col-12 lg:col-2">
                                <span className="p-float-label">
                                    <InputNumber 
                                         value={Precio} 
                                         onValueChange={(e: any) => setPrecio(e.value)} 
                                         className="Precio" 
                                         useGrouping={false} min={0} 
                                    />
                                    <label>Precio</label>
                                </span>
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-10">
                                <div className="card">
                                    <div>
                                        <Button label="Seleccionar archivos" icon="pi pi-upload" onClick={handleFileSelect} type="button"/>
                                        <input id="file-input" type="file" multiple style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                    {Images && Images.length > 0 && (
                                        <div>
                                            <h3>Imágenes seleccionadas:</h3>
                                            <ul>
                                                {Array.from(Images).map((image: any, index: number) => (
                                                    <li key={index}>
                                                        <img src={imagePreviews[index]} alt={image.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                                        <Button icon="pi pi-times" onClick={() => handleRemoveImage(index)} className="p-button-danger" type="button"/>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    </div>                                
                                </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-2"></div>
                            <div className="field col-12 lg:col-4">
                                <Button 
                                    type="submit" 
                                    label="Guardar" 
                                    icon="pi pi-check"
                                    disabled={!formCompleted}
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
                        </div>
                    </form>
                </Fieldset>
                {success ? <GeneralSuccessAlert header={idInmueble != null && idInmueble != 0 ? "Modificar del inmueble" : "Creacion del inmueble"} text={idInmueble != null && idInmueble != 0 ? "Inmueble actualizado exitosamente" : "Inmueble creado exitosamente"}  onClose={handleSuccessAlertClose}/> : <div></div>}
                {failure && (
                    <ErrorAlert
                    header={idInmueble != null && idInmueble != 0 ? "Error al modificar del inmueble" : "Error al crear el inmueble"}
                    text="Ha ocurrido un error al guardar la informacion del inmueble"
                    onClose={handleErrorAlertClose}
                    />
                )}
            </div>
        </>
    );
}

export default EditInmueble;
