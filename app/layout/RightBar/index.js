import React from 'react';

import Add2 from './images/add2.png';

import Friends from './Friends';
import Products from './Products';

import './style.scss';

export default function RightBar() {
    return (
        <div className="right-bar-component ">

            <Friends />

            <hr/>

            <Products />

            <hr/>

            <p>Advertisement</p>

            <div>
                <img src={Add2} alt="addvert" />

                <p className="small text-white-two">Ads By Denteez.com</p>
            </div>

        </div>
    );
}

