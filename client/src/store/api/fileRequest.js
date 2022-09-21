import API from './hostCreater'

export const updateImage = (data) => API.post('/update-image', data)