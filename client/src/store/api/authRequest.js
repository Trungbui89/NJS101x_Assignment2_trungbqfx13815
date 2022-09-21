import API from './hostCreater'

export const login = (user) => API.post('/auth/login', user)

export const editUser = (user) => API.post('/auth/edit_user', user)

export const getUser = (payload) => API.post('/auth/get_user', payload)