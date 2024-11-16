import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import styles from './SideNavBar.module.css'
import { Paper } from '@mui/material';


function SideNavBar() {

    return (
        <Container className={styles.container}>
            <Paper elevation={3} style={{height: "100%"}}>
            <ul className={styles.sideNavBar}>
                <Link to="/"><li>כל הקופונים</li></Link>
                <Link><li>ביגוד</li></Link>
                <Link><li>בגדי ספורט</li></Link>
                <Link><li>מוצרים לבית</li></Link>
                <Link><li>אקססוריז</li></Link>
                
            </ul>
            </Paper>
        </Container>
    )
}

export default SideNavBar;