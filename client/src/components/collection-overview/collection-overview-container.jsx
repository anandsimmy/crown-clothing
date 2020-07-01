import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsComponentDataLoaded } from '../../redux/shop/shop-selectors'

import withSpinner from '../with-spinner/with-spinner-component'
import CollectionOverviewComponent from './collection-overview-component'

const mapStateToProps= createStructuredSelector({
    isLoading: (state) => !selectIsComponentDataLoaded(state)
})

const CollectionOverviewContainer= compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionOverviewComponent)

export default CollectionOverviewContainer