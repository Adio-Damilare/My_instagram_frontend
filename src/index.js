import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import "../node_modules/bootstrap/js/dist/modal.js"
import "../node_modules/bootstrap/js/src/dropdown.js"
import "../node_modules/bootstrap/js/src/util/scrollbar"
import "../node_modules/bootstrap/dist/js/bootstrap.esm"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Provider } from 'react-redux';
import { UserSlice } from './Component/UserSlice/UsersSlice';
import { store } from './store';
import {extendedPostslice} from "./PostSlice/index"
store.dispatch(extendedPostslice.endpoints.getPost.initiate())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <Routes >
      <Route path="/*" element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
