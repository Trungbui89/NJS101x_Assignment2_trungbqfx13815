import * as AuthApi from '../api/authRequest'

export const login = (formData) => (dispatch) => {
    dispatch({type: 'AUTH_START'})
    AuthApi.login(formData)
        .then( result => {
            dispatch({type: 'AUTH_SUCCESS', payload: result.data})
        })
        .catch ( err => {
            console.log(err)
            dispatch({type: 'AUTH_FALSE'})
        })
}

export const logout = () => (dispatch) => {
    dispatch({type: 'AUTH_LOGOUT'})
    dispatch({type: 'ATTENDANCE_LOGOUT'})
}

export const reGetUser = (formData) => (dispatch) => {
    dispatch({type: 'GET_USER_START'})
    AuthApi.getUser(formData)
        .then(result => {
            dispatch({type: 'GET_USER_SUCCESS', payload: result.data})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: 'GET_USER_FAILED'})
        })
}

export const editUser = (formData) => (dispatch) => {
    dispatch({type: 'EDIT_USER_START'})
    AuthApi.editUser(formData)
        .then( result => {
            dispatch({type: 'EDIT_USER_SUCCESS', payload: result.data})
            alert('Cập nhật thành công!')
        })
        .catch ( err => {
            console.log(err)
            dispatch({type: 'EDIT_USER_FALSE'})
        })
}