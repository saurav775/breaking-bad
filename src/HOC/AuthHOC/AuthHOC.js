import React from 'react'
import { authPage } from '../../static'
import './AuthHOC.css'

const AuthHOC = (BaseComponent) => (props) => {
    const { title, id, history } = props

    // Redirect to Signin/Signup/ForgotPassword Page
    const handleLinkClick = ({ clicked_from }) => {
        switch (id) {
            case "signup":
                history.push('/login')
                break
            case "signin":
                history.push(clicked_from === 'forgotPassword' ? 'forgot-password' : '/register')
                break  
            case "forgotPassword":
                history.push('/login')
                break
            default: break    
        }
    }

    return (
        <div className="auth-container">
            <div className="card-overlay-black d-flex justify-content-center align-items-center ">
                <div className="card col-md-8 auth-card-container">
                    <div className="card-body d-flex">
                        <div className="bg-image auth-card-image col-md-8" style={{backgroundImage: `url(${authPage})`}} />
                        <div className="pl-4">
                            <div className="card-title">
                                {title}
                            </div>
                            {
                                id === 'forgotPassword' && (
                                    <div className="" onClick={handleLinkClick}>
                                        <i className="fa fa-arrow-left"></i>{'Back to login'}
                                    </div>
                                )
                            }
                            <BaseComponent />
                            {
                                id === 'signin' && (
                                    <div className="" onClick={() => handleLinkClick({ clicked_from: 'forgotPassword' })}>
                                        {'Forgot Password?'}
                                    </div>
                                )
                            }
                            <div className="" onClick={handleLinkClick}>
                                {id === 'signup' ? 'Signin here' : 'Create your account'}
                                <i className="fa fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthHOC
