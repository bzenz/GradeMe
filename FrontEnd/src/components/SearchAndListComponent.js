import React, {useEffect, useRef, useState} from "react";
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
import generalStyles from "../styles/GeneralStyles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Dimensions} from "react-native";
import {ScrollView} from "react-native-web";


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

let screenHeight = Math.round(Dimensions.get('window').height);

const useStylesCustom = makeStyles((theme) => ({
    backgroundPaper: {
        padding: '2%',
        marginTop: "2%",
        height: screenHeight*0.93,
        overflowY: "auto",
    },
    searchPanelPaper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    searchPanelText: {
        marginRight: "1.5%",
        marginLeft: "1.5%",
    },
    userAccordion: {
    },
    accordionSummaryStyle: {
        flexBasis: '20%',
    },
    filterFormControl: {
        minWidth: 140,
    },

}));

function SearchAndListComponent(props) {
    const classesCustom = useStylesCustom();
    const generalStyle = generalStyles();
    const[firstList, setFirstList] = useState([]);
    const[secondList, setSecondList] = useState([]);
    const[searchFieldValue, setSearchFieldValue] = useState("");
    const[selectedSearchOption, setSelectedSearchOption] = useState("username");
    const[selectedFilterOption, setSelectedFilterOption] = useState("all");
    const[scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useRef();
    useEffect(() => {
        setFirstList(mock);
        setSecondList(mock2);
    })

    const handleSearchFieldChange = (event) => {
        setSearchFieldValue(event.target.value);
    }
    const handleSearchOptionChange = (event) => {
        setSelectedSearchOption(event.target.value);
    }
    const handleFilterOptionChange = (event) => {
        setSelectedFilterOption(event.target.value);
    }

    /*Da bei dem Übertrag eines Nutzers von einer Liste zur anderen die Komponente neugerendert wird, muss sich die Scrollposition gemerkt werden
    * um danach wieder an den Ursprungsort zu scrollen.
    * Bei jedem Scrollen wird die scrollPositionVariable auf den aktuellen Wert gesetzt und wenn ein Nutzer übertragen
    * wird, dann wird durch den Buttonklick dieser Wert in die scrollPosition-Hook gespeichert, um sie nach dem neurendern
    * als Startpunkt für den Scrollview zu nutzen*/
    let scrollPositionVariable = 0;
    const handleScroll = (event) => {
        scrollPositionVariable = event.nativeEvent.contentOffset.y;
    }


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

    const buildAccordionList = (array, isFirstList, applyFilter) => {
        return (
            array.map((user) => {
                /*Der Nutzer wird nur an das AccordionArray gegeben, wenn entweder nicht gefiltert wird (Für die erste Liste)
                oder wenn die Eingabe im Suchfeld dem Parameter des Nutzers entspricht, der im Radiocontrol eingestellt ist
                (z.B. username des Nutzers entspricht dem im Suchfeld)
                Dabei wird nur nach Teilstrings gesucht. Das heißt ein Nutzername kann ab123cd sein, und er wird
                bei einer Suchanfrage mit "123" trotzdem gefunden */
                if(!applyFilter||(user[selectedSearchOption].toLowerCase().includes(searchFieldValue.toLowerCase())) && (user.role===selectedFilterOption||selectedFilterOption==="all")) {
                    return (
                        <Accordion className={classesCustom.userAccordion}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
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
                                <Typography className={classesCustom.accordionSummaryStyle}>
                                    Nachname: {user.role==="teacher"?"Lehrer":"Schüler"}
                                </Typography>
                                {isFirstList ?
                                    <IconButton
                                        aria-label="Delete"
                                        onFocus={(event) => event.stopPropagation()}
                                        onClick={(event) => {
                                            setScrollPosition(scrollPositionVariable);
                                            event.stopPropagation()
                                            const arrayObj = moveDataRecordFromOneArrayToAnotherArray(user, firstList, secondList);
                                            setFirstList(arrayObj.departureArray);
                                            setSecondList(arrayObj.destinationArray);
                                        }}>
                                        <DeleteIcon/>
                                    </IconButton> :
                                    <IconButton
                                        aria-label="Add"
                                        onFocus={(event) => event.stopPropagation()}
                                        onClick={(event) => {
                                            setScrollPosition(scrollPositionVariable);
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
                        </Accordion>)
                }
            }
        ))
    }

    return (
    <div>
       <ScrollView className={classesCustom.backgroundPaper} ref={scrollRef} onScroll={(event) => handleScroll(event)}>
           {scrollRef.current?.scrollTo({y:scrollPosition, animated: false})}
           <Typography className={generalStyle.siteSubHeading1}>
               {props.firstListHeading}
           </Typography >
           {buildAccordionList(firstList, true, false)}
           <Typography className={generalStyle.siteSubHeading1}>
               {props.secondListHeading}
           </Typography>
           <Container id="searchAndFilterpanel" className={classesCustom.searchPanelPaper}>
               <Typography className={classesCustom.searchPanelText}>
                   Suchen nach:
               </Typography>
               <RadioGroup label="yeetus" aria-label="gender" name="gender1" value={selectedSearchOption} onChange={handleSearchOptionChange}>
                   <FormControlLabel value="username" control={<Radio />} label="Benutzername" />
                   <FormControlLabel value="vorname" control={<Radio />} label="Vorname" />
                   <FormControlLabel value="name" control={<Radio />} label="Nachname" />
               </RadioGroup>
               <TextField
                   id="searchfield"
                   label="Suchtext..."
                   variant="outlined"
                   onChange={handleSearchFieldChange}
                   helperText="Groß- und Kleinschreibung wird ignoriert"
               />

               <Typography className={classesCustom.searchPanelText}>
                   Filtern nach:
               </Typography>

               <FormControl variant={"filled"} className={classesCustom.filterFormControl}>
                   <InputLabel id="Filterlabel">Filteroptionen</InputLabel>
                   <Select
                       labelId="roleFilterSelect-label"
                       id="roleFilterSelect"
                       value={selectedFilterOption}
                       onChange={handleFilterOptionChange}
                   >
                       <MenuItem value={"all"}>Alle</MenuItem>
                       <MenuItem value={"student"}>Schüler</MenuItem>
                       <MenuItem value={"teacher"}>Lehrer</MenuItem>
                   </Select>
               </FormControl>

           </Container>
           {buildAccordionList(secondList, false, true)}
       </ScrollView>
    </div>
    )
}

export default connect ()(SearchAndListComponent)