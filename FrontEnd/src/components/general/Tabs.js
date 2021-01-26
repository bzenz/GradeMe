import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import {ACTIONS_FOR_COURSE_IDENTIFIER, CLASS_ADMINISTRATION_IDENTIFIER, COMMUNICATION_DASHBOARD_IDENTIFIER, COURSE_ADMINISTRATION_IDENTIFIER, GRADES_OVERVIEW_IDENTIFIER, SCHEDULE_IDENTIFIER, STUDENTS_FOR_COURSE_IDENTIFIER, SUBJECT_ADMINISTRATION_IDENTIFIER, SUBJECT_OVERVIEW_IDENTIFIER, TASK_OVERVIEW_IDENTIFIER, TASKS_FOR_COURSE_IDENTIFIER, USER_ADMINISTRATION_IDENTIFIER} from "./identifiers";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GradesIcon from "@material-ui/icons/Grade";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ForumIcon from "@material-ui/icons/Forum";
import {connect} from "react-redux";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setDrawerOpenState} from "../../actions/generalNavigationActions";
import ClassIcon from "@material-ui/icons/Class";
import BuildIcon from "@material-ui/icons/Build";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import {PeopleAlt, PeopleOutline, Subject, SupervisorAccount} from "@material-ui/icons";

const tabs = (props) => {
    const handleSwitchContent = (identifier) => {
        function switchContent() {
            props.switchContent(identifier);
            if (props.isScreenWidthMobile) {
                props.setDrawerOpenState(false)
            }
        }

        return switchContent;
    }


    const createTab = (label, identifier, icon) => {
        return(
            <ListItem button onClick={handleSwitchContent(identifier)} key={`${label}-${identifier}`}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label}/>
            </ListItem>
        )
    }

    const studentTabsArray = [
        {label: "Notenübersicht", identifier: GRADES_OVERVIEW_IDENTIFIER, icon: <GradesIcon/>},
    ]
    const teacherTabsArray = [
        {label: "Fächerübersicht", identifier: SUBJECT_OVERVIEW_IDENTIFIER, icon: <ClassIcon/>},
    ]
    const studentAndTeacherTabsArray = [
        {label: "Aufgabenübersicht", identifier: TASK_OVERVIEW_IDENTIFIER, icon: <AssignmentIcon/>},
        {label: "Stundenplan", identifier: SCHEDULE_IDENTIFIER, icon: <ScheduleIcon/>},
        {label: "Kommunikationsdashboard", identifier: COMMUNICATION_DASHBOARD_IDENTIFIER, icon: <ForumIcon/>},
    ]
    const adminTabsArray = [
        {label: "Nutzerverwaltung", identifier: USER_ADMINISTRATION_IDENTIFIER, icon: <PeopleOutline/>},
        {label: "Kursverwaltung", identifier: COURSE_ADMINISTRATION_IDENTIFIER, icon: <PeopleAlt/>},
        {label: "Klassenverwaltung", identifier: CLASS_ADMINISTRATION_IDENTIFIER, icon: <SupervisorAccount/>},
        {label: "Fächerverwaltung", identifier: SUBJECT_ADMINISTRATION_IDENTIFIER, icon: <Subject/>},
    ]
    const courseTabsArray = [
        {label: "Aktion", identifier: ACTIONS_FOR_COURSE_IDENTIFIER, icon: <BuildIcon/>},
        {label: "Schülerübersicht", identifier: STUDENTS_FOR_COURSE_IDENTIFIER, icon: <PeopleIcon/>},
        {label: "Aufgabenübersicht", identifier: TASKS_FOR_COURSE_IDENTIFIER, icon: <AssignmentIcon/>},
    ]

    const navigationByRole = () => {
        switch(props.role){
            case "student":
                return makeTabsFromArray(studentTabsArray.concat(studentAndTeacherTabsArray));
            case "teacher":
                return makeTabsFromArray(teacherTabsArray.concat(studentAndTeacherTabsArray));
            case "admin":
                return makeTabsFromArray(adminTabsArray);
        }
    }

    const makeTabsFromArray = (array) => array.map(item => createTab(item.label, item.identifier, item.icon));

    const additionalNavigation = () => {
        if (props.role === "teacher" && props.courseSelected) return (
            <Typography color='textPrimary' component={'div'}>
                <ListSubheader inset>{props.courseName}</ListSubheader>
                {makeTabsFromArray(courseTabsArray)}
            </Typography>
        )
    }

    return(
        <>
            <ListSubheader inset>Hauptnavigation</ListSubheader>
            <Typography color='textPrimary' component={'div'}>
                {navigationByRole()}
            </Typography>
            <Divider/>
            {additionalNavigation()}
        </>
    )
}

export const Tabs = connect(state => ({
    courseName: state.courseNavigationReducer.courseName,
    isScreenWidthMobile: state.loginReducer.isScreenWidthMobile,
    courseSelected: state.courseNavigationReducer.courseSelected,
    role: state.loginReducer.role,
}), {switchContent, setDrawerOpenState})(tabs)
