import * as api from '../api/auth';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (navigation, payload,setLoginOpen) => {
    return dispatch => {
        dispatch({type: 'AUTH_LOAD'});
        return api.login(payload)
                .then(async data => {
                    dispatch({type: 'AUTH_SUCCESS', payload: data.user});
                    dispatch({type: 'SET_TOKEN', payload: data.token});
                    AsyncStorage.setItem('token', data.token)
                    setLoginOpen(false)
                    console.log(data);
                    if (!data.user.is_skipped) {
                        navigation.navigate('Interests');
                    } else {
                        navigation.navigate('Main');
                    }
                })
                .catch(err => {
                    dispatch({type: 'AUTH_FAIL'});
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed'
                })
        })
    }
}
export const register = (payload, setSignonOpen, navigation, resetForm) => {
    return async dispatch => {
        dispatch({type: 'AUTH_LOAD'});
        return api.register(payload)
                .then(data => {
                    console.log(data);
                    if (data.status !== 200) {
                        Toast.show({
                            type: 'error',
                            text1: 'Register Failed',
                        })
                    } else {
                        resetForm();
                        dispatch({type: 'AUTH_SUCCESS', payload: data.data.user});
                        dispatch({type: 'SET_TOKEN', payload: data.data.token});
                        AsyncStorage.setItem('token', data.data.token)
                        setSignonOpen(false)
                        navigation.navigate('Interests');
                    }
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    dispatch({type: 'AUTH_FAIL'});
                    Toast.show({
                        type: 'error',
                        text1: 'Register Failed',
                        text2: err.response.data.error
                    })
                })
    }
}

export const getAuthDetails = (token, navigation, setLoading = () => {}) => {
    return dispatch => {
        console.log(1)
        dispatch({type: 'AUTH_LOAD'});
        console.log(2)
        return api.details(token)
            .then(async data => {
                setLoading(false)
                dispatch({type: 'AUTH_SUCCESS', payload: data});
            })
            .catch(err => {
                console.log(4)
                setLoading(false)
                console.log(err.response.data);
                if (err.response.data.error === 'jwt expired') {
                    navigation.navigate('Home')
                }
                dispatch({type: 'AUTH_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: err.response.data.error
            })
        })
    }
}

export const update = (payload, id, token, setHelp, setLoading, navigation) => {
    console.log('payload', payload, id, token)
    return dispatch => {
        return api.update(payload, id, token)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'User updated Successfully',
                })
                setHelp(false)
                dispatch(getAuthDetails(token, navigation, setLoading))
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update data'
            })
        })
    }
    
}

export const setToken = (token) => {
    return dispatch => {
        dispatch({type: 'SET_TOKEN', payload: token})
    }
} 


export const logout = async (navigation) => {
    await AsyncStorage.removeItem('token')
        .then(() => navigation.navigate("Home"));
  };