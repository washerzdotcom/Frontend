import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
const styleLink = document.createElement("link"); 
styleLink.rel = "stylesheet"; 
styleLink.href =  
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"; 
document.head.appendChild(styleLink);
root.render(
  // <React.StrictMode>
    <AuthProvider>
    <Router>
    <App />
    </Router>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  // </React.StrictMode>
);

