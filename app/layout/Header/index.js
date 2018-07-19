import React from 'react';

import SearchForm from 'components/SearchForm';

import Logo from 'images/logo-img.svg';

import './style.scss';

const aaa = (values) => {
    console.log(values);
}

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
    render() {
        return (
            <div className="header-component bg-silver outline-danger">
                <div className="content outline-danger d-flex justify-content-between">

                    <section className="logo outline-danger">
                        <a href="/"> <img src={Logo} alt="Denteez logo" /> </a>
                    </section>

                    <section className="outline-danger w-100">
                        <SearchForm form="header_search_form" onSubmit={aaa} />
                    </section>

                    <section className="outline-danger">
                        aaaaaaaaaaaaaaaaaavvvvvvvvvvvvvvvvvvvvaaaa
                    </section>
                </div>
            </div>
        );
    }
}

export default Header;
