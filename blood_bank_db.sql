-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: blood_bank_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `blood_banks`
--

DROP TABLE IF EXISTS `blood_banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_banks` (
  `bank_id` int NOT NULL AUTO_INCREMENT,
  `bank_name` varchar(150) NOT NULL,
  `manager_name` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `address` text,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_banks`
--

LOCK TABLES `blood_banks` WRITE;
/*!40000 ALTER TABLE `blood_banks` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_inventory`
--

DROP TABLE IF EXISTS `blood_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `blood_group` varchar(5) DEFAULT NULL,
  `units_available` int DEFAULT '0',
  `expiry_date` date DEFAULT NULL,
  `bank_id` int DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `bank_id` (`bank_id`),
  CONSTRAINT `blood_inventory_ibfk_1` FOREIGN KEY (`bank_id`) REFERENCES `blood_banks` (`bank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_inventory`
--

LOCK TABLES `blood_inventory` WRITE;
/*!40000 ALTER TABLE `blood_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_issues`
--

DROP TABLE IF EXISTS `blood_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_issues` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(100) DEFAULT NULL,
  `hospital_name` varchar(100) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `units_issued` int DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `issued_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_issues`
--

LOCK TABLES `blood_issues` WRITE;
/*!40000 ALTER TABLE `blood_issues` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_requests`
--

DROP TABLE IF EXISTS `blood_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(100) DEFAULT NULL,
  `hospital_name` varchar(100) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `units_required` int DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `required_date` date DEFAULT NULL,
  `remarks` text,
  `status` enum('Pending','Approved','Rejected','Completed') DEFAULT 'Pending',
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_requests`
--

LOCK TABLES `blood_requests` WRITE;
/*!40000 ALTER TABLE `blood_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'keerthan varma','varmakeerthan9@outlook.com','BloodBank blood donation','Thank you so much for the blood in time','2026-07-03 10:32:00'),(2,'keerthan varma','varmakeerthan9@outlook.com','BloodBank blood donation','thankyou','2026-07-03 10:36:19');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donors`
--

DROP TABLE IF EXISTS `donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donors` (
  `donor_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` text,
  `last_donation` date DEFAULT NULL,
  PRIMARY KEY (`donor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donors`
--

LOCK TABLES `donors` WRITE;
/*!40000 ALTER TABLE `donors` DISABLE KEYS */;
/*!40000 ALTER TABLE `donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Donor','Hospital') DEFAULT 'Donor',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Keerthan Varma','keerthan@gmail.com','123456','Donor','2026-07-01 12:34:29'),(2,'keerthan varma','varmakeerthan9@outlook.com','Bangaladumpa05','Donor','2026-07-01 12:39:47'),(4,'keerthan varma','sugunayakama@gmail.com','Bangaladumpa05','Donor','2026-07-03 09:40:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-03 18:09:44
