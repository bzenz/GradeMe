
DELETE FROM Users;
DELETE FROM Courses;
DELETE FROM Tasks;
DELETE FROM Subjects;
DELETE FROM IsIn;
DELETE FROM HasEvaluation;

-- INSERT INTO Users VALUES (Id, LoginName, Vorname, Name, Type, PwHash);
INSERT INTO Users VALUES (0, 'benitozenz',           'Benito',   'Zenz',         0, '$2a$10$zydsoKERlGRff9gFaXGBzu87tC8rIS1pnTW/FwBFLM5mbnHjypM.O'); -- pw: bz
INSERT INTO Users VALUES (1, 'robinhöntsch',         'Robin',    'Höntsch',      0, '$2a$10$W22aWrgmstgOCbea27V3lOyRPzXGtjeKzKvInjVIn2I.GNeT10OVG'); -- pw: rh
INSERT INTO Users VALUES (2, 'gertrudzimmermann',    'Gertrud',  'Zimmermann',   1, '$2a$10$BJRf//mOiq1cM8zPKbl2a.53HHxbgrq7zhTTE74BkgL3ZNw/5n4oK'); -- pw: gz
INSERT INTO Users VALUES (3, 'erwinbock',            'Erwin',    'Bock',         1, '$2a$10$FVyxN/0y0ROdc/HfDw2eJeVwU0lkz9XZMSwhqaKGowxbgwLXohGlS'); -- pw: eb
INSERT INTO Users VALUES (4, 'kevinmorgenthaler',    'Kevin',    'Morgenthaler', 0, '$2a$10$YlIvmp.zt5u4Q4q2DLc0SOXyavp9uc868MMfuzUyjyWiahg.BqEVy'); -- pw: km
INSERT INTO Users VALUES (5, 'florianlemnitzer',     'Florian',  'Lemnitzer',    0, '$2a$10$18Dv0Fvkcvsvk.OTj/oBLezNGw.aoNqDDRDk8x8kQ/Bc95szp6FwK'); -- pw: fl
INSERT INTO Users VALUES (6, 'florianlemnitzer2',    'Flori',    'Anlemnitzer',  0, '$2a$10$LR/OAMvn1CRivJDWIiL6fOdLqPdd/Sbpzvp1SWw16rFng793EQ/PW'); -- pw: fa
INSERT INTO Users VALUES (7, 'sebastianbach',        'Sebastian','Bach',         0, '$2a$10$flu1kHhcQgibMNUp3lILFuc/2pic4c/qw7t3tdyni8FFALFimU.3K'); -- pw: sb

-- INSERT INTO Subjects VALUES (Id, Name);
INSERT INTO Subjects VALUES (0, 'Deutsch');
INSERT INTO Subjects VALUES (1, 'Mathe');

-- INSERT INTO Courses VALUES (Id, SubjectId, Year);
INSERT INTO Courses VALUES (0, 0, 2019); -- Deutsch19
INSERT INTO Courses VALUES (1, 1, 2019); -- Mathe19
INSERT INTO Courses VALUES (2, 1, 2020); -- Mathe20

-- INSERT INTO Tasks VALUES (Id, Title, Description, Date, CourseId, Graded);
INSERT INTO Tasks VALUES (0, 'Diktat',                       'Ich lese euch etwas vor und ihr schreibt das auf.',                                                                        '2021-07-09T11:30:00.000Z', 0, 1); -- Deutsch19 (graded)
INSERT INTO Tasks VALUES (1, 'HA Kurvendiskussion',          'Bitte erledigt die Aufgaben 3 und 4 auf Seite 122.',                                                                       '2021-05-22T09:00:00.000Z', 1, 0); -- Mathe19 (not graded)
INSERT INTO Tasks VALUES (2, 'Klausur e-Funktionenscharen',  'Bereitet euch gut auf diese Klausur vor. Sie zählt 50% der Zeugnisnote! Besonders Buch S. 120-126 können euch helfen.',    '2021-07-17T12:00:00.000Z', 1, 1); -- Mathe19 (graded)
INSERT INTO Tasks VALUES (3, 'Vokabeltest',                  'Deutsche Vokablen werden abgefragt.',                                                                                      '2020-09-13T08:30:00.000Z', 0, 1); -- Deutsch19 (graded)

-- INSERT INTO IsIn VALUES (Id, UserId, CourseId);
INSERT INTO IsIn VALUES (0, 0, 0); -- Benito in Deutsch19
INSERT INTO IsIn VALUES (1, 0, 1); -- Benito in Mathe19
INSERT INTO IsIn VALUES (2, 1, 0); -- Robin in Deutsch19
INSERT INTO IsIn VALUES (3, 4, 1); -- Kevin in Mathe19
INSERT INTO IsIn VALUES (4, 5, 1); -- Florian in Mathe19
INSERT INTO IsIn VALUES (5, 6, 2); -- Flori in Mathe20
INSERT INTO IsIn VALUES (6, 7, 2); -- Sebastian in Mathe20
INSERT INTO IsIn VALUES (7, 2, 0); -- Gertrud in Deutsch19
INSERT INTO IsIn VALUES (8, 3, 1); -- Erwin in Mathe19
INSERT INTO IsIn VALUES (9, 3, 2); -- Erwin in Mathe20

-- INSERT INTO HasEvaluation VALUES (Id, UserId, TaskId, Grade, Annotation);
INSERT INTO HasEvaluation VALUES (0, 0, 3, 4, 'Ach komm, Benito, du kannst keine deutschen Vokabeln?'); -- Benito hat im Deutsch19 Vokabeltest eine 4
