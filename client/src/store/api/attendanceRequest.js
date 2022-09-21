import API from './hostCreater'

export const addAttendance = (payload) => API.post('/attendance/add-attendance', payload)

export const getAttendance = (payload) => API.post('/attendance/get-attendance', payload)

export const endAttendance = (payload) => API.post('/attendance/end-attendance', payload)

export const getAllAttendance = (payload) => API.post('/attendance/get-all-attendance', payload)