const endAttendanceReducer = ((state = {endAttendanceData: null, loading: false, err: false}, action) => {
    switch(action.type) {
        case 'END_ATTENDANCE_START':
            return {...state, loading: true, err: false}
        case 'END_ATTENDANCE_SUCCESS':
            return {...state, endAttendanceData: action.payload, loading: false, err: false}
        case 'END_ATTENDANCE_FAILED':
            return {...state, loading: false, err: true}
        default:
            return state
    }
})

export default endAttendanceReducer