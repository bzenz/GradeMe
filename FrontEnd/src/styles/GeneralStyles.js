import makeStyles from "@material-ui/core/styles/makeStyles";
import { StyleSheet } from 'react-native';

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
    button2: {
        size: 'medium',
        [theme.breakpoints.down('xs')]: {
            size: 'small',
        },
        [theme.breakpoints.only('sm')]: {
            size: 'small',
        },
        [theme.breakpoints.up("lg")]: {
            size: 'large',
        },
        backgroundColor: "#63a4ff",
        boxShadow: '3',
        width: '50%',
    },
}))

export const generalNativeStyles = StyleSheet.create({
    root: {
        display: "flex",
        justifyContent: "center",
        width: "70%",
        padding: "2%",
        flexDirection: "column",
        alignItems: "center",
    },
    fullWidth: {
        width: '100%',
    },
    halfWidth: {
        width: '50%',
    },
    siteHeading: {
        fontSize: 50,
        color: '#3F51B5',
        //width: "100%",
       /* [theme.breakpoints.down('xs')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '2.3rem',
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '4rem',
        }*/
    },
    button1: {
        backgroundColor: '#63a4ff',
        borderRadius: 10,
    },
    buttonContainerStyle: {
        width: '60%',
    },
    buttonGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    marginRight: {
        marginRight: '1%',
    },
    withMarginTop: {
        marginTop: '1%',
    },
})

