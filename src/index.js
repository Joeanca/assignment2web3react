React = require('react');
ReactDOM = require('react-dom');
BrowserRouter  = require( 'react-router-dom');
//import './index.scss';
App = require( './App');
registerServiceWorker = require( './registerServiceWorker');

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
