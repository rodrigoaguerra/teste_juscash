
export const getLeads = async () => {
  const leadsArray = JSON.parse(localStorage.getItem('leads')) || [];
  
  return leadsArray;
};

export const createLead = async (newLead, leadsArray) => {
  
  // Adiciona o novo lead ao array
  leadsArray.push(newLead);

  // Salva o array atualizado no localStorage
  localStorage.setItem('leads', JSON.stringify(leadsArray));
  
  return leadsArray;
}

export const updateStatusLead = async (leadUpdate) => {
  const leadsArray = await getLeads();
  
  // atualiza item no array
  const leads = leadsArray.map((l) => (leadUpdate.id === l.id) ? leadUpdate : l );
  
  // Salva o array atualizado no localStorage
  localStorage.setItem('leads', JSON.stringify(leads));

  return leads;
}
