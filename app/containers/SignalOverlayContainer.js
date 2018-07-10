import React from 'react'
import PropTypes from 'prop-types'
import { Overlay } from 'react-modal-construction-kit'
import { connect } from 'react-redux'
import { getHasVisibleModal } from 'redux-signal'
import {makeSelectLoading, makeSelectRepos} from "containers/App/selectors";
import {createSelector, createStructuredSelector} from "reselect";
import reducer from "containers/Enquiry/reducer";
import saga from "containers/Enquiry/saga";
import {makeSelectUsername} from "containers/Enquiry/selectors";
import {compose} from "redux";
import {Enquiry, mapDispatchToProps} from "containers/Enquiry";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";

// const SignalOverlayContainer = ({ isVisible }) => (
//   <Overlay isVisible={isVisible} opacity={0.85} />
// )
//
// SignalOverlayContainer.propTypes = {
//   isVisible: PropTypes.bool.isRequired
// }

// const selectSignal = state => ({signal: state.get('signal')});
//
// const makeSelectSignal = () =>
//     createSelector(selectSignal, signalState => signalState);

// const mapStateToProps = state => {
//     //console.log(makeSelectSignal());
//     //console.log(selectSignal(state));
//     console.log(state.toJS());
//   return {
//       //isVisible: getHasVisibleModal(state.get('signal'))
//       isVisible: getHasVisibleModal(state.toJS())
//   }
// }
//
// export default connect(
//   mapStateToProps
// )(SignalOverlayContainer)

// //const selectGlobal = state => state.get('global');
// const selectState = state => state;
//
// //const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.get('error'));
// const makeSelectState = () => createSelector(selectState, state => state);
//
//
// const mapStateToProps = createStructuredSelector({
//     repos: makeSelectRepos(),
//     username: makeSelectUsername(),
//     loading: makeSelectLoading(),
//     //error: makeSelectError(),
//
//     isVisible: getHasVisibleModal(selectState())
// });
//
// const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps,
// );

// const withReducer = injectReducer({key: 'enquiry', reducer});
// const withSaga = injectSaga({key: 'enquiry', saga});

// export default compose(
//     // withReducer,
//     // withSaga,
//     withConnect,
// )(SignalOverlayContainer);

const selectState = state => state;
const makeSelectState = () =>
    createSelector(selectState, state => state);


const SignalOverlayContainer = ({ isVisible }) => (
    <Overlay isVisible={isVisible} opacity={0.85} />
)

SignalOverlayContainer.propTypes = {
    isVisible: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    console.log(state);
    debugger

    return {
        isVisible: getHasVisibleModal(state.toJS())
    }
}

export default connect(
    mapStateToProps
)(SignalOverlayContainer)
