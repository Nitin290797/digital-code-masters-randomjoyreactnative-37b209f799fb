const initialState = {
    data: {},
    loading: false,
    error: false,
    token: null
}

export default (state = initialState, {type, payload}) => {
    console.log(payload, 'payload')
    switch (type) {
        case 'AUTH_LOAD':
            return {...state, data: {}, loading: true, error: false};
        case 'AUTH_SUCCESS':
            return {...state, data: payload, loading: false, error: false, token:payload.token};
        case 'AUTH_FAIL':
            return {...state, data: {}, loading: false, error: true};
        case 'SET_TOKEN':
            return {...state, token: payload};
        default:
            return state;
    }
  };