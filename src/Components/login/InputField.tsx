// InputField.js
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

// Definir tipos de las props
type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  defaultValue?: string;  // Agregado para establecer el valor inicial
  onChange: Dispatch<SetStateAction<string>>;
};

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, value, defaultValue, onChange }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="form-button">
        <label htmlFor={name} className="label-style">{label}</label>
        <input
          type="text"
          className='input-div'
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputField;
