const initialState = {
    statement: [],
    loading: false,
    error: false,
    commitment: [],
    commitmentList: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'STATEMENT_LOAD':
            return {...state, statement: [], loading: true, error: false};
        case 'STATEMENT_SUCCESS':
            return {...state, statement: payload, loading: false, error: false};
        case 'STATEMENT_FAIL':
            return {...state, statement: [], loading: false, error: true};
        case 'COMMITMENT_LOAD':
            return {...state, commitment: [], loading: true, error: false};
        case 'COMMITMENT_SUCCESS':
            return {...state, commitment: payload, loading: false, error: false};
        case 'COMMITMENT_FAIL':
            return {...state, commitment: [], loading: false, error: true};
        case 'COMMITMENT_LIST_LOAD':
            return {...state, commitmentList: [], loading: true, error: false};
        case 'COMMITMENT_LIST_SUCCESS':
            return {...state, commitmentList: payload, loading: false, error: false};
        case 'COMMITMENT_LIST_FAIL':
            return {...state, commitmentList: [], loading: false, error: true};
        default:
            return state;
    }
  };