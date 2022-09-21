import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
// import Footer from './Footer'
import './style.scss'
import { logout } from '../store/action/authAction'


const Layout = ({children}) => {
  const dispatch = useDispatch()
  const loginState = useSelector((state) => state.authReducer.loginState)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <>
        {loginState ? <Header handleLogout={handleLogout} /> : null}
        <div className='blur' style={{top: '-18%', right: 0}}/>
        <div className='blur' style={{top: '36%', left: '-8rem'}}/>
        {children}
        {/* <Footer /> */}
    </>
  )
}

export default Layout