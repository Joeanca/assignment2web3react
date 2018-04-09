var React = require('react');
var ReactDOM = require('react-dom');
var BrowserRouter  = require( 'react-router-dom');
//import './index.scss';
var App = require( './App');
var registerServiceWorker = require( './registerServiceWorker');

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
