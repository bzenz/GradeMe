import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import { connect } from "react-redux";
import {switchContent} from "../../actions/teacherNavigationActions";
import ForumIcon from '@material-ui/icons/Forum';
import GradesIcon from "@material-ui/icons/Grade";
import { COMMUNICATION_DASHBOARD_IDENTIFIER, SCHEDULE_IDENTIFIER, TASK_OVERVIEW_IDENTIFIER } from "../teacher/TeacherTabs";
import {setDrawerOpenState} from "../../actions/generalNavigationActions";

export const GRADES_OVERVIEW_IDENTIFIER = "GRADES_OVERVIEW";

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
            <ListItem button onClick={this.handleSwitchContent(GRADES_OVERVIEW_IDENTIFIER)}>
                <ListItemIcon>
                  <GradesIcon />
                </ListItemIcon>
                <ListItemText primary="Notenübersicht"/>
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

export const StudentTabs = connect((state) => ({isScreenWidthMobile: state.loginReducer.isScreenWidthMobile}), {switchContent, setDrawerOpenState})(ListItemsComponent);

