import * as api from '../api/auth';

export const asset = (payload) => {
    return async dispatch => {
        dispatch({type: 'DATA_LOAD'});
        return api.asset(payload)
                .then(data => dispatch({type: 'DATA_SUCCESS', payload: data}))
                .catch(err => {
                    dispatch({type: 'DATA_FAIL'});
                })
    }
}