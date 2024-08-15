import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useErrorHandling from '../../hooks/useErrorMessage';
import useSignIn from '../../hooks/useSingIn';

export default function SignInSide(props) {
  const { setForm } = props;

  const navigate = useNavigate();
  
  const { handleError, ErrorAlertComponent } = useErrorHandling();
  
  const { error, login } = useSignIn(handleError);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // executa o login
    login(event.currentTarget);
  };

  React.useEffect(() => {
    // redireciona para o dashboard se o usuário estiver autenticado
    if(error.type === false) {
      navigate('/dashboard');
    }
  }, [navigate,error]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link onClick={() => setForm('Sign Up')} variant="body2" sx={{ cursor: 'pointer' }}>
            {"Criar uma conta?"}
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>
      {ErrorAlertComponent}
    </Box>
  );
}
