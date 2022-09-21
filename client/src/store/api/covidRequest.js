import API from "./hostCreater";

export const registerTemperature = (payload) => API.post('/covid/register_temperature', payload)

export const vaccineRegister = (payload) => API.post('/vaccine/vaccine_register', payload)

export const infectionRegister = (payload) => API.post('/infection', payload)