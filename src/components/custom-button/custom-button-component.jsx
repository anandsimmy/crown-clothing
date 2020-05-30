import React from 'react'

import './custom-button-styles.scss'

//need to implement 'CustomButtonContainer' styled-components over here. 
//But now, it breaks shop page buttons when added. Need to debug

const CustomButton=({ children, isGoogleSignIn, inverted, ...props }) => {
    return ( 
        <button className={`${ inverted ? 'inverted' : '' } ${ isGoogleSignIn ? 'google-sign-in' : '' } custom-button`} {...props}>
            {children}
        </button>
    )
}

export default CustomButton