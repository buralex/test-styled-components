import React, {Component} from 'react';
import PropTypes from 'prop-types';


const withData = Container => class ContainerWrapper extends Component {
    static defaultProps = {
        getData: () => {},
        clearState: () => {},
    };

    static propTypes = {
        getData: PropTypes.func,
        clearState: PropTypes.func,
    };

    componentDidMount() {
        this.props.getData(this.props);
    }

    componentWillUnmount() {
        this.props.clearState(this.props);
    }

    render() {
        return <Container {...this.props} />;
    }
};

export default withData;
