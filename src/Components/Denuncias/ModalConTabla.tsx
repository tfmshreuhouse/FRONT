import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
}

const ModalConTabla:React.FC<ChildProps> = ({ visible, onHide, data, columns, header }) => {
  const [first, setFirst] = useState(0); // Índice del primer elemento a mostrar
  const [rows, setRows] = useState(5); // Número de filas por página

  const onPage = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
    setFirst(event.first); // Actualizar el índice del primer elemento
    setRows(event.rows); // Actualizar el número de filas por página
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
      </DataTable>
    </Dialog>
  );
};

export default ModalConTabla;
