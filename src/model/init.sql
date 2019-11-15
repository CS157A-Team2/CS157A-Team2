DROP DATABASE bookstore;
CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE Users (user_id VARCHAR(40),
	username VARCHAR(20),
       	user_type VARCHAR(20) DEFAULT 'regular', 
	PRIMARY KEY(user_id)
);

CREATE TABLE Reviews( user_id VARCHAR(40),
       	content_id INTEGER,
	rating INTEGER,
	user_comment VARCHAR(2000),
	PRIMARY KEY(user_id, content_id)
);

CREATE TABLE Favorites( 
	user_id VARCHAR(40),
	content_id INTEGER,
	PRIMARY KEY (user_id, content_id)
);

CREATE TABLE Downloads( user_id VARCHAR(40),
	content_id INTEGER,
	PRIMARY KEY (user_id, content_id)
);

CREATE TABLE Content ( content_id INTEGER AUTO_INCREMENT,
	title VARCHAR(40),
	publish_date DATE,
	content_type VARCHAR(20),
	PRIMARY KEY(content_id)
	);

CREATE TABLE Magazine (content_id INT PRIMARY KEY, 
                        issueNum INT);
                        
CREATE TABLE Book (content_id INT PRIMARY KEY, 
                  ISBN VARCHAR(20), 
                  author VARCHAR(20), 
                  publisher VARCHAR(20),  
                  genre VARCHAR(20));

CREATE TABLE Newspaper (content_id INT PRIMARY KEY, 
                        locale VARCHAR(20));

CREATE TABLE Article (content_id INT PRIMARY KEY, 
                      author VARCHAR(20),
                      publication_name VARCHAR(20));

CREATE TABLE Poem (content_id INT PRIMARY KEY, 
                      author VARCHAR(20),
                      poem_type VARCHAR(20));
