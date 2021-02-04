import React, {useState} from "react";
import {connect} from "react-redux";
import generalStyles from "./../../styles/GeneralStyles"
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {SERVER} from "../../../index";
import { USER_ADMINISTRATION_IDENTIFIER} from "../general/identifiers";
import {switchContent} from "../../actions/teacherNavigationActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const customStyles = makeStyles((theme) => ({
    backgroundPaper: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        justifyContent: "center",
    },
    formTextfield: {
        marginTop: '2%',
    },
    formControl: {
        marginTop: '2%',
    },
}))

function CreateOrEditUserForm(props) {
    const generalStyle = generalStyles();
    const customStyle = customStyles();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("student");
    const [firstnameFieldFilled, setFirstnameFieldFilled] =useState(true);
    const [lastnameFieldFilled, setLastnameFieldFilled] =useState(true);

    function handleFormChange(event, type) {
        switch (type) {
            case "firstname": setFirstname(event.target.value); break;
            case "lastname": setLastname(event.target.value); break;
            case "role": setRole(event.target.value);
        }
    }

    if(props.isUserBeingEdited) {
        
    }

    function submitTaskForm(){
        let isFirstnameFieldFilled = (firstname !== "");
        let isLastnameFieldFilled = (lastname !== "");
        setFirstnameFieldFilled(isFirstnameFieldFilled);
        setLastnameFieldFilled(isLastnameFieldFilled);

        /* Der Grund dafür, dass hier der Wert der Variablen "isFirstNameFieldFilles" bzw. "isLastnameFieldFilled"
           abgefragt wird, ist dass Hooks zu setzen eine ansyncrone Funktion ist. D.h. ich kann nicht den Ausdruck
           (firstname !== "") bzw. (lastname !== "") auswerten, ihn als Hook setzen und direkt danach
           die Hook abfragen, da sich die Hook noch nicht aktualisiert hat.
           Deshalb muss man hier leider sowohl Hooks als auch normale Variablen nutzen */
        if( !isFirstnameFieldFilled || !isLastnameFieldFilled){
            alert("Nicht alle Pflichtfelder wurden ausgefüllt.");
            return;
        }

        const password = firstname.substring(0, 1) + lastname.substring(0, 1);
        let requestBody = {
            vorname: firstname,
            name: lastname,
            rolle: role,
            password: password,
            request_token: props.request_token,
        };
        fetch(SERVER + "/api/user/create", {
            "method": "POST",
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify(requestBody)
        })
        alert("Nutzer wurde erstellt");
        props.switchContent(USER_ADMINISTRATION_IDENTIFIER)
    }

    const handleRoleSelectionChange = (event) => {
        setRole(event.target.value);
    }

    return (
        <div>
            <Typography className={generalStyle.siteHeading}>
                Nutzer anlegen
            </Typography>
            <Paper className={customStyle.backgroundPaper}>
                <TextField
                    className={ customStyle.formTextfield }
                    error={ !firstnameFieldFilled }
                    id="firstname"
                    label="Vorname"
                    variant="outlined"
                    onChange={(e) => {handleFormChange(e, "firstname")}}
                />

                <TextField
                    className={customStyle.formTextfield}
                    error={ !lastnameFieldFilled }
                    id="lastname"
                    label="Nachname"
                    variant="outlined"
                    onChange={(e) => {handleFormChange(e, "lastname")}}
                />
                <FormControl variant={"standard"} className={customStyle.formControl}>
                    <InputLabel id="Roleselectionlabel">Rolle auswählen</InputLabel>
                    <Select
                        labelId="filterSelect-label"
                        id="filterSelect"
                        value={role}
                        onChange={handleRoleSelectionChange}
                    >
                        <MenuItem value={"student"}>Schüler</MenuItem>
                        <MenuItem value={"teacher"}>Lehrer</MenuItem>
                        <MenuItem value={"admin"}>Administrator</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color={'primary'} onClick={() => submitTaskForm()}>
                    <NoteAddIcon />
                    Nutzer erstellen
                </IconButton>
            </Paper>
        </div>
    )
}

export default connect((state) => ({
    request_token: state.loginReducer.request_token,
    isUserBeingEdited: state.adminReducer.isUserBeingEdited,
}), {switchContent})(CreateOrEditUserForm)