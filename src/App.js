import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import CouponMangement from './pages/CouponManagement/CouponManagement';
import SideNavBar from './components/NavBar/SideNavBar';
import SignUp from './components/signup/SignUp';
import store from './store/store';
import Report from './pages/CouponManagement/Report'
import { Provider } from 'react-redux'
function App() {

  return (
    <Router>
      <Provider store={store}>
        <NavBar />
        <SideNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Upload" element={<CouponMangement />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Report" element={<Report />} />
          
        </Routes>
      </Provider>
    </Router>

  );
}

export default App;
