# BackEnd
Das BackEnd ist ein node Projekt. Die Abhängigkeiten werden mit `npm install` installiert.

```shell
[GradeMe/BackEnd]$> npm install
```

Zum Ausführen `npm start` ausführen.

```shell
[GradeMe/BackEnd]$> npm start
```

# FrontEnd
Das FrontEnd ist ein node Projekt. Die Abhängigkeiten werden mit `npm install` installiert.

```shell
[GradeMe/FrontEnd]$> npm install
```

Zum Ausführen `npm start` ausführen.

```shell
[GradeMe/FrontEnd]$> npm start
```

## FrontEnd in das BackEnd exportieren
Der React-Ordner `FrontEnd` wird nicht in der Produktion verwendet. Stattdessen existiert der Ordner `BackEnd/client`, in dem das React-Projekt gebündelt und optimiert liegt.

Um die aktuelle Version des FrontEnds zu bündeln und zu exportieren, muss nur `npm run export` im `FrontEnd` Ordner ausgeführt werden. Dies führt die Datei `exportFrontEnd.js` aus.

```shell
[GradeMe/FrontEnd]$> npm run export
```
