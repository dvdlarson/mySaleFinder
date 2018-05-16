-- DROP DATABASE saleFinder;
DROP DATABASE IF EXISTS salefinder;
CREATE DATABASE salefinder;
USE salefinder;

-- idk why but I have to do the grant statement here in order for 'root' to be able to use the
-- db and I always have to use a password, not sure why
-- the create user statement here can be uncommented, user only has to be created once

--CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON saleFinder.* TO 'root'@'localhost';


CREATE TABLE `users` (

	user_id int NOT NULL AUTO_INCREMENT
    ,username varchar(25)
    ,email varchar(100)
    ,phone varchar(20)
	,first_name varchar(255) 
    ,last_name varchar(255) 
    ,address varchar(255) 
    ,city varchar(255) 
    ,state varchar(2) 
    ,zip_cd varchar(5) 
    ,full_address varchar(255) 
    ,latitude varchar(50) 
    ,longitude varchar(50)
    ,buddy_contact boolean 
    ,hash varchar(300) 
	,PRIMARY KEY (user_id, username)

);

CREATE TABLE `sales`(
	
	sale_id int NOT NULL AUTO_INCREMENT
    ,user_id varchar(25)
    ,title varchar(200)
    ,sale_type varchar(100)
    ,featured boolean
    ,super_featured boolean
    ,start_date date
    ,end_date date
    ,start_time time
    ,end_time time
    ,on_street_parking boolean
    ,inside_outside varchar(10)
    ,weather_cancel boolean
    ,address varchar(255) 
    ,city varchar(255) 
    ,state varchar(2) 
    ,zip_cd varchar(5) 
    ,full_address varchar(255) 
    ,latitude varchar(50) 
    ,longitude varchar(50) 
    ,items_desc varchar(1000)
    ,photo_url varchar(500)
    ,going_count int
    ,active boolean
    ,PRIMARY KEY (sale_id)
);


CREATE TABLE `reviews`(
	
	id int NOT NULL AUTO_INCREMENT
    ,sale_id int
    ,user_id varchar(25)
    ,comment varchar(200)
    ,rating int
    ,PRIMARY KEY (id)
);

CREATE TABLE `mylist`(
	
	id int NOT NULL AUTO_INCREMENT
    ,user_id varchar(25)
    ,sale_id int
    ,notes varchar(250)
    ,PRIMARY KEY (id)
);
