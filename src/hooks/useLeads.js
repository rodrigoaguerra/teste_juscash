import { useState } from 'react';

function useLeads(handleError) {
    const [error, setError] = useState({ type: '', message: '' });
    const [leads, setLeads] = useState([]);
    
    const load = () => {
        const leadsArray = JSON.parse(localStorage.getItem('leads')) || [];
        setLeads(leadsArray);
    }

    // valida dados do formulário novo lead
    const validate = (form) => {
        const data = new FormData(form);

        // valida nome
        if(data.get('name') === '') {
            setError({ type: 'name', message: 'O campo nome é obrigatório!' }); // input
            handleError('O campo nome é obrigatório!'); // alert
            return;
        }

        // valida email
        if(data.get('email') === '') {
            setError({ type: 'email', message: 'O campo email é obrigatório!' }); // input
            handleError('O campo email é obrigatório!'); // alert
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(String(data.get('email')).toLowerCase())) {
            setError({ type: 'email', message: 'Digite um e-mail valido!' }); // input
            handleError('Digite um e-mail valido!'); // alert
            return;
        }

        // valida telefone
        const phoneRegex = /^(\+55\s?)?(\(\d{2}\)\s?)?\d{4,5}-\d{4}$/;

        if (!phoneRegex.test(data.get('phone'))) {
            setError({ type: 'phone', message: 'Por favor, insira um número de telefone válido.' }); // input
            handleError('Por favor, insira um número de telefone válido.'); // alert
            return;
        }

        setError({ type: false, message: '' });
    };

    // salva novo lead no localStorage
    const store = (form, actions) => {
        const formData = new FormData(form);
        
        // Converte FormData para objeto
        const newLead = {};

        // gera um id unico para o lead
        newLead.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
        newLead.status = 'Cliente potencial';

        formData.forEach((value, key) => {
            newLead[key] = value;
        });

        // Recupera o array de leads do localStorage, ou inicializa um novo array
        let leadsArray = JSON.parse(localStorage.getItem('leads')) || [];
        
        // verifica se o lead ja foi inserido na base
        const lead = leadsArray.find((l) => l.email === newLead.email);

        if(!lead) {
            actions.createLead(newLead, leadsArray);

            return true;
        } else {
            setError({ type: 'add_lead', message: 'Um lead já foi cadastrado com esse e-mail!' }); // input
            handleError('Um lead já foi cadastrado com esse e-mail!'); // alert
            return false;
        }
    };

    return { leads, error, load, validate, store };
}

export default useLeads;