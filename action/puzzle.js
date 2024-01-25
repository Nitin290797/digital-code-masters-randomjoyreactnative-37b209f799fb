import * as api from '../api/puzzle';
import Toast from 'react-native-toast-message';

export const getPuzzle = (token) => {
    return dispatch => {
        dispatch({ type: 'PUZZLE_LOAD' });
        console.log("hello")
        return api.randomPuzzle(token)
            .then(async data => {
                dispatch({ type: 'PUZZLE_SUCCESS', payload: data });
            })
            .catch(err => {
                console.log(err.response.data,"hello error");
                dispatch({ type: 'PUZZLE_FAIL' });
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch data'
                })
            })
    }
}
