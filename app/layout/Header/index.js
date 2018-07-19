import React from 'react';

import SearchForm from 'components/SearchForm';


import './style.scss';

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
