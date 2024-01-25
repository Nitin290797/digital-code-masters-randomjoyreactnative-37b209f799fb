const initialState = {
    data: {},
    loading: false,
    error: false,
    sound: true,
    notificationList: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'ASSET_LOAD':
            return {...state, data: {}, loading: true, error: false};
        case 'ASSET_SUCCESS':
            return {...state, data: payload, loading: false, error: false};
        case 'ASSET_FAIL':
            return {...state, data: {}, loading: false, error: true};
        case 'NOTIFICATIONS_LOAD':
            return {...state, notificationList: {}, loading: true, error: false};
        case 'NOTIFICATONS_SUCCESS':
            return {...state, notificationList: payload, loading: false, error: false};
        case 'NOTIFICATIONS_FAIL':
            return {...state, notificationList: {}, loading: false, error: true};
        case 'SET_SOUND':
            return {...state, sound: payload}
        default:
            return state;
    }
  };