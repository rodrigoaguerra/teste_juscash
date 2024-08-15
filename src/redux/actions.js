import {
    REQUEST,
    SUCCESS,
    FAILURE,
    SET_LEAD,
    CREATE_LEAD,
    EDIT_LEAD,
    DELETE_LEAD,
    CANCEL,
} from './types';
import * as service from './service';

export const cancel = () => ({ type: CANCEL });

// list leads
export const getLeads = () => {
    return async (dispatch) => {
        dispatch({ type: REQUEST });
        
        // API CALL
        const res = await service.getLeads();
        
        if (Array.isArray(res)) {
            dispatch({ type: SUCCESS, payload: res});
        } else {
            dispatch({ type: FAILURE });
        }
    };
};

// local customer data
export const setCustomer = (customer) => {
    return (dispatch) => { 
        dispatch({ type: SET_LEAD, payload: customer });
    };
}

export const createLead = (lead, leadsArray) => {
    return async (dispatch) => {
        dispatch({ type: REQUEST });

        // API CALL
        const res = await service.createLead(lead, leadsArray);
        
        if (typeof res === 'object' && res !== null && !res.error) {
            dispatch({ type: CREATE_LEAD, payload: res});
        } else {
            dispatch({ type: FAILURE });
        }
    };
}

export const updateStatusLead = (leadUpdate) => {
    return async (dispatch) => {
        dispatch({ type: REQUEST });

        // API CALL
        const res = await service.updateStatusLead(leadUpdate);

        if (typeof res === 'object' && res !== null && !res.error) {
            console.log('teste...')
            dispatch({ type: EDIT_LEAD, payload: res});
            // window.location.assign("/customers");
        } else {
            // enqueueSnackbar(res.error, { variant: 'error' });
            dispatch({ type: FAILURE });
        }
    };
}

export const deleteCustomer = (_id) => {
    return async (dispatch) => {
        dispatch({ type: REQUEST });

        // API CALL
        const res = await service.deleteCustomer(_id);
        
        if (typeof res === 'object' && res !== null && !res.error) {
            // enqueueSnackbar('Cliente removido com sucesso!', { variant: 'success' });
            dispatch({ type: DELETE_LEAD, payload: res});
        } else {
            // enqueueSnackbar(res.error, { variant: 'error' });
            dispatch({ type: FAILURE });
        }
    };
}