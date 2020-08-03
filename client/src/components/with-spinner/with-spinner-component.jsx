import React from 'react'
import Spinner from '../spinner/spinner-component'

const WithSpinner = WrappedComp => ({ isLoading, ...props }) => {
        return isLoading ? < Spinner /> : <WrappedComp {...props} />
    }

export default WithSpinner