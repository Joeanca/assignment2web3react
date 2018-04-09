var React = require('react');
var ReactDOM = require('react-dom');
import { BrowserRouter } from 'react-router-dom';
//import './index.scss';
import App from './src/App';
import registerServiceWorker from './src/registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
