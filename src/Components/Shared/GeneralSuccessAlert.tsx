import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom'; // Para la redirección

interface ChildProps {
    header: string; 
    text: string; 
    onClose: () => void;
}

const GeneralSuccessAlert:React.FC<ChildProps> = ({ header, text, onClose }) => {
    const [visible, setVisible] = useState(true);
  
    const redirectToAnotherRoute = () => {
      setVisible(false);
      onClose();
    };
  
    return (
      <div>
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header={header}
          footer={
            <div>
              <Button label="OK" icon="pi pi-check" onClick={redirectToAnotherRoute} />
            </div>
          }
        >
          {text}
        </Dialog>
      </div>
    );
  };
  
  export default GeneralSuccessAlert;
  