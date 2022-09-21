import { Box } from '@mui/material';
import React from 'react';
import './Login.scss';
import Loading from '../../common/loading/Loading'

const LoginView = (props) => {
    const{ 
        handleLogin,
        handleChangeUser,
        handleKeyEnter,
        user,
        loading
    } = props

    return (
        <>
        {loading ? <Loading /> : null}
            <Box className='box-login-page'>
                <div className="login-container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login">
                                <div className="login__field">
                                    <input 
                                        type="text" 
                                        className="login__input" 
                                        placeholder="User name / Email" 
                                        value={user.userName}
                                        onChange={(e) => handleChangeUser('userName', e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <input 
                                        type="password" 
                                        className="login__input" 
                                        placeholder="Password" 
                                        value={user.password}
                                        onChange={(e) => handleChangeUser('password', e.target.value)}
                                        onKeyUp={handleKeyEnter}
                                    />
                                </div>
                                <button className="button login__submit" onClick={handleLogin}>
                                    <span className="button__text">Log In Now</span>
                                </button>				
                            </form>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>		
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>		
                    </div>
                </div>
            </Box>
        </>
    )
}

export default LoginView;
