import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import PhoneInput from './_Common/PhoneInput';
import useErrorHandling from '../hooks/useErrorMessage';
import useLeads from '../hooks/useLeads';
import { useActions } from '../hooks';
import * as Actions from '../views/Redux/actions';

export default function Modal({ title, type, open, lead = false, handleClose, handleClickOpen }) {
    const [name, setName] = React.useState(type === 'edit' ? lead.name : '');
    const [email, setEmail] = React.useState(type === 'edit' ? lead.email : '');
    const [phone, setPhone] = React.useState(type === 'edit' ? lead.phone : '');
    const [all, setAll] = React.useState(false);
    const [sucumbenciais, setSucumbenciais] = React.useState(false);
    const [contratuais, setContratuais] = React.useState(false);
    const [dativos, setDativos] = React.useState(false);
    const [autor, setAutor] = React.useState(false);

    const actions = useActions(Actions);

    const { handleError, ErrorAlertComponent } = useErrorHandling();
    const { error, validate, store } = useLeads(handleError);

    React.useEffect(() => {
       if(lead) {
            setName(lead.name);
            setEmail(lead.email);
            setPhone(lead.phone);
            setAll(lead?.all ?? false);
            setSucumbenciais(lead?.sucumbenciais ?? false);
            setContratuais(lead?.contratuais ?? false);
            setDativos(lead?.dativos ?? false);
            setAutor(lead?.autor ?? false);
       } 
    }, [lead])

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
 
        // valida dados do lead
        validate(event.currentTarget);

        if(!error.type) {
            // salva dados do lead no localStorange
            const res = store(event.currentTarget, actions);
            
            if(res) {
                // limpa os campos
                setPhone('');
                setName('');
                setEmail('');
                setSucumbenciais(false);
                setContratuais(false);
                setDativos(false);
                setAutor(false);
                
                // fecha o modal
                handleClose(false);
            }
        }
    };

    const handleCheckAll = (event) => {
        setAll(event.target.checked);
        setSucumbenciais(event.target.checked);
        setContratuais(event.target.checked);
        setDativos(event.target.checked);
        setAutor(event.target.checked);
    }

    return (
        <React.Fragment>
            {type === 'create' && <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Novo Lead
            </Button>}
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <Box component="form" onSubmit={handleSubmit} >
                    <DialogTitle sx={{ m: 0, p: 2 }} >
                    { title }
                    </DialogTitle>
                    <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Dados do Lead
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome Completo"
                            name="name"
                            type="text"
                            autoComplete="name"
                            disabled={type === 'edit'}
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            disabled={type === 'edit'}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <PhoneInput name="phone" label="Telefone" value={phone} onChange={handlePhoneChange} required={true} disabled={type === 'edit'} />
                        <Typography gutterBottom>
                            Oportunidades
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name='all' onChange={handleCheckAll}/>} checked={all} label="Todos" />
                            <FormControlLabel control={<Checkbox name='sucumbenciais' onChange={(event) => setSucumbenciais(event.target.checked)} checked={sucumbenciais} />} label="Honorários Sucumbenciais" />
                            <FormControlLabel control={<Checkbox name='contratuais' onChange={(event) => setContratuais(event.target.checked)} checked={contratuais} />} label="Honorários Contratuais" />
                            <FormControlLabel control={<Checkbox name='dativos' onChange={(event) => setDativos(event.target.checked)} checked={dativos} />} label="Honorários Dativos" />
                            <FormControlLabel control={<Checkbox name='autor' onChange={(event) => setAutor(event.target.checked)} checked={autor} />} label="Crédito do Autor" />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" type='submit' >Salvar</Button>  
                    </DialogActions>
                </Box>
            </Dialog>
            {ErrorAlertComponent}
        </React.Fragment>
    );
}
