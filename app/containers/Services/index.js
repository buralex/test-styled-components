
import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectLoading, makeSelectAction } from 'containers/App/selectors';

import withData from "hocs/withData";


import * as appActions from "containers/App/actions";

import routeActions from "containers/App/constants/routeActions";

import {withSignal} from "redux-signal";

import './style.scss';

import reducer from './reducers';
import saga from './saga';

import List from './List';
import View from './View';


class Services extends React.PureComponent {

    render() {
        const {action} = this.props;

        return (
            <div className="services-container">
                {!action &&
                    <List />
                }

                {action === routeActions.view &&
                    <View />
                }

            </div>
        );
    }
}

Services.propTypes = {
    // loading: PropTypes.bool,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
    logout: () => dispatch(appActions.logout()),

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(appActions.loadSuggestions());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */

});

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    action: makeSelectAction(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'services', reducer});
const withSaga = injectSaga({key: 'services', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(Services));
