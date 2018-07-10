import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './images/logo-img.svg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
    render() {
        return (
            <div className="header bg-success container-fluid outline-danger">
                <div className="col-12 content outline-danger">
                    {/*<div className="logo">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    {/*<div className="search">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    {/*<div className="notifications">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    <div>test header</div>
                </div>
                {/* <A href="https://twitter.com/mxstbr"> */}
                {/* <Img src={Logo} alt="react-boilerplate - Logo"/> */}
                {/* </A> */}
                {/* <NavBar> */}
                 <HeaderLink to="/">
                 <FormattedMessage {...messages.home} />
                 </HeaderLink>
                {/* <HeaderLink to="/features"> */}
                {/* <FormattedMessage {...messages.features} /> */}
                {/* </HeaderLink> */}
                {/* </NavBar> */}
            </div>
        );
    }
}

export default Header;
