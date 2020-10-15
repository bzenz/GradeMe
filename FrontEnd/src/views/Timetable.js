import React from "react";
import Stundenplan from "../images/Stundenplan_Mock.jpg"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Timetable() {
    return (
        <div>
            <Box p={4} bgcolor="background.paper" align="center">
                <Typography variant="h3" align="center" color="primary">
                    Stundenplan
                </Typography>
            </Box>
            <img src={Stundenplan} alt="this is car image" />
        </div>
    )
}