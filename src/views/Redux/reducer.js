import { REQUEST, SUCCESS, FAILURE, SET_LEAD, CREATE_LEAD, EDIT_LEAD, DELETE_LEAD } from './types';

const INITIAL_STATE = {
  loading: false,
  success: false,
  leads: null,
  lead: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case REQUEST:
        return { ...state, loading: true, success: false, };

    case SUCCESS:
        return { ...state, loading: false, success: true, leads: payload };

    case FAILURE:
        return { ...state, loading: false };

    case SET_LEAD:
        return { ...state, lead: payload };
    
    case CREATE_LEAD: 
        return { ...state, leads: payload };

    case EDIT_LEAD: 
        return { ...state, leads: payload };
    
    case DELETE_LEAD:
        // atualiza array de clientes
        const leads = state.leads.filter(({ _id }) => _id !== payload._id);
        return { ...state, leads };
            
    default:
        return state;
  }
};

export default reducer;