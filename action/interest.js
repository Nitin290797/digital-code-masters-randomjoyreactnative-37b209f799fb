import * as api from '../api/interest';
import Toast from 'react-native-toast-message';

export const categoryList = (token) => {
    return dispatch => {
        dispatch({type: 'CATEGORY_LOAD'});
        return api.categoryList(token)
                .then(async data => {
                    dispatch({type: 'CATEGORY_SUCCESS', payload: data});
                })
                .catch(err => {
                    dispatch({type: 'CATEGORY_FAIL'});
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to fetch categories',
                        text2: err.response.data.error
                })
        })
    }
}

export const saveInterest = (navigation, id, payload, token) => {
        return api.saveInterest(id, payload, token)
                .then(async data => {
                    Toast.show({
                        type: 'success',
                        text1: 'Interest Saved Successfully',
                    })
                    navigation.navigate('Main');
                })
                .catch(err => {
                    console.log(err.response.data)
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to save interesst',
                        text2: err.response.data.msg
                })
        })
}

export const skipInterest = (navigation, id, token) => {
    return api.skipInterest(id, token)
            .then(async data => {
                Toast.show({
                    type: 'success',
                    text1: 'Interest skipped',
                })
                navigation.navigate('Main');
            })
            .catch(err => {
                console.log(err.response.data)
            //     Toast.show({
            //         type: 'error',
            //         text1: 'Failed to Skip interest',
            //         text2: err.response.data.msg
            // })
    })
}