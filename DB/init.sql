
DROP TABLE Users;
DROP TABLE Courses;
DROP TABLE Tasks;
DROP TABLE Subjects;
DROP TABLE IsIn;
DROP TABLE HasEvaluation;

CREATE TABLE Users
(
    Id          INTEGER PRIMARY KEY,
    LoginName   VARCHAR(32),
    Vorname     VARCHAR(16),
    Name        VARCHAR(16),
    Type        INTEGER(1),
    PwHash      VARCHAR(64)
);

CREATE TABLE Subjects
(
    Id          INTEGER PRIMARY KEY,
    Name        VARCHAR(32)
);

CREATE TABLE Courses
(
    Id          INTEGER PRIMARY KEY,
    SubjectId   INTEGER references Subjects (Id),
    Year        INTEGER
);

CREATE TABLE Tasks
(
    Id          INTEGER PRIMARY KEY,
    Title       VARCHAR(32),
    Description VARCHAR(512),
    Date        VARCHAR(32),
    CourseId    INTEGER references Courses (Id),
    Graded      INTEGER(1)
);

CREATE TABLE IsIn
(
    Id          INTEGER PRIMARY KEY,
    UserId      INTEGER references Users (Id),
    CourseId    INTEGER references Courses (Id)
);

CREATE TABLE HasEvaluation
(
    Id          INTEGER PRIMARY KEY,
    UserId      INTEGER references Users (Id),
    TaskId      INTEGER references Tasks (Id),
    Grade       INTEGER,
    Annotation  VARCHAR(256)
);
