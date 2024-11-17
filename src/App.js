import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import CouponMangement from './pages/CouponManagement/CouponManagement';
import SideNavBar from './components/NavBar/SideNavBar';
import SignUp from './pages/Signup/SignUp';
import store from './store/store';
import About from './pages/HomePage/About'
import Report from './pages/Report/Report';

function App() {

  return (
    <Router>
      <Provider store={store}>
        <NavBar />
        {/* <SideNavBar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
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
