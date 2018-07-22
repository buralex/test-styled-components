
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends} from 'services/api';

import defaultCategory from 'images/no-service-category-icon.png';

import {
    makeSelectLoading,
} from 'containers/App/selectors';

import withData from "hocs/withData";


import * as appActions from "containers/App/actions";
import {withSignal} from "redux-signal";


import * as actions from "./actions";
import {makeSelectCategories} from './selectors';



class List extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        const {loading, categories} = this.props;

        console.log('<<<<<<<<<<<<<<<<<  RENDER LIST >>>>>>>>>>>>>>>>>', this.props);

        console.log(categories);
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h2>Service Directory</h2>
                    <Button color="success" size="sm" >Add New Service</Button>
                </div>

                <div className="list-container">
                    {categories.map((cat, i) => {

                        if (i < 20) {
                            const icon = cat.icon || defaultCategory;

                            return (
                                <div className="tile-wrap ">
                                    <div key={`cat_${i+1}`} className="tile text-truncate">
                                        {i}
                                        {/*<img src={icon} width="32" height="32" alt="user avatar" />*/}

                                        {cat.title}
                                    </div>
                                </div>

                            );
                        }


                    })}
                </div>
            </div>
        );
    }
}

List.propTypes = {
    loading: PropTypes.bool,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
    logout: () => dispatch(appActions.logout()),

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(actions.loadCategories());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */
});

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    categories: makeSelectCategories(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withSignal,
    withConnect,
)(withData(List));
