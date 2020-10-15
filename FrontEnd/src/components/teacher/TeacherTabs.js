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

export const COURSE_OVERVIEW_IDENTIFIER = "COURSE_OVERVIEW";
export const TASK_OVERVIEW_IDENTIFIER = "TASK_OVERVIEW";
export const SCHEDULE_IDENTIFIER = "SCHEDULE";

class ListItemsComponent extends React.Component{
    constructor(props){
        super(props)
        this.handleSwitchContent = this.handleSwitchContent.bind(this);
    }

    handleSwitchContent = (identifier) =>{
        function switchContent(){
            this.props.switchContent(identifier);
        }
        return switchContent.bind(this);
    }

    render() {
        return (
        <List>
            <ListItem button onClick={this.handleSwitchContent(COURSE_OVERVIEW_IDENTIFIER)}>
                <ListItemIcon>
                    <ClassIcon/>
                </ListItemIcon>
                <ListItemText primary="Fachübersicht"/>
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
        </List>
        );
    }
}

export const TeacherTabs = connect(null, {switchContent})(ListItemsComponent);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);
