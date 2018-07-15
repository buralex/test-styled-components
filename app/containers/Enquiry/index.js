
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
    makeSelectRepos,
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';

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
import reducer from './reducer';
import saga from './saga';

import EnquiryForm from "./components/EnquiryForm";
import * as appActions from "../App/actions";


const ServerErrorEvent = eventHandler();

const onYes = () => {
    console.log('pressed yes')
}

const onNo = () => {
    console.log('pressed no')
}


export class Enquiry extends React.PureComponent {
    constructor(props) {
        super(props);

        this.initValues = {
            department: 1,
            enquiry_type: 'Other',
        };
    }

    componentDidMount() {
        //history.push('/enquiry');
    }

    onBtnErrorClick = () => {
        console.log(this.props);
        this.props.createSignal({
            type: SignalTypes.YES_NO,
            title: 'Are you sure?',
            message: 'You are about to do something, are you sure?',
            labels: {
                yes: 'Yes!',
                no: 'No',
            },
            eventHandler: ServerErrorEvent,
            className: 'modal-danger',
        })
    }

    onSubmit(data) {
        var body = new FormData();
        Object.keys(data).forEach(( key ) => {
            body.append(key, data[ key ]);
        });

        console.info('POST', body, data);
        console.info('This is expected to fail:');
        fetch(`http://example.com/send/`, {
            method: 'POST',
            body: body,
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        const {enquiryTypes, currentEnqType} = this.props;
        //
        // if (!enquiryTypes.length) {
        //     return null;
        // }

        console.log('RENDER ENQUIRY >>>');
        console.log(enquiryTypes);

        console.log(this.props);

        return (
            <article>
                <Helmet>
                    <title>Enquiry Page</title>
                    <meta name="description" content="Denteez" />
                </Helmet>
                <div>
                    <Button size="sm" color="success" onClick={async () => {
                        this.props.aaa();

                        console.log('showl');

                    }}>show loading</Button>
                    <Button size="sm" color="success" onClick={async () => {
                        //this.props.aaa();
                        this.props.bbb()
                        console.log('hide');

                    }}>hide loading</Button>
                    <EnquiryForm
                        initialValues={this.initValues}
                        //onSubmit={this.props.onSubmitForm}
                        onSubmit={this.onSubmit}
                        enquiryTypes={enquiryTypes}
                        isEnqTypeOther={currentEnqType === 'Other'}
                    />
                </div>
            </article>
        );
    }
}

Enquiry.propTypes = {
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    // username: PropTypes.string,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => {
        //dispatch(actions.postEnquiry(values));
    },
    aaa: (values) => dispatch(appActions.showLoader()),
    bbb: (values) => dispatch(appActions.hideLoader()),

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
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    withSignal,
    withData,
)(Enquiry);
