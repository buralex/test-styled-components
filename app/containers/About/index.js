
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends, fetchEnquiryTypes} from 'services/api';
import {Link} from "react-router-dom";

import uuidv5 from "uuid/v5";
import withData from "hocs/withData";
import { history } from 'app';


import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'redux-signal'

import H2 from 'components/H2';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';

import * as actions from './actions';
import {makeSelectEnquiryTypes, makeSelectCurrentEnqType} from './selectors';
import {makeSelectIsLoggedIn, makeSelectLoading} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

import AboutForm from "./components/AboutForm";
import * as appActions from "../App/actions";



class About extends React.PureComponent {
    constructor(props) {
        super(props);

        this.initValues = {
            department: 1,
            enquiry_type: 'Other',
        };
    }

    componentDidMount() {
        history.push('/about');
    }

    render() {
        const {enquiryTypes, currentEnqType, loading, isLoggedIn} = this.props;
        //
        // if (!enquiryTypes.length) {
        //     return null;
        // }

        console.log('RENDER ABOUT >>>');
        // console.log(enquiryTypes);
        //
        // console.log(this.props);

        return (
            <div className="enquiry-container col bg-silver-two">
                <Helmet>
                    <title>Enquiry Page</title>
                    <meta name="description" content="Denteez" />
                </Helmet>
                <div>
                    {!isLoggedIn &&
                        <Button color="success" tag={Link} to="/login">login</Button>
                    }

                    <AboutForm
                        loading={loading}
                        initialValues={this.initValues}
                        onSubmit={this.props.onSubmitForm}
                        enquiryTypes={enquiryTypes}
                        isEnqTypeOther={currentEnqType === 'Other'}
                    />
                </div>
            </div>
        );
    }
}

About.propTypes = {
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    // username: PropTypes.string,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => {
        console.log(values);
        dispatch(actions.postEnquiry(values));
    },

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(actions.loadEnquiryTypes());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */
});


const mapStateToProps = createStructuredSelector({
    enquiryTypes: makeSelectEnquiryTypes(),
    currentEnqType: makeSelectCurrentEnqType(),
    loading: makeSelectLoading(),
    isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'about', reducer});
const withSaga = injectSaga({key: 'about', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(About));
