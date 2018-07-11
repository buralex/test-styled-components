/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';

// Import CSS reset and Global Styles
import 'sanitize.css/sanitize.css';
import 'styles/index.scss';

// Import root app
import App from 'containers/App';

import SignalContainer from 'containers/SignalContainer'
import SignalOverlay from 'containers/SignalOverlayContainer'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';

// Import i18n messages
import {translationMessages} from './i18n';

/* ----------------------- check loading special fonts ------------------------------------------- */
const proximaReg = new FontFaceObserver('Proxima Nova Reg');
const proximaLight = new FontFaceObserver('Proxima Nova Light');

Promise.all([proximaReg.load(), proximaLight.load()]).then(() => {
    document.body.classList.add('fontLoaded');
}, () => {
    document.body.classList.remove('fontLoaded');
    console.error('some fonts not loaded');
});
/* ----------------------- check loading special fonts ------------------------------------------- */

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
    ReactDOM.render(
        <Provider store={store}>
            {/*<LanguageProvider messages={messages}>*/}
                <ConnectedRouter history={history}>
                    <div>
                        {/*<SignalContainer />*/}
                        {/*<SignalOverlay />*/}
                        <App/>
                    </div>
                </ConnectedRouter>
            {/*</LanguageProvider>*/}
        </Provider>,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise(resolve => {
        resolve(import('intl'));
    })
        .then(() =>
            Promise.all([
                import('intl/locale-data/jsonp/en.js'),
                import('intl/locale-data/jsonp/de.js'),
            ]),
        )
        .then(() => render(translationMessages))
        .catch(err => {
            throw err;
        });
} else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
