import styled,{ css } from 'styled-components'

const basicStyles= css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
`

const googleSignInStyles= css`
    background-color: #4285f4;
    color: white;
    border: none;

    &:hover {
    background-color: #1568ec;
    border: none;
    }
`

const invertedStyles= css`
    background-color: white;
    color: black;
    border: 1px solid whitesmoke;

    &:hover {
    background-color: black;
    color: white;
    border: none;
    }
`

const buttonStyleSetter=({ isGoogleSignIn, inverted }) => {
    if(isGoogleSignIn){
        return googleSignInStyles
    }
    return inverted ? invertedStyles : basicStyles
}

export const CustomButtonContainer= styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;

    ${buttonStyleSetter}
`
