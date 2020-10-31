# BackEnd
Das BackEnd ist ein node Projekt. Die Abhängigkeiten werden mit `npm install` installiert.

```shell
[GradeMe/BackEnd]$> npm install
```

Zum Ausführen `npm start` ausführen.

```shell
[GradeMe/BackEnd]$> npm start
```

## Backend als ausführbare Datei exportieren
Das Backend kann als ausführbare Datei exportiert werden. Dafür muss als erstes das Frontend exportiert worden sein (siehe Abschnitt "FrontEnd in das BackEnd exportieren"). Dann muss nur `npm run build` ausgeführt werden. 

```shell
[GradeMe/BackEnd]$> npm run build
```

Voraussetzung dafür ist allerdings, dass das Programm `pkg` installiert ist.
```shell
$> npm i -g pkg
```


# FrontEnd
Das FrontEnd ist ein node Projekt. Die Abhängigkeiten werden mit `npm install` installiert.

```shell
[GradeMe/FrontEnd]$> npm install
```

Zum Ausführen `npm run web` ausführen.

```shell
[GradeMe/FrontEnd]$> npm run web
```

## FrontEnd in das BackEnd exportieren
Der React-Ordner `FrontEnd` wird nicht in der Produktion verwendet. Stattdessen existiert der Ordner `BackEnd/client`, in dem das React-Projekt gebündelt und optimiert liegt.

Um die aktuelle Version des FrontEnds zu bündeln und zu exportieren, muss nur `npm run export` im `FrontEnd` Ordner ausgeführt werden. Dies führt die Datei `exportFrontEnd.js` aus.

```shell
[GradeMe/FrontEnd]$> npm run export
```

# Datenbank
[SQLite3](https://sqlite.org/index.html) wird als Datenbank verwendet. Zum Aufsetzen muss entweder SQL3 von der [Downloadseite](https://sqlite.org/download.html) oder über das Terminal heruntergeladen und installiert werden.
```shell
[GradeMe/DB]$> sudo apt install sqlite3
```

## Initialisierung und Testdaten
Im DB Ordner kann über `sqlite3 gradeMe.db` die Bearbeitung der Datenbank gestartet werden.
```shell
[GradeMe/DB]$> sqlite3 gradeMe.db
```

Über `.read init.sql` wird die Datenbank auf den Werkszustand zurückgesetzt.
```shell
sqlite> .read init.sql
```

Anschließend kann durch `.read createTestData.sql` die Datenbank mit Testdaten gefüllt werden. Dabei werden alle existierenden Daten überschrieben.
```shell
sqlite> .read createTestData.sql
```

Um die Bearbeitung der Datenbank zu beenden, muss nur `.exit` eingegeben werden.
```shell
sqlite> .exit
```
