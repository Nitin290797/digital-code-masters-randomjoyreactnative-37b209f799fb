const initialState = {
    data: {},
    loading: false,
    error: false,
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'PUZZLE_LOAD':
            return {...state, data: {}, loading: true, error: false};
        case 'PUZZLE_SUCCESS':
            return {...state, data: payload, loading: false, error: false};
        case 'PUZZLE_FAIL':
            return {...state, data: {}, loading: false, error: true};
        default:
            return state;
    }
  };