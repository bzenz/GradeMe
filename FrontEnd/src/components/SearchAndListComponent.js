import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import {AccordionSummary, Typography} from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const mock = [
    {id: 1, username: "benitozenz", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 2, username: "maxmayer", vorname: "Max", name: "Mayer", role: "student"},
    {id: 3, username: "florianlemnitzer", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung", vorname: "Keine", name: "Ahnung", role: "teacher"},
]
const mock2 = [
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
    {id: 1, username: "benitozenz2", vorname: "Benito", name: "Zenz", role: "student"},
    {id: 3, username: "florianlemnitzer2", vorname: "Florian", name: "Lemnitzer", role: "student"},
    {id: 4, username: "keineahnung2", vorname: "Keine", name: "Ahnung", role: "teacher"},
]

const useStylesCustom = makeStyles((theme) => ({
    backgroundPaper: {
        padding: '2%',
    },
    userAccordion: {
    },
    accordionSummaryStyle: {
        flexBasis: '25%',
    },
}));

function SearchAndListComponent(props) {
    const classesCustom = useStylesCustom();
    const[firstList, setFirstList] = useState([]);
    const[secondList, setSecondList] = useState([]);
    useEffect(() => {
        setFirstList(mock);
        setSecondList(mock2);
    })

    const findItemInListById = (Id, list) => {
        for (let i = 0; i < list.length; i++) {
            if(Id === list[i].id){
                return i;
            }
        }
    }

    const moveDataRecordFromOneArrayToAnotherArray = (dataRecord, departureArray, destinationArray) => {
        destinationArray.push(dataRecord);
        let index = findItemInListById(dataRecord.id, departureArray);
        departureArray = departureArray.splice(index, 1);
        return {
            departureArray: departureArray,
            destinationArray: destinationArray,
        }
    }

    const buildAccordionList = (array, isFirstList) => {
        return (
            array.map((user) =>
                <Accordion className={classesCustom.userAccordion} >
                    <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                        <Typography className={classesCustom.accordionSummaryStyle}>
                            ID: {user.id}
                        </Typography>
                        <Typography className={classesCustom.accordionSummaryStyle}>
                            Benutzername: {user.username}
                        </Typography>
                        <Typography className={classesCustom.accordionSummaryStyle}>
                            Vorname: {user.vorname}
                        </Typography>
                        <Typography className={classesCustom.accordionSummaryStyle}>
                            Nachname: {user.name}
                        </Typography>
                        {isFirstList?
                        <IconButton
                            aria-label="Delete"
                            onFocus={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                event.stopPropagation()
                                const arrayObj = moveDataRecordFromOneArrayToAnotherArray(user, firstList, secondList);
                                setFirstList(arrayObj.departureArray);
                                setSecondList(arrayObj.destinationArray);
                        }}>
                            <DeleteIcon/>
                        </IconButton>:
                            <IconButton
                                aria-label="Add"
                                onFocus={(event) => event.stopPropagation()}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    const arrayObj = moveDataRecordFromOneArrayToAnotherArray(user, secondList, firstList);
                                    setFirstList(arrayObj.departureArray);
                                    setSecondList(arrayObj.destinationArray);
                            }}>
                                <AddIcon/>
                            </IconButton>
                        }
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
        ))
    }

    return (
    <div>
       <Paper className={classesCustom.backgroundPaper}>
           <Typography>
               {props.firstListHeading}
           </Typography>
           {buildAccordionList(firstList, true)}
           <Typography variant={"h1"}>
               {props.secondListHeading}
           </Typography>
           {buildAccordionList(secondList, false)}
       </Paper>


    </div>
    )
}

export default connect ()(SearchAndListComponent)