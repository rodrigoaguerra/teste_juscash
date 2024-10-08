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
import * as Actions from '../redux/actions';

export default function Modal({ title, type, open, lead = false, handleClose, handleClickOpen }) {
    const [name, setName] = React.useState(type === 'edit' ? lead.name : '');
    const [email, setEmail] = React.useState(type === 'edit' ? lead.email : '');
    const [phone, setPhone] = React.useState(type === 'edit' ? lead.phone : '');
    const [all, setAll] = React.useState(type === 'create');
    const [sucumbenciais, setSucumbenciais] = React.useState(type === 'create');
    const [contratuais, setContratuais] = React.useState(type === 'create');
    const [dativos, setDativos] = React.useState(type === 'create');
    const [autor, setAutor] = React.useState(type === 'create');

    const actions = useActions(Actions);

    const [error, setError ] = React.useState(null);
    const { handleError, ErrorAlertComponent } = useErrorHandling();
    const { validate, store } = useLeads(handleError);

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

    // limpa os campos e fecha o modal
    const handleModalClose = () => {
        setPhone('');
        setName('');
        setEmail('');
        setAll(true);
        setSucumbenciais(true);
        setContratuais(true);
        setDativos(true);
        setAutor(true);

        handleClose(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
 
        // valida dados do lead
        const val = validate(event.currentTarget);

        if(val === false) {
            // salva dados do lead no localStorange
            const res = store(event.currentTarget, actions);
            
            if(res) {
                handleModalClose();
            } else  {
                setError({ type: 'add_lead', message: 'Um lead já foi cadastrado com esse e-mail!' }); // input
                handleError('Um lead já foi cadastrado com esse e-mail!'); // alert
            }
        } else {    
            setError(val);
            handleError(val?.message ?? 'Não foi possivel criar o lead!');
        }
    };

    const handleOnChangeCheck = (event) => {
        switch(event.target.name) {
            case 'sucumbenciais':
                setSucumbenciais(event.target.checked);
                break;
            case 'contratuais':
                setContratuais(event.target.checked);
                break;
            case 'dativos':
                setDativos(event.target.checked);
                break;
            case 'autor':
                setAutor(event.target.checked);
                break;
            default: // all
                //setAll();
                setSucumbenciais(event.target.checked);
                setContratuais(event.target.checked);
                setDativos(event.target.checked);
                setAutor(event.target.checked);
                break;
        }
    }

    // marca checkbox todos quando todos estiverem selecionado
    React.useEffect(() => {
        setAll(sucumbenciais && contratuais && dativos && autor);
    }, [sucumbenciais, contratuais, dativos, autor]); 
    
    return (
        <React.Fragment>
            {type === 'create' && <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Novo Lead
            </Button>}
            <Dialog
                onClose={handleModalClose}
                open={open}
            >
                <Box component="form" onSubmit={handleSubmit} >
                    <DialogTitle sx={{ m: 0, p: 2 }} >
                    { title }
                    </DialogTitle>
                    <IconButton
                    aria-label="close"
                    onClick={handleModalClose}
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
                            error={error?.type === 'name'}
                            helperText={error?.type === 'name' && error.message}
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
                            error={error?.type === 'email'}
                            helperText={error?.type === 'email' && error.message}
                        />
                        <PhoneInput name="phone" label="Telefone" value={phone} onChange={handlePhoneChange} required={true} disabled={type === 'edit'}  error={error} />
                        <Typography gutterBottom>
                            Oportunidades
                        </Typography>
                        <FormGroup>
                            <FormControlLabel 
                                control={<Checkbox 
                                    name='all' 
                                    onChange={handleOnChangeCheck} 
                                    checked={all}
                                    />} 
                                label="Todos" 
                                disabled={type === 'edit'} />
                            <FormControlLabel 
                                control={<Checkbox 
                                    name='sucumbenciais' 
                                    onChange={handleOnChangeCheck} 
                                    checked={sucumbenciais} />} 
                                label="Honorários Sucumbenciais" 
                                disabled={type === 'edit'} />
                            <FormControlLabel 
                                control={<Checkbox 
                                    name='contratuais' 
                                    onChange={handleOnChangeCheck} 
                                    checked={contratuais} />} 
                                label="Honorários Contratuais" 
                                disabled={type === 'edit'} />
                            <FormControlLabel 
                                control={<Checkbox 
                                    name='dativos' 
                                    onChange={handleOnChangeCheck} 
                                    checked={dativos} />} 
                                label="Honorários Dativos" 
                                disabled={type === 'edit'} />
                            <FormControlLabel 
                                control={<Checkbox 
                                    name='autor' 
                                    onChange={handleOnChangeCheck} 
                                    checked={autor} />} 
                                label="Crédito do Autor" 
                                disabled={type === 'edit'} />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleModalClose}>
                            {type === 'create' ? 'Cancelar' : 'Fechar'}
                        </Button>
                        {type === 'create' && <Button variant="contained" type='submit' >Salvar</Button>}  
                    </DialogActions>
                </Box>
            </Dialog>
            {ErrorAlertComponent}
        </React.Fragment>
    );
}
