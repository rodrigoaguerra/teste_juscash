import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from './Modal';
import { useActions } from '../hooks';
import * as Actions from '../redux/actions';

function App({ leads }) {
    const actions = useActions(Actions);
    // Estado inicial da tabela, onde cada coluna contém um objeto com nome, email e telefone
    const [tableData, setTableData] = useState([]);

    // popula o array de leads na tabela
    React.useEffect(() => {
        if(leads) {
            setTableData(leads.map((lead, index) => {
                return {
                    id: index,
                    column1: lead.status === 'Cliente potencial' ? lead : null,
                    column2: lead.status === 'Dados confirmados' ? lead : null,
                    column3: lead.status === 'Analise do lead' ? lead : null,
                }
            }));
        }
    }, [leads]);

    // Estado para armazenar o conteúdo arrastado
    const [draggedItem, setDraggedItem] = useState(null);

    // Função para começar a arrastar
    const handleDragStart = (e, item, column) => {
        setDraggedItem({ item, column });
    };

    // Função para permitir que o item seja arrastado sobre uma célula
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Função para soltar o item na célula de destino
    const handleDrop = (e, targetItem, targetColumn) => {
        e.preventDefault();

        // Impede que o drop ocorra em colunas não permitidas
        if (
        draggedItem.item.id === targetItem.id &&
        draggedItem.column !== targetColumn &&
        !(
            (draggedItem.column === 'column2' && targetColumn === 'column1') ||
            (draggedItem.column === 'column1' && targetColumn === 'column3') ||
            (draggedItem.column === 'column3' && (targetColumn === 'column1' || targetColumn === 'column2'))
        )
        ) {
        setTableData((prevData) =>
            prevData.map((row) => {
            if (row.id === targetItem.id) {
                const lead = row[draggedItem.column]; // dados do lead arrastado

                // atualiza o status do lead local
                if(targetColumn === 'column1') {
                    lead.status = 'Cliente potencial';
                } else if(targetColumn === 'column2') {
                    lead.status = 'Dados confirmados';
                } else if(targetColumn === 'column3') {
                    lead.status = 'Analise do lead';
                }

                // atualiza o status do lead no localStorage
                actions.updateStatusLead(lead);

                return {
                ...row,
                [targetColumn]: draggedItem.item[draggedItem.column],
                [draggedItem.column]: null
                };
            }
            return row;
            })
        );
        }
        setDraggedItem(null);
    };

    // modal para visualização do lead
    const [open, setOpen] = React.useState(false);
    const [lead, setLead] = React.useState();

    const handleClick = (lead) => {
        setLead(lead);
        setOpen(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Função para renderizar o conteúdo da célula
    const renderCellContent = (data) => {
        if (!data) return '';
        return (
            <div onClick={() => handleClick(data)} style={{ cursor: 'pointer' }}>
                <strong>{data.name}</strong>
            </div>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: 1}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente Potencial</TableCell>
                        <TableCell>Dados Confirmados</TableCell>
                        <TableCell>Analise do Lead</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell
                                draggable
                                onDragStart={(e) => handleDragStart(e, row, 'column1')}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, row, 'column1')}
                            >
                                {renderCellContent(row.column1)}
                            </TableCell>
                            <TableCell
                                draggable={row.column2 !== null}  // Permitir arrastar apenas se a célula não estiver vazia
                                onDragStart={(e) => handleDragStart(e, row, 'column2')}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, row, 'column2')}
                            >
                                {renderCellContent(row.column2)}
                            </TableCell>
                            <TableCell
                                draggable={row.column3 !== null}  // Permitir arrastar apenas se a célula não estiver vazia
                                onDragStart={(e) => handleDragStart(e, row, 'column3')}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, row, 'column3')}
                            >
                                {renderCellContent(row.column3)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal 
                title="Lead" 
                type="edit" 
                open={open} 
                lead={lead}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}  
                />
        </TableContainer>
    );
}

export default App;
