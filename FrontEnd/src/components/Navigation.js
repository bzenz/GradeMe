import React, {useEffect} from 'react';
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
import { ACTIONS_FOR_COURSE_IDENTIFIER, COMMUNICATION_DASHBOARD_IDENTIFIER, CourseTabs, TASKS_FOR_COURSE_IDENTIFIER, TeacherTabs } from './teacher/TeacherTabs';
import { connect } from 'react-redux';
import {COURSE_VIEW_IDENTIFIER, SUBJECT_OVERVIEW_IDENTIFIER, COURSES_FOR_SUBJECT_IDENTIFIER, SCHEDULE_IDENTIFIER, TASK_OVERVIEW_IDENTIFIER} from "./teacher/TeacherTabs";
import SubjectOverview from "./teacher/SubjectOverview";
import CoursesForSubject from "./teacher/CoursesForSubject";
import useStyles from "../styles/NavigationStyle";
import CourseView from "./teacher/CourseView";
import LogoutButton from "./LogoutButton";
import Taskoverview from "./Taskoverview";
import EvaluateTaskPage from "./teacher/EvaluateTaskPage";
import {SHOW_EVALUATE_TASK_PAGE} from "../actions/teacherNavigationActions";
import Box from "@material-ui/core/Box";
import Timetable from "./Timetable";
import {SERVER} from "../../index";
import ActionsForCourseList, {CREATE_NEW_TASK} from "./teacher/ActionsForCourseList";
import CreateTaskForm from "./teacher/CreateTaskForm";
import CommunicationDashboard from "./CommunicationDashboard";
import { GRADES_OVERVIEW_IDENTIFIER, StudentTabs } from "./student/StudentTabs";
import GradesAccordions from "./student/GradesComponent";
import Timetable from "../../views/Timetable";
import ActionsForCourseList, {CREATE_NEW_TASK} from "./ActionsForCourseList";
import CreateTaskForm from "./CreateTaskForm";
import { ERROR_CONTENT_IDENTIFIER } from "../../actions/errorActions";
import ErrorContentPaper from "../ErrorContentPaper";


function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [userData, setUserData] = React.useState("");
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
                return (<Timetable/>);
            case TASKS_FOR_COURSE_IDENTIFIER:
                return <Taskoverview forCourse/>;
            case ACTIONS_FOR_COURSE_IDENTIFIER:
                return <ActionsForCourseList/>;
            case CREATE_NEW_TASK:
                return <CreateTaskForm/>;
            case ERROR_CONTENT_IDENTIFIER:
                return <ErrorContentPaper errorMessageToUser={props.errorMessageToUser}/>
            case COMMUNICATION_DASHBOARD_IDENTIFIER:
                return <CommunicationDashboard/>;
            case GRADES_OVERVIEW_IDENTIFIER:
                return <GradesAccordions/>
            default:
                return <div>{props.activeContent}</div>
        }
    }
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
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography color='textPrimary' component={'div'}>
                    {props.courseSelected && <CourseTabs />}
                </Typography>
                <Divider />
                <Typography color='textPrimary' component={'div'}>
                  {props.role === "teacher"?<TeacherTabs />:<StudentTabs/>}
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
export default connect((state) => ({
    activeContent: state.teacherNavigationReducer.activeContent,
    courseSelected: state.courseNavigationReducer.courseSelected,
    request_token: state.loginReducer.request_token,
    errorMessageToUser: state.teacherNavigationReducer.errorMessageToUser,
    role: state.loginReducer.role,
}))
(Dashboard);
