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
import { useParams } from 'react-router-dom';

interface Country {
    place_id: string;
    display_name: string;
}

interface City {
    place_id: string;
    display_name: string;
}



function EditInmueble() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let idDetalle = 0;
    let idInmueble = 0;

    const [Images, setImages] = useState([]);
    const [links, setLinks] = useState<{ publicId: string; url: string; }[]>([]);

    const [Pisos, setPisos] = useState<number>(0);
    const [Habitaciones, setHabitaciones] = useState<number>(0);
    const [BanosCom, setBanosCom] = useState<number>(0);
    const [BanosMed, setBanosMed] = useState<number>(0);
    const [tipoInmueble, setTipoInmueble] = useState<{ id: string; tipo: string } | null>(null);
    const [tipoInmuebleOptions, setTipoInmuebleOptions] = useState<{ id: number; tipo: string }[]>([]);
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
    const [Nombre, setNombre] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Indicaciones, setIndicaciones] = useState('');
    const [Status, setStatus] = useState<number>(0);

    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const options = [
        { name: 'Si', code: '1' },
        { name: 'No', code: '0' }
    ];

    const token: string | null = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search?q=country&format=json&limit=1000');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = async (event: any) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);

        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${selectedCountry}&format=json&limit=1000`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const countryOptions = countries.map(country => ({
        label: country.display_name,
        value: country.display_name
    }));

    const cityOptions = cities.map(city => ({
        label: city.display_name,
        value: city.display_name
    }));

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
                process.env.REACT_APP_API_URL + "rest/tipos-inmuebles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Guardar los datos en el estado
            setTipoInmuebleOptions(response.data.data);
        } catch (error) {
            console.error('Error al cargar tipos de inmueble:', error);
        }
    };

    useEffect(() => {
        cargarTipoInmueble();
    }, []);

    const handleVolverClick = () => {
        navigate('/home/infoInmueble/2/1');
      };

    const GuardarInmueble = async (e: any) => {

        if (!token) {
            console.error('Token de autorización no encontrado en el localStorage');
            return;
        }

        e.preventDefault();

        try {
            let arr = [];
            for (let i = 0; i < Images.length; i++) {
                const data = await UploadImage(Images[i]);
                arr.push(data);
            }
            setLinks(arr);
        } catch (error) {
            console.log(error)
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
            status: Status
        };

        try {
            debugger;
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "rest/DetallesInmuebles",
                formDataDatail,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            idDetalle = parseInt(response.data.data.id);
        } catch (error) {
            console.error('Error al enviar los detalles del inmueble: ', error);
        }

        const FormDataInmueble = {
            DireccionesGenerales: 1,
            DireccionesParticulares: 1,
            TiposInmuebles: tipoInmueble?.id,
            DetallesInmuebles: idDetalle,
            UserId: 1
        };

        try {
            debugger;
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "rest/inmuebles",
                FormDataInmueble,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            idInmueble = parseInt(response.data.id);
        } catch (error) {
            console.error('Error al crear el Inmueble: ', error);
        }

        /*
        try {
            const response = await axios.post(
                "http://localhost:3000/rest/ImagnenesInmuebles",
                FormDataInmueble,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
        } catch (error) {
            console.error('Error al cargar url de imagenes: ', error);
        }*/
    };

    return (
        <>
            <div className="main-container">
                <Fieldset legend="Modificar del inmueble">
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
                                        onChange={(e) => setTipoInmueble(e.value)}
                                        options={tipoInmuebleOptions}
                                        optionLabel="tipo"
                                        editable
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
                                        onChange={handleCountryChange}
                                        options={countryOptions}
                                        optionLabel="label"
                                        placeholder="Select a country"
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
                                        placeholder="Select a city"
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
                            <div className="field col-12 lg:col-3">
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
                            <div className="field col-12 lg:col-3">
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
                            <div className="field col-12 lg:col-1"></div>
                            
                            <div className="field col-12 lg:col-1"></div>
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
                            <div className="field col-12 lg:col-1"></div>

                            <div className="field col-12 lg:col-1"></div>
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
                            <div className="field col-12 lg:col-1">
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
                            <div className="field col-12 lg:col-1">
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
                            <div className="field col-12 lg:col-10">
                                <div className="card">
                                    <FileUpload 
                                        name="demo[]" 
                                        url={'/api/upload'} 
                                        multiple accept="image/*" 
                                        maxFileSize={1000000} 
                                        emptyTemplate={<p className="m-0">Selecciona las imagenes a cargar</p>} 
                                        chooseLabel="Seleccionar"
                                        uploadLabel="Cargar"
                                        cancelLabel="Cancelar"
                                    />
                                </div>
                                <input type="file" multiple onChange={(e: any) => setImages(e.target.files)} />
                            </div>
                            <div className="field col-12 lg:col-1"></div>
                            <div className="field col-12 lg:col-2"></div>
                            <div className="field col-12 lg:col-4">
                                <Button 
                                    type="submit" 
                                    label="Guardar" 
                                    icon="pi pi-check"
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
            </div>
        </>
    );
}

export default EditInmueble;
