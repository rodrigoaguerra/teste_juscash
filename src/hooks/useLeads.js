
function useLeads() {
    
    // valida dados do formulário novo lead
    const validate = (form) => {
        const data = new FormData(form);

        // valida nome
        if(data.get('name') === '') {
            return { type: 'name', message: 'O campo nome é obrigatório!' };
        }

        // valida email
        if(data.get('email') === '') {
            return { type: 'email', message: 'O campo email é obrigatório!' };
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(String(data.get('email')).toLowerCase())) {
            return { type: 'email', message: 'Digite um e-mail valido!' };
        }

        // valida telefone
        const phoneRegex = /^(\+55\s?)?(\(\d{2}\)\s?)?\d{4,5}-\d{4}$/;

        if (!phoneRegex.test(data.get('phone'))) {
            return { type: 'phone', message: 'Por favor, insira um número de telefone válido.' };
        }

        return false;
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
            return false;
        }
    };

    return { validate, store };
}

export default useLeads;