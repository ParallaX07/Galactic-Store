CREATE DATABASE  IF NOT EXISTS `GalacticStore` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `GalacticStore`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: galacticstore.apollo.appboxes.co    Database: GalacticStore
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.4-MariaDB-1:10.11.4+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `Email` varchar(50) NOT NULL,
  `OrderID` varchar(36) NOT NULL,
  `Status` enum('open','closed') NOT NULL DEFAULT 'open',
  PRIMARY KEY (`Email`,`OrderID`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES ('aaharunsohel@gmail.com','35cee9ec-19b7-11ef-99fd-0242ac143902','closed'),('apollo@gmail.com','b009b25d-19e2-11ef-99fd-0242ac143902','open'),('john.doe@gmail.com','35cee9ec-19b7-11ef-99fd-0242ac143902','open'),('john.doe@gmail.com','eb7c3274-19b0-11ef-99fd-0242ac143902','closed'),('shuhadashithil17@gmail.com','6068e243-19b7-11ef-99fd-0242ac143902','open');
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetails`
--

DROP TABLE IF EXISTS `OrderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetails` (
  `OrderID` varchar(36) NOT NULL,
  `ProductID` varchar(36) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Status` enum('pending','shipped','delivered') NOT NULL DEFAULT 'pending',
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`OrderID`,`ProductID`),
  KEY `ProductID` (`ProductID`),
  KEY `Email` (`Email`),
  CONSTRAINT `OrderDetails_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`Product_ID`),
  CONSTRAINT `OrderDetails_ibfk_2` FOREIGN KEY (`Email`) REFERENCES `user` (`Email_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetails`
--

LOCK TABLES `OrderDetails` WRITE;
/*!40000 ALTER TABLE `OrderDetails` DISABLE KEYS */;
INSERT INTO `OrderDetails` VALUES ('35cee9ec-19b7-11ef-99fd-0242ac143902','0cfd1859-187a-11ef-99fd-0242ac143902','aaharunsohel@gmail.com',2,'pending','2024-05-24 10:20:14'),('6068e243-19b7-11ef-99fd-0242ac143902','193fb076-187b-11ef-99fd-0242ac143902','shuhadashithil17@gmail.com',1,'pending','2024-05-24 10:21:25'),('b009b25d-19e2-11ef-99fd-0242ac143902','8d03f10f-187a-11ef-99fd-0242ac143902','apollo@gmail.com',4,'pending','2024-05-24 15:31:27'),('eb7c3274-19b0-11ef-99fd-0242ac143902','15fe1bc8-16a6-11ef-99fd-0242ac143902','john.doe@gmail.com',1,'delivered','2024-05-24 09:35:12');
/*!40000 ALTER TABLE `OrderDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `Product_ID` char(36) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(8,2) NOT NULL,
  `Galaxy_source` varchar(20) NOT NULL,
  `Planet_source` varchar(20) NOT NULL,
  `Quantity_inStock` int(11) NOT NULL,
  `Image_Url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('0cfd1859-187a-11ef-99fd-0242ac143902','SolarWind Sail','The SolarWind Sail is a cutting-edge propulsion system designed on the planet Ventara in the Pegasus Galaxy. This sail harnesses the power of solar winds to propel spacecraft across vast interstellar distances with unparalleled efficiency. Made from ultra-light, durable nanomaterials, the SolarWind Sail unfolds to capture maximum solar energy, providing a smooth and steady acceleration. Ideal for long-term space missions and deep space exploration, this technology reduces fuel dependency and extends the operational range of any starship. With its elegant design and advanced engineering, the SolarWind Sail is a testament to Ventara\'s innovation in space travel.',5000.00,' Pegasus Galaxy','Ventara',8,'https://i.ibb.co/Y8k4YbC/d0785f7e-1d48-4d42-ae79-b4e891c700f4.jpg'),('15fe1bc8-16a6-11ef-99fd-0242ac143902','Quantum Flux Capacitor','The Quantum Flux Capacitor is an essential component for any high-performance starship or advanced technological setup. Engineered on the innovative planet of Technoria, this device manipulates quantum fields to provide unparalleled energy efficiency and power output. Whether you’re upgrading your ship\'s hyperdrive or enhancing your planetary defense systems, the Quantum Flux Capacitor delivers the reliability and performance needed for cutting-edge technology. Its sleek design and compact size make it a versatile addition to any technical arsenal. Experience the pinnacle of engineering and take your technology to new heights with the Quantum Flux Capacitor.',8900.00,'Triangulum','Technoria',9,'https://i.ibb.co/DQj2HzT/image.png'),('193fb076-187b-11ef-99fd-0242ac143902',' Bio-Luminescent Garden Kit','The Bio-Luminescent Garden Kit from Flora in the Virgo Cluster brings the enchanting beauty of bio-luminescent plants to your home or spaceship. This kit includes seeds and soil enriched with nutrients from Flora\'s rich biosphere, designed to grow plants that glow softly in the dark. Easy to set up and maintain, the garden kit comes with a holographic guide that provides step-by-step instructions. Ideal for creating a soothing and magical atmosphere, these plants not only add aesthetic value but also improve air quality. Experience the wonder of Flora\'s natural luminescence with this unique garden kit.',500.00,' Virgo Cluster','Flora',59,'https://i.ibb.co/K7YgTQc/098490af-0186-4f03-9ff4-c2a29087260d.jpg'),('29adccfa-15f8-11ef-99fd-0242ac143902','Galactic Navigator Watch','The Galactic Navigator Watch is the ultimate timepiece for interstellar travelers. Designed on Chronos V, this watch features advanced time dilation technology, allowing it to accurately display time across different planetary systems. The sleek, durable design is made from starsteel and embedded with pulsar fragments, ensuring both style and resilience. With its holographic display and customizable planetary settings, the Galactic Navigator Watch is not just a tool, but a companion for those who journey beyond the stars. Stay on schedule and explore the universe with precision and elegance.',3500.00,'Milky Way','Chronos V',11,'https://i.ibb.co/NLXncw5/image.png'),('6681a474-16c9-11ef-99fd-0242ac143902','Technorian Data Crystal','The Technorian Data Crystal is a pinnacle of data storage technology, capable of holding vast amounts of information in a compact, indestructible form. Created on the tech-centric planet of Technoria, this crystal utilizes quantum encryption to ensure the security and integrity of your data. Whether you need to store complex star maps, scientific research, or personal archives, the Technorian Data Crystal provides a reliable and futuristic solution. Its sleek design and luminescent core make it as visually appealing as it is functional. Secure your most valuable information with the Technorian Data Crystal and trust in the advanced technology of Technoria.',3100.00,'Triangulum','Technoria',8,'https://i.ibb.co/ThZXMJJ/image.png'),('71b6b66c-1875-11ef-99fd-0242ac143902','Antimatter Infusion Lamp','The Antimatter Infusion Lamp is an extraordinary lighting solution from the innovative minds on Nova Terra, a planet renowned for its technological advancements in the Triangulum Galaxy. This lamp uses antimatter to produce an incredibly bright and energy-efficient light that can illuminate even the darkest corners of a spaceship. Its sleek, modern design features adjustable intensity settings and a holographic interface that responds to voice commands. The Antimatter Infusion Lamp is perfect for creating a bright, welcoming environment in any space, making it an essential item for explorers and settlers alike.',850.00,'Triangulum Galaxy','Nova Terra',15,'https://i.ibb.co/Y0RS4cp/ef348ccd-61f4-4342-ae6d-5e7e600fea52.jpg'),('78610996-15f3-11ef-99fd-0242ac143902','Stardust Necklace','This exquisite necklace is crafted from the finest stardust particles collected from the rings of Zemora Prime. Each particle is meticulously selected and enchanted to emit a subtle, otherworldly glow that captivates the eyes of all who gaze upon it. Perfect for formal events or as a statement piece in your daily ensemble, the Stardust Necklace is a true testament to the beauty and mystery of the cosmos. Wear a piece of the universe around your neck and let your spirit shine as brightly as the stars.',1200.00,'Andromeda','Zemora Prime',9,'https://i.ibb.co/Z8zLftz/image.png'),('80e9cb88-1879-11ef-99fd-0242ac143902',' Graviton Stabilizer Boots','The Graviton Stabilizer Boots are a revolutionary footwear innovation from Rygel IV in the Cygnus X Galaxy. These boots are equipped with advanced graviton stabilizers that allow the wearer to walk comfortably on any surface, regardless of the gravitational conditions. Perfect for explorers navigating various planetary terrains, the boots provide excellent traction and support. The design is both stylish and functional, with an ergonomic fit that ensures all-day comfort. Whether you\'re hiking on rocky alien landscapes or floating in low gravity, the Graviton Stabilizer Boots are the ultimate gear for interstellar adventurers.',950.00,'Cygnus X','Rygel IV',35,'https://i.ibb.co/s2N9NbY/321efc42-e9b5-451e-bd6c-c63e6a0d82c9.jpg'),('852abb2c-16c8-11ef-99fd-0242ac143902','Lunar Gemstone Ring','The Lunar Gemstone Ring features a stunning gem harvested from the luminous lunar caverns of Zemora Prime. Each gemstone is imbued with the moon\'s ethereal glow, creating a captivating shimmer that changes with the phases of the moon. Set in a band crafted from celestial silver, this ring is a perfect blend of elegance and mystique. It is said to bring good fortune and serenity to its wearer, making it a prized possession among collectors and fashion enthusiasts. Adorn your finger with a piece of Zemora’s moonlight and let its tranquil beauty illuminate your life.',2200.00,'Andromeda','Zemora Prime',11,'https://i.ibb.co/23b1t5W/image.png'),('8d03f10f-187a-11ef-99fd-0242ac143902','Plasma Shield Generator','The Plasma Shield Generator from Aegis Prime in the Fornax Galaxy is the pinnacle of defensive technology. This advanced generator creates a powerful plasma shield capable of deflecting physical and energy-based attacks, ensuring unparalleled protection for space vessels and outposts. Compact and highly efficient, it utilizes cutting-edge plasma dynamics to maintain a stable and resilient barrier. Whether you\'re navigating through asteroid fields or fending off hostile encounters, the Plasma Shield Generator provides peace of mind and security, making it an indispensable tool for any serious space traveler.',12000.00,'Fornax','Aegis Prime',4,'https://i.ibb.co/d74SN37/52ea23cb-98ca-467a-8bc6-1cf5f27dea35.jpg'),('969e8626-16c6-11ef-99fd-0242ac143902','Celestial Elixir','The Celestial Elixir is a rare and potent potion brewed from the essence of the elusive Elara flowers, which bloom under the light of multiple moons. This elixir is known for its remarkable restorative properties, capable of rejuvenating the body and enhancing cognitive functions. Widely sought after by adventurers and scholars alike, a single sip of this luminescent liquid can provide a surge of energy and clarity. Whether you\'re embarking on a long voyage or delving into deep studies, the Celestial Elixir is the perfect companion to keep you at your best. Indulge in this cosmic brew and feel the universe\'s vitality coursing through you.',250.00,'Sagittarius','Elara',49,'https://i.ibb.co/68fdKLs/image.png'),('ae51623f-16c7-11ef-99fd-0242ac143902','Nebula Tapestry','The Nebula Tapestry is a breathtaking piece of textile art that captures the mesmerizing colors and patterns of distant nebulae. Woven by the skilled weavers of Orion III, this tapestry uses luminous threads that glow softly in the dark, creating an enchanting ambiance in any room. The intricate design depicts a swirling nebula, blending vibrant hues of blues, purples, and pinks, reminiscent of the birthplaces of stars. Hang this tapestry in your living space to bring a touch of the cosmic wonders into your home. The Nebula Tapestry is not just a decoration but a portal to the beauty and mystery of the universe.',750.00,'Andromeda','Orion III',19,'https://i.ibb.co/LkPG20J/image.png'),('b699e838-187b-11ef-99fd-0242ac143902','Galactic Gourmet Spice Set','The Galactic Gourmet Spice Set from Spica in the Virgo Constellation is a culinary treasure for any food enthusiast. This set features an array of exotic spices sourced from various planets, each offering unique flavors and aromas. From the fiery Zogtron pepper to the aromatic Elysian herb blend, these spices bring a taste of the galaxy to your kitchen. Packaged in beautifully designed containers that preserve freshness, the set includes a guide with recipes and pairing suggestions. Elevate your culinary creations and embark on a gastronomic journey through the stars with this exceptional spice set.',250.00,' Virgo Constellation',' Spica',150,'https://i.ibb.co/yQbk1VS/aec1245c-e76d-42ca-b6b1-3f2ee3115c34.jpg'),('c21d577d-16c8-11ef-99fd-0242ac143902','Chrono Compass','The Chrono Compass is an essential tool for any interstellar navigator. Designed on Chronos V, this advanced compass not only points true north across any planetary surface but also provides temporal coordinates, ensuring accurate timekeeping across different dimensions. Built with a resilient outer casing and featuring a holographic interface, the Chrono Compass is both durable and easy to use. Whether you\'re exploring uncharted territories or need precise synchronization in your travels, this device will guide you with unparalleled accuracy. Equip yourself with the Chrono Compass and traverse the cosmos with confidence.',1800.00,'Milky Way','Chronos V',24,'https://i.ibb.co/PgCm0Lx/image.png'),('f629a70d-1877-11ef-99fd-0242ac143902','Stardust Infused Perfume','Stardust Infused Perfume is an enchanting fragrance crafted on Seraphine, a planet famed for its aromatic flora in the Centaurus A Galaxy. This perfume is created using stardust particles that give it a unique, celestial sparkle and a long-lasting, mesmerizing scent. Each bottle is a work of art, adorned with intricate designs that reflect the beauty of the cosmos. The perfume’s fragrance is a blend of rare Seraphine blooms and cosmic essences, creating an aroma that is both exotic and unforgettable. Ideal for special occasions or as a luxurious gift, Stardust Infused Perfume captures the essence of the universe in a single bottle.',300.00,' Centaurus A','Seraphine',100,'https://i.ibb.co/3SYTXTQ/a0ef06b9-396b-450c-a96a-a7fe9741a430.jpg'),('f70a0ccc-16c6-11ef-99fd-0242ac143902','Meteorite Sculpture','',5000.00,'Milky Way','Glacia',10,'https://i.ibb.co/n89PCWQ/image.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER product_before_insert
BEFORE INSERT ON product
FOR EACH ROW
BEGIN
    IF NEW.Product_ID IS NULL OR NEW.Product_ID = '' THEN
        SET NEW.Product_ID = UUID();
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `product_ID` char(36) NOT NULL,
  `Email_ID` varchar(50) NOT NULL,
  `reviewDesc` text NOT NULL,
  `rating` decimal(2,1) NOT NULL CHECK (`rating` between 0 and 5),
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_ID`,`Email_ID`),
  KEY `review__ibfk_2` (`Email_ID`),
  CONSTRAINT `review__ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `product` (`Product_ID`),
  CONSTRAINT `review__ibfk_2` FOREIGN KEY (`Email_ID`) REFERENCES `user` (`Email_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('b699e838-187b-11ef-99fd-0242ac143902','john.doe@gmail.com','The Galactic Gourmet Spice Set from Spica is an absolute culinary treasure! This exquisite collection of exotic spices has transformed my kitchen into a galactic paradise. Each spice, from the fiery Zogtron pepper to the aromatic Elysian herb blend, offers unique and vibrant flavors that elevate every dish. The beautifully designed containers keep the spices fresh and add a touch of elegance to my pantry. The included guide with recipes and pairing suggestions is incredibly helpful. This spice set has truly taken my cooking to another level. A must-have for any food enthusiast!',5.0,'2024-05-24 07:14:54'),('c21d577d-16c8-11ef-99fd-0242ac143902','aaharunsohel@gmail.com','The Chrono Compass from Chronos V is a must-have for interstellar navigation! It points true north on any planet and provides precise temporal coordinates, making timekeeping across dimensions easy. The durable outer casing and intuitive holographic interface are perfect for any explorer. With only 24 units in stock, I highly recommend getting one before they\'re gone. This device has revolutionized my travels with its unparalleled accuracy. Worth every Galactic Credit!',5.0,'2024-05-23 18:45:42'),('c21d577d-16c8-11ef-99fd-0242ac143902','john.doe@gmail.com','The Chrono Compass from Chronos V is an excellent tool for interstellar navigation. It accurately points true north on any planet and provides precise temporal coordinates, which is incredibly useful. The durable outer casing and holographic interface are well-designed and user-friendly. My only minor gripe is that it could be a bit more compact for easier portability. Overall, it\'s a fantastic investment for any space traveler and worth the Galactic Credits!',4.0,'2024-05-24 06:55:25'),('f70a0ccc-16c6-11ef-99fd-0242ac143902','john.doe@gmail.com','The Meteorite Sculpture from Glacia is a stunning piece of cosmic art! Handcrafted from meteorites that have traveled across galaxies, each sculpture is truly unique and rich with history. The intricate designs capture the beauty and chaos of the universe perfectly, making it a striking centerpiece in any space. The blend of artistry and the raw power of the cosmos is awe-inspiring. Owning this sculpture feels like having a tangible piece of the stars in my home. It\'s a must-have for anyone who appreciates interstellar beauty and craftsmanship.',5.0,'2024-05-24 07:48:10'),('f70a0ccc-16c6-11ef-99fd-0242ac143902','khurshedtislam1270@gmail.com','Damn so good',4.5,'2024-05-24 05:20:12');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Email_ID` varchar(50) NOT NULL,
  `User_Type` enum('Customer','Admin') NOT NULL DEFAULT 'Customer',
  `F_Name` varchar(32) NOT NULL,
  `L_Name` varchar(32) NOT NULL,
  `Contact_Cell` varchar(15) DEFAULT NULL,
  `Profile_image` varchar(255) DEFAULT 'https://i.ibb.co/hYbbGyR/6596121-modified.png',
  `City` varchar(50) DEFAULT NULL,
  `Planet` varchar(50) DEFAULT NULL,
  `Galaxy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Email_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aaharunsohel@gmail.com','Customer','Abdullah','Al Harun','+8801712345678','https://i.ibb.co/hYbbGyR/6596121-modified.png','Dhaka','Earth','Milky Way'),('apollo@gmail.com','Customer','Apollo','ParallaX','+8801300747358','https://i.ibb.co/FVZdrtW/Smart-Select-20210112-205539-Facebook.jpg','Olyesti','Gallifrey','Mutter\'s Stellian'),('ferdous89001@gmail.com','Admin','Zannatul','Ferdous',NULL,NULL,NULL,NULL,NULL),('john.doe@gmail.com','Customer','John','Doe','+8801300727256','https://i.ibb.co/hYbbGyR/6596121-modified.png','Dhaka','Earth','Milky Way'),('khurshedtislam1270@gmail.com','Customer','Khurshed','Tajul Islam','','https://i.ibb.co/hYbbGyR/6596121-modified.png',NULL,NULL,NULL),('rachel@gmail.com','Customer','Rachel','Green','','https://i.ibb.co/hYbbGyR/6596121-modified.png',NULL,NULL,NULL),('saalim.araf@gmail.com','Admin','Saalim','Saadman Araf','+8801941840508','https://i.ibb.co/94PYPP5/20230914-215358.jpg','Apollo','Zemora Prime','Andromeda'),('shaheer.shamsi16@gmail.com','Admin','Shaheer','Farrubar Shamsi',NULL,NULL,NULL,NULL,NULL),('shuhadashithil17@gmail.com','Customer','Shuhada ','Shithil ','',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'GalacticStore'
--

--
-- Dumping routines for database 'GalacticStore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 22:39:32
