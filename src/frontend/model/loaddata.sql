INSERT INTO Users (user_id, username, user_type) VALUES (1, 'bobby12', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (2, 'tim12', 'admin');
INSERT INTO Users (user_id, username, user_type) VALUES (3, 'joe01', 'admin');
INSERT INTO Users (user_id, username, user_type) VALUES (4, 'tim', 'admin');
INSERT INTO Users (user_id, username, user_type) VALUES (5, 'joseph', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (7, 'timard', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (6, 'mikeWU', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (8, 'WUmiek', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (9, 'jame', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (10, 'AI', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (11, 'boot', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (12, 'goolger', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (13, 'password', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (14, 'enterpirseUser', 'regular');
INSERT INTO Users (user_id, username, user_type) VALUES (15, 'dispo341', 'regular');

INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (1, 28, 1, "good book");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (2, 52, 4, "bad book");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (1, 46, 3, "nicee");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (5, 22, 2, "boring");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (1, 23, 3, "fun");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (5, 24, 1, "bad");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (1, 49, 5, "decent");
INSERT INTO Reviews (user_id, content_id, rating, user_comment) VALUES (8, 55, 7, "I love this book so much it is so good best book ever!");
INSERT INTO Reviews (user_id, content_id, rating) VALUES (1, 66, 1);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (8, 62, 2);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (1, 61, 1);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (7, 61, 2);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (1, 60, 2);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (10, 18, 1);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (1, 59, 1);
INSERT INTO Reviews (user_id, content_id, rating) VALUES (5, 73, 4);

INSERT INTO Favorites (user_id, content_id) VALUES (1, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (1, 7);
INSERT INTO Favorites (user_id, content_id) VALUES (5, 2);
INSERT INTO Favorites (user_id, content_id) VALUES (1, 12);
INSERT INTO Favorites (user_id, content_id) VALUES (12, 6);
INSERT INTO Favorites (user_id, content_id) VALUES (13, 14);
INSERT INTO Favorites (user_id, content_id) VALUES (8, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (1, 17);
INSERT INTO Favorites (user_id, content_id) VALUES (1, 1);
INSERT INTO Favorites (user_id, content_id) VALUES (11, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (19, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (14, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (6, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (12, 4);
INSERT INTO Favorites (user_id, content_id) VALUES (10, 4);

INSERT INTO Downloads (user_id, content_id) VALUES (1, 5);
INSERT INTO Downloads (user_id, content_id) VALUES (1, 7);
INSERT INTO Downloads (user_id, content_id) VALUES (5, 2);
INSERT INTO Downloads (user_id, content_id) VALUES (1, 12);
INSERT INTO Downloads (user_id, content_id) VALUES (12, 6);
INSERT INTO Downloads (user_id, content_id) VALUES (13, 14);
INSERT INTO Downloads (user_id, content_id) VALUES (8, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (1, 17);
INSERT INTO Downloads (user_id, content_id) VALUES (1, 1);
INSERT INTO Downloads (user_id, content_id) VALUES (11, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (19, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (14, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (6, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (12, 4);
INSERT INTO Downloads (user_id, content_id) VALUES (10, 4);

INSERT INTO Content (content_id, title, publish_date) VALUES (46, "Why WWII was Bad", "1994.12.11");
INSERT INTO Article (content_id, author, publication_name) VALUES (46, "Patrick", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (47, "WWI -- The Good War", "1994.12.10");
INSERT INTO Article (content_id, author, publication_name) VALUES (47, "Jones", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (48, "Vietnam War: 20 Year Later", "1994.12.09");
INSERT INTO Article (content_id, author, publication_name) VALUES (48, "Tim Cook", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (49, "Cold War", "1994.12.01");
INSERT INTO Article (content_id, author, publication_name) VALUES (49, "Steve Job", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (50, "The Good War", "1994.12.01");
INSERT INTO Article (content_id, author, publication_name) VALUES (50, "Bill Gate", "New York Times");
INSERT INTO Article (content_id, author, publication_name) VALUES (51, "Tom Gate", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (51, "The Bad War", "1994.12.01");
INSERT INTO Article (content_id, author, publication_name) VALUES (52, "Michael Gate", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (52, "10 Reasons Why Poems are Good", "1994.12.05");
INSERT INTO Article (content_id, author, publication_name) VALUES (53, "John Lennon", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (53, "5 Reasons to use NoSQL", "1994.12.05");
INSERT INTO Article (content_id, author, publication_name) VALUES (54, "John Lennon", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (54, "7 Reaons to use MySQL", "1994.12.05");
INSERT INTO Article (content_id, author, publication_name) VALUES (55, "Timard Jones", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (55, "12 Reasons to Normalize Database", "1994.12.05");
INSERT INTO Article (content_id, author, publication_name) VALUES (56, "Mike Wu", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (56, "Neural Nets for Preschoolers", "1994.12.11");
INSERT INTO Article (content_id, author, publication_name) VALUES (57, "Mike Wu", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (57, "How to Perform Surgery", "1994.12.11");
INSERT INTO Article (content_id, author, publication_name) VALUES (58, "Harry Potter", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (58, "How to write ER Diagrams", "1994.12.01");
INSERT INTO Article (content_id, author, publication_name) VALUES (59, "Harry Potter", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (59, "SJSU Announces New Gym", "1994.12.01");
INSERT INTO Article (content_id, author, publication_name) VALUES (60, "James Potter", "New York Times");
INSERT INTO Content (content_id, title, publish_date) VALUES (60, "SJSU Power Outage", "1994.12.12");


INSERT INTO Content (content_id, title, publish_date) VALUES (61, "A Walk", '1666.01.11');
INSERT INTO Poem (content_id, poem_type, author) VALUES (61, "Haiku", "Georgre Bush");
INSERT INTO Content (content_id, title, publish_date) VALUES (62, "A Run", '1266.01.11');
INSERT INTO Poem (content_id, poem_type, author) VALUES (62, "Haiku", "James Jones");
INSERT INTO Content (content_id, title, publish_date) VALUES (63, "A Jog", '1631.12.10');
INSERT INTO Poem (content_id, poem_type, author) VALUES (63, "Ballad", "James Reds");
INSERT INTO Content (content_id, title, publish_date) VALUES (64, "A Dog", '1435.10.10');
INSERT INTO Poem (content_id, poem_type, author) VALUES (64, "Ballad", "John Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (65, "A CAT", '1123.10.10');
INSERT INTO Poem (content_id, poem_type, author) VALUES (65, "Ballad", "Patrick Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (66, "A Harry Potter", '1823.01.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (66, "Ballad", "Harry Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (67, "Table", '1923.01.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (67, "Haiku", "Daisy Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (68, "I love Databases", '1941.11.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (68, "Haiku", "Patrick James");
INSERT INTO Content (content_id, title, publish_date) VALUES (69, "Best Poem Ever", '1921.01.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (69, "Ode", "Patrick Bush");
INSERT INTO Content (content_id, title, publish_date) VALUES (70, "Consumerism", '1941.01.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (70, "Ballad", "Patrick Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (71, "Capitalism", '1952.01.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (71, "Haiku", "James Bush");
INSERT INTO Content (content_id, title, publish_date) VALUES (72, "Canda", '2035.11.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (72, "Love", "Tomard Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (73, "Food", '1635.11.09');
INSERT INTO Poem (content_id, poem_type, author) VALUES (73, "Love", "Gustavo Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (74, "A Long Run in the Park", '1835.04.12');
INSERT INTO Poem (content_id, poem_type, author) VALUES (74, "Ballad", "Frank Renyolds");
INSERT INTO Content (content_id, title, publish_date) VALUES (75, "A Ballad to James", '1935.11.12');
INSERT INTO Poem (content_id, poem_type, author) VALUES (75, "Ballad", "J. Renyolds");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("1", "291");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("1", "Snowbaording Magazine", "2018-08-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("2", "292");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("2", "Snowbaording Magazine", "2018-09-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("3", "293");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("3", "Snowbaording Magazine", "2018-10-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("4", "294");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("4", "Snowbaording Magazine", "2018-11-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("5", "295");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("5", "Snowbaording Magazine", "2018-12-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("6", "296");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("6", "Snowbaording Magazine", "2019-01-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("7", "297");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("7", "Snowbaording Magazine", "2019-02-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("8", "298");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("8", "Snowbaording Magazine", "2018-03-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("9", "299");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("9", "Snowbaording Magazine", "2019-04-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("10", "300");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("10", "Snowbaording Magazine", "2019-05-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("11", "301");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("11", "Snowbaording Magazine", "2019-06-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("12", "302");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("12", "Snowbaording Magazine", "2019-07-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("13", "303");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("13", "Snowbaording Magazine", "2019-08-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("14", "304");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("14", "Snowbaording Magazine", "2019-09-1");

INSERT INTO Magazine(content_id, issueNum) 
            VALUES ("15", "305");
INSERT INTO Content(content_id, title, publish_date) 
            VALUES("15", "Snowbaording Magazine", "2019-10-1");

insert into Book (content_id, ISBN, author, publisher, genre) values ("16", '304555343-5', 'Murdoch Cave', 'Leela Buterton', 'Comedy');
insert into Book (content_id, ISBN, author, publisher, genre) values ("17", '659196532-7', 'Goldy Aimeric', 'Ali Gaitskell', 'Comedy');
insert into Book (content_id, ISBN, author, publisher, genre) values ("18", '491743522-6', 'Jelene Fancet', 'Linzy Shelf', 'Comedy');
insert into Book (content_id, ISBN, author, publisher, genre) values ("19", '346181073-8', 'Paulie Ouldcott', 'Adrianna Gresch', 'Adventure');
insert into Book (content_id, ISBN, author, publisher, genre) values ("20", '868282781-6', 'Taber Deguara', 'Shanta Daouze', 'Horror');
insert into Book (content_id, ISBN, author, publisher, genre) values ("21", '109670642-3', 'Clareta O''Carran', 'Winifield', 'Sci-Fi');
insert into Book (content_id, ISBN, author, publisher, genre) values ("22", '239189700-6', 'Osbourne Kingsly', 'Antonella Fancett', 'Crime');
insert into Book (content_id, ISBN, author, publisher, genre) values ("23", '671528801-1', 'Stevena Gotling', 'Mabelle MacFaul', 'Drama');
insert into Book (content_id, ISBN, author, publisher, genre) values ("24", '583092606-7', 'Debi Vala', 'Madelon Croux', 'Drama');
insert into Book (content_id, ISBN, author, publisher, genre) values ("25", '674056408-6', 'Merilee Blackall', 'Oates Raspison', 'Crime');
insert into Book (content_id, ISBN, author, publisher, genre) values ("26", '273454549-7', 'Wanda Morbey', 'Shawn Kosel', 'Crime');
insert into Book (content_id, ISBN, author, publisher, genre) values ("27", '544491903-6', 'Clyde Marginson', 'Jocko Connors', 'Comedy');
insert into Book (content_id, ISBN, author, publisher, genre) values ("28", '469558624-X', 'Magdaia Killelay', 'Prudence Rudsdell', 'Crime');
insert into Book (content_id, ISBN, author, publisher, genre) values ("29", '541188048-3', 'Philippa Frays', 'Noel Doerrling', 'Action');
insert into Book (content_id, ISBN, author, publisher, genre) values ("30", '133956813-6', 'Sharron Earley', 'Roze Sterzaker', 'Comedy');
insert into Content (content_id, title, publish_date) values ("16", 'In the Electric Mist', '2019-02-01');
insert into Content (content_id, title, publish_date) values ("17", 'Babylon 5', '2018-04-01');
insert into Content (content_id, title, publish_date) values ("18", 'Mortuary', '2017-11-11');
insert into Content (content_id, title, publish_date) values ("19", 'Counterfeit Coin', '2018-06-05');
insert into Content (content_id, title, publish_date) values ("20", 'Ah, Wilderness!', '2018-10-13');
insert into Content (content_id, title, publish_date) values ("21", 'Independencia', '2018-10-24');
insert into Content (content_id, title, publish_date) values ("22", 'Lost Son, The', '2018-11-20');
insert into Content (content_id, title, publish_date) values ("23", 'Wild Child', '2019-07-14');
insert into Content (content_id, title, publish_date) values ("24", 'Little Big Soldier', '2018-11-18');
insert into Content (content_id, title, publish_date) values ("25", 'Medea', '2017-12-16');
insert into Content (content_id, title, publish_date) values ("26", 'One Fine Spring Day', '2019-07-05');
insert into Content (content_id, title, publish_date) values ("27", 'Galaxina', '2018-12-18');
insert into Content (content_id, title, publish_date) values ("28", 'Godzilla 2000', '2017-11-09');
insert into Content (content_id, title, publish_date) values ("29", 'Free Soul, A', '2019-08-21');
insert into Content (content_id, title, publish_date) values ("30", 'Attack on the Iron Coast', '2019-04-30');

insert into Newspaper (content_id, locale) values ("31", "New York City, NY");
insert into Newspaper (content_id, locale) values ("32", "New York City, NY");
insert into Newspaper (content_id, locale) values ("33", "New York City, NY");
insert into Newspaper (content_id, locale) values ("34", "New York City, NY");
insert into Newspaper (content_id, locale) values ("35", "New York City, NY");
insert into Newspaper (content_id, locale) values ("36", "New York City, NY");
insert into Newspaper (content_id, locale) values ("37", "New York City, NY");
insert into Newspaper (content_id, locale) values ("38", "New York City, NY");
insert into Newspaper (content_id, locale) values ("39", "New York City, NY");
insert into Newspaper (content_id, locale) values ("40", "New York City, NY");
insert into Newspaper (content_id, locale) values ("41", "New York City, NY");
insert into Newspaper (content_id, locale) values ("42", "New York City, NY");
insert into Newspaper (content_id, locale) values ("43", "New York City, NY");
insert into Newspaper (content_id, locale) values ("44", "New York City, NY");
insert into Newspaper (content_id, locale) values ("45", "New York City, NY");
insert into Content (content_id, title, publish_date) values ("31", "New York Time", '2018-06-28');
insert into Content (content_id, title, publish_date) values ("32", "New York Time", '2018-04-10');
insert into Content (content_id, title, publish_date) values ("33", "New York Time", '2018-10-04');
insert into Content (content_id, title, publish_date) values ("34", "New York Time", '2018-08-30');
insert into Content (content_id, title, publish_date) values ("35", "New York Time", '2018-05-29');
insert into Content (content_id, title, publish_date) values ("36", "New York Time", '2019-09-05');
insert into Content (content_id, title, publish_date) values ("37", "New York Time", '2019-08-16');
insert into Content (content_id, title, publish_date) values ("38", "New York Time", '2018-12-01');
insert into Content (content_id, title, publish_date) values ("39", "New York Time", '2018-07-24');
insert into Content (content_id, title, publish_date) values ("40", "New York Time", '2018-09-07');
insert into Content (content_id, title, publish_date) values ("41", "New York Time", '2018-09-17');
insert into Content (content_id, title, publish_date) values ("42", "New York Time", '2019-01-18');
insert into Content (content_id, title, publish_date) values ("43", "New York Time", '2019-05-13');
insert into Content (content_id, title, publish_date) values ("44", "New York Time", '2019-10-02');
insert into Content (content_id, title, publish_date) values ("45", "New York Time", '2018-04-30');


