import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ClassIcon from '@material-ui/icons/Class';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import { connect } from "react-redux";
import {switchContent} from "../../actions/teacherNavigationActions";
import PeopleIcon from "@material-ui/icons/People";
import ForumIcon from '@material-ui/icons/Forum';
import BuildIcon from '@material-ui/icons/Build';
import {setDrawerOpenState} from "../../actions/navigationActions";

export const SUBJECT_OVERVIEW_IDENTIFIER = "SUBJECT_OVERVIEW";
export const TASK_OVERVIEW_IDENTIFIER = "TASK_OVERVIEW";
export const SCHEDULE_IDENTIFIER = "SCHEDULE";
export const COMMUNICATION_DASHBOARD_IDENTIFIER = "COMMUNICATION_DASHBOARD";
export const COURSES_FOR_SUBJECT_IDENTIFIER = "COURSES_FOR_SUBJECT";
export const COURSE_VIEW_IDENTIFIER = "COURSE_VIEW";
export const TASKS_FOR_COURSE_IDENTIFIER = "TASKS_FOR_COURSE";
export const STUDENTS_FOR_COURSE_IDENTIFIER = "STUDENTS_FOR_COURSE";
export const ACTIONS_FOR_COURSE_IDENTIFIER = "ACTIONS_FOR_COURSE";

class ListItemsComponent extends React.Component{
    constructor(props){
        super(props)
        this.handleSwitchContent = this.handleSwitchContent.bind(this);
    }

    handleSwitchContent = (identifier) =>{
        function switchContent(){
            this.props.switchContent(identifier);
            if(this.props.isScreenWidthMobile){
                this.props.setDrawerOpenState(false)
            }
        }
        return switchContent.bind(this);
    }

    render() {
        return (
        <List>
            <ListSubheader inset>Hauptnavigation</ListSubheader>
            <ListItem button onClick={this.handleSwitchContent(SUBJECT_OVERVIEW_IDENTIFIER)}>
                <ListItemIcon>
                    <ClassIcon/>
                </ListItemIcon>
                <ListItemText primary="Fächerübersicht"/>
            </ListItem>
            <ListItem button onClick={this.handleSwitchContent(TASK_OVERVIEW_IDENTIFIER)}>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Aufgabenübersicht"/>
            </ListItem>
            <ListItem button onClick={this.handleSwitchContent(SCHEDULE_IDENTIFIER)}>
                <ListItemIcon>
                    <ScheduleIcon/>
                </ListItemIcon>
                <ListItemText primary="Stundenplan"/>
            </ListItem>
          <ListItem button onClick={this.handleSwitchContent(COMMUNICATION_DASHBOARD_IDENTIFIER)}>
            <ListItemIcon>
                <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Kommunikationsdashboard"/>
          </ListItem>
        </List>
        );
    }
}

export const TeacherTabs = connect((state) => ({isScreenWidthMobile: state.loginReducer.isScreenWidthMobile}), {switchContent, setDrawerOpenState})(ListItemsComponent);

function CourseTabsComponent(props){

    function handleSwitchContent(identifier){
        function switchContent(){
            props.switchContent(identifier);
            if(props.isScreenWidthMobile){
                props.setDrawerOpenState(false)
            }
        }
        return switchContent;
    }
    return(
        <div>
            <ListSubheader inset>{props.courseName}</ListSubheader>
            <ListItem button onClick={handleSwitchContent(ACTIONS_FOR_COURSE_IDENTIFIER)}>
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Aktion" />
            </ListItem>
            <ListItem button onClick={handleSwitchContent(STUDENTS_FOR_COURSE_IDENTIFIER)}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Schülerübersicht" />
            </ListItem>
            <ListItem button onClick={handleSwitchContent(TASKS_FOR_COURSE_IDENTIFIER)}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Aufgabenübersicht" />
            </ListItem>
        </div>
    )
}

export const CourseTabs = connect(state => ({
    courseName: state.courseNavigationReducer.courseName,
    isScreenWidthMobile: state.loginReducer.isScreenWidthMobile,
}), {switchContent, setDrawerOpenState})(CourseTabsComponent)
