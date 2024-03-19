import { useState } from "react";
import axios from "axios";

function editInmueble(){
    const [url_image, setUrl_image] = useState ("");

    const changeUploadImage = async(e: any) => {
        const file = e.target.files[0];

        const data = new FormData();
        data.append("file", file);
        data.append("upload_presets", "sharehouse");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dcdrax4ou/image/upload", data
        );

        setUrl_image(response.data.secure_url);

    };

    return (
        <>
            <h1>seleccionar imagen </h1>
            <div>
                <input type="file" accept="image/*" onChange={changeUploadImage}/>
                {url_image && (
                    <div>
                        <img src={url_image} alt="" />
                        <button>eliminar imagen</button>
                    </div>
                )}                
            </div>
            
        </>
    );

}

export default editInmueble;