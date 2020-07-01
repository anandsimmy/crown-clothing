import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsComponentDataLoaded } from '../../redux/shop/shop-selectors'

import withSpinner from '../../components/with-spinner/with-spinner-component'
import CollectionPageComponent from './collection-page-component'

const mapStateToProps= createStructuredSelector({
    isLoading: (state) => !selectIsComponentDataLoaded(state)
})

const CollectionPageContainer= compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionPageComponent)

export default CollectionPageContainer