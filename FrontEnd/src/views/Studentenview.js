import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import NavBar from './NavBarSchueler';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    grid: {
    width: '100%',
    },
    paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: 'white',
        background: '#0d47a1',
        fontsize: '63px'
    },
    paper_light_blue: {
    padding: theme.spacing(7),
    background: '#1976d2'
    }
}));


export const Schuelersicht = () => {
    const classes = useStyles();

    return (<div>
              <AppBar color="primary">
              <Toolbar>
                  <TypoGraphy variant="h6"
                    color="inherit" fontsize="100px"
                  >
                  GradeMe
                 </TypoGraphy>
                </Toolbar>
              </AppBar>



           </div>

           );
}


/*export class Testcomponent extends React.Component {


    render() {
        return  (<div>
                    <Grid container spacing={10} >
                        <Grid item>
                            <text> test1 </text>
                        </Grid>
                        <Grid item>
                            <text> test2 </text>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Hello World
                            </Button>
                        </Grid>

                    </Grid>
                </div>

                );

    }
}*/

