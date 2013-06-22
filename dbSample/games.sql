-- MySQL dump 10.13  Distrib 5.6.11, for Win64 (x86_64)
--
-- Host: localhost    Database: games
-- ------------------------------------------------------
-- Server version	5.6.11

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
-- Table structure for table `chessgamestate`
--

DROP TABLE IF EXISTS `chessgamestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chessgamestate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `moveNumber` int(11) DEFAULT '0',
  `specialPieces` int(11) DEFAULT '0',
  `winner` int(11) DEFAULT '0',
  `player1ID` int(11) NOT NULL,
  `player2ID` int(11) NOT NULL,
  `gameState` varchar(200) DEFAULT '@A?B>C=DEFGHIJKLxywzv{u|mnopqrst',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessgamestate`
--

LOCK TABLES `chessgamestate` WRITE;
/*!40000 ALTER TABLE `chessgamestate` DISABLE KEYS */;
INSERT INTO `chessgamestate` VALUES (1,0,0,1,0,0,'@A?B>C=DEFGHIJKLxywzv{u|mnopqrst'),(5,11,0,0,1,2,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st'),(6,0,0,0,1,2,'@A?B>C=DEFGHIJKLxywzv{u|mnopqrst'),(7,0,0,0,1,2,'@A?B>C=DEFGHIJKLxywzv{u|mnopqrst');
/*!40000 ALTER TABLE `chessgamestate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamelist`
--

DROP TABLE IF EXISTS `gamelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gamelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gameName` varchar(100) DEFAULT NULL,
  `maxNumberOfPlayers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamelist`
--

LOCK TABLES `gamelist` WRITE;
/*!40000 ALTER TABLE `gamelist` DISABLE KEYS */;
INSERT INTO `gamelist` VALUES (1,'Chess',2);
/*!40000 ALTER TABLE `gamelist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-06-22 15:28:47
