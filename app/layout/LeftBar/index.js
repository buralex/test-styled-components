import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './images/logo-img.svg';
import messages from './messages';

import './style.scss';

export default class LeftBar extends React.Component {
    render() {
        return (
            <div className="left-bar-component header bg-silver outline-danger">
                <div className=" ">
                    {/*<div className="logo">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    {/*<div className="search">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    {/*<div className="notifications">*/}
                        {/*<a href="/"> <img src={Logo} alt="Denteez logo" /> </a>*/}
                    {/*</div>*/}

                    <span>leftbar</span>
                </div>
                {/* <A href="https://twitter.com/mxstbr"> */}
                {/* <Img src={Logo} alt="react-boilerplate - Logo"/> */}
                {/* </A> */}
                {/* <NavBar> */}
                 {/*<HeaderLink to="/">*/}
                 {/*<FormattedMessage {...messages.home} />*/}
                 {/*</HeaderLink>*/}
                {/* <HeaderLink to="/features"> */}
                {/* <FormattedMessage {...messages.features} /> */}
                {/* </HeaderLink> */}
                {/* </NavBar> */}
            </div>
        );
    }
}

