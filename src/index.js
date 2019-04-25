import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/index.scss';
import App from './App.jsx';
import Comment from './comment.jsx';
import * as serviceWorker from './serviceWorker';



ReactDOM.render((
  <BrowserRouter>
    <div>
     <Route path="/" exact component={App}></Route>
     <Route path="/comments/:id" exact component={Comment}></Route>
    </div>
  </BrowserRouter>
), document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// <App />,
