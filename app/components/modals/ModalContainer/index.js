// import React, {PureComponent, Fragment} from 'react';
// import PropTypes from "prop-types";
//
// import InfoModal from 'components/modals/InfoModal';
// import LoadRoute from 'components/modals/LoadRoute';
//
//
// export default class ModalProvider extends PureComponent {
//     static propTypes = {
//
//         /** action for closing modal */
//         onHide: PropTypes.func.isRequired,
//
//         /** string identifier for specific modal */
//         componentName: PropTypes.string.isRequired,
//
//         /** data for modal */
//         data: PropTypes.any,
//     };
//
//     render() {
//         const {
//             onHide,
//             componentName,
//             data,
//         } = this.props;
//
//         let renderedComponent;
//
//         switch (componentName) {
//             case 'InfoModal': {
//                 renderedComponent = data && <InfoModal onHide={onHide} data={data} />;
//                 break;
//             }
//
//             default: renderedComponent = <div>modal</div>;
//         }
//
//         return (
//             <Fragment>
//                 {renderedComponent}
//             </Fragment>
//         );
//     }
// }


/* --- COMPONENTS --- */
import {
    makeSelectError,
    makeSelectIsLoggedIn,
    makeSelectLoading,
    makeSelectRepos,
    selectGlobal
} from "containers/App/selectors";
import {connect} from "react-redux";
import {makeSelectUsername} from "containers/Enquiry/selectors";
import {loadRepos} from "containers/App/actions";
import saga from "containers/App/saga";
import {withRouter} from "react-router-dom";
import {compose} from "redux/index";
import {changeUsername} from "containers/Enquiry/actions";
import {createSelector, createStructuredSelector} from "reselect";
import {initialState} from "containers/Enquiry/reducer";


class MyPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

class Modal extends Component {
    onClose(){
        if(this.props.item.onClose){
            this.props.item.onClose();
            this.props.onClose(this.props.item);
        } else {
            this.props.onClose(this.props.item);
        }
    }
    onConfirm(){
        if(this.props.item.onConfirm){
            this.props.item.onConfirm();
            this.props.onClose(this.props.item);
        }
    }
    render() {
        const { type } = this.props.item;
        if (type === 'confirmation') {
            const { text } = this.props.item;
            return (
                <div className="modal-wrapper">
                    <div className="modal">
                        <div className="text">{text}</div>
                        <div className="buttons">
                            <button className="modal-button" onClick={() => this.onConfirm()}>Confirm</button>
                            <button className="modal-button" onClick={() => this.onClose()}>Close</button>
                        </div>
                    </div>
                </div>
            )
        } else if (type === 'custom') {
            const { content } = this.props.item;
            return (
                <div className="modal-wrapper">
                    <div className="modal">
                        <button className="close" onClick={() => this.onClose()}>&times;</button>
                        {content}
                    </div>
                </div>
            )
        }
        return (
            <div></div>
        );
    }
}
class Modals extends Component {
    render() {
        const modals = this.props.modals.map((item,i) => <MyPortal key={i} ><Modal item={item} onClose={(item) => this.props.dispatch(closeModal(item))}/></MyPortal>)
        return (
            <div className="modals">
                {modals}
            </div>
        );
    }
}
const ModalContainer = connect(
    function mapStateToProps(state) {
        return {
            modals: state.modals
        };
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)(Modals);


export function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
        dispatch,
    };
}

const selectEnquiry = state => state.get('enquiry', initialState);

const makeSelectError = () =>
    createSelector(selectGlobal, globalState => globalState.get('error'));

const mapStateToProps = createStructuredSelector({
    repos: makeSelectRepos(),
    username: makeSelectUsername(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(App);
