import { combineReducers } from "redux"
import authReducer from './authReducer'
import fileReducer from "./fileReducer"
import attendanceReducer from './attendanceReducer'
import endAttendanceReducer from './endAttendanceReducer'


export const reducers = combineReducers({authReducer, fileReducer, attendanceReducer, endAttendanceReducer})