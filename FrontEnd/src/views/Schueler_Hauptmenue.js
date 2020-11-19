import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import GradesIcon from "@material-ui/icons/Grade";
import PeopleIcon from "@material-ui/icons/People";
import GradesAccordions from "../components/student/GradesComponent";
import Timetable from "../components/Timetable";
import Taskoverview from "../components/Taskoverview";
import LogoutButton from "../components/LogoutButton";
import Box from "@material-ui/core/Box";
import {SERVER} from "../../index";
import {connect} from "react-redux";

const drawerWidth = 340;

export const useStyles = makeStyles((theme) => ({
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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
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
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        background: '#63a4ff',
        width: drawerWidth,
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
        align: 'center',
    },
}));

function Communicationdashboard() {
    return (
        <div>
            Kommunikation
        </div>
    )
}

function SchuelerHauptmenue(props){
    const classes = useStyles();
    const[mainPanelContentType, setMainPanelContentType] = useState("");
    const [open, setOpen] = React.useState(true);
    const [userData, setUserData] = React.useState("");
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const requestBody = JSON.stringify({request_token: props.request_token})
    useEffect(() => {
        fetch(SERVER + "/api/auth/woAmI",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody,
            }).then(response => response.json())
            .then(data => setUserData(data))
    }, [])

    function renderMainPanel() {
        switch (mainPanelContentType) {
            case "Grades": return(<GradesAccordions />)
            case "Tasks": return(<Taskoverview />)
            case "Timetable": return(<Timetable />)
            case "Communicationdashboard": return(<Communicationdashboard />)
            default: return(<Timetable />)
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                        GradeMe
                    </Typography>
                    <Typography>
                        Sie sind angemeldet als "{userData.vorname + " " + userData.name}"
                    </Typography>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Typography color='textPrimary'>
                    <List>
                        <ListItem button onClick={ () => setMainPanelContentType("Timetable")}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Stundenplan" />
                        </ListItem>
                        <ListItem button onClick={ () => setMainPanelContentType("Grades")}>
                            <ListItemIcon>
                                <GradesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notenübersicht" />
                        </ListItem>
                        <ListItem button onClick={ () => setMainPanelContentType("Tasks")}>
                            <ListItemIcon>
                                <BusinessCenterIcon />
                            </ListItemIcon>
                            <ListItemText primary="Aufgabenübersicht" />
                        </ListItem>
                        <ListItem button onClick={ () => setMainPanelContentType("Communicationdashboard")}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kommunikationsdashboard" />
                        </ListItem>
                    </List>
                </Typography>
                <Divider/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                    <Box className={classes.contentBox} align='center'>
                        {renderMainPanel()}
                    </Box>
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        request_token: state.loginReducer.request_token,
    }
}

export default connect(mapStateToProps, null)(SchuelerHauptmenue)