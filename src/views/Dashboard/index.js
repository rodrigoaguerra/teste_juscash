import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { useSelector, useActions } from '../../hooks';
import * as Actions from '../../redux/actions';

export default function Dashboard() {
  const navigate = useNavigate();
  const actions = useActions(Actions);

  const { leads } = useSelector('root');

  // modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Recupera o usuário do localStorage
        const user = JSON.parse(localStorage.getItem('user')) || false;
        
        // Se usuário não autenticado redireciona para o login
        if(!user) {
          navigate('/'); 
        } else {
          actions.getLeads();
        }
      } catch (error) {
        // Em caso de erro, atualiza o estado de erro
        console.error('auth error:', error);
      }
    };

    // Chama a função assíncrona
    fetchData();
  }, [navigate, actions]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div>
              <img src={`${process.env.PUBLIC_URL}/logo-juscash-white.svg`} alt="Logo" />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
        </Grid>
        {/* Recent Deposits */}
        <Grid item justifyContent="flex-end" xs={12} md={4} lg={3} >
          <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Modal 
                title="Novo Lead" 
                type="create" 
                open={open} 
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}  />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Table leads={leads} />
        </Grid>
      </Grid>
    </>
  );
}