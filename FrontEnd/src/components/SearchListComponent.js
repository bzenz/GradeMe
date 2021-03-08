import React, {useEffect, useRef, useState} from "react";
import { View, ScrollView } from "react-native";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Card} from "react-native-elements";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import generalStyles, {generalNativeStyles} from "../styles/GeneralStyles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Dimensions} from "react-native";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {CREATE_OR_EDIT_USER_IDENTIFIER} from "./general/identifiers";
import {switchContent} from "../actions/teacherNavigationActions";
import {setIsUserBeingEdited} from "../actions/adminActions";
import {SERVER} from "../../index";
import { CheckBox } from "react-native-elements";

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
    deactivatedDataRow: {
        backgroundColor: "#e0e0e0",
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
    const [,setState] = useState();
    const[normalList, setNormalList] = useState([]);
    const[searchList, setSearchList] = useState([]);
    const[searchFieldValue, setSearchFieldValue] = useState("");
    const[selectedSearchOption, setSelectedSearchOption] = useState(props.defaultSelectedSearchOption);
    const[selectedFilterOption, setSelectedFilterOption] = useState("all");
    const[scrollPosition, setScrollPosition] = useState(0);
    const[checkBoxIsEnabled, setCheckBoxIsEnabled] = useState(false);
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

    const handleEditDataRecordClick = (Id) => {
        switch (props.componentDataRecordType) {
            case "user":{
                props.setIsUserBeingEdited(true, Id);
                props.switchContent(CREATE_OR_EDIT_USER_IDENTIFIER);
                break;
            }
            default: alert("Diese Funktion ist noch nicht verfügbar")
        }

    }

    const handleDeactivateDataRecordClick = (Id) => {
        switch (props.componentDataRecordType) {
            case "user":{
                let requestBody = {
                    userId: Id,
                    request_token: props.request_token,
                };
                fetch(SERVER + "/api/user/deactivate", {
                    "method": "POST",
                    "headers": {'Content-Type': 'application/json'},
                    "body": JSON.stringify(requestBody)
                })
                alert("Nutzer wurde deaktiviert.")
                break;
            }
            default: alert("Diese Funktion ist noch nicht verfügbar")
        }
        for(let i = 0; i < searchList.length; i++) {
            if(searchList[i].userId === Id){
                let newList = searchList;
                newList[i].deactivated = true;
                setSearchList(newList);
                setState({});
            }
        }
       }

    const renderButtonsForList = (isFirstList, dataRecord) => {
        if(props.isTwoListComponent){
            if(isFirstList){
                return (
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
                    </IconButton>
                )
            } else {
                return (
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
                )
            }
        } else {
            return (
                <View style={generalNativeStyles.buttonGroupContainer}>
                    <Button
                        buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight]}
                        title={"Bearbeiten"}
                        onPress={() => handleEditDataRecordClick(dataRecord[props.dataRecordIdentifierName])}
                    />
                    <Button
                        buttonStyle={generalNativeStyles.button1}
                        title={"Deaktivieren"}
                        onPress={() => handleDeactivateDataRecordClick(dataRecord[props.dataRecordIdentifierName])}
                    />
                </View>
            )
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
                   if(!applyFilter||
                       ((dataRecord[selectedSearchOption].toLowerCase().includes(searchFieldValue.toLowerCase())) &&
                           (dataRecord[props.filterParameter]===selectedFilterOption||selectedFilterOption==="all"))) {
                       if(checkBoxIsEnabled||!dataRecord.deactivated){
                           return (
                               <TableRow className={dataRecord.deactivated?classesCustom.deactivatedDataRow:classesCustom.dataRow}>
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
                                   <TableCell>
                                       {renderButtonsForList(isFirstList, dataRecord)}
                                   </TableCell>
                               </TableRow>
                           )
                       }

                   }
               }
               )
               }
            </Table>
       )
    }

    function getDeactivatedCheckboxLabel(){
        switch (props.componentDataRecordType) {
            case "user": return "Deaktivierte Benutzer anzeigen";
            case "course": return "Deaktivierte Kurse anzeigen";
            default: return "Deaktivierte Datensätze anzeigen";
        }
    }

    return (
    <View style={generalNativeStyles.fullWidth}>
        <Card>
           <ScrollView className={classesCustom.backgroundPaper} ref={scrollRef} onScroll={(event) => handleScroll(event)}>
               <CheckBox
                   title={getDeactivatedCheckboxLabel()}
                   checked={checkBoxIsEnabled}
                   center={true}
                   containerStyle={{backgroundColor: "white", borderWidth: 0}}
                   onPress={() => (setCheckBoxIsEnabled(!checkBoxIsEnabled))}
               />


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
        </Card>
    </View>
    )
}

export default connect ((state) => ({request_token: state.loginReducer.request_token}), {switchContent, setIsUserBeingEdited})(SearchListComponent)