const initialState = {
    data: [],
    loading: false,
    error: false
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'CATEGORY_LOAD':
            return {...state, data: [], loading: true, error: false};
        case 'CATEGORY_SUCCESS':
            return {...state, data: payload, loading: false, error: false};
        case 'CATEGORY_FAIL':
            return {...state, data: [], loading: false, error: true};
        default:
            return state;
    }
  };