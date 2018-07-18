import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

const Footer = () => {
    return (
        <footer class="footer">
            <div class="container">
                <span class="text-muted">Place sticky footer content here.</span>
            </div>
        </footer>
    );
}

export default Footer;
