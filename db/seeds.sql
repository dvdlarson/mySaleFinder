
-- DROP DATABASE IF EXISTS salefinder;
-- CREATE DATABASE salefinder;

ALTER TABLE `salefinder`.`Users` 

CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `salefinder`.`Sales` 
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `salefinder`.`Sales` 
DROP FOREIGN KEY `Sales_ibfk_1`;
ALTER TABLE `salefinder`.`Sales` 
CHANGE COLUMN `UserId` `UserId` INT(11) NOT NULL DEFAULT 1 ;
ALTER TABLE `salefinder`.`Sales` 
ADD CONSTRAINT `Sales_ibfk_1`
  FOREIGN KEY (`UserId`)
  REFERENCES `salefinder`.`Users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

INSERT INTO `salefinder`.`Users` (`id`,`username`,`email`,`first_name`,`last_name`,`city`,`state`,`zip_cd`,`password`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'sonoflars','dvdlarson2010@gmail.com','dave','larson','mesa','AZ','85210','pass','2018-05-19 07:38:28','2018-05-19 07:38:28');

INSERT INTO `salefinder`.`Users` (`id`,`username`,`email`,`first_name`,`last_name`,`city`,`state`,`zip_cd`,`password`) VALUES (DEFAULT,'frankFurt99','email2101@gmail.com','Frank','Furterson','mesa','AZ','85210','funkytown');

INSERT INTO `salefinder`.`Sales`
(`title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`,  `active`) VALUES
( 'Greatest yard sale in HISTORY!', 'Yard Sale', '0', '0', '2018-05-12', '2018-05-13', '06:30', '16:00', '1', 'Inside', '0', '1041 w. kilarea ave', 'mesa', 'az', '85210', '1041 w kilarea ave. mesa az 85210', '33.374806', '-111.856696', 'Electronics, Tools, Clothes, Baby Gear, Sporting Goods, 1985 Lime Green Ford Pinto', '0',  '1');

INSERT INTO `salefinder`.`Sales`
( `title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`,  `active`) VALUES
( 'Greatest yard sale in HISTORY 2- Yard Sale Boogaloo', 'Yard Sale', '0', '0', '2018-05-26', '2018-05-27', '06:30', '16:00', '1', 'Outside', '0', '1041 w. kilarea ave', 'mesa', 'az', '85210', '1041 w kilarea ave. mesa az 85210', '33.374806', '-111.856696', 'Heck yeah! Its happening again! The first one was Epic. You guys bought ALL my stuff. But I got all new used stuff so lets do a garage sale.', '0',  '1');

INSERT INTO `salefinder`.`Sales`
(`title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`, `active`) VALUES
( 'Im having a gol dang yard sale yall.', 'Yard Sale', '0', '0', '2018-05-26', '2018-05-27', '07:00', '16:00', '1', 'Outside', '0', '1310 w. laird st', 'tempe', 'az', '85281', '1310 w. laird st tempe az 85281', '33.420546', '-111.959073', 'Propane and propane accessories. Camping and fishing gear. Seven blenders and a box of comic books. Acoustic guitar maybe some hippy would probably like.', '0',  '1');

INSERT INTO `salefinder`.`Sales`
(`title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`, `active`) VALUES
('Come to the 8th annual Casey Moores BAR-d Sale! Eat, drink, & find treasures!', 'Yard Sale', '1', '0', '2018-05-26', '2018-05-27', '10:00', '16:00', '1', 'Outside', '0', '850 S Ash Ave', 'tempe', 'az', '85281', '850 S Ash Ave Tempe AZ 85281', '33.420633', '-111.942631', 'You never know what people are going to bring! Last year we had furniture, jewelry, art, a pinball machine, and so much more! Special deals on food and drinks throughout the day. If you are interested in getting a space, contact Patty at 602-555-1212 prior to 5/26', '0',  '1');

INSERT INTO `salefinder`.`Sales`
( `title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`,  `active`) VALUES
( 'First Annual Aventerra Community Garage Sale - RAIN OR SHINE!!', 'Yard Sale', '1', '0', '2018-05-26', '2018-05-27', '07:00', '17:00', '1', 'Outside', '0', '1960 W Keating Ave', 'Mesa', 'az', '85202', ' 1960 W Keating Ave Mesa AZ 85202', '33.368976', '-111.877062', 'Please join us for our first annual Aventerra Community Yard Sale! Over 50 families will be participating! There will be bouncy houses for the kids, games, music, food, and much more! Come find your hidden treasure!', '0',  '1');

INSERT INTO `salefinder`.`Sales`
( `title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`,  `active`) VALUES
( 'Estate Sale - Two Days Only! May 26 & 27th - EVERYTHING MUST GO', 'Estate Sale', '0', '0', '2018-05-26', '2018-05-27', '07:00', '17:00', '1', 'Inside', '0', '1200 W monterey street', 'chandler', 'az', '85226', ' 1200 W monterey street chandler, az 85226', '33.315253', '-111.863705', 'My great aunt passed away recently. She was a total jerk. Our gain is YOUR gain. Everything must go. Super stupid prices. There is an electronic organ from the 80s, costume jewelry, a 1992 buick skylark, rodeo memorabilia, a thimble collection, much too much to list.', '0',  '1');

INSERT INTO `salefinder`.`Sales`
( `title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`,  `active`) VALUES
('Multi-family Yard Sale 5/26-5/27 Lots of Good Stuff!', 'Yard Sale', '0', '0', '2018-05-26', '2018-05-27', '06:00', '15:00', '1', 'Outside', '0', '2010 w chambers st', 'phoenix', 'az', '85001', '2010 w chambers st phoenix az', '33.397486', '-112.100756', 'Multi-family yard sale to benefit the Dobbs family who recently lost their BBQ grill in a crazy incident. Sporting & Camping gear, tools, smartphones, aquarium, jewelry, rugs, furniture and more. Credit cards will be accepted.', '0',  '1');








