-- MySQL dump 10.13  Distrib 5.6.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dnd
-- ------------------------------------------------------
-- Server version	5.6.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `justin`
--

DROP TABLE IF EXISTS `justin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `justin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `playerName` varchar(255) DEFAULT NULL,
  `value` int(11) DEFAULT '0',
  `trained` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justin`
--

LOCK TABLES `justin` WRITE;
/*!40000 ALTER TABLE `justin` DISABLE KEYS */;
/*!40000 ALTER TABLE `justin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `submittedByUserID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (24,'Test what?',NULL,'2013-06-21 20:59:18',1),(25,'You tested it and it worked!',NULL,'2013-06-21 21:00:56',1),(26,'You keep crashing it!',NULL,'2013-06-21 21:05:31',1),(27,'Jesus debug too?',NULL,'2013-06-21 21:07:12',1),(28,'test this again',NULL,'2013-06-21 22:47:41',1),(29,'Should work now',NULL,'2013-06-21 22:49:49',1),(30,'Surprisingly it does work again!',NULL,'2013-06-21 22:50:07',1),(31,'Still works',NULL,'2013-06-21 22:55:52',1),(32,'test',NULL,'2013-06-22 19:41:47',1),(33,'Does this still work?',NULL,'2013-06-22 19:52:06',1),(34,'Testing Posts',NULL,'2013-06-22 21:24:52',1),(35,'testing postsDND\r\n',NULL,'2013-06-22 21:30:36',1),(36,'test',NULL,'2013-06-22 22:19:48',1),(37,'testerqwerqwer',NULL,'2013-06-22 22:40:55',1);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notesaddition`
--

DROP TABLE IF EXISTS `notesaddition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notesaddition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openTag` varchar(100) NOT NULL,
  `variables` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notesaddition`
--

LOCK TABLES `notesaddition` WRITE;
/*!40000 ALTER TABLE `notesaddition` DISABLE KEYS */;
INSERT INTO `notesaddition` VALUES (1,'form','action=\'/dnd\' method=\'post\''),(2,'label','> Notes </label'),(3,'textarea','maxlength=250 cols=\"50\" name=\"note\" rows=\"6\"'),(4,'input','type=\'submit\' value=\'Add Note\''),(5,' ','/form');
/*!40000 ALTER TABLE `notesaddition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notestag`
--

DROP TABLE IF EXISTS `notestag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notestag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notestag`
--

LOCK TABLES `notestag` WRITE;
/*!40000 ALTER TABLE `notestag` DISABLE KEYS */;
INSERT INTO `notestag` VALUES (1,'Buck',1),(2,'Taco',1),(3,'thistag',1),(4,'Archive',1),(5,'Food',1),(6,'Testing Tag post',1),(7,'still test',1),(8,'sdfasdfasdf',1);
/*!40000 ALTER TABLE `notestag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-07-17 19:49:01
