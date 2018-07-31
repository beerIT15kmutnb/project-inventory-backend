-- MySQL dump 10.16  Distrib 10.3.7-MariaDB, for osx10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: project_inventory
-- ------------------------------------------------------
-- Server version	10.3.7-MariaDB

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
-- Table structure for table `mm_equipment_products`
--

DROP TABLE IF EXISTS `mm_equipment_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_equipment_products` (
  `product_id` int(15) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `equipment_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `large_unit_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_create_id` int(11) NOT NULL,
  `small_qty` int(11) NOT NULL,
  `max_qty` int(11) NOT NULL,
  `min_qty` int(11) NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  KEY `mm_products_fk0` (`equipment_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=168 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_equipment_products`
--

LOCK TABLES `mm_equipment_products` WRITE;
/*!40000 ALTER TABLE `mm_equipment_products` DISABLE KEYS */;
INSERT INTO `mm_equipment_products` VALUES (165,'ปากกาตราม้า 0.5mm','151','Y','2018-07-06 03:25:43','2',16,'',1,20,100,20),(166,'ปากกาดำ','151','Y','2018-07-06 03:49:10','ปากกาดำ',14,'',1,1,60,30),(167,'แฟ้มใหญ่','150','Y','2018-07-06 05:25:50','แฟ้มใหญ่',17,'',1,1,100,10);
/*!40000 ALTER TABLE `mm_equipment_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_equipment_types`
--

DROP TABLE IF EXISTS `mm_equipment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_equipment_types` (
  `equipment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_type_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`equipment_type_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_equipment_types`
--

LOCK TABLES `mm_equipment_types` WRITE;
/*!40000 ALTER TABLE `mm_equipment_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `mm_equipment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_equipment_units`
--

DROP TABLE IF EXISTS `mm_equipment_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_equipment_units` (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`unit_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_equipment_units`
--

LOCK TABLES `mm_equipment_units` WRITE;
/*!40000 ALTER TABLE `mm_equipment_units` DISABLE KEYS */;
INSERT INTO `mm_equipment_units` VALUES (18,'ด้าม','Y','2018-06-11 07:25:23'),(17,'เล่ม','Y','2018-06-11 07:25:16'),(16,'กล่อง','Y','2018-06-11 07:25:09'),(15,'แพ็ค','Y','2018-06-11 07:25:03'),(14,'ชิ้น','Y','2018-06-11 06:51:53');
/*!40000 ALTER TABLE `mm_equipment_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_equipments`
--

DROP TABLE IF EXISTS `mm_equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_equipments` (
  `equipment_id` int(15) NOT NULL AUTO_INCREMENT,
  `equipment_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `min_qty` int(11) NOT NULL,
  `max_qty` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `equipment_code` bigint(20) DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_create_id` int(11) NOT NULL,
  `small_unit_id` int(11) NOT NULL,
  `num_days` int(5) DEFAULT 10,
  PRIMARY KEY (`equipment_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=152 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_equipments`
--

LOCK TABLES `mm_equipments` WRITE;
/*!40000 ALTER TABLE `mm_equipments` DISABLE KEYS */;
INSERT INTO `mm_equipments` VALUES (150,'แฟ้มเอกสาร','Y',10,20,'2018-06-11 08:20:15',1,'',1,17,10000),(151,'ปากกา','Y',20,100,'2018-06-11 08:20:34',2,'',1,18,1000);
/*!40000 ALTER TABLE `mm_equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_generic_types`
--

DROP TABLE IF EXISTS `mm_generic_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_generic_types` (
  `generic_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `generic_type_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`generic_type_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_generic_types`
--

LOCK TABLES `mm_generic_types` WRITE;
/*!40000 ALTER TABLE `mm_generic_types` DISABLE KEYS */;
INSERT INTO `mm_generic_types` VALUES (1,'ยาเม็ดธรรมดา','Y'),(2,'ยาน้ำ','Y'),(3,'ยาปฎิชีวนะ','Y'),(4,'ยาตา-หู','Y'),(5,'ยาใช้ภายนอก','Y'),(6,'เวชภัณฑ์','Y'),(7,'อื่นๆ','Y');
/*!40000 ALTER TABLE `mm_generic_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_generics`
--

DROP TABLE IF EXISTS `mm_generics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_generics` (
  `generic_id` int(15) NOT NULL AUTO_INCREMENT,
  `generic_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `generic_type_id` int(11) NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `min_qty` int(11) NOT NULL,
  `max_qty` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `generic_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_create_id` int(11) NOT NULL,
  `small_unit_id` int(11) NOT NULL,
  `num_days` int(5) NOT NULL,
  PRIMARY KEY (`generic_id`) USING BTREE,
  KEY `mm_generics_fk0` (`generic_type_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=150 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_generics`
--

LOCK TABLES `mm_generics` WRITE;
/*!40000 ALTER TABLE `mm_generics` DISABLE KEYS */;
INSERT INTO `mm_generics` VALUES (1,'Antacil Tab / Alma Tab',1,'Y',10,100,'2018-06-08 18:03:38','1',NULL,1,12,10),(2,'Abacus (Hydroxyzine) ix',1,'Y',10,100,'2018-06-08 18:03:38','2',NULL,1,12,10),(3,'Buscopan',1,'Y',10,100,'2018-06-08 18:03:38','3',NULL,1,12,10),(4,'Carbocysteine (Flemex)',1,'Y',10,100,'2018-06-08 18:08:02','4',NULL,1,12,10),(5,'Bisacodyl 5 mg',1,'Y',10,100,'2018-06-08 18:08:02','5',NULL,1,12,10),(6,'Ca -R - bon (Activated chalcoal)',1,'Y',10,100,'2018-06-08 18:08:02','6',NULL,1,12,10),(7,'Cinnarizine 25 mg  ',1,'Y',10,100,'2018-06-08 18:08:02','7',NULL,1,12,10),(8,'CPM',1,'Y',10,100,'2018-06-08 18:08:02','8',NULL,1,12,10),(9,'Dextromethorphan 15 mg',1,'Y',10,100,'2018-06-08 18:08:02','9',NULL,1,12,10),(10,'Diazepam 2 mg',1,'Y',10,100,'2018-06-08 18:08:02','10',NULL,1,12,10),(11,'Diazepam 5 mg',1,'Y',10,100,'2018-06-08 18:08:02','11',NULL,1,12,10),(12,'Diclofenac 25 mg',1,'Y',10,100,'2018-06-08 18:08:02','12',NULL,1,12,10),(13,'Dimenhydrinate / Dramamine 50 mg',1,'Y',10,100,'2018-06-08 18:08:02','13',NULL,1,12,10),(14,'Ibuprofen 400 mg',1,'Y',10,100,'2018-06-08 18:08:02','14',NULL,1,12,10),(15,'Isordil 5 mg.',1,'Y',10,100,'2018-06-08 18:08:02','15',NULL,1,12,10),(16,'Loperamide / Immodium',1,'Y',10,100,'2018-06-08 18:08:02','16',NULL,1,12,10),(17,'Mednil / Mefennamic 500 mg',1,'Y',10,100,'2018-06-08 18:08:02','17',NULL,1,12,10),(18,'Molax - M / Motilium 10 mg',1,'Y',10,100,'2018-06-08 18:08:02','18',NULL,1,12,10),(19,'Myoxan (tolpelisone)',1,'Y',10,100,'2018-06-08 18:08:02','19',NULL,1,12,10),(20,'Norgesic(Myoflex)',1,'Y',10,100,'2018-06-08 18:08:02','20',NULL,1,12,10),(21,'Nasolin',1,'Y',10,100,'2018-06-08 18:08:02','21',NULL,1,12,10),(22,'Omeplazole (1 Bx. = 10x10 cap)',1,'Y',10,100,'2018-06-08 18:08:02','22',NULL,1,12,10),(23,'Paracetamal 500 mg',1,'Y',10,100,'2018-06-08 18:08:02','23',NULL,1,10,10),(24,'Prednisolone 5 mg',1,'Y',10,100,'2018-06-08 18:08:02','24',NULL,1,12,10),(25,'salbutamol 2 mg.',1,'Y',10,100,'2018-06-08 18:08:02','25',NULL,1,12,10),(26,'Simethicone 80 mg / Blow - x',1,'Y',10,100,'2018-06-08 18:08:02','26',NULL,1,12,10),(27,'Throatsil',1,'Y',10,100,'2018-06-08 18:08:02','27',NULL,1,12,10),(28,'Tofago (cafergot)',1,'Y',10,100,'2018-06-08 18:08:02','28',NULL,1,12,10),(29,'Vitamin B 1-6-12',1,'Y',10,100,'2018-06-08 18:08:02','29',NULL,1,12,10),(30,'Vitamin B Complex',1,'Y',10,100,'2018-06-08 18:08:02','30',NULL,1,12,10),(31,'Vitamin B2',1,'Y',10,100,'2018-06-08 18:08:02','31',NULL,1,12,10),(32,'Vitamin lili MTV,',1,'Y',10,100,'2018-06-08 18:08:02','32',NULL,1,12,10),(33,'Vitamin C 100 mg.',1,'Y',10,100,'2018-06-08 18:08:02','33',NULL,1,12,10),(34,'Vitamin C 500 mg.',1,'Y',10,100,'2018-06-08 18:08:02','34',NULL,1,12,10),(35,'Viclovia (Acyclovir 200 mg)',1,'Y',10,100,'2018-06-08 18:08:02','35',NULL,1,12,10),(36,'Zyrtec',1,'Y',10,100,'2018-06-08 18:08:02','36',NULL,1,12,10),(37,'ยาอมมะแว้ง รสบ๊วย',1,'Y',10,100,'2018-06-08 18:08:02','37',NULL,1,12,10),(38,'ขมิ้นชัน แคปซูล',1,'Y',10,100,'2018-06-08 18:08:02','38',NULL,1,12,10),(39,'ฟ้าทลายโจร แคปซูล',1,'Y',10,100,'2018-06-08 18:08:02','39',NULL,1,12,10),(40,'Antasil Gel 240 ml.',2,'Y',10,100,'2018-06-08 18:08:02','40',NULL,1,12,10),(41,'M - carminative    240 Ml.',2,'Y',10,100,'2018-06-08 18:08:02','41',NULL,1,12,10),(42,'ORS',2,'Y',10,100,'2018-06-08 18:08:02','42',NULL,1,12,10),(43,'Milk of magnesia 240 Ml.',2,'Y',10,100,'2018-06-08 18:08:02','43',NULL,1,12,10),(44,'Mysolven (Acetylcysteine) sachet 100 mg.',2,'Y',10,100,'2018-06-08 18:08:02','44',NULL,1,12,10),(45,'M.tussis (small) 60 ml.',2,'Y',10,100,'2018-06-08 18:08:02','45',NULL,1,12,10),(46,'ยาธาตุน้ำขาว 50 Ml.',2,'Y',10,100,'2018-06-08 18:08:02','46',NULL,1,12,10),(47,'น้ำยาบ้วนปาก 250 ml.',2,'Y',10,100,'2018-06-08 18:08:02','47',NULL,1,12,10),(48,'ยาแก้ไอมะขามป้อม 50 Ml.',2,'Y',10,100,'2018-06-08 18:08:02','48',NULL,1,12,10),(49,'Amoxycillin ( 500 mg )',3,'Y',10,100,'2018-06-08 18:08:02','49',NULL,1,12,10),(50,'Dicloxacillin ( 500 mg )',3,'Y',10,100,'2018-06-08 18:08:02','50',NULL,1,12,10),(51,'Erythromycin ( 250 mg )',3,'Y',10,100,'2018-06-08 18:08:02','51',NULL,1,12,10),(52,'Norfloxacin ( 400 mg )',3,'Y',10,100,'2018-06-08 18:08:02','52',NULL,1,12,10),(53,'Roxithromycin  ( 150 mg )',3,'Y',10,100,'2018-06-08 18:08:02','53',NULL,1,12,10),(54,'Chloramphenical Eye drop  5 ml.',4,'Y',10,100,'2018-06-08 18:08:02','54',NULL,1,12,10),(55,'Chloramphenical  Eye ointment',4,'Y',10,100,'2018-06-08 18:08:02','55',NULL,1,12,10),(56,'Eyedex Eye - Ear drop ( Dexa+neomycin)',4,'Y',10,100,'2018-06-08 18:08:02','56',NULL,1,12,10),(57,'Opsil - A (for allergic eye) 5 ml.',4,'Y',10,100,'2018-06-08 18:08:02','57',NULL,1,12,10),(58,'Poly oph (Antibiotic)',4,'Y',10,100,'2018-06-08 18:08:02','58',NULL,1,12,10),(59,'น้ำตาเทียม 5 ml',4,'Y',10,100,'2018-06-08 18:08:02','59',NULL,1,12,10),(60,'น้ำตาเทียม10 ml',4,'Y',10,100,'2018-06-08 18:08:02','60',NULL,1,12,10),(61,'น้ำยาล้างตา 120 ml.',5,'Y',10,100,'2018-06-08 18:08:02','61',NULL,1,12,10),(62,'Betamethasone cream 5 gm.',5,'Y',10,100,'2018-06-08 18:08:02','62',NULL,1,12,10),(63,'Betamethasone c Neomycin  5 gm.',5,'Y',10,100,'2018-06-08 18:08:02','63',NULL,1,12,10),(64,'Betadine  ointment 50 gm.',5,'Y',10,100,'2018-06-08 18:08:02','64',NULL,1,12,10),(65,'Clotrimazone cream 15 กรัม',5,'Y',10,100,'2018-06-08 18:08:02','65',NULL,1,12,10),(66,'Flamazine cream  450 กรัม',5,'Y',10,100,'2018-06-08 18:08:02','66',NULL,1,12,10),(67,'Kanolone',5,'Y',10,100,'2018-06-08 18:08:02','67',NULL,1,12,10),(68,'MD-cream  ',5,'Y',10,100,'2018-06-08 18:08:02','68',NULL,1,12,10),(69,'calamine lotion 60 ml.',5,'Y',10,100,'2018-06-08 18:08:02','69',NULL,1,12,10),(70,'Neotiga balm 30 gm.',5,'Y',10,100,'2018-06-08 18:08:02','70',NULL,1,12,10),(71,'Neotiga balm 100 gm.',5,'Y',10,100,'2018-06-08 18:08:02','71',NULL,1,12,10),(72,'Piroxil Gel  100 gm.',5,'Y',10,100,'2018-06-08 18:08:02','72',NULL,1,12,10),(73,'Reparil Gel  40 gm.',5,'Y',10,100,'2018-06-08 18:08:02','73',NULL,1,12,10),(74,'TA 0.1 %  5 gm.',5,'Y',10,100,'2018-06-08 18:08:02','74',NULL,1,12,10),(75,'TA 0.02 % 5 gm.',5,'Y',10,100,'2018-06-08 18:08:02','75',NULL,1,12,10),(76,'Virogon (Acyclovir cream)',5,'Y',10,100,'2018-06-08 18:08:02','76',NULL,1,12,10),(77,'Alcohol 70 %  450 ml.',5,'Y',10,100,'2018-06-08 18:08:02','77',NULL,1,12,10),(78,'Ammonia    15 ml.',5,'Y',10,100,'2018-06-08 18:08:02','78',NULL,1,12,10),(79,'Betadine 15 ml. 1 x 12 Bt.',5,'Y',10,100,'2018-06-08 18:08:02','79',NULL,1,12,10),(80,'Betadine 450 ml.',5,'Y',10,100,'2018-06-08 18:08:02','80',NULL,1,12,10),(81,'Nss 0.9 % 1,000 cc.',5,'Y',10,100,'2018-06-08 18:08:02','81',NULL,1,12,10),(82,'เจลว่านหางจระเข้',5,'Y',10,100,'2018-06-08 18:08:02','82',NULL,1,12,10),(83,'ethyly chloride (สเปรย์ยาชา)',5,'Y',10,100,'2018-06-08 18:08:02','83',NULL,1,12,10),(84,'ยาดม (พีเป๊กซ์)',5,'Y',10,100,'2018-06-08 18:08:02','84',NULL,1,12,10),(85,'ยาหม่อง 15 gm.',5,'Y',10,100,'2018-06-08 18:08:02','85',NULL,1,12,10),(86,'มิวโพรีน หลอด 5 gm.',5,'Y',10,100,'2018-06-08 18:08:02','86',NULL,1,12,10),(87,'สเปร์ย Elmatacin',5,'Y',10,100,'2018-06-08 18:08:02','87',NULL,1,12,10),(88,'Sterile water for Irrigation 1,000 ml.ขวดพลาสติค',5,'Y',10,100,'2018-06-08 18:08:02','88',NULL,1,12,10),(89,'Betadine scrub 500 cc.',5,'Y',10,100,'2018-06-08 18:08:02','89',NULL,1,12,10),(90,'Tony lotion (TA 0.1 %  ชนิดน้ำ)',5,'Y',10,100,'2018-06-08 18:08:02','90',NULL,1,12,10),(91,'Arm  Sling',6,'Y',10,100,'2018-06-08 18:08:02','91',NULL,1,12,10),(92,'Elastic  Bandage 2 ”',6,'Y',10,100,'2018-06-08 18:08:02','92',NULL,1,12,10),(93,'Elastic  Bandage 3 ”',6,'Y',10,100,'2018-06-08 18:08:02','93',NULL,1,12,10),(94,'Elastic  Bandage 4 ”',6,'Y',10,100,'2018-06-08 18:08:02','94',NULL,1,12,10),(95,'Eye Pad',6,'Y',10,100,'2018-06-08 18:08:02','95',NULL,1,12,10),(96,'Gauze drain',6,'Y',10,100,'2018-06-08 18:08:02','96',NULL,1,12,10),(97,'Gauze 2x2',6,'Y',10,100,'2018-06-08 18:08:02','97',NULL,1,12,10),(98,'Gauze 3x3',6,'Y',10,100,'2018-06-08 18:08:02','98',NULL,1,12,10),(99,'Gauze 4x4',6,'Y',10,100,'2018-06-08 18:08:02','99',NULL,1,12,10),(100,'Grove (ถุงมือ) ขนาด S',6,'Y',10,100,'2018-06-08 18:08:02','100',NULL,1,12,10),(101,'Grove (ถุงมือ) ขนาด M',6,'Y',10,100,'2018-05-28 20:16:45','101',NULL,1,12,30),(102,'Grove (ถุงมือ) ขนาด L',6,'Y',10,100,'2018-05-28 20:16:45','102',NULL,1,12,30),(103,'Hot - Cold pack',6,'Y',10,100,'2018-05-28 20:16:45','103',NULL,1,12,30),(104,'Micropore 1\"',6,'Y',10,100,'2018-05-28 20:16:45','104',NULL,1,12,30),(105,'Micropore 0.5\"',6,'Y',10,100,'2018-05-28 20:16:45','105',NULL,1,12,30),(106,'Neobun - Gel แผ่นแปะบรรเทาปวด',6,'Y',10,100,'2018-05-28 20:16:45','106',NULL,1,12,30),(107,'Neotape 1 \"',6,'Y',10,100,'2018-05-28 20:16:45','107',NULL,1,12,30),(108,'Neotape 2 \"',6,'Y',10,100,'2018-05-28 20:16:45','108',NULL,1,12,30),(109,'sofra tullae/Bactigras',6,'Y',10,100,'2018-05-28 20:16:45','109',NULL,1,12,30),(110,'swab (ไม้พันสำลี) ขนาด S       ',6,'Y',10,100,'2018-05-28 20:16:45','110',NULL,1,12,30),(111,'swab ขนาด M                     ',6,'Y',10,100,'2018-05-28 20:16:45','111',NULL,1,12,30),(112,'swab ขนาด L',6,'Y',10,100,'2018-06-11 19:13:09','112',NULL,1,12,30),(113,'Soft  Collar',6,'Y',10,100,'2018-05-28 20:16:45','113',NULL,1,12,30),(114,'Sterile strip',6,'Y',10,100,'2018-05-28 20:16:45','114',NULL,1,12,30),(115,'Tensoplast (สีน้ำตาล)',6,'Y',10,100,'2018-05-28 20:16:45','115',NULL,1,12,30),(116,'Tensoplastic',6,'Y',10,100,'2018-05-28 20:16:45','116',NULL,1,12,30),(117,'Transpore 1\"',6,'Y',10,100,'2018-05-28 20:16:45','117',NULL,1,12,30),(118,'Transpore 0.5\"',6,'Y',10,100,'2018-05-28 20:16:45','118',NULL,1,12,30),(119,'Tensofix ขนาด 5.0',6,'Y',10,100,'2018-05-28 20:16:45','119',NULL,1,12,30),(120,'Tensofix ขนาด 7.5',6,'Y',10,100,'2018-05-28 20:16:45','120',NULL,1,12,30),(121,'Tensofix ขนาด 10.0',6,'Y',10,100,'2018-05-28 20:16:45','121',NULL,1,12,30),(122,'สำลีก้อน ',6,'Y',10,100,'2018-05-28 20:16:45','122',NULL,1,12,30),(123,'ไม้กดลิ้น แบบแยกชิ้น',6,'Y',10,100,'2018-05-28 20:16:45','123',NULL,1,12,30),(124,'ถ้วยล้างตา',6,'Y',10,100,'2018-05-28 20:16:45','124',NULL,1,12,30),(125,'ตลับยา 5 gm.',6,'Y',10,100,'2018-05-28 20:16:45','125',NULL,1,12,30),(126,'Blade No. 11 ',6,'Y',10,100,'2018-05-28 20:16:45','126',NULL,1,12,30),(127,'Set ล้างแผล',6,'Y',10,100,'2018-05-28 20:16:45','127',NULL,1,12,30),(128,'mask (ผ้าปิดจมูกแบบใช้แล้วทิ้ง)',6,'Y',10,100,'2018-05-28 20:16:45','128',NULL,1,12,30),(129,'Easifix cohesive 2.5 cm x 4 M.',6,'Y',10,100,'2018-05-28 20:16:45','129',NULL,1,12,30),(130,'Fixomull stretch  10 cm x 10 M.',7,'Y',10,100,'2018-05-28 20:16:45','130',NULL,1,12,30),(131,'Inhibac Hospital Concentread 1 ลิตร',7,'Y',10,100,'2018-05-28 20:16:45','131',NULL,1,12,30),(132,'แอลกอฮอล์ เจลล้างมือ แบบขวดปั้ม',7,'Y',10,100,'2018-05-28 20:16:45','132',NULL,1,12,30),(133,'ซองซิปสั่งพิมพ์ # 7x10 Cm. (สีฟ้า)',7,'Y',10,100,'2018-05-28 20:16:45','133',NULL,1,12,30),(134,'ซองซิปสั่งพิมพ์ # 9x12 Cm. (สีฟ้า)',7,'Y',10,100,'2018-05-28 20:16:45','134',NULL,1,12,30),(135,'กระบอกฉีดยา  3 ML.',7,'Y',10,100,'2018-05-28 20:16:45','135',NULL,1,12,30),(136,'กระบอกฉีดยา  5 ML.',7,'Y',10,100,'2018-05-28 20:16:45','136',NULL,1,12,30),(137,'กระบอกฉีดยา  10 ML.',7,'Y',10,100,'2018-05-28 20:16:45','137',NULL,1,12,30),(138,'set IV',7,'Y',10,100,'2018-05-28 20:16:45','138',NULL,1,12,30),(139,'น้ำเกลือให้ทางหลอดเลือดดำ',7,'Y',10,100,'2018-05-28 20:16:45','139',NULL,1,12,30),(140,'NSS 500 ml.',7,'Y',10,100,'2018-05-28 20:16:45','140',NULL,1,12,30),(141,'LRS 500 ml.',7,'Y',10,100,'2018-05-28 20:16:45','141',NULL,1,12,30),(142,'5%D/2 500 ml.',7,'Y',10,100,'2018-06-10 14:39:26','142',NULL,1,12,30),(143,'ถ้วยสำหรับใส่ยารับประทานแบบพลาสติค 30 ml.',7,'Y',10,100,'2018-05-28 20:16:45','143',NULL,1,12,30),(144,'Ventolin',1,'Y',10,100,'2018-05-28 20:16:45','144',NULL,1,12,30),(145,'NSS 100 cc',5,'Y',10,100,'2018-05-28 20:16:45','145',NULL,1,12,30),(146,'TA 0.1% 15 gm',5,'Y',10,100,'2018-05-28 20:16:45','146',NULL,1,12,30),(147,'เข็มฉีดยา no.25',7,'Y',10,100,'2018-05-28 20:16:45','147',NULL,1,12,30),(148,'เข็มฉีดยา no.18',7,'Y',10,100,'2018-05-28 20:16:45','148',NULL,1,12,30),(149,'1%',2,'Y',200,1000,'2018-06-10 14:39:25','1','55555',1,12,30);
/*!40000 ALTER TABLE `mm_generics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_products`
--

DROP TABLE IF EXISTS `mm_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_products` (
  `product_id` int(15) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `generic_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `large_unit_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_create_id` int(11) NOT NULL,
  `small_qty` int(11) NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  KEY `mm_products_fk0` (`generic_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=165 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_products`
--

LOCK TABLES `mm_products` WRITE;
/*!40000 ALTER TABLE `mm_products` DISABLE KEYS */;
INSERT INTO `mm_products` VALUES (1,'Antacil Tab / Alma Tab','1','Y','2018-05-28 20:53:06','1',1,NULL,1,1),(2,'Abacus (Hydroxyzine) ix','2','Y','2018-05-28 20:53:06','2',2,NULL,1,1),(3,'Buscopan','3','Y','2018-05-28 20:53:06','3',12,NULL,1,1),(4,'Carbocysteine (Flemex)','4','Y','2018-05-28 20:53:06','4',12,NULL,1,1),(5,'Bisacodyl 5 mg','5','Y','2018-05-28 20:53:06','5',12,NULL,1,1),(6,'Ca -R - bon (Activated chalcoal)','6','Y','2018-05-28 20:53:06','6',1,NULL,1,1),(7,'Cinnarizine 25 mg  ','7','Y','2018-05-28 20:53:06','7',1,NULL,1,1),(8,'CPM','8','Y','2018-05-28 20:53:06','8',12,NULL,1,1),(9,'Dextromethorphan 15 mg','9','Y','2018-05-28 20:53:06','9',12,NULL,1,1),(10,'Diazepam 2 mg','10','Y','2018-05-28 20:53:06','10',12,NULL,1,1),(11,'Diazepam 5 mg','11','Y','2018-05-28 20:53:06','11',2,NULL,1,1),(12,'Diclofenac 25 mg','12','Y','2018-05-28 20:53:06','12',1,NULL,1,1),(13,'Dimenhydrinate / Dramamine 50 mg','13','Y','2018-05-28 20:53:06','13',2,NULL,1,1),(14,'Ibuprofen 400 mg','14','Y','2018-05-28 20:53:06','14',12,NULL,1,1),(15,'Isordil 5 mg.','15','Y','2018-05-28 20:53:06','15',12,NULL,1,1),(16,'Loperamide / Immodium','16','Y','2018-05-28 20:53:06','16',12,NULL,1,1),(17,'Mednil / Mefennamic 500 mg','17','Y','2018-05-28 20:53:06','17',1,NULL,1,1),(18,'Molax - M / Motilium 10 mg','18','Y','2018-05-28 20:53:06','18',12,NULL,1,1),(19,'Myoxan (tolpelisone)','19','Y','2018-05-28 20:53:06','19',12,NULL,1,1),(20,'Norgesic(Myoflex)','20','Y','2018-05-28 20:53:06','20',1,NULL,1,1),(21,'Nasolin','21','Y','2018-05-28 20:53:06','21',1,NULL,1,1),(22,'Omeplazole (1 Bx. = 10x10 cap)','22','Y','2018-05-28 20:53:06','22',1,NULL,1,1),(23,'Paracetamal 500 mg','23','Y','2018-05-30 06:17:48','23',1,NULL,1,500),(24,'Prednisolone 5 mg','24','Y','2018-05-28 20:53:06','24',2,NULL,1,1),(25,'salbutamol 2 mg.','25','Y','2018-05-28 20:53:06','25',12,NULL,1,1),(26,'Simethicone 80 mg / Blow - x','26','Y','2018-05-28 20:53:06','26',1,NULL,1,1),(27,'Throatsil','27','Y','2018-05-28 20:53:06','27',12,NULL,1,1),(28,'Tofago (cafergot)','28','Y','2018-05-28 20:53:06','28',12,NULL,1,1),(29,'Vitamin B 1-6-12','29','Y','2018-05-28 20:53:06','29',12,NULL,1,1),(30,'Vitamin B Complex','30','Y','2018-05-28 20:53:06','30',2,NULL,1,1),(31,'Vitamin B2','31','Y','2018-05-28 20:53:06','31',2,NULL,1,1),(32,'Vitamin lili MTV,','32','Y','2018-05-28 20:53:06','32',2,NULL,1,1),(33,'Vitamin C 100 mg.','33','Y','2018-05-28 20:53:06','33',1,NULL,1,1),(34,'Vitamin C 500 mg.','34','Y','2018-05-28 20:53:06','34',3,NULL,1,1),(35,'Viclovia (Acyclovir 200 mg)','35','Y','2018-05-28 20:53:06','35',12,NULL,1,1),(36,'Zyrtec','36','Y','2018-05-28 20:53:06','36',12,NULL,1,1),(37,'ยาอมมะแว้ง รสบ๊วย','37','Y','2018-05-28 20:53:06','37',1,NULL,1,1),(38,'ขมิ้นชัน แคปซูล','38','Y','2018-05-28 20:53:06','38',1,NULL,1,1),(39,'ฟ้าทลายโจร แคปซูล','39','Y','2018-05-28 20:53:06','39',1,NULL,1,1),(40,'Antasil Gel 240 ml.','40','Y','2018-05-28 20:53:06','40',4,NULL,1,1),(41,'M - carminative    240 Ml.','41','Y','2018-05-28 20:53:06','41',3,NULL,1,1),(42,'ORS','42','Y','2018-05-28 20:53:06','42',12,NULL,1,1),(43,'Milk of magnesia 240 Ml.','43','Y','2018-05-28 20:53:06','43',1,NULL,1,1),(44,'Mysolven (Acetylcysteine) sachet 100 mg.','44','Y','2018-05-28 20:53:06','44',1,NULL,1,1),(45,'M.tussis (small) 60 ml.','45','Y','2018-05-28 20:53:06','45',3,NULL,1,1),(46,'ยาธาตุน้ำขาว 50 Ml.','46','Y','2018-05-28 20:53:06','46',4,NULL,1,1),(47,'น้ำยาบ้วนปาก 250 ml.','47','Y','2018-05-28 20:53:06','47',12,NULL,1,1),(48,'ยาแก้ไอมะขามป้อม 50 Ml.','48','Y','2018-05-28 20:53:06','48',5,NULL,1,1),(49,'Amoxycillin ( 500 mg )','49','Y','2018-05-28 20:53:06','49',1,NULL,1,1),(50,'Dicloxacillin ( 500 mg )','50','Y','2018-05-28 20:53:06','50',1,NULL,1,1),(51,'Erythromycin ( 250 mg )','51','Y','2018-05-28 20:53:06','51',12,NULL,1,1),(52,'Norfloxacin ( 400 mg )','52','Y','2018-05-28 20:53:06','52',1,NULL,1,1),(53,'Roxithromycin  ( 150 mg )','53','Y','2018-05-28 20:53:06','53',1,NULL,1,1),(54,'Chloramphenical Eye drop  5 ml.','54','Y','2018-05-28 20:53:06','54',12,NULL,1,1),(55,'Chloramphenical  Eye ointment','55','Y','2018-05-28 20:53:06','55',1,NULL,1,1),(56,'Eyedex Eye - Ear drop ( Dexa+neomycin)','56','Y','2018-05-28 20:53:06','56',1,NULL,1,1),(57,'Opsil - A (for allergic eye) 5 ml.','57','Y','2018-05-28 20:53:06','57',12,NULL,1,1),(58,'Poly oph (Antibiotic)','58','Y','2018-05-28 20:53:06','58',1,NULL,1,1),(59,'น้ำตาเทียม 5 ml','59','Y','2018-05-28 20:53:06','59',12,NULL,1,1),(60,'น้ำตาเทียม10 ml','60','Y','2018-05-28 20:53:06','60',12,NULL,1,1),(61,'น้ำยาล้างตา 120 ml.','61','Y','2018-05-28 20:53:06','61',4,NULL,1,1),(62,'Betamethasone cream 5 gm.','62','Y','2018-05-28 20:53:06','62',12,NULL,1,1),(63,'Betamethasone c Neomycin  5 gm.','63','Y','2018-05-28 20:53:06','63',6,NULL,1,1),(64,'Betadine  ointment 50 gm.','64','Y','2018-05-28 20:53:06','64',2,NULL,1,1),(65,'Clotrimazone cream 15 กรัม','65','Y','2018-05-28 20:53:06','65',12,NULL,1,1),(66,'Flamazine cream  450 กรัม','66','Y','2018-05-28 20:53:06','66',12,NULL,1,1),(67,'Kanolone','67','Y','2018-05-28 20:53:06','67',1,NULL,1,1),(68,'MD-cream  ','68','Y','2018-05-28 20:53:06','68',4,NULL,1,1),(69,'calamine lotion 60 ml.','69','Y','2018-05-28 20:53:06','69',4,NULL,1,1),(70,'Neotiga balm 30 gm.','70','Y','2018-05-28 20:53:06','70',4,NULL,1,1),(71,'Neotiga balm 100 gm.','71','Y','2018-05-28 20:53:06','71',4,NULL,1,1),(72,'Piroxil Gel  100 gm.','72','Y','2018-05-28 20:53:06','72',4,NULL,1,1),(73,'Reparil Gel  40 gm.','73','Y','2018-05-28 20:53:06','73',12,NULL,1,1),(74,'TA 0.1 %  5 gm.','74','Y','2018-05-28 20:53:06','74',12,NULL,1,1),(75,'TA 0.02 % 5 gm.','75','Y','2018-05-28 20:53:06','75',6,NULL,1,1),(76,'Virogon (Acyclovir cream)','76','Y','2018-05-28 20:53:06','76',4,NULL,1,1),(77,'Alcohol 70 %  450 ml.','77','Y','2018-05-28 20:53:06','77',3,NULL,1,1),(78,'Ammonia    15 ml.','78','Y','2018-05-28 20:53:06','78',1,NULL,1,1),(79,'Betadine 15 ml. 1 x 12 Bt.','79','Y','2018-05-28 20:53:06','79',1,NULL,1,1),(80,'Betadine 450 ml.','80','Y','2018-05-28 20:53:06','80',3,NULL,1,1),(81,'Nss 0.9 % 1,000 cc.','81','Y','2018-05-28 20:53:06','81',3,NULL,1,1),(82,'เจลว่านหางจระเข้','82','Y','2018-05-28 20:53:06','82',4,NULL,1,1),(83,'ethyly chloride (สเปรย์ยาชา)','83','Y','2018-05-28 20:53:06','83',12,NULL,1,1),(84,'ยาดม (พีเป๊กซ์)','84','Y','2018-05-28 20:53:06','84',1,NULL,1,1),(85,'ยาหม่อง 15 gm.','85','Y','2018-05-28 20:53:06','85',12,NULL,1,1),(86,'มิวโพรีน หลอด 5 gm.','86','Y','2018-05-28 20:53:06','86',4,NULL,1,1),(87,'สเปร์ย Elmatacin','87','Y','2018-05-28 20:53:06','87',1,NULL,1,1),(88,'Sterile water for Irrigation 1,000 ml.ขวดพลาสติค','88','Y','2018-05-28 20:53:06','88',12,NULL,1,1),(89,'Betadine scrub 500 cc.','89','Y','2018-05-28 20:53:06','89',3,NULL,1,1),(90,'Tony lotion (TA 0.1 %  ชนิดน้ำ)','90','Y','2018-05-28 20:53:06','90',3,NULL,1,1),(121,'Neotape 1 \"','107','Y','2018-05-28 20:53:06','121',2,NULL,1,1),(122,'Neotape 2 \"','108','Y','2018-05-28 20:53:06','122',12,NULL,1,1),(119,'Micropore 0.5\"','105','Y','2018-05-28 20:53:06','119',1,NULL,1,1),(120,'Neobun - Gel แผ่นแปะบรรเทาปวด','106','Y','2018-05-28 20:53:06','120',1,NULL,1,1),(118,'Micropore 1\"','104','Y','2018-05-28 20:53:06','118',1,NULL,1,1),(108,'Elastic  Bandage 4 ”','94','Y','2018-05-28 20:53:06','108',1,NULL,1,1),(109,'Eye Pad','95','Y','2018-05-28 20:53:06','109',1,NULL,1,1),(110,'Gauze drain','96','Y','2018-05-28 20:53:06','110',4,NULL,1,1),(111,'Gauze 2x2','97','Y','2018-05-28 20:53:06','111',1,NULL,1,1),(112,'Gauze 3x3','98','Y','2018-05-28 20:53:06','112',1,NULL,1,1),(113,'Gauze 4x4','99','Y','2018-05-28 20:53:06','113',1,NULL,1,1),(114,'Grove (ถุงมือ) ขนาด S','100','Y','2018-05-28 20:53:06','114',1,NULL,1,1),(115,'Grove (ถุงมือ) ขนาด M','101','Y','2018-05-28 20:53:06','115',1,NULL,1,1),(116,'Grove (ถุงมือ) ขนาด L','102','Y','2018-05-28 20:53:06','116',12,NULL,1,1),(117,'Hot - Cold pack','103','Y','2018-05-28 20:53:06','117',2,NULL,1,1),(105,'Arm  Sling','91','Y','2018-05-28 20:53:06','105',7,NULL,1,1),(106,'Elastic  Bandage 2 ”','92','Y','2018-05-28 20:53:06','106',1,NULL,1,1),(107,'Elastic  Bandage 3 ”','93','Y','2018-05-28 20:53:06','107',1,NULL,1,1),(123,'sofra tullae/Bactigras','109','Y','2018-05-28 20:53:06','123',12,NULL,1,1),(124,'swab (ไม้พันสำลี) ขนาด S       ','110','Y','2018-05-28 20:53:06','124',12,NULL,1,1),(125,'swab ขนาด M                     ','111','Y','2018-05-28 20:53:06','125',4,NULL,1,1),(126,'swab ขนาด L                        ','112','Y','2018-05-28 20:53:06','126',9,NULL,1,1),(127,'Soft  Collar','113','Y','2018-05-28 20:53:06','127',12,NULL,1,1),(128,'Sterile strip','114','Y','2018-05-28 20:53:06','128',1,NULL,1,1),(129,'Tensoplast (สีน้ำตาล)','115','Y','2018-05-28 20:53:06','129',12,NULL,1,1),(130,'Tensoplastic','116','Y','2018-05-28 20:53:06','130',1,NULL,1,1),(131,'Transpore 1\"','117','Y','2018-05-28 20:53:06','131',1,NULL,1,1),(132,'Transpore 0.5\"','118','Y','2018-05-28 20:53:06','132',1,NULL,1,1),(133,'Tensofix ขนาด 5.0','119','Y','2018-05-28 20:53:06','133',12,NULL,1,1),(134,'Tensofix ขนาด 7.5','120','Y','2018-05-28 20:53:06','134',4,NULL,1,1),(135,'Tensofix ขนาด 10.0','121','Y','2018-05-28 20:53:06','135',5,NULL,1,1),(136,'สำลีก้อน ','122','Y','2018-05-28 20:53:06','136',7,NULL,1,1),(137,'ไม้กดลิ้น แบบแยกชิ้น','123','Y','2018-05-28 20:53:06','137',1,NULL,1,1),(138,'ถ้วยล้างตา','124','Y','2018-05-28 20:53:06','138',4,NULL,1,1),(139,'ตลับยา 5 gm.','125','Y','2018-05-28 20:53:06','139',4,NULL,1,1),(140,'Blade No. 11 ','126','Y','2018-05-28 20:53:06','140',1,NULL,1,1),(141,'Set ล้างแผล','127','Y','2018-05-28 20:53:06','141',12,NULL,1,1),(142,'mask (ผ้าปิดจมูกแบบใช้แล้วทิ้ง)','128','Y','2018-05-28 20:53:06','142',1,NULL,1,1),(143,'Easifix cohesive 2.5 cm x 4 M.','129','Y','2018-05-28 20:53:06','143',1,NULL,1,1),(144,'Fixomull stretch  10 cm x 10 M.','130','Y','2018-05-28 20:53:06','144',12,NULL,1,1),(145,'Inhibac Hospital Concentread 1 ลิตร','131','Y','2018-05-28 20:53:06','145',12,NULL,1,1),(146,'แอลกอฮอล์ เจลล้างมือ แบบขวดปั้ม','132','Y','2018-05-28 20:53:06','146',3,NULL,1,1),(147,'ซองซิปสั่งพิมพ์ # 7x10 Cm. (สีฟ้า)','133','Y','2018-05-28 20:53:06','147',12,NULL,1,1),(148,'ซองซิปสั่งพิมพ์ # 9x12 Cm. (สีฟ้า)','134','Y','2018-05-28 20:53:06','148',12,NULL,1,1),(149,'กระบอกฉีดยา  3 ML.','135','Y','2018-05-28 20:53:06','149',12,NULL,1,1),(150,'กระบอกฉีดยา  5 ML.','136','Y','2018-05-28 20:53:06','150',12,NULL,1,1),(151,'กระบอกฉีดยา  10 ML.','137','Y','2018-05-28 20:53:07','151',12,NULL,1,1),(152,'set IV','138','Y','2018-05-28 20:53:07','152',12,NULL,1,1),(153,'น้ำเกลือให้ทางหลอดเลือดดำ','139','Y','2018-05-28 20:53:07','153',12,NULL,1,1),(154,'NSS 500 ml.','140','Y','2018-05-28 20:53:07','154',12,NULL,1,1),(155,'LRS 500 ml.','141','Y','2018-05-28 20:53:07','155',12,NULL,1,1),(156,'5%D/2 500 ml.','142','Y','2018-06-13 06:41:06','156',12,'หก',1,5),(157,'ถ้วยสำหรับใส่ยารับประทานแบบพลาสติค 30 ml.','143','Y','2018-05-28 20:53:07','157',12,NULL,1,1),(158,'Ventolin','144','Y','2018-05-28 20:53:07','158',3,NULL,1,1),(159,'NSS 100 cc','145','Y','2018-05-28 20:53:07','159',4,NULL,1,1),(160,'TA 0.1% 15 gm','146','Y','2018-05-28 20:53:07','160',12,NULL,1,1),(161,'เข็มฉีดยา no.25','147','Y','2018-05-28 20:53:07','161',12,NULL,1,1),(162,'เข็มฉีดยา no.18','148','Y','2018-05-28 20:53:07','162',12,NULL,1,1),(163,'tai500','23','Y','2018-05-28 20:53:07','tai',2,'lllllllll',1,1),(164,'paracap','23','Y','2018-05-28 20:53:07','paracap',1,'',1,1);
/*!40000 ALTER TABLE `mm_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mm_units`
--

DROP TABLE IF EXISTS `mm_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mm_units` (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`unit_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mm_units`
--

LOCK TABLES `mm_units` WRITE;
/*!40000 ALTER TABLE `mm_units` DISABLE KEYS */;
INSERT INTO `mm_units` VALUES (1,'กล่อง','Y','2018-05-28 18:02:53'),(2,'กระปุก','Y','2018-04-20 17:34:43'),(3,'ขวด','Y','2018-04-20 17:34:53'),(4,'แพ็ค','Y','2018-04-20 17:35:10'),(5,'ลัง','Y','2018-04-20 17:35:19'),(6,'TU','Y','2018-04-20 17:35:45'),(7,'ถุง','Y','2018-04-20 17:36:08'),(8,'ชิ้น','Y','2018-04-20 17:36:23'),(9,'ห่อ','Y','2018-04-20 17:36:47'),(10,'เม็ด','Y','2018-04-20 17:37:07'),(11,'แคปซูล','Y','2018-04-20 17:37:36'),(12,'หน่วย','Y','2018-04-21 10:59:07');
/*!40000 ALTER TABLE `mm_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `um_backup`
--

DROP TABLE IF EXISTS `um_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `um_backup` (
  `backup_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `backup_path` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `backup_date` datetime DEFAULT NULL,
  `people_user_id` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`backup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `um_backup`
--

LOCK TABLES `um_backup` WRITE;
/*!40000 ALTER TABLE `um_backup` DISABLE KEYS */;
/*!40000 ALTER TABLE `um_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `um_people`
--

DROP TABLE IF EXISTS `um_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `um_people` (
  `people_id` int(11) NOT NULL AUTO_INCREMENT,
  `title_id` int(11) DEFAULT NULL,
  `fname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`people_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `um_people`
--

LOCK TABLES `um_people` WRITE;
/*!40000 ALTER TABLE `um_people` DISABLE KEYS */;
INSERT INTO `um_people` VALUES (1,1,'testF','testL','2018-04-19 16:50:14','Y'),(2,1,'staff','test','2018-04-19 17:33:12','Y');
/*!40000 ALTER TABLE `um_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `um_people_users`
--

DROP TABLE IF EXISTS `um_people_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `um_people_users` (
  `people_user_id` int(13) NOT NULL,
  `people_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`people_id`,`user_id`) USING BTREE,
  KEY `um_people_users_fk1` (`user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `um_people_users`
--

LOCK TABLES `um_people_users` WRITE;
/*!40000 ALTER TABLE `um_people_users` DISABLE KEYS */;
INSERT INTO `um_people_users` VALUES (1,1,1,'2018-04-17','0000-00-00','Y'),(2,2,2,'2018-04-19','0000-00-00','Y');
/*!40000 ALTER TABLE `um_people_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `um_titles`
--

DROP TABLE IF EXISTS `um_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `um_titles` (
  `title_id` int(11) NOT NULL,
  `title_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`title_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `um_titles`
--

LOCK TABLES `um_titles` WRITE;
/*!40000 ALTER TABLE `um_titles` DISABLE KEYS */;
INSERT INTO `um_titles` VALUES (1,'นาง'),(2,'นาย'),(3,'นางสาว');
/*!40000 ALTER TABLE `um_titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `um_users`
--

DROP TABLE IF EXISTS `um_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `um_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_right` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  `warehouse_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `um_users`
--

LOCK TABLES `um_users` WRITE;
/*!40000 ALTER TABLE `um_users` DISABLE KEYS */;
INSERT INTO `um_users` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e','admin','Y',1),(2,'staff','e10adc3949ba59abbe56e057f20f883e','staff','Y',2);
/*!40000 ALTER TABLE `um_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_addition_details`
--

DROP TABLE IF EXISTS `wm_addition_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_addition_details` (
  `addition_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `addition_id` int(11) DEFAULT NULL,
  `generic_id` int(11) DEFAULT NULL,
  `requisition_qty` int(50) DEFAULT NULL,
  PRIMARY KEY (`addition_detail_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_addition_details`
--

LOCK TABLES `wm_addition_details` WRITE;
/*!40000 ALTER TABLE `wm_addition_details` DISABLE KEYS */;
INSERT INTO `wm_addition_details` VALUES (1,3,142,100),(2,3,2,99),(3,3,78,99),(4,3,49,92),(5,3,1,94),(6,3,40,96),(7,3,23,20),(8,4,135,50),(9,4,139,0),(10,5,66,2000),(11,6,9,1),(12,7,142,100),(13,7,2,99),(14,7,78,99),(15,7,49,92),(16,7,1,94),(17,7,40,96),(18,7,91,94),(19,7,64,99),(20,7,79,99),(21,7,80,97),(22,7,89,99),(23,7,62,100),(24,7,5,100),(25,7,126,99),(26,7,3,100),(27,7,69,100),(28,7,4,100),(29,7,55,94),(30,7,54,100),(31,7,7,99),(32,7,65,100),(33,7,8,100),(34,7,10,100),(35,7,11,98),(36,7,12,92),(37,7,50,95),(38,7,13,99),(39,7,92,96),(40,7,93,96),(41,7,94,92),(42,7,51,100),(43,7,83,100),(44,7,95,93),(45,7,56,98),(46,7,130,100),(47,7,66,100),(48,7,96,98),(49,7,102,100),(50,7,101,99),(51,7,100,98),(52,7,103,98),(53,7,14,100),(54,8,78,122);
/*!40000 ALTER TABLE `wm_addition_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_additions`
--

DROP TABLE IF EXISTS `wm_additions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_additions` (
  `addition_id` int(11) NOT NULL AUTO_INCREMENT,
  `addition_code` varchar(255) DEFAULT NULL,
  `is_approve` enum('Y','N') DEFAULT 'N',
  `is_cancel` enum('N','Y') DEFAULT 'N',
  `create_date` date DEFAULT NULL,
  `addition_date` date DEFAULT NULL,
  PRIMARY KEY (`addition_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_additions`
--

LOCK TABLES `wm_additions` WRITE;
/*!40000 ALTER TABLE `wm_additions` DISABLE KEYS */;
INSERT INTO `wm_additions` VALUES (3,'AD-00000001','N','N','2018-06-09','2018-06-09'),(4,'AD-00000002','N','N','2018-06-09','2018-06-09'),(5,'AD-00000003','N','N','2018-06-09','2018-06-09'),(6,'AD-00000004','N','N','2018-06-12','2018-06-12'),(7,'AD-00000005','N','N','2018-07-04','2018-07-04'),(8,'AD-00000006','N','N','2018-07-10','2018-07-10');
/*!40000 ALTER TABLE `wm_additions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_addition_details`
--

DROP TABLE IF EXISTS `wm_equipment_addition_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_addition_details` (
  `addition_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `addition_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `requisition_qty` int(50) DEFAULT NULL,
  PRIMARY KEY (`addition_detail_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_addition_details`
--

LOCK TABLES `wm_equipment_addition_details` WRITE;
/*!40000 ALTER TABLE `wm_equipment_addition_details` DISABLE KEYS */;
INSERT INTO `wm_equipment_addition_details` VALUES (11,6,165,5000),(12,7,166,100),(13,8,165,12),(14,8,166,1),(15,9,166,60),(16,9,167,100),(17,9,165,34);
/*!40000 ALTER TABLE `wm_equipment_addition_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_additions`
--

DROP TABLE IF EXISTS `wm_equipment_additions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_additions` (
  `addition_id` int(11) NOT NULL AUTO_INCREMENT,
  `addition_code` varchar(255) DEFAULT NULL,
  `is_approve` enum('Y','N') DEFAULT 'N',
  `is_cancel` enum('N','Y') DEFAULT 'N',
  `create_date` date DEFAULT NULL,
  `addition_date` date DEFAULT NULL,
  PRIMARY KEY (`addition_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_additions`
--

LOCK TABLES `wm_equipment_additions` WRITE;
/*!40000 ALTER TABLE `wm_equipment_additions` DISABLE KEYS */;
INSERT INTO `wm_equipment_additions` VALUES (6,'AD-00000001','N','N','2018-06-11','2018-06-11'),(7,'AD-00000002','N','N','2018-06-13','2018-06-13'),(8,'AD-00000003','N','N','2018-07-06','2018-07-06'),(9,'AD-00000004','N','N','2018-07-06','2018-07-06');
/*!40000 ALTER TABLE `wm_equipment_additions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_issue_product_detail`
--

DROP TABLE IF EXISTS `wm_equipment_issue_product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_issue_product_detail` (
  `issue_product_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`issue_product_detail_id`) USING BTREE,
  KEY `wm_issue_products_fk0` (`issue_product_id`) USING BTREE,
  KEY `wm_issue_products_fk1` (`product_id`) USING BTREE,
  KEY `wm_issue_products_fk2` (`wm_product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_issue_product_detail`
--

LOCK TABLES `wm_equipment_issue_product_detail` WRITE;
/*!40000 ALTER TABLE `wm_equipment_issue_product_detail` DISABLE KEYS */;
INSERT INTO `wm_equipment_issue_product_detail` VALUES (32,'52','165','1111111',2,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(31,'51','165','1111111',2,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(33,'53','165','1111111',1,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(34,'54','165','1111111',5,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(35,'55','165','1111111',1,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(36,'56','165','1111111',1,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL),(37,'57','165','1111111',1,'ab860961-350e-4a0d-8d38-681a0ba9a424',NULL);
/*!40000 ALTER TABLE `wm_equipment_issue_product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_issue_products`
--

DROP TABLE IF EXISTS `wm_equipment_issue_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_issue_products` (
  `issue_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`issue_product_id`) USING BTREE,
  KEY `wm_issue_products_fk0` (`issue_id`) USING BTREE,
  KEY `wm_issue_products_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_issue_products`
--

LOCK TABLES `wm_equipment_issue_products` WRITE;
/*!40000 ALTER TABLE `wm_equipment_issue_products` DISABLE KEYS */;
INSERT INTO `wm_equipment_issue_products` VALUES (52,'22','165',2,'2018-06-11 08:19:14'),(51,'21','165',2,'2018-06-11 08:11:56'),(53,'23','165',1,'2018-07-06 06:50:06'),(54,'24','165',5,'2018-07-06 06:53:56'),(55,'25','165',1,'2018-07-06 06:57:13'),(56,'26','165',1,'2018-07-06 06:57:24'),(57,'27','165',1,'2018-07-06 06:59:43');
/*!40000 ALTER TABLE `wm_equipment_issue_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_issues`
--

DROP TABLE IF EXISTS `wm_equipment_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_issues` (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_code` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `transection_issue_id` int(11) NOT NULL,
  `people_user_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approve_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `approve_people_user_id` int(11) DEFAULT NULL,
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`issue_id`) USING BTREE,
  KEY `wm_issues_fk0` (`transection_issue_id`) USING BTREE,
  KEY `wm_issues_fk1` (`people_user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_issues`
--

LOCK TABLES `wm_equipment_issues` WRITE;
/*!40000 ALTER TABLE `wm_equipment_issues` DISABLE KEYS */;
INSERT INTO `wm_equipment_issues` VALUES (22,'iss-00000002','2018-06-11',6,'1','2018-07-06 06:52:23','Y',NULL,'2018-07-06 00:00:00','2018-06-11 00:00:00',1,'Y'),(21,'iss-00000001','2018-06-11',6,'1','2018-07-06 06:52:23','Y','ssssss','2018-07-06 00:00:00','2018-06-11 00:00:00',1,'N'),(23,'iss-00000003','2018-07-06',6,'1','2018-07-06 06:52:23','Y',NULL,'2018-07-06 00:00:00','2018-07-06 00:00:00',1,'N'),(24,'iss-00000004','2018-07-06',6,'1','2018-07-06 06:56:04','Y',NULL,'2018-07-06 00:00:00','2018-07-06 00:00:00',1,'N'),(25,'iss-00000005','2018-07-06',6,'1','2018-07-06 06:57:29','Y',NULL,'2018-07-06 00:00:00','2018-07-06 00:00:00',1,'N'),(26,'iss-00000006','2018-07-06',6,'1','2018-07-06 06:57:29','Y',NULL,'2018-07-06 00:00:00','2018-07-06 00:00:00',1,'N'),(27,'iss-00000007','2018-07-06',6,'1','2018-07-06 06:59:45','N',NULL,NULL,'2018-07-06 00:00:00',NULL,'Y');
/*!40000 ALTER TABLE `wm_equipment_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_products`
--

DROP TABLE IF EXISTS `wm_equipment_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_products` (
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `warehouse_id` int(11) NOT NULL DEFAULT 0,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(6) DEFAULT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date DEFAULT NULL,
  `people_user_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`warehouse_id`,`product_id`,`lot_no`) USING BTREE,
  KEY `wm_products_fk0` (`product_id`) USING BTREE,
  KEY `wm_products_fk2` (`people_user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_products`
--

LOCK TABLES `wm_equipment_products` WRITE;
/*!40000 ALTER TABLE `wm_equipment_products` DISABLE KEYS */;
INSERT INTO `wm_equipment_products` VALUES ('ab860961-350e-4a0d-8d38-681a0ba9a424',1,'165',4,'1111111','2020-02-10','1',NULL,'2018-07-06 06:57:29'),('c075064f-6159-4273-9b77-db8cfd3152fc',1,'165',5,'11111','2020-02-29','1',NULL,'2018-06-11 08:11:01');
/*!40000 ALTER TABLE `wm_equipment_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_receive_detail`
--

DROP TABLE IF EXISTS `wm_equipment_receive_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_receive_detail` (
  `receive_detail_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date NOT NULL,
  `receive_qty` int(12) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`receive_detail_id`) USING BTREE,
  KEY `wm_receives_detail_fk0` (`receive_id`) USING BTREE,
  KEY `wm_receives_detail_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_receive_detail`
--

LOCK TABLES `wm_equipment_receive_detail` WRITE;
/*!40000 ALTER TABLE `wm_equipment_receive_detail` DISABLE KEYS */;
INSERT INTO `wm_equipment_receive_detail` VALUES (72,'16','165','ZZZ','2020-02-20',5,'2018-06-11 08:18:37'),(71,'15','165','1111111','2019-12-12',20,'2018-06-11 08:10:53'),(70,'14','165','1111111','2020-02-10',50,'2018-06-11 07:44:01'),(69,'13','165','11111','2020-02-29',5,'2018-06-11 07:42:13'),(73,'17','167','LERVERV','2019-12-29',34,'2018-07-06 05:35:41');
/*!40000 ALTER TABLE `wm_equipment_receive_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_receives`
--

DROP TABLE IF EXISTS `wm_equipment_receives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_receives` (
  `receive_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_date` date DEFAULT NULL,
  `receive_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `people_user_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `delivery_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  PRIMARY KEY (`receive_id`) USING BTREE,
  KEY `wm_receives_fk0` (`people_user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_receives`
--

LOCK TABLES `wm_equipment_receives` WRITE;
/*!40000 ALTER TABLE `wm_equipment_receives` DISABLE KEYS */;
INSERT INTO `wm_equipment_receives` VALUES (16,'2018-06-11','IN-00000004','1','2018-06-11 08:18:40','N','Y','หกหกหก','2018-06-11'),(15,'2018-06-11','IN-00000003','1','2018-06-11 08:11:20','Y','N','we','2018-06-11'),(14,'2018-06-11','IN-00000002','1','2018-06-11 08:11:20','Y','N','หกหกหก','2018-06-11'),(13,'2018-06-11','IN-00000001','1','2018-06-11 08:11:01','Y','N','we','2018-06-11'),(17,'2018-07-06','IN-00000005','1','2018-07-06 05:35:41','N','N','dddf','2018-07-06');
/*!40000 ALTER TABLE `wm_equipment_receives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_requisition_confirm_item`
--

DROP TABLE IF EXISTS `wm_equipment_requisition_confirm_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_requisition_confirm_item` (
  `confirm_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_order_id` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirm_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`confirm_item_id`) USING BTREE,
  UNIQUE KEY `dup` (`requisition_order_id`,`wm_product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_requisition_confirm_item`
--

LOCK TABLES `wm_equipment_requisition_confirm_item` WRITE;
/*!40000 ALTER TABLE `wm_equipment_requisition_confirm_item` DISABLE KEYS */;
INSERT INTO `wm_equipment_requisition_confirm_item` VALUES (28,12,'ab860961-350e-4a0d-8d38-681a0ba9a424',2),(27,11,'ab860961-350e-4a0d-8d38-681a0ba9a424',50),(29,13,'ab860961-350e-4a0d-8d38-681a0ba9a424',5);
/*!40000 ALTER TABLE `wm_equipment_requisition_confirm_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_requisition_order_items`
--

DROP TABLE IF EXISTS `wm_equipment_requisition_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_requisition_order_items` (
  `requisition_order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `requisition_qty` int(12) DEFAULT NULL,
  PRIMARY KEY (`requisition_order_item_id`) USING BTREE,
  KEY `wm_reqisition_order_items_fk0` (`requisition_order_id`) USING BTREE,
  KEY `wm_reqisition_order_items_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_requisition_order_items`
--

LOCK TABLES `wm_equipment_requisition_order_items` WRITE;
/*!40000 ALTER TABLE `wm_equipment_requisition_order_items` DISABLE KEYS */;
INSERT INTO `wm_equipment_requisition_order_items` VALUES (24,12,165,2),(23,11,165,50),(25,13,165,5);
/*!40000 ALTER TABLE `wm_equipment_requisition_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_requisition_orders`
--

DROP TABLE IF EXISTS `wm_equipment_requisition_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_requisition_orders` (
  `requisition_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_code` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `requisition_date` date DEFAULT NULL,
  `wm_requisition` int(11) DEFAULT NULL,
  `wm_withdraw` int(11) DEFAULT NULL,
  `people_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `create_date` datetime DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `user_confirm_id` int(11) DEFAULT NULL,
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`requisition_order_id`) USING BTREE,
  KEY `wm_reqisition_orders_fk0` (`wm_requisition`) USING BTREE,
  KEY `wm_reqisition_orders_fk1` (`wm_withdraw`) USING BTREE,
  KEY `wm_reqisition_orders_fk2` (`people_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_requisition_orders`
--

LOCK TABLES `wm_equipment_requisition_orders` WRITE;
/*!40000 ALTER TABLE `wm_equipment_requisition_orders` DISABLE KEYS */;
INSERT INTO `wm_equipment_requisition_orders` VALUES (12,'RQ-00000002','2018-06-13',2,1,'1','N','2018-06-12 21:26:19','2018-06-13 04:26:04','2018-06-13 04:26:19',1,'Y'),(11,'RQ-00000001','2018-06-11',2,1,'1','N','2018-06-11 08:19:42','2018-06-11 15:19:34','2018-06-11 15:19:42',1,'Y'),(13,'RQ-00000003','2018-06-24',2,1,'2','N','2018-06-23 23:33:45','2018-06-24 06:32:54','2018-06-24 06:33:45',2,'Y');
/*!40000 ALTER TABLE `wm_equipment_requisition_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_equipment_transection_issues`
--

DROP TABLE IF EXISTS `wm_equipment_transection_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_equipment_transection_issues` (
  `transection_id` int(11) NOT NULL AUTO_INCREMENT,
  `transection_name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`transection_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_equipment_transection_issues`
--

LOCK TABLES `wm_equipment_transection_issues` WRITE;
/*!40000 ALTER TABLE `wm_equipment_transection_issues` DISABLE KEYS */;
INSERT INTO `wm_equipment_transection_issues` VALUES (6,'เสียหาย','Y');
/*!40000 ALTER TABLE `wm_equipment_transection_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_issue_product_detail`
--

DROP TABLE IF EXISTS `wm_issue_product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_issue_product_detail` (
  `issue_product_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`issue_product_detail_id`) USING BTREE,
  KEY `wm_issue_products_fk0` (`issue_product_id`) USING BTREE,
  KEY `wm_issue_products_fk1` (`product_id`) USING BTREE,
  KEY `wm_issue_products_fk2` (`wm_product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_issue_product_detail`
--

LOCK TABLES `wm_issue_product_detail` WRITE;
/*!40000 ALTER TABLE `wm_issue_product_detail` DISABLE KEYS */;
INSERT INTO `wm_issue_product_detail` VALUES (1,'18','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(2,'18','23','1',10,'12',NULL),(3,'18','23','10',0,'e04efcb5-d61f-4f89-812f-56c94646e7f6',NULL),(4,'18','23','1010',0,'d7e49438-4e4a-4a02-8f9d-b5f5a064d734',NULL),(5,'18','23','GRRG222',0,'640a3a77-5739-41b0-aa83-a6a94a7b98b5',NULL),(6,'19','41','1',11,'24',NULL),(7,'25','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(8,'25','23','1',10,'12',NULL),(9,'28','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(10,'28','23','1',14,'12',NULL),(11,'33','9','20',11,'30800a97-ecff-420b-afae-f71d3e800b78',NULL),(12,'34','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(13,'34','23','1',13,'12',NULL),(14,'36','9','20',11,'30800a97-ecff-420b-afae-f71d3e800b78',NULL),(15,'37','26','1',4,'14',NULL),(16,'37','26','101010',1,'e01b991c-2b3d-4e46-b069-ac39d5094695',NULL),(17,'39','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(18,'39','23','1',18,'12',NULL),(19,'39','23','1010',1,'d7e49438-4e4a-4a02-8f9d-b5f5a064d734',NULL),(20,'39','23','GRRG222',2,'640a3a77-5739-41b0-aa83-a6a94a7b98b5',NULL),(21,'39','23','10',1,'e04efcb5-d61f-4f89-812f-56c94646e7f6',NULL),(22,'40','9','20',11,'30800a97-ecff-420b-afae-f71d3e800b78',NULL),(23,'42','41','1',1,'24',NULL),(24,'45','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(25,'45','23','1',10,'12',NULL),(26,'46','23','1111',1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL),(27,'46','23','1',1,'12',NULL),(28,'48','164','111',2,'fa72fda1-2fbf-4a31-8986-ffce268fac87',NULL),(29,'49','23','1',7,'12',NULL),(30,'50','23','1111',2,'c4269752-5ebd-45c8-9a2a-ee196e78b697',NULL);
/*!40000 ALTER TABLE `wm_issue_product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_issue_products`
--

DROP TABLE IF EXISTS `wm_issue_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_issue_products` (
  `issue_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`issue_product_id`) USING BTREE,
  KEY `wm_issue_products_fk0` (`issue_id`) USING BTREE,
  KEY `wm_issue_products_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_issue_products`
--

LOCK TABLES `wm_issue_products` WRITE;
/*!40000 ALTER TABLE `wm_issue_products` DISABLE KEYS */;
INSERT INTO `wm_issue_products` VALUES (8,'6','23',23,'2018-05-14 19:06:39'),(7,'6','24',1,'2018-05-14 19:06:39'),(6,'6','6',10,'2018-05-14 19:06:39'),(9,'7','23',23,'2018-05-14 19:08:00'),(10,'8','23',23,'2018-05-14 19:12:41'),(17,'9','23',2,'2018-05-14 19:15:49'),(16,'9','9',8,'2018-05-14 19:15:49'),(18,'10','23',11,'2018-05-18 03:36:01'),(19,'10','23',11,'2018-05-18 03:36:01'),(20,'10','41',11,'2018-05-18 03:36:01'),(21,'10','23',11,'2018-05-18 03:36:01'),(22,'10','41',11,'2018-05-18 03:36:01'),(23,'10','23',11,'2018-05-18 03:36:01'),(24,'10','41',11,'2018-05-18 03:36:01'),(25,'11','23',11,'2018-05-18 04:45:35'),(26,'11','23',11,'2018-05-18 04:45:35'),(27,'11','23',11,'2018-05-18 04:45:35'),(32,'12','41',20,'2018-05-20 12:28:02'),(31,'12','23',15,'2018-05-20 12:28:02'),(33,'13','9',11,'2018-05-20 12:51:51'),(34,'13','9',11,'2018-05-20 12:51:51'),(35,'13','23',14,'2018-05-20 12:51:51'),(36,'14','9',11,'2018-05-20 12:53:05'),(37,'14','9',11,'2018-05-20 12:53:05'),(38,'14','26',5,'2018-05-20 12:53:05'),(50,'20','23',2,'2018-05-30 06:28:17'),(49,'19','23',7,'2018-05-30 05:26:59'),(48,'18','164',2,'2018-05-28 21:37:22'),(47,'15','23',1,'2018-05-20 13:48:22'),(45,'16','23',11,'2018-05-20 13:03:37'),(46,'17','23',2,'2018-05-20 13:10:28');
/*!40000 ALTER TABLE `wm_issue_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_issues`
--

DROP TABLE IF EXISTS `wm_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_issues` (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_code` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `transection_issue_id` int(11) NOT NULL,
  `people_user_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approve_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `approve_people_user_id` int(11) DEFAULT NULL,
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`issue_id`) USING BTREE,
  KEY `wm_issues_fk0` (`transection_issue_id`) USING BTREE,
  KEY `wm_issues_fk1` (`people_user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_issues`
--

LOCK TABLES `wm_issues` WRITE;
/*!40000 ALTER TABLE `wm_issues` DISABLE KEYS */;
INSERT INTO `wm_issues` VALUES (1,'OUT-00000001','2018-04-25',1,'1','2018-04-24 19:29:52','N','ใหม่',NULL,NULL,NULL,'N'),(2,'iss-00000001','2018-05-14',2,'1','2018-05-14 13:01:34','N','wefwefwef',NULL,NULL,NULL,'N'),(3,'iss-00000002','2018-05-14',2,'1','2018-05-14 13:03:34','N','wefwefwef',NULL,NULL,NULL,'N'),(4,'iss-00000003','2018-05-14',2,'1','2018-05-14 13:04:14','N','wefwefwef',NULL,NULL,NULL,'N'),(5,'iss-00000004','2018-05-14',2,'1','2018-05-14 13:05:19','N','wefwefwef',NULL,NULL,NULL,'N'),(6,'iss-00000005','2018-04-13',2,'1','2018-05-14 19:06:03','N','แก้2',NULL,NULL,NULL,'N'),(7,'iss-00000006','2018-05-15',3,'1','2018-05-14 19:08:00','N','test1',NULL,NULL,NULL,'N'),(8,'iss-00000007','2018-05-15',1,'1','2018-05-14 19:12:41','N','ddddd',NULL,NULL,NULL,'N'),(9,'iss-00000008','2018-05-15',2,'1','2018-05-14 19:14:10','N','ssssss',NULL,NULL,NULL,'N'),(10,'iss-00000009','2018-05-18',3,'1','2018-05-18 03:36:01','N','dsfdvp',NULL,NULL,NULL,'N'),(11,'iss-00000010','2018-05-18',2,'1','2018-05-18 04:45:35','N','thnghnpa',NULL,NULL,NULL,'N'),(12,'iss-00000011','2018-05-18',1,'1','2018-05-18 07:13:48','N','wwwss',NULL,'2018-05-18 14:13:17',NULL,'N'),(13,'iss-00000012','2018-05-20',2,'1','2018-05-20 12:51:51','N','psdc',NULL,'2018-05-20 00:00:00',NULL,'N'),(14,'iss-00000013','2018-05-20',3,'1','2018-06-10 14:45:43','N','wwww',NULL,'2018-05-20 00:00:00',NULL,'Y'),(15,'iss-00000014','2018-05-20',2,'1','2018-05-20 13:48:55','Y',NULL,'2018-05-20 00:00:00','2018-05-20 00:00:00',1,'N'),(16,'iss-00000015','2018-05-20',2,'1','2018-05-20 13:22:49','Y','dcwedw','2018-05-20 00:00:00','2018-05-20 00:00:00',1,'N'),(17,'iss-00000016','2018-05-20',2,'1','2018-05-20 13:48:55','Y',NULL,'2018-05-20 00:00:00','2018-05-20 00:00:00',1,'N'),(18,'iss-00000018','2018-05-29',2,'1','2018-05-28 21:37:50','Y',NULL,'2018-05-29 00:00:00','2018-05-29 00:00:00',1,'N'),(19,'iss-00000019','2018-05-30',2,'1','2018-05-30 05:27:06','Y',NULL,'2018-05-30 00:00:00','2018-05-30 00:00:00',1,'N'),(20,'iss-00000020','2018-05-30',2,'1','2018-06-10 14:45:59','Y','เปียกน้ำ','2018-06-10 00:00:00','2018-05-30 00:00:00',1,'N');
/*!40000 ALTER TABLE `wm_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_products`
--

DROP TABLE IF EXISTS `wm_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_products` (
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `warehouse_id` int(11) NOT NULL DEFAULT 0,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(6) DEFAULT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date DEFAULT NULL,
  `people_user_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`warehouse_id`,`product_id`,`lot_no`) USING BTREE,
  KEY `wm_products_fk0` (`product_id`) USING BTREE,
  KEY `wm_products_fk2` (`people_user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_products`
--

LOCK TABLES `wm_products` WRITE;
/*!40000 ALTER TABLE `wm_products` DISABLE KEYS */;
INSERT INTO `wm_products` VALUES ('1',1,'1',6,'1','2019-04-21','1','2018-04-21 23:56:57','2018-04-24 17:30:42'),('2',1,'2',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('3',1,'6',9,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('4',1,'7',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('5',1,'11',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('6',1,'12',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('7',1,'13',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('8',1,'17',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('9',1,'20',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('10',1,'21',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('11',1,'22',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('12',1,'23',36,'1','2019-04-21','1','2018-04-21 00:00:00','2018-05-30 05:35:32'),('13',1,'24',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('14',1,'26',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('15',1,'30',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('16',1,'31',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('17',1,'32',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('18',1,'33',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('19',1,'34',10,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('20',1,'37',58,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('21',1,'38',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('22',1,'39',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('23',1,'40',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('24',1,'41',29,'1','2019-04-21','1','2018-04-21 00:00:00','2018-05-23 11:56:17'),('25',1,'43',12,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('26',1,'44',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('27',1,'45',50,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('28',1,'46',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('29',1,'48',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('30',1,'49',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('31',1,'50',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('32',1,'52',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('33',1,'53',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('34',1,'55',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('35',1,'56',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('36',1,'58',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('37',1,'61',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('38',1,'63',140,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('39',1,'64',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('40',1,'67',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('41',1,'68',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('42',1,'69',0,'1','2019-04-21','1','2018-04-21 00:00:00','2018-06-05 06:47:46'),('43',1,'70',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('44',1,'72',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-05-23 12:11:04'),('45',1,'75',36,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('46',1,'76',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('47',1,'77',13,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('48',1,'78',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('49',1,'79',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('50',1,'80',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('51',1,'81',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('52',1,'82',10,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('53',1,'84',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('54',1,'86',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('55',1,'87',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('56',1,'89',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('57',1,'90',30,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('58',1,'105',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('59',1,'106',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('60',1,'107',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('61',1,'108',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('62',1,'109',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('63',1,'110',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('64',1,'111',16,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('65',1,'112',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('66',1,'113',22,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('67',1,'114',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('68',1,'115',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('69',1,'117',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('70',1,'118',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('71',1,'119',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('72',1,'120',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('73',1,'121',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('74',1,'125',34,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('75',1,'126',15,'1','2019-04-21','1','2018-04-21 00:00:00','2018-06-05 06:47:46'),('76',1,'128',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('77',1,'130',11,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('78',1,'131',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('79',1,'132',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('80',1,'134',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('81',1,'135',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('82',1,'136',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('83',1,'137',15,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('84',1,'138',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('85',1,'139',14,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('86',1,'140',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('87',1,'142',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('88',1,'143',45,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('89',1,'146',28,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('90',1,'158',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('91',1,'159',11,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('92',1,'160',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('e04efcb5-d61f-4f89-812f-56c94646e7f6',1,'23',59,'10','2020-12-20','1',NULL,'2018-05-23 12:11:04'),('e01b991c-2b3d-4e46-b069-ac39d5094695',1,'26',1,'101010','2020-02-20','1',NULL,'2018-04-24 17:30:42'),('d7e49438-4e4a-4a02-8f9d-b5f5a064d734',1,'23',70,'1010','2020-12-20','1',NULL,'2018-06-09 06:51:00'),('82c97453-16e3-4dbe-b571-537ae90e0226',1,'16',20,'1010','1010-10-10','1',NULL,'2018-06-09 06:51:00'),('c4269752-5ebd-45c8-9a2a-ee196e78b697',1,'23',41,'1111','0000-00-00','1',NULL,'2018-06-10 14:46:31'),('6116fc40-1325-447c-b414-c493d132692f',1,'143',1,'1111','2018-05-31','1',NULL,'2018-05-26 19:21:50'),('30800a97-ecff-420b-afae-f71d3e800b78',1,'9',11,'20','0000-00-00','1',NULL,'2018-04-24 17:32:33'),('640a3a77-5739-41b0-aa83-a6a94a7b98b5',1,'23',979,'GRRG222','2020-12-20','1',NULL,'2018-05-23 12:11:04'),('bbdd046c-28e4-4c41-be03-c2599bd20fa9',1,'6',1,'GRRG222','2020-12-20','1',NULL,'2018-04-25 05:52:41'),('0049853b-f3df-4633-9749-8f1c334364f0',1,'11',1,'QWCQWC','2020-02-20','1',NULL,'2018-05-20 15:32:04'),('fa72fda1-2fbf-4a31-8986-ffce268fac87',1,'164',20,'111','2018-02-12','1',NULL,'2018-06-05 06:49:39'),('7f92a980-c738-47fd-ad15-88d3882617ba',1,'23',30,'123456','2019-12-20','1',NULL,'2018-05-30 05:25:18'),('9ce1f639-3963-4f73-b234-121cf2af04a2',1,'23',4,'123','2020-01-30','1',NULL,'2018-05-30 06:36:48'),('fa72fda1-2fbf-4a31-8986-ffce26',1,'163',22,'1112','2018-02-12','1',NULL,'2018-06-04 16:17:54');
/*!40000 ALTER TABLE `wm_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_products_copy1`
--

DROP TABLE IF EXISTS `wm_products_copy1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_products_copy1` (
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `warehouse_id` int(11) NOT NULL DEFAULT 0,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(6) DEFAULT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date DEFAULT NULL,
  `people_user_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`warehouse_id`,`product_id`,`lot_no`) USING BTREE,
  KEY `wm_products_fk0` (`product_id`) USING BTREE,
  KEY `wm_products_fk2` (`people_user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_products_copy1`
--

LOCK TABLES `wm_products_copy1` WRITE;
/*!40000 ALTER TABLE `wm_products_copy1` DISABLE KEYS */;
INSERT INTO `wm_products_copy1` VALUES ('1',1,'1',1,'1','2019-04-21','1','2018-04-21 23:56:57','2018-04-21 16:57:08'),('2',1,'2',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('3',1,'6',9,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('4',1,'7',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('5',1,'11',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('6',1,'12',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('7',1,'13',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('8',1,'17',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('9',1,'20',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('10',1,'21',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('11',1,'22',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('12',1,'23',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('13',1,'24',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('14',1,'26',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('15',1,'30',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('16',1,'31',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('17',1,'32',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('18',1,'33',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('19',1,'34',10,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('20',1,'37',58,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('21',1,'38',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('22',1,'39',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('23',1,'40',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('24',1,'41',30,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('25',1,'43',12,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('26',1,'44',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('27',1,'45',50,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('28',1,'46',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('29',1,'48',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('30',1,'49',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('31',1,'50',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('32',1,'52',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('33',1,'53',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('34',1,'55',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('35',1,'56',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('36',1,'58',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('37',1,'61',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('38',1,'63',140,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('39',1,'64',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('40',1,'67',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('41',1,'68',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('42',1,'69',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('43',1,'70',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('44',1,'72',16,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('45',1,'75',36,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('46',1,'76',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('47',1,'77',13,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('48',1,'78',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('49',1,'79',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('50',1,'80',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('51',1,'81',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('52',1,'82',10,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('53',1,'84',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('54',1,'86',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('55',1,'87',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('56',1,'89',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('57',1,'90',30,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('58',1,'105',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('59',1,'106',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('60',1,'107',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('61',1,'108',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('62',1,'109',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('63',1,'110',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('64',1,'111',16,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('65',1,'112',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('66',1,'113',22,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('67',1,'114',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('68',1,'115',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('69',1,'117',2,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('70',1,'118',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('71',1,'119',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('72',1,'120',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('73',1,'121',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('74',1,'125',34,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('75',1,'126',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('76',1,'128',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('77',1,'130',11,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('78',1,'131',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('79',1,'132',4,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('80',1,'134',5,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('81',1,'135',6,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('82',1,'136',7,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('83',1,'137',15,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('84',1,'138',18,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:17'),('85',1,'139',14,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('86',1,'140',1,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('87',1,'142',19,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('88',1,'143',45,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('89',1,'146',28,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('90',1,'158',3,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('91',1,'159',11,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18'),('92',1,'160',8,'1','2019-04-21','1','2018-04-21 00:00:00','2018-04-20 18:04:18');
/*!40000 ALTER TABLE `wm_products_copy1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_receive_detail`
--

DROP TABLE IF EXISTS `wm_receive_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_receive_detail` (
  `receive_detail_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lot_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date NOT NULL,
  `receive_qty` int(12) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`receive_detail_id`) USING BTREE,
  KEY `wm_receives_detail_fk0` (`receive_id`) USING BTREE,
  KEY `wm_receives_detail_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_receive_detail`
--

LOCK TABLES `wm_receive_detail` WRITE;
/*!40000 ALTER TABLE `wm_receive_detail` DISABLE KEYS */;
INSERT INTO `wm_receive_detail` VALUES (10,'4','143','1111','1010-10-10',1,'2018-04-24 09:04:43'),(9,'4','23','1111','0000-00-00',1,'2018-04-24 09:04:43'),(11,'4','9','20','0000-00-00',11,'2018-04-24 09:04:43'),(65,'5','16','1010','1010-10-10',10,'2018-06-09 06:49:39'),(64,'5','23','1010','2020-12-20',2,'2018-06-09 06:49:39'),(45,'1','1','1','2019-04-21',1,'2018-04-24 17:29:34'),(44,'1','26','101010','2020-02-20',1,'2018-04-24 17:29:34'),(43,'1','23','10','2020-12-20',1,'2018-04-24 17:29:34'),(50,'6','23','GRRG222','2020-12-20',2,'2018-04-25 05:51:31'),(51,'6','6','GRRG222','2020-12-20',1,'2018-04-25 05:51:31'),(54,'7','11','QWCQWC','2020-02-20',1,'2018-05-13 16:34:02'),(56,'8','164','111','2018-02-12',50,'2018-05-28 21:25:41'),(57,'9','23','123456','2019-12-20',30,'2018-05-30 05:24:43'),(59,'10','23','123','2020-01-30',5,'2018-05-30 06:21:58'),(66,'11','10','1010000','2019-12-20',5,'2018-06-09 06:58:01'),(67,'11','79','1010000','2020-02-20',50,'2018-06-09 06:58:01'),(68,'12','9','ZZXS','2019-11-20',30,'2018-06-09 07:01:48');
/*!40000 ALTER TABLE `wm_receive_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_receives`
--

DROP TABLE IF EXISTS `wm_receives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_receives` (
  `receive_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_date` date DEFAULT NULL,
  `receive_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `people_user_id` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `delivery_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  PRIMARY KEY (`receive_id`) USING BTREE,
  KEY `wm_receives_fk0` (`people_user_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_receives`
--

LOCK TABLES `wm_receives` WRITE;
/*!40000 ALTER TABLE `wm_receives` DISABLE KEYS */;
INSERT INTO `wm_receives` VALUES (1,'2018-04-21','IN-0000001','1','2018-04-24 17:30:41','Y','N','20','2018-04-24'),(4,'2018-04-24','IN-00000001','1','2018-04-24 17:32:33','Y','N','wefwef','2018-04-24'),(5,'2018-04-24','IN-00000002','1','2018-06-09 06:51:00','Y','N','wevwevwevev','2018-04-24'),(6,'2018-04-25','IN-00000003','1','2018-04-25 05:52:41','Y','N','2202rgb','2018-04-25'),(7,'2018-05-13','IN-00000004','1','2018-05-20 15:32:04','Y','N','sdsdsdsdd','2018-05-13'),(8,'2018-05-29','IN-00000006','1','2018-05-28 21:25:56','Y','N','222222','2018-05-29'),(9,'2018-05-30','IN-00000007','1','2018-05-30 05:25:18','Y','N','1234','2018-05-30'),(10,'2018-05-30','IN-00000008','1','2018-05-30 06:22:05','Y','N','8/61','2018-05-30'),(11,'2018-06-09','IN-00000009','1','2018-06-09 06:58:01','N','N','sssss','2018-06-09'),(12,'2018-06-09','IN-00000010','1','2018-06-10 05:58:10','N','Y','xxzz','2018-06-09');
/*!40000 ALTER TABLE `wm_receives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_requisition_confirm_item`
--

DROP TABLE IF EXISTS `wm_requisition_confirm_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_requisition_confirm_item` (
  `confirm_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_order_id` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirm_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`confirm_item_id`) USING BTREE,
  UNIQUE KEY `dup` (`requisition_order_id`,`wm_product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_requisition_confirm_item`
--

LOCK TABLES `wm_requisition_confirm_item` WRITE;
/*!40000 ALTER TABLE `wm_requisition_confirm_item` DISABLE KEYS */;
INSERT INTO `wm_requisition_confirm_item` VALUES (1,1,'c4269752-5ebd-45c8-9a2a-ee196e78b697',2),(2,1,'e04efcb5-d61f-4f89-812f-56c94646e7f6',3),(3,4,'12',1),(4,4,'24',1),(5,4,'c4269752-5ebd-45c8-9a2a-ee196e78b697',7),(6,4,'e04efcb5-d61f-4f89-812f-56c94646e7f6',1),(7,3,'c4269752-5ebd-45c8-9a2a-ee196e78b697',1),(8,3,'44',1),(9,3,'12',1),(10,3,'e04efcb5-d61f-4f89-812f-56c94646e7f6',1),(11,3,'d7e49438-4e4a-4a02-8f9d-b5f5a064d734',1),(12,3,'640a3a77-5739-41b0-aa83-a6a94a7b98b5',1),(13,2,'c4269752-5ebd-45c8-9a2a-ee196e78b697',1),(14,2,'12',2),(15,5,'c4269752-5ebd-45c8-9a2a-ee196e78b697',20),(16,5,'fa72fda1-2fbf-4a31-8986-ffce268fac87',5),(17,7,'c4269752-5ebd-45c8-9a2a-ee196e78b697',3),(18,7,'12',4),(19,7,'d7e49438-4e4a-4a02-8f9d-b5f5a064d734',1),(20,7,'fa72fda1-2fbf-4a31-8986-ffce268fac87',20),(21,8,'c4269752-5ebd-45c8-9a2a-ee196e78b697',1),(22,8,'9ce1f639-3963-4f73-b234-121cf2af04a2',1),(23,8,'fa72fda1-2fbf-4a31-8986-ffce268fac87',1),(24,10,'42',1),(25,10,'75',3),(26,9,'fa72fda1-2fbf-4a31-8986-ffce268fac87',2);
/*!40000 ALTER TABLE `wm_requisition_confirm_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_requisition_order_items`
--

DROP TABLE IF EXISTS `wm_requisition_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_requisition_order_items` (
  `requisition_order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `requisition_qty` int(12) DEFAULT NULL,
  PRIMARY KEY (`requisition_order_item_id`) USING BTREE,
  KEY `wm_reqisition_order_items_fk0` (`requisition_order_id`) USING BTREE,
  KEY `wm_reqisition_order_items_fk1` (`product_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_requisition_order_items`
--

LOCK TABLES `wm_requisition_order_items` WRITE;
/*!40000 ALTER TABLE `wm_requisition_order_items` DISABLE KEYS */;
INSERT INTO `wm_requisition_order_items` VALUES (1,1,23,2),(2,2,23,11),(9,3,72,2),(5,4,23,2),(8,3,23,5),(13,5,164,5),(12,5,23,20),(17,6,164,1),(15,7,164,35),(16,7,23,12),(18,8,164,3),(19,8,23,2),(20,9,164,2),(21,10,69,1),(22,10,126,3),(24,11,108,5);
/*!40000 ALTER TABLE `wm_requisition_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_requisition_orders`
--

DROP TABLE IF EXISTS `wm_requisition_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_requisition_orders` (
  `requisition_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_code` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `requisition_date` date DEFAULT NULL,
  `wm_requisition` int(11) DEFAULT NULL,
  `wm_withdraw` int(11) DEFAULT NULL,
  `people_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_cancel` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `create_date` datetime DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `user_confirm_id` int(11) DEFAULT NULL,
  `is_approve` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`requisition_order_id`) USING BTREE,
  KEY `wm_reqisition_orders_fk0` (`wm_requisition`) USING BTREE,
  KEY `wm_reqisition_orders_fk1` (`wm_withdraw`) USING BTREE,
  KEY `wm_reqisition_orders_fk2` (`people_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_requisition_orders`
--

LOCK TABLES `wm_requisition_orders` WRITE;
/*!40000 ALTER TABLE `wm_requisition_orders` DISABLE KEYS */;
INSERT INTO `wm_requisition_orders` VALUES (1,'RQ-00000001','2018-05-22',2,1,'1','N','2018-05-23 07:19:03',NULL,NULL,NULL,'N'),(2,'RQ-00000002','2018-05-23',2,1,'1','N','2018-05-23 12:12:25','2018-05-23 14:15:23','2018-05-23 19:12:25',1,'Y'),(3,'RQ-00000003','2018-05-23',2,1,'1','N','2018-05-23 12:11:04','2018-05-23 14:17:07','2018-05-23 19:11:04',1,'Y'),(4,'RQ-00000004','2018-05-23',2,1,'1','N','2018-05-23 11:56:17','2018-05-23 14:18:36','2018-05-23 18:56:17',1,'Y'),(5,'RQ-00000005','2018-05-29',2,1,'1','N','2018-05-28 23:39:55','2018-05-29 06:33:23','2018-05-29 06:39:55',1,'Y'),(6,'RQ-00000006','2018-05-30',2,1,'2','Y','2018-06-10 14:59:38','2018-05-30 03:30:27',NULL,NULL,'N'),(7,'RQ-00000007','2018-05-30',2,1,'1','N','2018-05-30 05:35:32','2018-05-30 12:33:42','2018-05-30 12:35:32',1,'Y'),(8,'RQ-00000008','2018-05-30',2,1,'1','N','2018-05-30 06:36:48','2018-05-30 13:34:30','2018-05-30 13:36:48',1,'Y'),(9,'RQ-00000009','2018-05-30',2,1,'2','N','2018-06-05 06:49:39','2018-05-30 13:43:52','2018-06-05 13:49:39',1,'Y'),(10,'RQ-00000010','2018-06-05',2,1,'1','N','2018-06-05 06:47:46','2018-06-05 13:46:02','2018-06-05 13:47:46',1,'Y'),(11,'RQ-00000011','2018-06-12',2,1,'2','N','2018-06-12 02:48:22','2018-06-12 09:48:22',NULL,NULL,'N');
/*!40000 ALTER TABLE `wm_requisition_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_transection_issues`
--

DROP TABLE IF EXISTS `wm_transection_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_transection_issues` (
  `transection_id` int(11) NOT NULL AUTO_INCREMENT,
  `transection_name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`transection_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_transection_issues`
--

LOCK TABLES `wm_transection_issues` WRITE;
/*!40000 ALTER TABLE `wm_transection_issues` DISABLE KEYS */;
INSERT INTO `wm_transection_issues` VALUES (1,'เบิก','Y'),(2,'เสียหาย','Y'),(3,'หมดอายุ','Y');
/*!40000 ALTER TABLE `wm_transection_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm_warehouses`
--

DROP TABLE IF EXISTS `wm_warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wm_warehouses` (
  `warehouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`warehouse_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm_warehouses`
--

LOCK TABLES `wm_warehouses` WRITE;
/*!40000 ALTER TABLE `wm_warehouses` DISABLE KEYS */;
INSERT INTO `wm_warehouses` VALUES (1,'คลัง'),(2,'เคาว์เตอร์');
/*!40000 ALTER TABLE `wm_warehouses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-29 16:29:10
