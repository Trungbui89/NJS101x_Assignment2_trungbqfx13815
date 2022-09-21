const attendanceReducer = ( state = {attendanceData: null, err: false, loading: false}, action) => {
    switch(action.type) {
        case 'ATTENDANCE_START':
            return {...state, loading: true, err: false}
        case 'ATTENDANCE_SUCCESS':
            return {attendanceData: action.payload, loading: false}
        case 'ATTENDANCE_FAILED':
            return {...state, loading: false, err: true}
        // Get attendance
        case 'GET_ATTENDANCE_START':
            return {attendanceData: null, loading: true, err: false}
        case 'GET_ATTENDANCE_SUCCESS':
            return {...state, attendanceData: action.payload, loading: false}
        case 'GET_ATTENDANCE_FALSE':
            return {...state, loading: false, err: true}
        // Logout
        case 'ATTENDANCE_LOGOUT':
            return {attendanceData: null, err: false, loading: false}
        default:
            return state
    }
}

export default attendanceReducer