import React, {useState} from 'react';
import {KeyboardAvoidingView, TextInput} from "react-native";
import { connect } from 'react-redux';
import { init } from '../actions/loginActions';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LoginScreen(props) {
    const classes = useStyles();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
       setPassword(event.target.value);
    }

    function handleSubmit(){
        props.init(username, password);
    }

    return (
        <KeyboardAvoidingView>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        GradeMe
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextInput
                            style={{ height: "40%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, width: "100%", marginBottom: "3%" }}
                            placeholder = "Nutzername"
                            onChange={handleUsernameChange}
                        />
                        <TextInput
                            style={{ height: "40%", borderColor: 'gray', borderWidth: 1, borderRadius: 5, width: "100%" }}
                            placeholder = "Passwort"
                            onChange={handlePasswordChange}
                            onSubmitEditing = {handleSubmit}
                            secureTextEntry
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick = {handleSubmit}
                        >
                            Anmelden
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </KeyboardAvoidingView>
    );
}

export default connect(
    null,
    { init }
)(LoginScreen);
