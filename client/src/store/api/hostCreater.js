import axios from 'axios'
import store from '../reduxStore/reduxStore'

const state = store.getState()

const API = axios.create({ baseURL: "http://localhost:5000", headers: {
    'authorization': state.authReducer?.Authorization,
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}})

export default API