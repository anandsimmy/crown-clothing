import React from 'react'

import { SpinnerOverlay, SpinnerContainer } from './with-spinner-styles'

const WithSpinner = WrappedComp => {
    const Spinner= ({ isLoading, ...props }) => {
        return isLoading ? (
                <SpinnerOverlay>
                    <SpinnerContainer></SpinnerContainer>
                </SpinnerOverlay> )
                :
                <WrappedComp {...props} />
    }
    return Spinner
}

export default WithSpinner