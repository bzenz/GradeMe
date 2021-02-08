import React from "react";
import Stundenplan from "../../../images/Stundenplan_Mock.jpg"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import generalStyles from "../../../styles/GeneralStyles";

export default function Timetable() {
    const generalStyle = generalStyles();
    return (
        <div>
            <Box p={4} bgcolor="background.paper" align="center">
                <Typography className={generalStyle.siteHeading} >
                    Stundenplan
                </Typography>
            </Box>
            <img src={Stundenplan} alt="Stundenplanmock" />
        </div>
    )
}
