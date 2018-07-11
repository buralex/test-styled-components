/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'test/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'test/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'test/App/LOAD_REPOS_ERROR';



export const SHOW_LOADER = 'test/App/SHOW_LOADER';
export const HIDE_LOADER = 'test/App/HIDE_LOADER';
export const SERVER_ERROR = 'test/App/SERVER_ERROR';

export const LOGIN = 'test/App/LOGIN';
export const LOGIN_SUCCESS = 'test/App/LOGIN_SUCCESS';


