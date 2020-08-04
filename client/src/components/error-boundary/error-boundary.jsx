import React,{ Component } from 'react'
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary-styles'

class ErrorBoundary extends Component {
    constructor(){
        super()
        this.state={
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error){
        return { hasErrored: true }
    }
    render(){
        if (this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png'/>
                    <ErrorImageText>Sorry, this page is broken!</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        else{
            return this.props.children
        }
    }
}

export default ErrorBoundary