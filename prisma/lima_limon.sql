/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : lima_limon

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 19/05/2023 09:06:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categoria
-- ----------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of categoria
-- ----------------------------
INSERT INTO `categoria` VALUES (1, 'Difusor', 'Test', 1);
INSERT INTO `categoria` VALUES (5, 'Vela', 'xz', 1);
INSERT INTO `categoria` VALUES (6, 'ASSS', 'KL', 1);

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (3, 'Renzo', 'Deere', 1);
INSERT INTO `cliente` VALUES (4, 'Larisa', 'sa', 1);
INSERT INTO `cliente` VALUES (5, 'Rosa V', 'XXX', 1);
INSERT INTO `cliente` VALUES (6, 'Luis S', 'S', 0);
INSERT INTO `cliente` VALUES (9, 'XXX', 'XXX', 1);
INSERT INTO `cliente` VALUES (10, 'DDD', 'DDD', 1);
INSERT INTO `cliente` VALUES (11, 'FFF', 'FFF', 1);
INSERT INTO `cliente` VALUES (12, 'AAA', 'AAA', 1);
INSERT INTO `cliente` VALUES (13, 'CCC', 'CCC', 1);
INSERT INTO `cliente` VALUES (14, 'EEE', 'EEE', 0);
INSERT INTO `cliente` VALUES (15, 'BBB', 'BBB', 1);
INSERT INTO `cliente` VALUES (16, 'MMM', 'X', 1);
INSERT INTO `cliente` VALUES (17, 'YYY', 'Y', 1);
INSERT INTO `cliente` VALUES (18, 'AABB', 'AB', 1);

-- ----------------------------
-- Table structure for marca
-- ----------------------------
DROP TABLE IF EXISTS `marca`;
CREATE TABLE `marca`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of marca
-- ----------------------------
INSERT INTO `marca` VALUES (1, 'Marca', '1', 1);
INSERT INTO `marca` VALUES (4, 'DEswq', 'Test', 1);
INSERT INTO `marca` VALUES (5, 'MMMS', 'Sas', 1);

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `categoriaId` int(11) NOT NULL,
  `marcaId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Producto_marcaId_fkey`(`marcaId`) USING BTREE,
  INDEX `Producto_categoriaId_fkey`(`categoriaId`) USING BTREE,
  CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Producto_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marca` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, 'Producto 1', 'DS', 1, 1, 1);
INSERT INTO `producto` VALUES (7, 'Luis S', 'XXX', 1, 1, 1);
INSERT INTO `producto` VALUES (8, 'Renzo', 'XXX', 1, 1, 1);
INSERT INTO `producto` VALUES (9, 'Renzo s', 'XXX', 1, 1, 4);
INSERT INTO `producto` VALUES (10, 'Luis Sx', 'XS', 1, 6, 1);
INSERT INTO `producto` VALUES (11, 'Luis St', 'XS', 1, 1, 4);
INSERT INTO `producto` VALUES (12, 'Luis Sooo', '', 1, 6, 4);
INSERT INTO `producto` VALUES (13, 'Luis Sqqq', '', 1, 1, 4);
INSERT INTO `producto` VALUES (14, 'Renzo Gssss', '', 1, 6, 5);
INSERT INTO `producto` VALUES (15, 'RenzoSSSSSSSS', '', 1, 6, 5);
INSERT INTO `producto` VALUES (16, 'Luis Shhhhhhhh', '', 1, 5, 4);
INSERT INTO `producto` VALUES (17, 'Luis Sjjjjjjj', '', 1, 6, 1);
INSERT INTO `producto` VALUES (18, 'AAAA', 'd', 1, 6, 4);

-- ----------------------------
-- Table structure for proveedor
-- ----------------------------
DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of proveedor
-- ----------------------------
INSERT INTO `proveedor` VALUES (1, 'Al Prove', 'Por', 1);

-- ----------------------------
-- Table structure for venta
-- ----------------------------
DROP TABLE IF EXISTS `venta`;
CREATE TABLE `venta`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime(3) NULL DEFAULT CURRENT_TIMESTAMP,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `estado` tinyint(1) NULL DEFAULT 1,
  `clienteId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Venta_clienteId_fkey`(`clienteId`) USING BTREE,
  CONSTRAINT `Venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
