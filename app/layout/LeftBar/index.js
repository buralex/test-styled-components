import React from 'react';

import './style.scss';

export default class LeftBar extends React.Component {
    render() {
        return (
            <div className="left-bar-component outline-danger">
                <nav className="navbar ">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 3</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

