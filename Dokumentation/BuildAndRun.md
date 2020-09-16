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

Um die aktuelle Version des FrontEnds zu bündeln und zu exportieren, muss nur die Datei `exportFrontEnd.js` im `FrontEnd` Ordner ausgeführt werden.

```shell
[GradeMe/FrontEnd]$> node exportFrontEnd.js
```
