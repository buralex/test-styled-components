import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './images/logo-img.svg';
import messages from './messages';

import './style.scss';

const GreetingBackground = (props) => (
    <div className="row greeting-background">
        {props.children}
    </div>
);
export default GreetingBackground;
