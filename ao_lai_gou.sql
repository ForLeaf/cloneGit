/*
Navicat MySQL Data Transfer

Source Server         : MySql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : ao_lai_gou

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-05-15 11:32:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `classid` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`classid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1', '1701', 'lucy');
INSERT INTO `class` VALUES ('2', '1702', 'hum');
INSERT INTO `class` VALUES ('3', '1701', 'mai');

-- ----------------------------
-- Table structure for `goodslist`
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `elephone` varchar(20) NOT NULL,
  `guid` int(11) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float(20,0) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('13631421075', '2', 'http://localhost:999/git/src/img/list_page/Mgg001.JPG', '预售区 BALLY 巴利 新品男款B字头板扣腰带BBUCKLE35MTV6215056', '1699', '1');
INSERT INTO `goodslist` VALUES ('13631421075', '1', 'http://localhost:999/git/src/img/list_page/Cgg001.JPG', 'BURBERRY  å·´å®èŽ‰ æ–°å“ç”·æ¬¾çš®å¸¦4045393', '2900', '2');
INSERT INTO `goodslist` VALUES ('13631421075', '3', 'http://localhost:999/git/src/img/list_page/Ogg001.JPG', 'BALLY  å·´åˆ© æ–°å“ç”·æ¬¾è…°å¸¦BBUCKLE35MTV', '1399', '1');
INSERT INTO `goodslist` VALUES ('13631421075', '4', 'http://localhost:999/git/src/img/list_page/Tgg001.JPG', 'é¢„å”®åŒº  FERRAGAMO/è²æ‹‰æ ¼æ…• ç”·æ¬¾åŒå¸¦å¤´ç¤¼ç›’è£…ç‰›çš®çš®å¸¦679359 0622557', '2900', '1');

-- ----------------------------
-- Table structure for `register`
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `indexid` int(11) NOT NULL AUTO_INCREMENT,
  `elephone` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`indexid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register
-- ----------------------------
INSERT INTO `register` VALUES ('1', '13631421075', '123');
INSERT INTO `register` VALUES ('2', '12631421076', '123');
INSERT INTO `register` VALUES ('3', '13631421078', '123');
INSERT INTO `register` VALUES ('4', '13631421076', '123456');
INSERT INTO `register` VALUES ('5', '13631421111', '123456');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `indexid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`indexid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '136@163.com', '123');
INSERT INTO `student` VALUES ('2', '137@163.com', '123');
INSERT INTO `student` VALUES ('3', '  ', '  ');
