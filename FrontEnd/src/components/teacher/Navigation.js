import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {CourseTabs, TeacherTabs} from './TeacherTabs';
import { connect } from 'react-redux';
import {COURSE_VIEW_IDENTIFIER, SUBJECT_OVERVIEW_IDENTIFIER, COURSES_FOR_SUBJECT_IDENTIFIER, SCHEDULE_IDENTIFIER, TASK_OVERVIEW_IDENTIFIER} from "./TeacherTabs";
import SubjectOverview from "./SubjectOverview";
import CoursesForSubject from "./CoursesForSubject";
import useStyles from "./NavigationStyle";
import CourseView from "./CourseView";
import LogoutButton from "../LogoutButton";
import Taskoverview from "../../views/Taskoverview";
import EvaluateTaskPage from "./EvaluateTaskPage";
import {SHOW_EVALUATE_TASK_PAGE} from "../../actions/teacherNavigationActions";
import Box from "@material-ui/core/Box";
import Timetable from "../../views/Timetable";


function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderContent = () => {
        switch(props.activeContent) {
            case TASK_OVERVIEW_IDENTIFIER:
                return (<Taskoverview />)
            case SHOW_EVALUATE_TASK_PAGE:
                return (<EvaluateTaskPage />)
            case SUBJECT_OVERVIEW_IDENTIFIER:
                return <SubjectOverview />;
            case COURSES_FOR_SUBJECT_IDENTIFIER:
                return <CoursesForSubject />;
            case COURSE_VIEW_IDENTIFIER:
                return <CourseView />;
            case SCHEDULE_IDENTIFIER:
                return (<Timetable/>)
            default:
                return <div>{props.activeContent}</div>
        }
    }

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                        GradeMe
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
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography color='textPrimary' component={'div'}>
                    {props.activeContent === COURSE_VIEW_IDENTIFIER && CourseTabs}
                </Typography>
                <Divider />
                <Typography color='textPrimary' component={'div'}>
                    <TeacherTabs />
                </Typography>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Box className={classes.contentBox} align='center'>
                        {renderContent()}
                    </Box>
            </main>
        </div>
    );
}
export default connect((state) => ({activeContent: state.teacherNavigationReducer.activeContent}))(Dashboard);
