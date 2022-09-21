import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginView from './Login'
import { login } from '../../store/action/authAction'


const Login = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    const [user, setUser] = useState({ userName: '', password: '' })
    
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(user))
    }

    const handleKeyEnter = (e) => {
        if(e.key === 'Enter') {
            handleLogin()
        }
    }

    const handleChangeUser = (key, value) => {
        switch (key) {
            case 'userName':
                setUser({...user, userName: value.toLowerCase()})
                break
            case 'password':
                setUser({...user, password: value})
                break
            default:
                break
        }
    }

    return (
        <LoginView 
            user={user}
            loading={loading}
            handleLogin={handleLogin} 
            handleChangeUser={handleChangeUser}
            handleKeyEnter={handleKeyEnter}
        />
    )
}

export default Login;
