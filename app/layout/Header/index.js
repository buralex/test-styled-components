import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './images/logo-img.svg';
import messages from './messages';

import SearchForm from 'components/SearchForm';

const aaa = (values) => {
    console.log(values);
}

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
    render() {
        return (
            <div className="header-component bg-silver outline-danger">
                <div className="content outline-danger d-flex justify-content-between">

                    <section className="logo">
                        <a href="/"> <img src="#" alt="Denteez logo" /> </a>
                    </section>

                    <section className="outline-danger">
                        <SearchForm form="header_search_form" onSubmit={aaa} />
                    </section>

                    <section className="outline-danger">aaaaaaaaaaaaaaaaaavvvvvvvvvvvvvvvvvvvvaaaa</section>
                </div>
            </div>
        );
    }
}

export default Header;
