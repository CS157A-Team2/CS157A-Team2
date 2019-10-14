DROP DATABASE bookstore;
CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE Users (user_id VARCHAR(20),
	username VARCHAR(20),
       	user_type VARCHAR(20), 
	PRIMARY KEY(user_id)
);

CREATE TABLE Reviews( user_id VARCHAR(20),
       	content_id INTEGER,
	rating INTEGER,
	user_comment VARCHAR(200),
	PRIMARY KEY(user_id, content_id)
);

CREATE TABLE Favorites( user_id VARCHAR(20),
	content_id INTEGER,
	PRIMARY KEY (user_id, content_id)
);

CREATE TABLE Downloads( user_id VARCHAR(20),
	content_id INTEGER,
	PRIMARY KEY (user_id, content_id)
);

CREATE TABLE Content ( content_id INTEGER AUTO_INCREMENT,
	title VARCHAR(40),
	publish_date DATE,
	PRIMARY KEY(content_id)
	)

