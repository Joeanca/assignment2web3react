var React = require('react');
var ReactDOM = require('react-dom');
import { BrowserRouter } from 'react-router-dom';
//import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
