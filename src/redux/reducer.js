import { REQUEST, SUCCESS, FAILURE, CREATE_LEAD, EDIT_LEAD } from './types';

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

    case CREATE_LEAD: 
        return { ...state, leads: payload };

    case EDIT_LEAD: 
        return { ...state, leads: payload };
            
    default:
        return state;
  }
};

export default reducer;