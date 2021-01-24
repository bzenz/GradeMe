import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
    siteHeading: {
        fontSize: '3.3rem',
        color: '#3F51B5',
        [theme.breakpoints.down('xs')]: {
        fontSize: '1.3rem',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '2.3rem',
        },
        [theme.breakpoints.up("lg")]: {
        fontSize: '4rem',
        }
    },
    siteSubHeading1: {
        fontSize: '2.3rem',
        color: '#3F51B5',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '3rem',
        }
    },
    button1: {
        size: 'medium',
        [theme.breakpoints.down('xs')]: {
            size: 'small',
        },
        [theme.breakpoints.only('sm')]: {
            size: 'small',
        },
        [theme.breakpoints.up("lg")]: {
            size: 'large',
        }
    },
}))