import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper} from './context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { CartWrapper } from './context/cart';
import AppRoutes from './components/mainnavigation';
import { Provider } from 'react-redux';
import store from './state/store'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
        <CartWrapper>
        <Provider store={store}>
          <ToastContainer className="toast"
            autoClose="1000" />
          <div>
                <main>
                  <AppRoutes />
                </main>

              </div>
              </Provider>
          </CartWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
