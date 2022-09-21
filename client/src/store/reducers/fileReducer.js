const fileReducer = ((state={imgData: null, loading: false, error: false}, action) => {
    switch(action.type) {
        case 'FILE_UPLOAD_START':
            return{...state, loading: true, error: false}
        case 'FILE_UPLOAD_SUCCESS':
            localStorage.setItem('imgData', JSON.stringify({...action?.payload}))
            return{...state, imgData: action.payload, loading: false, error: false}
        case 'FILE_UPLOAD_FALSE':
            return{...state, loading: false, error: true}
        default:
            return state
    }
})

export default fileReducer