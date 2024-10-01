import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from './Contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          hideProgressBar={true}
          autoClose={2000}
          closeOnClick={true}
          pauseOnHover={false}
        />
        {/* <QueryClientProvider client={queryClient}> */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
        {/* </QueryClientProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
