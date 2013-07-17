-- MySQL dump 10.13  Distrib 5.6.12, for Win64 (x86_64)
--
-- Host: localhost    Database: games
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
-- Table structure for table `chessgamehistory`
--

DROP TABLE IF EXISTS `chessgamehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chessgamehistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chessGameID` int(11) DEFAULT NULL,
  `moveNumber` int(11) DEFAULT NULL,
  `gameState` varchar(255) DEFAULT NULL,
  `specialPieces` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessgamehistory`
--

LOCK TABLES `chessgamehistory` WRITE;
/*!40000 ALTER TABLE `chessgamehistory` DISABLE KEYS */;
INSERT INTO `chessgamehistory` VALUES (1,5,12,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(2,5,13,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(3,5,14,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(4,5,15,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(5,5,16,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(6,5,17,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(7,5,18,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(8,5,19,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(9,5,20,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(10,5,21,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(11,5,22,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(12,5,23,'@A?B>c=DEFG<IJbTxywzv{u|mn_hX<st',NULL),(13,5,24,'@A?B>c=DEFG<IJbTxywzv{u|]n_hX<st',NULL),(14,5,25,'@A?B>c=DEFG<IZbTxywzv{u|]n_hX<st',NULL),(15,5,26,'@A?B>c=DEFG<IZbTxywzv{u|Un_hX<st',NULL),(16,5,27,'@A?B>c=DEFG<IZb\\xywzv{u|Un_hX<st',NULL),(17,5,28,'@A?B>c=DEFG<IZbxywzv{u|Un_`X<st',NULL),(18,7,5,'@A?B>c=DEFG<IZbdxywzv{u|Un_hX<st',NULL),(19,7,6,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(20,7,7,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(21,7,8,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(22,7,9,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(23,7,10,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(24,7,11,'@A?B>c=DEFG<IZblxywzv{u|Un_hX<st',NULL),(25,7,12,'@A?B>c=DEFG<IZblxywzv{u|Mn_hX<st',NULL),(26,7,13,'@A?B>Y=DEFG<IZblxywzv{u|Mn_hX<st',NULL),(27,7,14,'@A?B>Y=DEFG<IZblxywzv{u|MnWhX<st',NULL),(28,7,15,'@A?B>h=DEFG<IZblxywzv{u|MnW<X<st',NULL),(29,7,16,'@A?B><=DEFG<IZblxywhv{u|MnW<X<st',NULL),(30,7,17,'@A?B><=DEFG<QZblxywhv{u|MnW<X<st',NULL),(31,7,18,'@A?B><=DEFG<QZblxdwhv{u|MnW<X<st',NULL),(32,7,19,'@A?B><=DEFG<QZblxdwhv{u|MnW<X<st',NULL),(33,7,20,'@A?B><=DEFG<QZblxdwhvqu|MnW<X<st',NULL),(34,7,21,'@A?B><=DEFG<QZblxdwhvqu|MnW<X<st',NULL),(35,7,22,'@A?B><=DEFG<QZblxdihvqu|MnW<X<st',NULL),(36,7,23,'@A?B><=DEFO<QZblxdihvqu|MnW<X<st',NULL),(37,7,24,'@A?B><=DEFO<QZb<xdihvqu|MnW<X<lt',NULL),(38,7,25,'@A?P><=DEFO<QZb<xdihvqu|MnW<X<lt',NULL),(39,7,26,'@A?P><=DEFO<QZb<xdihgqu|MnW<X<lt',NULL),(40,7,27,'@I?P><=DEFO<QZb<xdihgqu|MnW<X<lt',NULL),(41,7,28,'@I?P><=DEFO<QZb<xdihgqu|MnW<X<lt',NULL),(42,7,29,'@I?PM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(43,7,30,'@I?PM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(44,7,31,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(45,7,32,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(46,7,33,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(47,7,34,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(48,7,35,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(49,7,36,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(50,7,37,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(51,7,38,'@IHPM<=DEFO<QZb<xcihgqu|<nW<X<lt',NULL),(52,7,39,'@IHPM<=DEFO<QZb<xcihgqu|<nW<X<lt',NULL),(53,7,40,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(54,7,41,'@IHPM<=DEFO<QZb<xdihgqu|<nW<X<lt',NULL),(55,7,42,'@IHPM<=DEFO<QZb<xcihgqu|<nW<X<lt',NULL),(56,7,43,'@IHPM<=DEFO<QZb<xcihgqu|<nW<X<lt',NULL),(57,7,44,'@IHPM<=DEFO<Q<b<xZihgqu|<nW<X<lt',NULL),(58,7,45,'@IHPM<=DEFO<Q<b<xZihgqu|<nW<X<lt',NULL),(59,7,46,'@IHPM<=DEFO<Q<b<xZihgqu|<nW<X<lt',NULL),(60,7,47,'@IHPM<=DEFO<Q<b<xZihgqu|<nW<X<lt',NULL),(61,7,48,'@IHPM<=DEFO<Q<b<xaihgqu|<nW<X<lt',NULL),(62,7,49,'@IHPM<=DEFO<Q<b<xaihgqu|<nW<X<lt',NULL),(63,7,50,'@IHPM<=DEFO<Q<b<xaihgqu|<nW<X<lt',NULL),(64,7,51,'@IHPM<=DEFO<Q<b<xaihgqu|<nW<X<lt',NULL),(65,7,52,'@IHPM<=DEFO<Q<b<xSihgqu|<nW<X<lt',NULL),(66,7,53,'@IHPM<=DEFO<Q<b<xSihgqu|<nW<X<lt',NULL),(67,7,54,'@IHPM<=DEFO<Q<b<x\\ihgqu|<nW<X<lt',NULL),(68,7,55,'@IHPM<=DEFO<Q<b<xihgqu|<nW<X<lt','11110000000000000000000t'),(69,8,5,'@A?B>C=DEFGHiJKLxywzv{u|mVopqrst','11111100000000000000000i'),(70,8,6,'@A?B>C=DEFGH<JKLxywzv{u|mVoiqrst','11111100000000000000000i'),(71,8,7,'@A?B>C=DEFGH<JKLPywzv{u|mVoiqrst','10111100000000000000000P'),(72,8,8,'@A?B>C=DEFGHIJKLxywzv{u|mno`qrst','11111100000000000000001`'),(73,8,9,'@A?B>C=DEFGHYJKLxywzv{u|mno`qrst','11111100000000000000001Y'),(74,8,10,'@A?B>C=DEFGH<JKLxywzv{u|mnoYqrst','11111100000000000000000Y'),(75,8,11,'@Y?B>C=DEFGH<JKLxywzv{u|mno<qrst','11111100000000000000000Y'),(76,8,12,'@Y?B>C=DEFGH<JKLxybzv{u|mno<qrst','11111100000000000000000b'),(77,8,13,'@b?B>C=DEFGH<JKLxy<zv{u|mno<qrst','11111100000000000000000b'),(78,8,14,'@b?B>C=DEFGH<JKLxy<zg{u|mno<qrst','11111100000000000000000g'),(79,8,15,'@b?^>C=DEFGH<JKLxy<zg{u|mno<qrst','11111100000000000000000^'),(80,8,16,'@b?^>C=DEFGH<JKLxy<zX{u|mno<qrst','11111100000000000000000X'),(81,8,17,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrst','11111100000000000000000R'),(82,8,18,'<@b?^>R=DEFGH<JKLx^<zX{u|mno<qrst','10000000000000000000000t'),(83,8,19,'@b?^OR=DEFGH<JKLxy<zX{u|mno<qrst','11111100000000000000000O'),(84,8,20,'@b?^OR=DEFGH<JKLxg<zX{u|mno<qrst','11111100000000000000000g'),(85,8,21,'@b?^OR=DENGH<JKLxg<zX{u|mno<qrst','11111100000000000000000N'),(86,8,22,'@b?^OR=DENGH<JKLxg<zX{u|mno<qrkt','11111100000000000000000k'),(87,8,23,'@bM^OR=DENGH<JKLxg<zX{u|mno<qrkt','11111100000000000000000M'),(88,8,24,'@bM^OR=DENGH<JKLxg<lX{u|mno<qrkt','11111100000000000000000l'),(89,8,25,'@[M^OR=DENGH<JKLxg<lX{u|mno<qrkt','10000000000000000000000t'),(90,8,26,'@[M^OR=DENGH<JKLxg<lXju|mno<qrkt','10000000000000000000000j'),(91,8,27,'>bM^OR?DENGH<JKLxg<lX{u|mno<qrkt','00000000000000000000000t'),(92,8,28,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrkt','11111100000000000000000k'),(93,8,29,'@b?^>R=DENGH<JKLxy<zX{u|mno<qrkt','11111100000000000000000N'),(94,8,30,'@b?^>R=DENGH<JKLxy<zXju|mno<qrkt','11111100000000000000000j'),(95,8,31,'@b?^OR=DENGH<JKLxy<zXju|mno<qrkt','11111100000000000000000O'),(96,8,32,'@b?^OR=DENGH<JKLxy<lXju|mno<qrkt','11111100000000000000000l'),(97,8,33,'@bM^OR=DENGH<JKLxy<lXju|mno<qrkt','11111100000000000000000M'),(98,8,34,'@bM^OR=DENGH<JKLxp<lXju|mno<qrkt','11111100000000000000000p'),(99,8,35,'@bM^OR=DENGH<JKLxp<lXju|mno<qrkt','11111100000000000000000p'),(100,8,36,'@bM^OR=DENGH<JKLxi<lXju|mno<qrkt','11111100000000000000000i'),(101,8,37,'@bM^OR=DEVGH<JKLxi<lXju|mno<qrkt','11111100000000000000000V'),(102,8,38,'@bM^OR=DEVGH<JKLxY<lXju|mno<qrkt','11111100000000000000000Y'),(103,8,39,'>bM^OR?DEVGH<JKLxY<lXju|mno<qrkt','00000000000000000000000t'),(104,8,40,'@bM^OR=DEVGH<JKLxY<lXju|mno<qrkt','11111100000000000000000l'),(105,8,42,'@bM^OR=DEVGH<JKLxY<cXju|mno<qrkt','11111100000000000000000c'),(106,8,43,'W@bM^OR=DEVGH<JKLxY<cXju|mno<qrkt','00000000000000000000000t'),(107,8,44,'@bM^OR=DEVGH<JKLxY<lXju|mno<qrct','11111100000000000000000c'),(108,8,45,'@bMWOR=DEVGH<JKLxY<lXju|mno<qrct','11111100000000000000000W'),(109,8,46,'@bMWOR=DEVGH<JKL{Y<lXjuzmno<qrct','10110100000000000000000z'),(110,8,48,'@bM^OR=DEVGH<JKLxY<lXju|mno<qrct','00010100000000000000000c'),(111,8,49,'@bMWOR=DEVGH<JKLxY<lXju|mno<qrct','00010100000000000000000W'),(112,8,50,'@bMWOR=DEVGH<JKL{Y<lXjuzmno<qrct','10110100000000000000000z'),(113,8,52,'@bM^OR=DEVGH<JKLxY<lXju|mno<qrct','11111100000000000000000c'),(114,8,53,'>bM^OR?DEVGH<JKLxY<lXju|mno<qrct','01011100000000000000000?'),(115,8,54,'><M^OR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000b'),(116,8,55,'><F^OR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000F'),(117,8,57,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(118,8,63,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(119,8,64,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(120,8,67,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(121,8,68,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(122,8,71,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(123,8,72,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(124,8,75,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(125,8,76,'><FeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(126,8,79,'><MeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(127,8,80,'><MeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(128,8,83,'><MeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(129,8,84,'><MeOR?DEVGH<JKLxb<lXju|mno<qrct','01011100000000000000000e'),(130,8,87,'><MWOR?DEVGH<JKLxb<lXju|mno<qr[t','01011100000000000000000W'),(131,8,88,'><MWOR?DEVGH<JKLxb<ZXju|mno<qr[t','01011100000000000000000Z'),(132,8,90,'><MWOR?DE^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000001d'),(133,8,91,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000000_'),(134,8,93,'><_WOR?DU^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000001U'),(135,8,95,'><_WOR?DU^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000001U'),(136,8,97,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000000undefinedundefined'),(137,8,98,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[\\','01011100000000000000000\ndefinedundefined'),(138,8,99,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000000\ndefinedundefined'),(139,8,100,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[\\','01011100000000000000000\ndefinedundefined'),(140,8,101,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[d','01011100000000000000000\ndefinedundefined'),(141,8,102,'><_WOR?DE^GH<JKLxb<ZXju|mno<qr[\\','01011100000000000000000definedundefined'),(142,8,104,'><_WOR?DU^GH<JKLxb<ZXju|mno<qr[T','01011100000000000000000Tefinedundefined'),(143,8,105,'><_WOR?D]^GH<JKLxb<ZXju|mno<qr[T','01011100000000000000000]efinedundefined'),(144,8,106,'><_WOR?D]^GH<J<Lxb<ZXju|mno<qr[K','01011100000000000000000Kefinedundefined'),(145,8,107,'><_WOR?De^GH<J<Lxb<ZXju|mno<qr[K','01011100000000000000000eefinedundefined'),(146,8,108,'><_WOR?De^GH<J<Lxb<ZXju|mno<qr[K','010111000000000000000000'),(147,8,109,'><_WOR?Dn^GH<J<Lxb<ZXju|m<o<qr[K','01011100000000000000000n'),(148,8,110,'><_WOR?Dn^GH<J<Lxb<ZXju|m<o<qr[K','01011100000000000000000n'),(149,8,111,'><_WOR?D<^GH<J<Lxb<ZXju|m<o<qr[Kv<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011100000000000000000v'),(150,8,112,'><_WOR?D<^GH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000v'),(151,8,113,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000f'),(152,8,114,'><_WOR?<<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<D<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000D'),(153,8,115,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000D'),(154,8,116,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<C<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(155,8,117,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(156,8,118,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(157,8,119,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(158,8,120,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(159,8,121,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(160,8,122,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<C<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(161,8,123,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(162,8,124,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<C<<<<<<<','01011000000000000000000C'),(163,8,125,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(164,8,126,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<C<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(165,8,127,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[K<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<','01011000000000000000000C'),(166,8,128,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<C<<<<<<<<<<<<<<<','01011000000000000000000C'),(167,9,42,'@b<<<<<<EFGH<JKLxy<zX{u|mno<qrsd','01011100000000000000001d'),(168,9,43,'@b<<<<<<UFGH<JKLxy<zX{u|mno<qrsd','01011100000000000000001U');
/*!40000 ALTER TABLE `chessgamehistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chessgamestate`
--

DROP TABLE IF EXISTS `chessgamestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chessgamestate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `moveNumber` int(11) DEFAULT '0',
  `winner` int(11) DEFAULT '0',
  `player1ID` int(11) NOT NULL,
  `player2ID` int(11) NOT NULL,
  `gameState` varchar(200) DEFAULT '@A?B>C=DEFGHIJKLxywzv{u|mnopqrst',
  `specialPieces` varchar(100) DEFAULT '111111000000000000000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessgamestate`
--

LOCK TABLES `chessgamestate` WRITE;
/*!40000 ALTER TABLE `chessgamestate` DISABLE KEYS */;
INSERT INTO `chessgamestate` VALUES (1,41,1,0,0,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrst','01011100000000000000000\' where id=8;\n;\n\n\n\n\n\n\n\n\n\n'),(5,41,0,1,2,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrst','01011100000000000000000\' where id=8;\n;\n\n\n\n\n\n\n\n\n\n'),(6,41,0,1,2,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrst','01011100000000000000000\' where id=8;\n;\n\n\n\n\n\n\n\n\n\n'),(7,41,0,1,2,'@b?^>R=DEFGH<JKLxy<zX{u|mno<qrst','01011100000000000000000\' where id=8;\n;\n\n\n\n\n\n\n\n\n\n'),(8,128,0,1,2,'><_WOR?D<fGH<J<Lxb<ZXjv|m<o<qr[<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<C<<<<<<<<<<<<<<<','01011000000000000000000C'),(9,61,0,1,2,'@^<<<<<<UFGX<ZcLxy<zg{u|mn_<Ybs\\','01011100000000000000001Z');
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

-- Dump completed on 2013-07-17 19:50:59
