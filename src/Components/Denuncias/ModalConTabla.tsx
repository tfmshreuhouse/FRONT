import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface User {
    id: number,
    nombres: string;
    apellidos: string;
    correo: string;
    perfil: string;
    status: number;
    telefono: string;
  }

interface Reserva {
    id: number,
    status: number;
    fechaInicio: string;
    fechaFin: number;
    createdAt: string;
    UserId: number;
    User: User;
    estado: string;
  }

interface ActionButton {
    icon: string;
    onClick: (rowData:Reserva) => void;
    className: string;
}

interface ColumnConfig {
    field: string;
    header: string;
}

interface DataItem {
    [key: string]: any;
}

interface ChildProps {
    visible: boolean; 
    columns: ColumnConfig[]; 
    onHide: () => void;
    data: DataItem[];
    header: string;
    actionButtons: ActionButton[]
}

const ModalConTabla:React.FC<ChildProps> = ({ visible, onHide, data, columns, header, actionButtons  }) => {
  const [first, setFirst] = useState(0); // Índice del primer elemento a mostrar
  const [rows, setRows] = useState(5); // Número de filas por página

  const onPage = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
    setFirst(event.first); // Actualizar el índice del primer elemento
    setRows(event.rows); // Actualizar el número de filas por página
  };

  const renderActionButtons = (rowData: Reserva) => {
    return (
      <div>
        {actionButtons.map((button, index) => (
          <Button
            key={index}
            icon={button.icon}
            onClick={() => button.onClick(rowData)}
            className={button.className}
            style={{ marginRight: '5px' }}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
    >
      <DataTable
        value={data}
        paginator
        rows={rows}
        first={first}
        onPage={onPage}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      >
        {columns.map((col, index) => (
          <Column 
            key={index} 
            field={col.field} 
            header={col.header} 
            style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} 
          />
        ))}
        <Column header="Acciones" body={renderActionButtons} />
      </DataTable>
    </Dialog>
  );
};

export default ModalConTabla;
