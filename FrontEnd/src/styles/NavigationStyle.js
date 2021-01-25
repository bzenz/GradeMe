import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dimensions} from "react-native";

//Wird eine kritische Bildschirmbreite unterschritten (diese kann in der globalen Variable mobileDeviceScreenWidthBreakpoint
// festgelegt werden) ergibt es keinen Sinn mehr, bei offenem Drawer
//etwas im Maincontentpanel zu machen, daher bedeckt ab dieser kritischen Grenze der Drawer den kompletten Screen:
export const mobileDeviceScreenWidthBreakpoint = 550;
let drawerWidth = 290;
let screenWidth = Math.round(Dimensions.get('window').width);

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        background: '#004ba0',
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarTitle: {
        fontSize: '1.6rem',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9rem',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '1.8rem',
        }
    },
    appBarFont1: {
        fontSize: '0.9rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6rem',
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '0.8rem',
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '1rem',
        }
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down(mobileDeviceScreenWidthBreakpoint)]: {
            width: `calc(100% - ${screenWidth}px)`,
            marginLeft: screenWidth,
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        background: '#63a4ff',
        width: drawerWidth,
        variant: "permanent",
        [theme.breakpoints.down(mobileDeviceScreenWidthBreakpoint)]: {
            width: screenWidth,

        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    contentBox: {
        paddingLeft: '5%',
        paddingRight: '5%',
        [theme.breakpoints.down("xs")]: {
            paddingLeft: '1%',
            paddingRight: '1%',
        }
    },
}));
