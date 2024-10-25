import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider ,createBrowserRouter} from 'react-router-dom';
import UpdatingForm from './Component/UpdatingForm.js';
import { DataProvider } from './Context/DataContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes=createBrowserRouter(
  [
    {
     path:'/',
     element:<App/>
    },
    {
      path:'editRecord',
      element:<UpdatingForm/>
    }
  ]
)
root.render(
  
  <React.StrictMode>
    <DataProvider>
    <RouterProvider router={allRoutes} />
    </DataProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
