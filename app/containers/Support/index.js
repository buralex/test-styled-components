
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SupportForm from "components/SupportForm/index";

import { makeSelectLoading, makeSelectAction,
    makeSelectCurrentEnqType, makeSelectEnquiryTypes,
} from 'containers/App/selectors';

import withData from "hocs/withData";
import LoadingBeat from 'components/LoadingBeat';

import * as appActions from "containers/App/actions";

import {withSignal} from "redux-signal";


class Support extends React.PureComponent {

    render() {
        const {loading, enquiryTypes, currentEnqType} = this.props;

        return (
            <div className="services-container">
                <SupportForm
                    loading={loading}
                    initialValues={this.initValues}
                    onSubmit={this.props.postEnquiry}
                    enquiryTypes={enquiryTypes}
                    isEnqTypeOther={currentEnqType === 'Other'}
                />

                {loading && <LoadingBeat />}
            </div>
        );
    }
}

Support.propTypes = {
    loading: PropTypes.bool,
};


export const mapDispatchToProps = (dispatch) => ({
    postEnquiry: (values) => dispatch(appActions.postEnquiry(values)),

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(appActions.loadEnquiryTypes());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */

});

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    action: makeSelectAction(),
    enquiryTypes: makeSelectEnquiryTypes(),
    currentEnqType: makeSelectCurrentEnqType(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);


export default compose(
    withSignal,
    withConnect,
)(withData(Support));
