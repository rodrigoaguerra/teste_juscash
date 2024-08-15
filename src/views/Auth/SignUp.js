import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import useErrorHandling from '../../hooks/useErrorMessage';
import useSignUp from '../../hooks/useSingUp';

const SignUpButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
});

export default function SignUp(props) {
  const { setForm } = props;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleError, ErrorAlertComponent } = useErrorHandling();
  
  const { error, validate, submit } = useSignUp(handleError);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // valida o formulário
    validate(event.currentTarget);

    // verifica se houve erro
    if(!error.type) {
      submit(event.currentTarget); // salva dados do usuário
      setForm('Sign In'); // redireciona para o login
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            id="name"
            label="Seu nome completo"
            autoFocus
            error={error.type === 'name'}
            helperText={error.type === 'name' && error.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type='email'
            autoComplete="email"
            error={error.type === 'email'}
            helperText={error.type === 'email' && error.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required variant="outlined" error={error.type === 'password'}>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Senha"
              required
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error.type === 'password' && <FormHelperText> {error.message} </FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required variant="outlined" error={error.type === 'confirm_password'}>
            <InputLabel htmlFor="confirm-password">Confirme sua senha</InputLabel>
            <OutlinedInput
              id="confirm-password"
              name='confirm_password'
              label="Confirme sua senha"
              required
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error.type === 'confirm_password' && <FormHelperText> {error.message} </FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item sx={{ mt: 3 }}>
          <Link onClick={() => setForm('Sign In')} variant="body2" sx={{ cursor: 'pointer' }}>
            {"Já possui uma conta? Fazer o login"}
          </Link>
        </Grid>
      </Grid>
      <SignUpButton
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="success"
        disableRipple
      >
        Criar conta
      </SignUpButton>
      {ErrorAlertComponent}
    </Box>
  );
}
