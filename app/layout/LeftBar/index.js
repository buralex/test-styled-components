import React from 'react';

import './style.scss';

const LeftBar = () => (
    <div className="left-bar-component header bg-silver outline-danger">
        <nav className="navbar ">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/test">Link 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/test">Link 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/test">Link 3</a>
                </li>
            </ul>
        </nav>
    </div>
)
export default LeftBar;
