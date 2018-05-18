-- DROP DATABASE saleFinder;
--DROP DATABASE IF EXISTS salefinder;
--CREATE DATABASE salefinder;
USE salefinder;


-- test VIEW so we can just findAll from my_sales like it was a normal table. this is the sql that the tool generated from my human sql. i edited to remove some columns and get more just what we need 

-- not sure why this is not running in the whole create database thing.

CREATE OR REPLACE VIEW `salefinder`.`my_sales` AS
    SELECT 
        `u`.`username` AS `site_user`,
        `s`.`id` AS `id`,
        `s`.`username` AS `posting_user`,
        `s`.`title` AS `title`,
        `s`.`sale_type` AS `sale_type`,
        `s`.`start_date` AS `start_date`,
        `s`.`end_date` AS `end_date`,
        `s`.`start_time` AS `start_time`,
        `s`.`end_time` AS `end_time`,
        `s`.`on_street_parking` AS `on_street_parking`,
        `s`.`inside_outside` AS `inside_outside`,
        `s`.`weather_cancel` AS `weather_cancel`,
        `s`.`address` AS `address`,
        `s`.`city` AS `city`,
        `s`.`state` AS `state`,
        `s`.`zip_cd` AS `zip_cd`,
        `s`.`full_address` AS `full_address`,
        `s`.`latitude` AS `latitude`,
        `s`.`longitude` AS `longitude`,
        `s`.`items_desc` AS `items_desc`,
        `s`.`photo_url` AS `photo_url`
    FROM
        ((`salefinder`.`favorites` `f`
        LEFT JOIN `salefinder`.`users` `u` ON ((`f`.`UserId` = `u`.`id`)))
        LEFT JOIN `salefinder`.`sales` `s` ON ((`f`.`sale_id` = `s`.`id`)))


-- idk why but I have to do the grant statement here in order for 'root' to be able to use the
-- db and I always have to use a password, not sure why
-- the create user statement here can be uncommented, user only has to be created once

--CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON saleFinder.* TO 'root'@'localhost';


-- CREATE TABLE `users` (

-- 	username int NOT NULL AUTO_INCREMENT
--     ,username varchar(25)
--     ,email varchar(100)
--     ,phone varchar(20)
-- 	,first_name varchar(255) 
--     ,last_name varchar(255) 
--     ,address varchar(255) 
--     ,city varchar(255) 
--     ,state varchar(2) 
--     ,zip_cd varchar(5) 
--     ,full_address varchar(255) 
--     ,latitude varchar(50) 
--     ,longitude varchar(50)
--     ,buddy_contact boolean 
--     ,hash varchar(300) 
-- 	,PRIMARY KEY (user_id, username)

-- );

-- CREATE TABLE `sales`(
	
-- 	sale_id int NOT NULL AUTO_INCREMENT
--     ,username varchar(25)
--     ,title varchar(200)
--     ,sale_type varchar(100)
--     ,featured boolean
--     ,super_featured boolean
--     ,start_date date
--     ,end_date date
--     ,start_time time
--     ,end_time time
--     ,on_street_parking boolean
--     ,inside_outside varchar(10)
--     ,weather_cancel boolean
--     ,address varchar(255) 
--     ,city varchar(255) 
--     ,state varchar(2) 
--     ,zip_cd varchar(5) 
--     ,full_address varchar(255) 
--     ,latitude varchar(50) 
--     ,longitude varchar(50) 
--     ,items_desc varchar(1000)
--     ,photo_url varchar(500)
--     ,going_count int
--     ,active boolean
--     ,PRIMARY KEY (sale_id)
-- );


-- CREATE TABLE `reviews`(
	
-- 	id int NOT NULL AUTO_INCREMENT
--   --   ,sale_id int
--     -- ,user_id varchar(25)
--     ,comment varchar(200)
--     ,rating int
--     ,PRIMARY KEY (id)
-- );

-- CREATE TABLE `mylist`(
	
-- 	id int NOT NULL AUTO_INCREMENT
--     -- ,user_id varchar(25)
--     -- ,sale_id int
--     ,notes varchar(250)
--     ,PRIMARY KEY (id)
-- );
-- use salefinder;
-- SELECT * FROM sales;
