import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import "../src/assets/css/main.css"
import "../src/assets/css/animate.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-loading-skeleton/dist/skeleton.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
