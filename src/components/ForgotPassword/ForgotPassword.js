import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { AuthHOC } from '../../HOC'

const ForgotPassword = () => {
    return (
        <div>
            
        </div>
    )
}

export default compose(withRouter, AuthHOC)(ForgotPassword)
