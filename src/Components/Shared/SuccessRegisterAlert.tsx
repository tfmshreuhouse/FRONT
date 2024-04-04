import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom'; // Para la redirección

interface ChildProps {
    isLoginHandler: () => void; // Definir correctamente la prop handleClick
}

const SuccessfulOperationAlert:React.FC<ChildProps> = ({ isLoginHandler }) => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();
  
    const showDialog = () => {
      setVisible(true);
    };
  
    const redirectToAnotherRoute = () => {
      setVisible(false);
      isLoginHandler();
    };
  
    return (
      <div>
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Operación Exitosa"
          footer={
            <div>
              <Button label="OK" icon="pi pi-check" onClick={redirectToAnotherRoute} />
            </div>
          }
        >
          La operación se ha completado con éxito.
        </Dialog>
      </div>
    );
  };
  
  export default SuccessfulOperationAlert;
  