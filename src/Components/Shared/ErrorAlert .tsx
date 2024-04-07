import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ChildProps {
    header: string; 
    text: string; 
    onClose: () => void;
}

const ErrorAlert:React.FC<ChildProps> = ({ header, text, onClose }) => {
    const [visible, setVisible] = useState(true);
    const handleClose = () => {
        setVisible(false);
        onClose(); 
    };
    
    return (
        <Dialog visible={visible} onHide={handleClose} header={header} modal style={{ width: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
            <AiOutlineCloseCircle  style={{ color: 'red', marginRight: '0.5rem', fontSize: '1.5rem', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>{text}</span>
        </div>
        </Dialog>
    );
};

export default ErrorAlert;
