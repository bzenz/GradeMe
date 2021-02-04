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
import { connect } from 'react-redux';
import SubjectOverview from "../teacher/SubjectOverview";
import CoursesForSubject from "../teacher/CoursesForSubject";
import useStyles from "../../styles/NavigationStyle";
import CourseView from "../teacher/CourseView";
import LogoutButton from "./LogoutButton";
import Taskoverview from "./studentAndTeacher/Taskoverview";
import EvaluateTaskPage from "../teacher/EvaluateTaskPage";
import {SHOW_EVALUATE_TASK_PAGE} from "../../actions/teacherNavigationActions";
import Box from "@material-ui/core/Box";
import Timetable from "./studentAndTeacher/Timetable";
import {SERVER} from "../../../index";
import ActionsForCourseList from "../teacher/ActionsForCourseList";
import CreateTaskForm from "../teacher/CreateTaskForm";
import CommunicationDashboard from "./studentAndTeacher/CommunicationDashboard";
import GradesAccordions from "../student/GradesComponent";
import StudentsInCourseOverview from "../teacher/StudentsInCourseOverview";
import { ERROR_CONTENT_IDENTIFIER } from "../../actions/errorActions";
import ErrorContentPaper from "./ErrorContentPaper";
import {setDrawerOpenState} from "../../actions/generalNavigationActions";
import {
    ACTIONS_FOR_COURSE_IDENTIFIER,
    COMMUNICATION_DASHBOARD_IDENTIFIER,
    COURSE_VIEW_IDENTIFIER,
    COURSES_FOR_SUBJECT_IDENTIFIER, CREATE_NEW_TASK_IDENTIFIER, CREATE_OR_EDIT_USER_IDENTIFIER,
    GRADES_OVERVIEW_IDENTIFIER,
    SCHEDULE_IDENTIFIER,
    STUDENTS_FOR_COURSE_IDENTIFIER,
    SUBJECT_OVERVIEW_IDENTIFIER,
    TASK_OVERVIEW_IDENTIFIER,
    TASKS_FOR_COURSE_IDENTIFIER,
    USER_ADMINISTRATION_IDENTIFIER
} from "./identifiers";
import { Tabs } from "./Tabs";
import UserAdministration from "../admin/UserAdministration";
import CreateUserForm from "../admin/CreateOrEditUserForm";

function Dashboard(props) {
    const classes = useStyles();
    const [userData, setUserData] = React.useState("");

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
            case CREATE_NEW_TASK_IDENTIFIER:
                return <CreateTaskForm/>;
            case STUDENTS_FOR_COURSE_IDENTIFIER:
                return <StudentsInCourseOverview/>;
            case ERROR_CONTENT_IDENTIFIER:
                return <ErrorContentPaper errorMessageToUser={props.errorMessageToUser}/>
            case COMMUNICATION_DASHBOARD_IDENTIFIER:
                return <CommunicationDashboard/>;
            case GRADES_OVERVIEW_IDENTIFIER:
                return <GradesAccordions/>
            case USER_ADMINISTRATION_IDENTIFIER:
                return <UserAdministration/>
            case CREATE_OR_EDIT_USER_IDENTIFIER:
                return <CreateUserForm/>
            default:
                return <div>{props.activeContent}</div>
        }
    }

    const renderAppBar = () => (
        <AppBar position="absolute" className={clsx(classes.appBar, props.isDrawerOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.setDrawerOpenState(true)}
                    className={clsx(classes.menuButton, props.isDrawerOpen && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography  className={classes.appBarTitle}>
                    GradeMe
                </Typography>
                <Typography className={classes.appBarFont1} align={"center"}>
                    Angemeldet als "{userData.vorname + " " + userData.name}"
                </Typography>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    )

    const renderLeftMenu = () => (
        <Drawer
            //Bei einem mobileScreen soll der Drawer wie in einer App über den Inhalt gehen und zusätzlich soll
            // die kleine Seitenleiste des Drawer verschwinden. In der Desktopansicht hat man das platzintensiverere Menü
            variant={props.isScreenWidthMobile?"temporary":"permanent"}
            classes={{
                paper: clsx(classes.drawerPaper, !props.isDrawerOpen && classes.drawerPaperClose),
            }}
            open={props.isDrawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => props.setDrawerOpenState(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider/>
            <Tabs/>
        </Drawer>
    )

    const renderContentBox = () => (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Box className={classes.contentBox} align='center'>
                {renderContent()}
            </Box>
        </main>
    )

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
            {renderAppBar()}
            {renderLeftMenu()}
            {renderContentBox()}
        </div>
    );
}
export default connect((state) => ({
    activeContent: state.teacherNavigationReducer.activeContent,
    courseSelected: state.courseNavigationReducer.courseSelected,
    request_token: state.loginReducer.request_token,
    errorMessageToUser: state.teacherNavigationReducer.errorMessageToUser,
    role: state.loginReducer.role,
    isScreenWidthMobile: state.loginReducer.isScreenWidthMobile,
    isDrawerOpen: state.generalNavigationReducer.isDrawerOpen,
}), {setDrawerOpenState})
(Dashboard);
