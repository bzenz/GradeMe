import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    paper: {
        /*backgroundColor: "#63a4ff",*/
        marginTop: '10px',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxShadow: '3',
        width: '50%',
    },
    button: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        align: "center",
        backgroundColor: "#63a4ff",
        boxShadow: '3',
        width: '50%',
    },
    text: {
        padding: theme.spacing(1),
        justifyContent: 'center',
        fontVariant: 'body1',

    },
    buttonText: {
        marginRight: theme.spacing(2),
    },
    textfieldPoints: {
        width: '20%',
        marginRight: theme.spacing(2),
    },
    textfieldAnnotation: {
        width: '70%',
    },
}))
