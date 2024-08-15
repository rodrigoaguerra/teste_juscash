import React, { useState } from 'react';
import Modal from './Modal';
import { useActions } from '../hooks';
import * as Actions from '../redux/actions';

function DragAndDropTable({ leads}) {
  const actions = useActions(Actions);
  
  const [columns, setColumns] = useState({
    col1: leads?.filter((row) => row.status === 'Cliente potencial') ?? [],
    col2: leads?.filter((row) => row.status === 'Dados confirmados') ?? [],
    col3: leads?.filter((row) => row.status === 'Analise do lead') ?? [],
  });

  // popula o array de leads em caso de reload da pagina
  React.useEffect(() => {
    setColumns({
      col1: leads?.filter((row) => row.status === 'Cliente potencial') ?? [],
      col2: leads?.filter((row) => row.status === 'Dados confirmados') ?? [],
      col3: leads?.filter((row) => row.status === 'Analise do lead') ?? [],
    });
  }, [leads]);

  const handleDragStart = (event, item, column) => {
    event.dataTransfer.setData('item', JSON.stringify(item));
    event.dataTransfer.setData('column', column);
  };

  const handleDrop = (event, targetColumn) => {
    event.preventDefault();

    const item = JSON.parse(event.dataTransfer.getData('item'));
    const sourceColumn = event.dataTransfer.getData('column');

    if (sourceColumn !== targetColumn) {
        // impede o retorn de lead para a coluna anterior
        if(['Dados confirmados', 'Analise do lead'].includes(item.status) && targetColumn === 'col1') {
          return;
        } else if(item.status === 'Analise do lead' && ['col1', 'col2'].includes(targetColumn)) {
          return;
        }

        // atualiza o item atual para a coluna anterior
        setColumns((prevColumns) => {
            
            // atualiza o status do item local
            if(targetColumn === 'col1') {
                item.status = 'Cliente potencial';
            } else if(targetColumn === 'col2') {
                item.status = 'Dados confirmados';
            } else if(targetColumn === 'col3') {
                item.status = 'Analise do lead';
            }

            // atualiza o status do item no localStorage
            actions.updateStatusLead(item);
            
            const sourceItems = prevColumns[sourceColumn].filter((i) => i.id !== item.id);
            const targetItems = [...prevColumns[targetColumn], item];

            return {
            ...prevColumns,
            [sourceColumn]: sourceItems,
            [targetColumn]: targetItems,
            };
        });
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };
  
  const [open, setOpen] = React.useState(false);
  const [lead, setLead] = React.useState();

  const handleClick = (item) => {
    setLead(item);
    setOpen(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Cliente Potencial</th>
            <th>Dados Confirmados</th>
            <th>Analise do Lead</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(columns).map((col) => (
              <td
                key={col}
                onDrop={(event) => handleDrop(event, col)}
                onDragOver={allowDrop}
                style={{ border: '1px solid black', padding: '20px', minHeight: '100px' }}
              >
                {columns[col].map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, item, col)}
                    onClick={() => handleClick(item)}
                    style={{
                      padding: '10px',
                      margin: '5px',
                      color: 'black',
                      cursor: 'grab',
                      border: '1px solid black',
                      borderRadius: '5px',
                    }}
                  >
                    <strong>{item.name}</strong>
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Modal 
        title="Lead" 
        type="edit" 
        open={open} 
        lead={lead}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}  
        />
    </div>
  );
}

export default DragAndDropTable;
