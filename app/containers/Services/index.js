
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends} from 'services/api';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectLoading, makeSelectAction } from 'containers/App/selectors';

import withData from "hocs/withData";


import * as appActions from "containers/App/actions";

import routeActions from "containers/App/constants/routeActions";

import {withSignal} from "redux-signal";

import reducer from './reducer';
import saga from './saga';

import List from './List';

import * as actions from "./actions";
import {makeSelectCategories} from './selectors';



class Services extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }


    render() {
        const {loading, categories, action} = this.props;

        console.log('RENDER SERVICES >>>>>>>>>>>>>>>>>', this.props);

        return (
            <div>
                {!action &&
                    <List />
                }
            </div>
        );
    }
}

Services.propTypes = {
    loading: PropTypes.bool,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
    logout: () => dispatch(appActions.logout()),
});

const mapStateToProps = createStructuredSelector({
    //loading: makeSelectLoading(),
    //categories: makeSelectCategories(),
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
)(Services);
