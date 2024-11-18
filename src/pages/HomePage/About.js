import { Typography, Box } from "@mui/material"
import styles from './About.module.css'
function About() {

    return (
        <Box className={styles.about}>
            <h1>!ברוכים הבאים</h1>
            <Typography className={styles.headLine}><h3> האתר תוכנן במיוחד כדי לנהל מערכות קופונים ודוחות אשר יעזרו לכם לעקוב אחר הנעשה באתר</h3></Typography>
            <Typography className={styles.headLine}><h3> האתר מיועד לייעל את תהליך ניהול הקופונים ולספק למשתמשים חוויית שימוש קלה ונוחה </h3></Typography>
            <Typography className={styles.headLine}><h2>: בנוסף המנהלים יכולים לעקוב אחר פעילות הקופונים באמצעות </h2></Typography>

            <li className={styles.aboutList}>מערכת דוחות</li>
            <li className={styles.aboutList}>ניתוח נתונים</li>
            <li className={styles.aboutList}>ניהול קופונים</li>


            <h1> תודה שבחרתם בנו!</h1>
            <h4>אם יש שאלות נוספות, אנחנו כאן בשבילכם!</h4>
        </Box>
    )
}

export default About;