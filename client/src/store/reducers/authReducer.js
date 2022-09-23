const authReducer = (state = {Authorization: null, authData: null, loading: false, error: false, loginState: false}, action) => {
    switch(action.type) {
        case 'AUTH_START':
            return{...state, loading: true, error: false}
        case 'AUTH_SUCCESS':
            return{...state, Authorization: action.payload.Authorization, authData: action.payload.user, loading: false, error: false, loginState: true}
        case 'AUTH_FALSE':
            return{...state, loading: false, error: true}
        // edit user
        case 'EDIT_USER_START':
            return{...state, loading: true, error: false}
        case 'EDIT_USER_SUCCESS':
            return{...state, authData: action.payload, loading: false, error: false}
        case 'EDIT_USER_FALSE':
            return{...state, loading: false, error: true}
        // logout
        case 'AUTH_LOGOUT':
            return{Authorization: null ,authData: null, loading: false, error: false, loginState: false}
        // reget user
        case 'GET_USER_START':
            return{...state, loading: true, error: false}
        case 'GET_USER_SUCCESS':
            return{...state, loading: false, error: false, authData: action.payload.user}
        case 'GET_USER_FAILED':
            return{...state, loading: false, error: true}
        default:
            return state
    }
}

export default authReducer