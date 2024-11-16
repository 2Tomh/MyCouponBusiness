import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { signout } from "../../store/userSlice";

function NavBar() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signoutUser = () => {
        dispatch(signout());

        navigate("/Login");
    }

    return (
        <Navbar className={styles.NavBar}>
            <Container>
                <Nav>
                    <Link to='/' href="Home">קופונים </Link>
                    <Link to='/Coupon' href='About'> עלינו</Link>
                    <Link to='/Login' href='Login'>התחברות</Link>
                    {user.isAdmin && <Link to='/Upload' href='Upload'>העלאת קופונים</Link>}
                    {user.isAdmin && <Link to='/SignUp'>משתמשים</Link>}
                    {user.isAdmin && <Link to='/Report'>דוחות</Link>}
                    {user.loggedIn && <Link><Button onClick={signoutUser} >התנתקות</Button></Link> }
                </Nav>
            </Container>
        </Navbar>
    )

};

export default NavBar;