import * as AttendanceApi from '../api/attendanceRequest'
import { reGetUser } from './authAction'

export const addAttendance = (formData, userData) => (dispatch) => {
    dispatch({type: 'ATTENDANCE_START'})
    AttendanceApi.addAttendance(formData)
        .then(result => {
            dispatch({type: 'ATTENDANCE_SUCCESS', payload: result.data.attendance})
        })
        .then(() => {
            dispatch(reGetUser({userId: userData._id}))
        })
        .catch(err => {
            console.log(err)
            dispatch({type: 'ATTENDANCE_FAILED'})
        })
}

export const endAttendance = (formData, userData) => (dispatch) => {
    dispatch({type: 'END_ATTENDANCE_START'})
    AttendanceApi.endAttendance(formData)
        .then(result => {
            dispatch({type: 'END_ATTENDANCE_SUCCESS', payload: result.data.attendances})
        })
        .then(() => {
            dispatch(reGetUser({userId: userData}))
        })
        .catch(err => {
            console.log(err)
            dispatch({type: 'END_ATTENDANCE_FAILED'})
        })
}

export const getAttendanceInfo = (formData) => (dispatch) => {
    dispatch({type: 'GET_ATTENDANCE_START'})
    AttendanceApi.getAttendance(formData)
        .then(result => {
            dispatch({type: 'GET_ATTENDANCE_SUCCESS', payload: result.data.attendance})
        })
        .catch(err => dispatch({type: 'GET_ATTENDANCE_FAILED'}))
}