import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import generalStyles from "../styles/GeneralStyles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Dimensions} from "react-native";
import {ScrollView} from "react-native-web";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";


let screenHeight = Math.round(Dimensions.get('window').height);

const useStylesCustom = makeStyles((theme) => ({
    backgroundPaper: {
        padding: '2%',
        marginTop: "2%",
        height: screenHeight*0.93,
        overflowY: "auto",
        //ab einer Bildschirmbreite von 750 muss die Komponente in X-Richtung scrollable sein
        [theme.breakpoints.down(750)]:{
            width: "100%",
            overflowX: "auto",
        },
    },
    searchPanelContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]:{
            flexDirection: "column",
        }
    },
    searchPanelComponent: {
        marginRight: "1.5%",
    },
    dataRow: {
    },
    dataRowTeacher: {
        backgroundColor: "#E1F5FE",
    },
    accordionSummaryStyle: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    formControl: {
        minWidth: 140,
        marginRight: "1.5%"
    },

}));

//Für eine Ausführliche Dokumentation der benötigten Props der Komponente:
//Im Ordner Dokumentation/Components/SearchAndList-Componentdoc.txt nachschlagen

function SearchListComponent(props) {
    const classesCustom = useStylesCustom();
    const generalStyle = generalStyles();
    const[normalList, setNormalList] = useState([]);
    const[searchList, setSearchList] = useState([]);
    const[searchFieldValue, setSearchFieldValue] = useState("");
    const[selectedSearchOption, setSelectedSearchOption] = useState("username");
    const[selectedFilterOption, setSelectedFilterOption] = useState("all");
    const[scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useRef();

        useEffect(() => {
        setNormalList(props.normalList);
        setSearchList(props.searchList);
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

    const buildTable = (arrayOfDataRecords, isFirstList, applyFilter) => {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {props.tableHeadWords.map((word) => {
                            return(
                                <TableCell align={"center"}>
                                    <Typography variant={"h6"}>
                                        {word}
                                    </Typography>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>

               {arrayOfDataRecords.map((dataRecord) => {
                /*Der Nutzer wird nur an die TableRow gegeben, wenn entweder nicht gefiltert wird (Für die erste Liste)
                ODER wenn die Eingabe im Suchfeld dem Parameter des Nutzers entspricht, der im Radiocontrol eingestellt ist
                (z.B. username des Nutzers entspricht dem im Suchfeld) und zusätzlich die Rolle der im Rollenfilter eingestellten Rolle entspricht */
                   if(!applyFilter||((dataRecord[selectedSearchOption].toLowerCase().includes(searchFieldValue.toLowerCase())) && (dataRecord[props.filterParameter]===selectedFilterOption||selectedFilterOption==="all"))) {
                        return (
                            <TableRow className={dataRecord.role==="teacher"?classesCustom.dataRowTeacher:classesCustom.dataRow}>
                                {/*Es wird hier über alle Einträge des dataRecord iteriert, uns aus jedem Eintrag wird eine Tabellenzelle gebastelt*/}
                                {Object.values(dataRecord).map((dataRecordField) => {
                                    return (
                                        <TableCell align={"center"}>
                                            <Typography >
                                                {dataRecordField}
                                            </Typography>
                                        </TableCell>
                                    )
                                })}

                                {/*Es wird hier geprüft, ob für jeden Dateneintrag in der Liste ein Button zum verschieben in
                                die jeweils andere Liste eingefügt werden soll. Dafür muss zuerst geprüft werden, ob es überhaupt
                                eine TwoListComponent ist und zusätzlich, ob es denn die erste oder zweite Liste ist, um dann
                                den entsprechenden Button einzufügen.
                                Wenn nicht, sollen die Buttons eingefügt werden, die von den Props der Komponente zur
                                Verfügung gestellt werden.
                                Ja, verschachtelte tertiäre Ausdrücke innerhalb von JSX sucken... aber muss ja manchmal sein*/}
                                {isFirstList&&props.isTwoListComponent?
                                    <IconButton
                                        aria-label="Delete"
                                        onFocus={(event) => event.stopPropagation()}
                                        onClick={(event) => {
                                            setScrollPosition(scrollPositionVariable);
                                            event.stopPropagation()
                                            const arrayObj = moveDataRecordFromOneArrayToAnotherArray(dataRecord, normalList, searchList);
                                            setNormalList(arrayObj.departureArray);
                                            setSearchList(arrayObj.destinationArray);
                                        }}>
                                        <DeleteIcon/>
                                    </IconButton> :
                                    props.isTwoListComponent?
                                        <IconButton
                                            aria-label="Add"
                                            onFocus={(event) => event.stopPropagation()}
                                            onClick={(event) => {
                                            setScrollPosition(scrollPositionVariable);
                                            event.stopPropagation()
                                            const arrayObj = moveDataRecordFromOneArrayToAnotherArray(dataRecord, searchList, normalList);
                                            setNormalList(arrayObj.departureArray);
                                            setSearchList(arrayObj.destinationArray);
                                        }}>
                                            <AddIcon/>
                                        </IconButton>
                                    :props.buttonListForTableEntry
                                }
                            </TableRow>
                        )
                   }
               }
               )
               }
            </Table>
       )
    }

    return (
    <div>
        <Paper>
           <ScrollView className={classesCustom.backgroundPaper} ref={scrollRef} onScroll={(event) => handleScroll(event)}>
               {scrollRef.current?.scrollTo({y:scrollPosition, animated: false})}
               {props.isTwoListComponent?
                   <Typography className={generalStyle.siteSubHeading1}>
                       {props.normalListHeading}
                   </Typography>
               :null}
               {props.isTwoListComponent?
                   buildTable(normalList, true, false)
               :null}

               <Typography className={generalStyle.siteSubHeading1}>
                   {props.searchListHeading}
               </Typography>
               <Container id="searchAndFilterpanel" className={classesCustom.searchPanelContainer}>
                   <Typography className={classesCustom.searchPanelComponent}>
                       Suchen nach:
                   </Typography>
                   <FormControl variant={"standard"} className={classesCustom.formControl}>
                       <InputLabel id="SearchOptionInput">Suchoptionen</InputLabel>
                       <Select
                           labelId="searchOptionLabel-label"
                           id="searchOptionId"
                           value={selectedSearchOption}
                           onChange={handleSearchOptionChange}
                       >
                           {props.searchOptionArray.map((searchOption) => {
                               return (
                                   <MenuItem value={searchOption.value}>{searchOption.displayedString}</MenuItem>
                               )
                           })}
                       </Select>
                   </FormControl>
                   <TextField className={classesCustom.searchPanelComponent}
                       id="searchfield"
                       label="Suchtext..."
                       variant="standard"
                       onChange={handleSearchFieldChange}
                   />

                   <Typography className={classesCustom.searchPanelComponent}>
                       Filtern nach:
                   </Typography>

                   <FormControl variant={"standard"} className={classesCustom.formControl}>
                       <InputLabel id="Filterlabel">Filteroptionen</InputLabel>
                       <Select
                           labelId="filterSelect-label"
                           id="filterSelect"
                           value={selectedFilterOption}
                           onChange={handleFilterOptionChange}
                       >
                           {props.filterOptionArray.map((filterOption) => {
                               return (
                                   <MenuItem value={filterOption.value}>{filterOption.displayedString}</MenuItem>
                               )
                           })}
                       </Select>
                   </FormControl>

               </Container>
               {buildTable(searchList, false, true)}
           </ScrollView>
        </Paper>
    </div>
    )
}

export default connect ()(SearchListComponent)