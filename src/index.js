import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Secretary from "./components/secretary/views/week_all.component";
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';


const routing = (
  <Router>
    <div>
      <Route path = "/" component={App}/>
      <Route path = "/secretary" component={Secretary}/>

    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
