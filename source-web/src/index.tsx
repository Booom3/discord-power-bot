import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'popper.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import root from './routes/Root';

ReactDOM.render(
  <BrowserRouter children={root} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
