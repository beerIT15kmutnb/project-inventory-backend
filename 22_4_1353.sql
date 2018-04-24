/*
 Navicat Premium Data Transfer

 Source Server         : project
 Source Server Type    : MySQL
 Source Server Version : 50051
 Source Host           : localhost:3306
 Source Schema         : project_inventory

 Target Server Type    : MySQL
 Target Server Version : 50051
 File Encoding         : 65001

 Date: 22/04/2018 15:48:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mm_generic_types
-- ----------------------------
DROP TABLE IF EXISTS `mm_generic_types`;
CREATE TABLE `mm_generic_types`  (
  `generic_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `generic_type_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`generic_type_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mm_generic_types
-- ----------------------------
INSERT INTO `mm_generic_types` VALUES (1, 'ยาเม็ดธรรมดา', 1);
INSERT INTO `mm_generic_types` VALUES (2, 'ยาน้ำ', 1);
INSERT INTO `mm_generic_types` VALUES (3, 'ยาปฎิชีวนะ', 1);
INSERT INTO `mm_generic_types` VALUES (4, 'ยาตา-หู', 1);
INSERT INTO `mm_generic_types` VALUES (5, 'ยาใช้ภายนอก', 1);
INSERT INTO `mm_generic_types` VALUES (6, 'เวชภัณฑ์', 1);
INSERT INTO `mm_generic_types` VALUES (7, 'อื่นๆ', 1);

-- ----------------------------
-- Table structure for mm_generics
-- ----------------------------
DROP TABLE IF EXISTS `mm_generics`;
CREATE TABLE `mm_generics`  (
  `generic_id` int(15) NOT NULL AUTO_INCREMENT,
  `generic_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `generic_type_id` int(11) NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `min_qty` int(11) NOT NULL,
  `max_qty` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `generic_code` bigint(20) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`generic_id`),
  INDEX `mm_generics_fk0` USING BTREE(`generic_type_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 149 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mm_generics
-- ----------------------------
INSERT INTO `mm_generics` VALUES (1, 'Antacil Tab / Alma Tab', 1, 1, 10, 100, '2018-04-19 23:05:07', 1);
INSERT INTO `mm_generics` VALUES (2, 'Abacus (Hydroxyzine) ix', 1, 1, 10, 100, '2018-04-19 23:05:07', 2);
INSERT INTO `mm_generics` VALUES (3, 'Buscopan', 1, 1, 10, 100, '2018-04-19 23:05:07', 3);
INSERT INTO `mm_generics` VALUES (4, 'Carbocysteine (Flemex)', 1, 1, 10, 100, '2018-04-19 23:05:07', 4);
INSERT INTO `mm_generics` VALUES (5, 'Bisacodyl 5 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 5);
INSERT INTO `mm_generics` VALUES (6, 'Ca -R - bon (Activated chalcoal)', 1, 1, 10, 100, '2018-04-19 23:05:07', 6);
INSERT INTO `mm_generics` VALUES (7, 'Cinnarizine 25 mg  ', 1, 1, 10, 100, '2018-04-19 23:05:07', 7);
INSERT INTO `mm_generics` VALUES (8, 'CPM', 1, 1, 10, 100, '2018-04-19 23:05:07', 8);
INSERT INTO `mm_generics` VALUES (9, 'Dextromethorphan 15 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 9);
INSERT INTO `mm_generics` VALUES (10, 'Diazepam 2 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 10);
INSERT INTO `mm_generics` VALUES (11, 'Diazepam 5 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 11);
INSERT INTO `mm_generics` VALUES (12, 'Diclofenac 25 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 12);
INSERT INTO `mm_generics` VALUES (13, 'Dimenhydrinate / Dramamine 50 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 13);
INSERT INTO `mm_generics` VALUES (14, 'Ibuprofen 400 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 14);
INSERT INTO `mm_generics` VALUES (15, 'Isordil 5 mg.', 1, 1, 10, 100, '2018-04-19 23:05:07', 15);
INSERT INTO `mm_generics` VALUES (16, 'Loperamide / Immodium', 1, 1, 10, 100, '2018-04-19 23:05:07', 16);
INSERT INTO `mm_generics` VALUES (17, 'Mednil / Mefennamic 500 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 17);
INSERT INTO `mm_generics` VALUES (18, 'Molax - M / Motilium 10 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 18);
INSERT INTO `mm_generics` VALUES (19, 'Myoxan (tolpelisone)', 1, 1, 10, 100, '2018-04-19 23:05:07', 19);
INSERT INTO `mm_generics` VALUES (20, 'Norgesic(Myoflex)', 1, 1, 10, 100, '2018-04-19 23:05:07', 20);
INSERT INTO `mm_generics` VALUES (21, 'Nasolin', 1, 1, 10, 100, '2018-04-19 23:05:07', 21);
INSERT INTO `mm_generics` VALUES (22, 'Omeplazole (1 Bx. = 10x10 cap)', 1, 1, 10, 100, '2018-04-19 23:05:07', 22);
INSERT INTO `mm_generics` VALUES (23, 'Paracetamal 500 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 23);
INSERT INTO `mm_generics` VALUES (24, 'Prednisolone 5 mg', 1, 1, 10, 100, '2018-04-19 23:05:07', 24);
INSERT INTO `mm_generics` VALUES (25, 'salbutamol 2 mg.', 1, 1, 10, 100, '2018-04-19 23:05:07', 25);
INSERT INTO `mm_generics` VALUES (26, 'Simethicone 80 mg / Blow - x', 1, 1, 10, 100, '2018-04-19 23:05:07', 26);
INSERT INTO `mm_generics` VALUES (27, 'Throatsil', 1, 1, 10, 100, '2018-04-19 23:05:07', 27);
INSERT INTO `mm_generics` VALUES (28, 'Tofago (cafergot)', 1, 1, 10, 100, '2018-04-19 23:05:07', 28);
INSERT INTO `mm_generics` VALUES (29, 'Vitamin B 1-6-12', 1, 1, 10, 100, '2018-04-19 23:05:07', 29);
INSERT INTO `mm_generics` VALUES (30, 'Vitamin B Complex', 1, 1, 10, 100, '2018-04-19 23:05:07', 30);
INSERT INTO `mm_generics` VALUES (31, 'Vitamin B2', 1, 1, 10, 100, '2018-04-19 23:05:07', 31);
INSERT INTO `mm_generics` VALUES (32, 'Vitamin lili MTV,', 1, 1, 10, 100, '2018-04-19 23:05:07', 32);
INSERT INTO `mm_generics` VALUES (33, 'Vitamin C 100 mg.', 1, 1, 10, 100, '2018-04-19 23:05:07', 33);
INSERT INTO `mm_generics` VALUES (34, 'Vitamin C 500 mg.', 1, 1, 10, 100, '2018-04-19 23:05:07', 34);
INSERT INTO `mm_generics` VALUES (35, 'Viclovia (Acyclovir 200 mg)', 1, 1, 10, 100, '2018-04-19 23:05:07', 35);
INSERT INTO `mm_generics` VALUES (36, 'Zyrtec', 1, 1, 10, 100, '2018-04-19 23:05:07', 36);
INSERT INTO `mm_generics` VALUES (37, 'ยาอมมะแว้ง รสบ๊วย', 1, 1, 10, 100, '2018-04-19 23:05:07', 37);
INSERT INTO `mm_generics` VALUES (38, 'ขมิ้นชัน แคปซูล', 1, 1, 10, 100, '2018-04-19 23:05:07', 38);
INSERT INTO `mm_generics` VALUES (39, 'ฟ้าทลายโจร แคปซูล', 1, 1, 10, 100, '2018-04-19 23:05:07', 39);
INSERT INTO `mm_generics` VALUES (40, 'Antasil Gel 240 ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 40);
INSERT INTO `mm_generics` VALUES (41, 'M - carminative    240 Ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 41);
INSERT INTO `mm_generics` VALUES (42, 'ORS', 2, 1, 10, 100, '2018-04-19 23:05:07', 42);
INSERT INTO `mm_generics` VALUES (43, 'Milk of magnesia 240 Ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 43);
INSERT INTO `mm_generics` VALUES (44, 'Mysolven (Acetylcysteine) sachet 100 mg.', 2, 1, 10, 100, '2018-04-19 23:05:07', 44);
INSERT INTO `mm_generics` VALUES (45, 'M.tussis (small) 60 ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 45);
INSERT INTO `mm_generics` VALUES (46, 'ยาธาตุน้ำขาว 50 Ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 46);
INSERT INTO `mm_generics` VALUES (47, 'น้ำยาบ้วนปาก 250 ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 47);
INSERT INTO `mm_generics` VALUES (48, 'ยาแก้ไอมะขามป้อม 50 Ml.', 2, 1, 10, 100, '2018-04-19 23:05:07', 48);
INSERT INTO `mm_generics` VALUES (49, 'Amoxycillin ( 500 mg )', 3, 1, 10, 100, '2018-04-19 23:05:07', 49);
INSERT INTO `mm_generics` VALUES (50, 'Dicloxacillin ( 500 mg )', 3, 1, 10, 100, '2018-04-19 23:05:07', 50);
INSERT INTO `mm_generics` VALUES (51, 'Erythromycin ( 250 mg )', 3, 1, 10, 100, '2018-04-19 23:05:07', 51);
INSERT INTO `mm_generics` VALUES (52, 'Norfloxacin ( 400 mg )', 3, 1, 10, 100, '2018-04-19 23:05:07', 52);
INSERT INTO `mm_generics` VALUES (53, 'Roxithromycin  ( 150 mg )', 3, 1, 10, 100, '2018-04-19 23:05:07', 53);
INSERT INTO `mm_generics` VALUES (54, 'Chloramphenical Eye drop  5 ml.', 4, 1, 10, 100, '2018-04-19 23:05:07', 54);
INSERT INTO `mm_generics` VALUES (55, 'Chloramphenical  Eye ointment', 4, 1, 10, 100, '2018-04-19 23:05:07', 55);
INSERT INTO `mm_generics` VALUES (56, 'Eyedex Eye - Ear drop ( Dexa+neomycin)', 4, 1, 10, 100, '2018-04-19 23:05:07', 56);
INSERT INTO `mm_generics` VALUES (57, 'Opsil - A (for allergic eye) 5 ml.', 4, 1, 10, 100, '2018-04-19 23:05:07', 57);
INSERT INTO `mm_generics` VALUES (58, 'Poly oph (Antibiotic)', 4, 1, 10, 100, '2018-04-19 23:05:07', 58);
INSERT INTO `mm_generics` VALUES (59, 'น้ำตาเทียม 5 ml', 4, 1, 10, 100, '2018-04-19 23:05:07', 59);
INSERT INTO `mm_generics` VALUES (60, 'น้ำตาเทียม10 ml', 4, 1, 10, 100, '2018-04-19 23:05:07', 60);
INSERT INTO `mm_generics` VALUES (61, 'น้ำยาล้างตา 120 ml.', 5, 1, 10, 100, '2018-04-19 23:05:07', 61);
INSERT INTO `mm_generics` VALUES (62, 'Betamethasone cream 5 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 62);
INSERT INTO `mm_generics` VALUES (63, 'Betamethasone c Neomycin  5 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 63);
INSERT INTO `mm_generics` VALUES (64, 'Betadine  ointment 50 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 64);
INSERT INTO `mm_generics` VALUES (65, 'Clotrimazone cream 15 กรัม', 5, 1, 10, 100, '2018-04-19 23:05:07', 65);
INSERT INTO `mm_generics` VALUES (66, 'Flamazine cream  450 กรัม', 5, 1, 10, 100, '2018-04-19 23:05:07', 66);
INSERT INTO `mm_generics` VALUES (67, 'Kanolone', 5, 1, 10, 100, '2018-04-19 23:05:07', 67);
INSERT INTO `mm_generics` VALUES (68, 'MD-cream  ', 5, 1, 10, 100, '2018-04-19 23:05:07', 68);
INSERT INTO `mm_generics` VALUES (69, 'calamine lotion 60 ml.', 5, 1, 10, 100, '2018-04-19 23:05:07', 69);
INSERT INTO `mm_generics` VALUES (70, 'Neotiga balm 30 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 70);
INSERT INTO `mm_generics` VALUES (71, 'Neotiga balm 100 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 71);
INSERT INTO `mm_generics` VALUES (72, 'Piroxil Gel  100 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 72);
INSERT INTO `mm_generics` VALUES (73, 'Reparil Gel  40 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 73);
INSERT INTO `mm_generics` VALUES (74, 'TA 0.1 %  5 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 74);
INSERT INTO `mm_generics` VALUES (75, 'TA 0.02 % 5 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 75);
INSERT INTO `mm_generics` VALUES (76, 'Virogon (Acyclovir cream)', 5, 1, 10, 100, '2018-04-19 23:05:07', 76);
INSERT INTO `mm_generics` VALUES (77, 'Alcohol 70 %  450 ml.', 5, 1, 10, 100, '2018-04-19 23:05:07', 77);
INSERT INTO `mm_generics` VALUES (78, 'Ammonia    15 ml.', 5, 1, 10, 100, '2018-04-19 23:05:07', 78);
INSERT INTO `mm_generics` VALUES (79, 'Betadine 15 ml. 1 x 12 Bt.', 5, 1, 10, 100, '2018-04-19 23:05:07', 79);
INSERT INTO `mm_generics` VALUES (80, 'Betadine 450 ml.', 5, 1, 10, 100, '2018-04-19 23:05:07', 80);
INSERT INTO `mm_generics` VALUES (81, 'Nss 0.9 % 1,000 cc.', 5, 1, 10, 100, '2018-04-19 23:05:07', 81);
INSERT INTO `mm_generics` VALUES (82, 'เจลว่านหางจระเข้', 5, 1, 10, 100, '2018-04-19 23:05:07', 82);
INSERT INTO `mm_generics` VALUES (83, 'ethyly chloride (สเปรย์ยาชา)', 5, 1, 10, 100, '2018-04-19 23:05:07', 83);
INSERT INTO `mm_generics` VALUES (84, 'ยาดม (พีเป๊กซ์)', 5, 1, 10, 100, '2018-04-19 23:05:07', 84);
INSERT INTO `mm_generics` VALUES (85, 'ยาหม่อง 15 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 85);
INSERT INTO `mm_generics` VALUES (86, 'มิวโพรีน หลอด 5 gm.', 5, 1, 10, 100, '2018-04-19 23:05:07', 86);
INSERT INTO `mm_generics` VALUES (87, 'สเปร์ย Elmatacin', 5, 1, 10, 100, '2018-04-19 23:05:07', 87);
INSERT INTO `mm_generics` VALUES (88, 'Sterile water for Irrigation 1,000 ml.ขวดพลาสติค', 5, 1, 10, 100, '2018-04-19 23:05:07', 88);
INSERT INTO `mm_generics` VALUES (89, 'Betadine scrub 500 cc.', 5, 1, 10, 100, '2018-04-19 23:05:07', 89);
INSERT INTO `mm_generics` VALUES (90, 'Tony lotion (TA 0.1 %  ชนิดน้ำ)', 5, 1, 10, 100, '2018-04-20 23:58:23', 90);
INSERT INTO `mm_generics` VALUES (91, 'Arm  Sling', 6, 1, 10, 100, '2018-04-19 23:05:07', 91);
INSERT INTO `mm_generics` VALUES (92, 'Elastic  Bandage 2 ”', 6, 1, 10, 100, '2018-04-19 23:05:07', 92);
INSERT INTO `mm_generics` VALUES (93, 'Elastic  Bandage 3 ”', 6, 1, 10, 100, '2018-04-19 23:05:07', 93);
INSERT INTO `mm_generics` VALUES (94, 'Elastic  Bandage 4 ”', 6, 1, 10, 100, '2018-04-19 23:05:07', 94);
INSERT INTO `mm_generics` VALUES (95, 'Eye Pad', 6, 1, 10, 100, '2018-04-19 23:05:07', 95);
INSERT INTO `mm_generics` VALUES (96, 'Gauze drain', 6, 1, 10, 100, '2018-04-19 23:05:07', 96);
INSERT INTO `mm_generics` VALUES (97, 'Gauze 2x2', 6, 1, 10, 100, '2018-04-19 23:05:07', 97);
INSERT INTO `mm_generics` VALUES (98, 'Gauze 3x3', 6, 1, 10, 100, '2018-04-19 23:05:07', 98);
INSERT INTO `mm_generics` VALUES (99, 'Gauze 4x4', 6, 1, 10, 100, '2018-04-19 23:05:07', 99);
INSERT INTO `mm_generics` VALUES (100, 'Grove (ถุงมือ) ขนาด S', 6, 1, 10, 100, '2018-04-19 23:05:07', 100);
INSERT INTO `mm_generics` VALUES (101, 'Grove (ถุงมือ) ขนาด M', 6, 1, 10, 100, '2018-04-19 23:05:07', 101);
INSERT INTO `mm_generics` VALUES (102, 'Grove (ถุงมือ) ขนาด L', 6, 1, 10, 100, '2018-04-19 23:05:07', 102);
INSERT INTO `mm_generics` VALUES (103, 'Hot - Cold pack', 6, 1, 10, 100, '2018-04-19 23:05:07', 103);
INSERT INTO `mm_generics` VALUES (104, 'Micropore 1\"', 6, 1, 10, 100, '2018-04-19 23:05:07', 104);
INSERT INTO `mm_generics` VALUES (105, 'Micropore 0.5\"', 6, 1, 10, 100, '2018-04-19 23:05:07', 105);
INSERT INTO `mm_generics` VALUES (106, 'Neobun - Gel แผ่นแปะบรรเทาปวด', 6, 1, 10, 100, '2018-04-19 23:05:07', 106);
INSERT INTO `mm_generics` VALUES (107, 'Neotape 1 \"', 6, 1, 10, 100, '2018-04-19 23:05:07', 107);
INSERT INTO `mm_generics` VALUES (108, 'Neotape 2 \"', 6, 1, 10, 100, '2018-04-19 23:05:07', 108);
INSERT INTO `mm_generics` VALUES (109, 'sofra tullae/Bactigras', 6, 1, 10, 100, '2018-04-19 23:05:07', 109);
INSERT INTO `mm_generics` VALUES (110, 'swab (ไม้พันสำลี) ขนาด S       ', 6, 1, 10, 100, '2018-04-19 23:05:07', 110);
INSERT INTO `mm_generics` VALUES (111, 'swab ขนาด M                     ', 6, 1, 10, 100, '2018-04-19 23:05:07', 111);
INSERT INTO `mm_generics` VALUES (112, 'swab ขนาด L                        ', 6, 1, 10, 100, '2018-04-19 23:05:07', 112);
INSERT INTO `mm_generics` VALUES (113, 'Soft  Collar', 6, 1, 10, 100, '2018-04-19 23:05:07', 113);
INSERT INTO `mm_generics` VALUES (114, 'Sterile strip', 6, 1, 10, 100, '2018-04-19 23:05:07', 114);
INSERT INTO `mm_generics` VALUES (115, 'Tensoplast (สีน้ำตาล)', 6, 1, 10, 100, '2018-04-19 23:05:07', 115);
INSERT INTO `mm_generics` VALUES (116, 'Tensoplastic', 6, 1, 10, 100, '2018-04-19 23:05:07', 116);
INSERT INTO `mm_generics` VALUES (117, 'Transpore 1\"', 6, 1, 10, 100, '2018-04-19 23:05:07', 117);
INSERT INTO `mm_generics` VALUES (118, 'Transpore 0.5\"', 6, 1, 10, 100, '2018-04-19 23:05:07', 118);
INSERT INTO `mm_generics` VALUES (119, 'Tensofix ขนาด 5.0', 6, 1, 10, 100, '2018-04-19 23:05:07', 119);
INSERT INTO `mm_generics` VALUES (120, 'Tensofix ขนาด 7.5', 6, 1, 10, 100, '2018-04-19 23:05:07', 120);
INSERT INTO `mm_generics` VALUES (121, 'Tensofix ขนาด 10.0', 6, 1, 10, 100, '2018-04-19 23:05:07', 121);
INSERT INTO `mm_generics` VALUES (122, 'สำลีก้อน ', 6, 1, 10, 100, '2018-04-19 23:05:07', 122);
INSERT INTO `mm_generics` VALUES (123, 'ไม้กดลิ้น แบบแยกชิ้น', 6, 1, 10, 100, '2018-04-19 23:05:07', 123);
INSERT INTO `mm_generics` VALUES (124, 'ถ้วยล้างตา', 6, 1, 10, 100, '2018-04-19 23:05:07', 124);
INSERT INTO `mm_generics` VALUES (125, 'ตลับยา 5 gm.', 6, 1, 10, 100, '2018-04-19 23:05:07', 125);
INSERT INTO `mm_generics` VALUES (126, 'Blade No. 11 ', 6, 1, 10, 100, '2018-04-19 23:05:07', 126);
INSERT INTO `mm_generics` VALUES (127, 'Set ล้างแผล', 6, 1, 10, 100, '2018-04-19 23:05:07', 127);
INSERT INTO `mm_generics` VALUES (128, 'mask (ผ้าปิดจมูกแบบใช้แล้วทิ้ง)', 6, 1, 10, 100, '2018-04-19 23:05:07', 128);
INSERT INTO `mm_generics` VALUES (129, 'Easifix cohesive 2.5 cm x 4 M.', 6, 1, 10, 100, '2018-04-19 23:05:07', 129);
INSERT INTO `mm_generics` VALUES (130, 'Fixomull stretch  10 cm x 10 M.', 7, 1, 10, 100, '2018-04-19 23:05:07', 130);
INSERT INTO `mm_generics` VALUES (131, 'Inhibac Hospital Concentread 1 ลิตร', 7, 1, 10, 100, '2018-04-19 23:05:07', 131);
INSERT INTO `mm_generics` VALUES (132, 'แอลกอฮอล์ เจลล้างมือ แบบขวดปั้ม', 7, 1, 10, 100, '2018-04-19 23:05:07', 132);
INSERT INTO `mm_generics` VALUES (133, 'ซองซิปสั่งพิมพ์ # 7x10 Cm. (สีฟ้า)', 7, 1, 10, 100, '2018-04-19 23:05:07', 133);
INSERT INTO `mm_generics` VALUES (134, 'ซองซิปสั่งพิมพ์ # 9x12 Cm. (สีฟ้า)', 7, 1, 10, 100, '2018-04-19 23:05:07', 134);
INSERT INTO `mm_generics` VALUES (135, 'กระบอกฉีดยา  3 ML.', 7, 1, 10, 100, '2018-04-19 23:05:07', 135);
INSERT INTO `mm_generics` VALUES (136, 'กระบอกฉีดยา  5 ML.', 7, 1, 10, 100, '2018-04-19 23:05:07', 136);
INSERT INTO `mm_generics` VALUES (137, 'กระบอกฉีดยา  10 ML.', 7, 1, 10, 100, '2018-04-19 23:05:07', 137);
INSERT INTO `mm_generics` VALUES (138, 'set IV', 7, 1, 10, 100, '2018-04-19 23:05:07', 138);
INSERT INTO `mm_generics` VALUES (139, 'น้ำเกลือให้ทางหลอดเลือดดำ', 7, 1, 10, 100, '2018-04-19 23:05:07', 139);
INSERT INTO `mm_generics` VALUES (140, 'NSS 500 ml.', 7, 1, 10, 100, '2018-04-19 23:05:07', 140);
INSERT INTO `mm_generics` VALUES (141, 'LRS 500 ml.', 7, 1, 10, 100, '2018-04-19 23:05:07', 141);
INSERT INTO `mm_generics` VALUES (142, '5%D/2 500 ml.', 7, 1, 10, 100, '2018-04-19 23:05:07', 142);
INSERT INTO `mm_generics` VALUES (143, 'ถ้วยสำหรับใส่ยารับประทานแบบพลาสติค 30 ml.', 7, 1, 10, 100, '2018-04-20 23:47:48', 143);
INSERT INTO `mm_generics` VALUES (144, 'Ventolin', 1, 1, 10, 100, '2018-04-20 23:47:53', 144);
INSERT INTO `mm_generics` VALUES (145, 'NSS 100 cc', 5, 1, 10, 100, '2018-04-20 23:58:47', 145);
INSERT INTO `mm_generics` VALUES (146, 'TA 0.1% 15 gm', 5, 1, 10, 100, '2018-04-20 23:58:47', 146);
INSERT INTO `mm_generics` VALUES (147, 'เข็มฉีดยา no.25', 7, 1, 10, 100, '2018-04-21 00:11:48', 147);
INSERT INTO `mm_generics` VALUES (148, 'เข็มฉีดยา no.18', 7, 1, 10, 100, '2018-04-21 00:11:48', 148);

-- ----------------------------
-- Table structure for mm_products
-- ----------------------------
DROP TABLE IF EXISTS `mm_products`;
CREATE TABLE `mm_products`  (
  `product_id` int(15) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `generic_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_code` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `small_unit_id` int(11) DEFAULT NULL,
  `large_unit_id` int(11) DEFAULT NULL,
  `small_qty` int(6) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`product_id`),
  INDEX `mm_products_fk0` USING BTREE(`generic_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 163 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mm_products
-- ----------------------------
INSERT INTO `mm_products` VALUES (1, 'Antacil Tab / Alma Tab', '1', 1, '2018-04-21 18:08:36', '1', 1, 1, 1);
INSERT INTO `mm_products` VALUES (2, 'Abacus (Hydroxyzine) ix', '2', 1, '2018-04-21 18:08:36', '2', 2, 2, 1);
INSERT INTO `mm_products` VALUES (3, 'Buscopan', '3', 1, '2018-04-21 18:08:36', '3', 12, 12, 1);
INSERT INTO `mm_products` VALUES (4, 'Carbocysteine (Flemex)', '4', 1, '2018-04-21 18:08:36', '4', 12, 12, 1);
INSERT INTO `mm_products` VALUES (5, 'Bisacodyl 5 mg', '5', 1, '2018-04-21 18:08:36', '5', 12, 12, 1);
INSERT INTO `mm_products` VALUES (6, 'Ca -R - bon (Activated chalcoal)', '6', 1, '2018-04-21 18:08:36', '6', 1, 1, 1);
INSERT INTO `mm_products` VALUES (7, 'Cinnarizine 25 mg  ', '7', 1, '2018-04-21 18:08:36', '7', 1, 1, 1);
INSERT INTO `mm_products` VALUES (8, 'CPM', '8', 1, '2018-04-21 18:08:36', '8', 12, 12, 1);
INSERT INTO `mm_products` VALUES (9, 'Dextromethorphan 15 mg', '9', 1, '2018-04-21 18:08:36', '9', 12, 12, 1);
INSERT INTO `mm_products` VALUES (10, 'Diazepam 2 mg', '10', 1, '2018-04-21 18:08:36', '10', 12, 12, 1);
INSERT INTO `mm_products` VALUES (11, 'Diazepam 5 mg', '11', 1, '2018-04-21 18:08:36', '11', 2, 2, 1);
INSERT INTO `mm_products` VALUES (12, 'Diclofenac 25 mg', '12', 1, '2018-04-21 18:08:36', '12', 1, 1, 1);
INSERT INTO `mm_products` VALUES (13, 'Dimenhydrinate / Dramamine 50 mg', '13', 1, '2018-04-21 18:08:36', '13', 2, 2, 1);
INSERT INTO `mm_products` VALUES (14, 'Ibuprofen 400 mg', '14', 1, '2018-04-21 18:08:36', '14', 12, 12, 1);
INSERT INTO `mm_products` VALUES (15, 'Isordil 5 mg.', '15', 1, '2018-04-21 18:08:36', '15', 12, 12, 1);
INSERT INTO `mm_products` VALUES (16, 'Loperamide / Immodium', '16', 1, '2018-04-21 18:08:36', '16', 12, 12, 1);
INSERT INTO `mm_products` VALUES (17, 'Mednil / Mefennamic 500 mg', '17', 1, '2018-04-21 18:08:36', '17', 1, 1, 1);
INSERT INTO `mm_products` VALUES (18, 'Molax - M / Motilium 10 mg', '18', 1, '2018-04-21 18:08:36', '18', 12, 12, 1);
INSERT INTO `mm_products` VALUES (19, 'Myoxan (tolpelisone)', '19', 1, '2018-04-21 18:08:36', '19', 12, 12, 1);
INSERT INTO `mm_products` VALUES (20, 'Norgesic(Myoflex)', '20', 1, '2018-04-21 18:08:36', '20', 1, 1, 1);
INSERT INTO `mm_products` VALUES (21, 'Nasolin', '21', 1, '2018-04-21 18:08:36', '21', 1, 1, 1);
INSERT INTO `mm_products` VALUES (22, 'Omeplazole (1 Bx. = 10x10 cap)', '22', 1, '2018-04-21 18:08:36', '22', 1, 1, 1);
INSERT INTO `mm_products` VALUES (23, 'Paracetamal 500 mg', '23', 1, '2018-04-21 18:08:36', '23', 1, 1, 1);
INSERT INTO `mm_products` VALUES (24, 'Prednisolone 5 mg', '24', 1, '2018-04-21 18:08:36', '24', 2, 2, 1);
INSERT INTO `mm_products` VALUES (25, 'salbutamol 2 mg.', '25', 1, '2018-04-21 18:08:36', '25', 12, 12, 1);
INSERT INTO `mm_products` VALUES (26, 'Simethicone 80 mg / Blow - x', '26', 1, '2018-04-21 18:08:36', '26', 1, 1, 1);
INSERT INTO `mm_products` VALUES (27, 'Throatsil', '27', 1, '2018-04-21 18:08:36', '27', 12, 12, 1);
INSERT INTO `mm_products` VALUES (28, 'Tofago (cafergot)', '28', 1, '2018-04-21 18:08:36', '28', 12, 12, 1);
INSERT INTO `mm_products` VALUES (29, 'Vitamin B 1-6-12', '29', 1, '2018-04-21 18:08:36', '29', 12, 12, 1);
INSERT INTO `mm_products` VALUES (30, 'Vitamin B Complex', '30', 1, '2018-04-21 18:08:36', '30', 2, 2, 1);
INSERT INTO `mm_products` VALUES (31, 'Vitamin B2', '31', 1, '2018-04-21 18:08:36', '31', 2, 2, 1);
INSERT INTO `mm_products` VALUES (32, 'Vitamin lili MTV,', '32', 1, '2018-04-21 18:08:36', '32', 2, 2, 1);
INSERT INTO `mm_products` VALUES (33, 'Vitamin C 100 mg.', '33', 1, '2018-04-21 18:08:36', '33', 1, 1, 1);
INSERT INTO `mm_products` VALUES (34, 'Vitamin C 500 mg.', '34', 1, '2018-04-21 18:08:36', '34', 3, 3, 1);
INSERT INTO `mm_products` VALUES (35, 'Viclovia (Acyclovir 200 mg)', '35', 1, '2018-04-21 18:08:36', '35', 12, 12, 1);
INSERT INTO `mm_products` VALUES (36, 'Zyrtec', '36', 1, '2018-04-21 18:08:36', '36', 12, 12, 1);
INSERT INTO `mm_products` VALUES (37, 'ยาอมมะแว้ง รสบ๊วย', '37', 1, '2018-04-21 18:08:36', '37', 1, 1, 1);
INSERT INTO `mm_products` VALUES (38, 'ขมิ้นชัน แคปซูล', '38', 1, '2018-04-21 18:08:36', '38', 1, 1, 1);
INSERT INTO `mm_products` VALUES (39, 'ฟ้าทลายโจร แคปซูล', '39', 1, '2018-04-21 18:08:36', '39', 1, 1, 1);
INSERT INTO `mm_products` VALUES (40, 'Antasil Gel 240 ml.', '40', 1, '2018-04-21 18:08:36', '40', 4, 4, 1);
INSERT INTO `mm_products` VALUES (41, 'M - carminative    240 Ml.', '41', 1, '2018-04-21 18:08:36', '41', 3, 3, 1);
INSERT INTO `mm_products` VALUES (42, 'ORS', '42', 1, '2018-04-21 18:08:36', '42', 12, 12, 1);
INSERT INTO `mm_products` VALUES (43, 'Milk of magnesia 240 Ml.', '43', 1, '2018-04-21 18:08:36', '43', 1, 1, 1);
INSERT INTO `mm_products` VALUES (44, 'Mysolven (Acetylcysteine) sachet 100 mg.', '44', 1, '2018-04-21 18:08:36', '44', 1, 1, 1);
INSERT INTO `mm_products` VALUES (45, 'M.tussis (small) 60 ml.', '45', 1, '2018-04-21 18:08:36', '45', 3, 3, 1);
INSERT INTO `mm_products` VALUES (46, 'ยาธาตุน้ำขาว 50 Ml.', '46', 1, '2018-04-21 18:08:36', '46', 4, 4, 1);
INSERT INTO `mm_products` VALUES (47, 'น้ำยาบ้วนปาก 250 ml.', '47', 1, '2018-04-21 18:08:36', '47', 12, 12, 1);
INSERT INTO `mm_products` VALUES (48, 'ยาแก้ไอมะขามป้อม 50 Ml.', '48', 1, '2018-04-21 18:08:36', '48', 5, 5, 1);
INSERT INTO `mm_products` VALUES (49, 'Amoxycillin ( 500 mg )', '49', 1, '2018-04-21 18:08:36', '49', 1, 1, 1);
INSERT INTO `mm_products` VALUES (50, 'Dicloxacillin ( 500 mg )', '50', 1, '2018-04-21 18:08:36', '50', 1, 1, 1);
INSERT INTO `mm_products` VALUES (51, 'Erythromycin ( 250 mg )', '51', 1, '2018-04-21 18:08:36', '51', 12, 12, 1);
INSERT INTO `mm_products` VALUES (52, 'Norfloxacin ( 400 mg )', '52', 1, '2018-04-21 18:08:36', '52', 1, 1, 1);
INSERT INTO `mm_products` VALUES (53, 'Roxithromycin  ( 150 mg )', '53', 1, '2018-04-21 18:08:36', '53', 1, 1, 1);
INSERT INTO `mm_products` VALUES (54, 'Chloramphenical Eye drop  5 ml.', '54', 1, '2018-04-21 18:08:36', '54', 12, 12, 1);
INSERT INTO `mm_products` VALUES (55, 'Chloramphenical  Eye ointment', '55', 1, '2018-04-21 18:08:36', '55', 1, 1, 1);
INSERT INTO `mm_products` VALUES (56, 'Eyedex Eye - Ear drop ( Dexa+neomycin)', '56', 1, '2018-04-21 18:08:36', '56', 1, 1, 1);
INSERT INTO `mm_products` VALUES (57, 'Opsil - A (for allergic eye) 5 ml.', '57', 1, '2018-04-21 18:08:36', '57', 12, 12, 1);
INSERT INTO `mm_products` VALUES (58, 'Poly oph (Antibiotic)', '58', 1, '2018-04-21 18:08:36', '58', 1, 1, 1);
INSERT INTO `mm_products` VALUES (59, 'น้ำตาเทียม 5 ml', '59', 1, '2018-04-21 18:08:36', '59', 12, 12, 1);
INSERT INTO `mm_products` VALUES (60, 'น้ำตาเทียม10 ml', '60', 1, '2018-04-21 18:08:36', '60', 12, 12, 1);
INSERT INTO `mm_products` VALUES (61, 'น้ำยาล้างตา 120 ml.', '61', 1, '2018-04-21 18:08:36', '61', 4, 4, 1);
INSERT INTO `mm_products` VALUES (62, 'Betamethasone cream 5 gm.', '62', 1, '2018-04-21 18:08:36', '62', 12, 12, 1);
INSERT INTO `mm_products` VALUES (63, 'Betamethasone c Neomycin  5 gm.', '63', 1, '2018-04-21 18:08:36', '63', 6, 6, 1);
INSERT INTO `mm_products` VALUES (64, 'Betadine  ointment 50 gm.', '64', 1, '2018-04-21 18:08:36', '64', 2, 2, 1);
INSERT INTO `mm_products` VALUES (65, 'Clotrimazone cream 15 กรัม', '65', 1, '2018-04-21 18:08:36', '65', 12, 12, 1);
INSERT INTO `mm_products` VALUES (66, 'Flamazine cream  450 กรัม', '66', 1, '2018-04-21 18:08:36', '66', 12, 12, 1);
INSERT INTO `mm_products` VALUES (67, 'Kanolone', '67', 1, '2018-04-21 18:08:36', '67', 1, 1, 1);
INSERT INTO `mm_products` VALUES (68, 'MD-cream  ', '68', 1, '2018-04-21 18:08:36', '68', 4, 4, 1);
INSERT INTO `mm_products` VALUES (69, 'calamine lotion 60 ml.', '69', 1, '2018-04-21 18:08:36', '69', 4, 4, 1);
INSERT INTO `mm_products` VALUES (70, 'Neotiga balm 30 gm.', '70', 1, '2018-04-21 18:08:36', '70', 4, 4, 1);
INSERT INTO `mm_products` VALUES (71, 'Neotiga balm 100 gm.', '71', 1, '2018-04-21 18:08:36', '71', 4, 4, 1);
INSERT INTO `mm_products` VALUES (72, 'Piroxil Gel  100 gm.', '72', 1, '2018-04-21 18:08:36', '72', 4, 4, 1);
INSERT INTO `mm_products` VALUES (73, 'Reparil Gel  40 gm.', '73', 1, '2018-04-21 18:08:36', '73', 12, 12, 1);
INSERT INTO `mm_products` VALUES (74, 'TA 0.1 %  5 gm.', '74', 1, '2018-04-21 18:08:36', '74', 12, 12, 1);
INSERT INTO `mm_products` VALUES (75, 'TA 0.02 % 5 gm.', '75', 1, '2018-04-21 18:08:36', '75', 6, 6, 1);
INSERT INTO `mm_products` VALUES (76, 'Virogon (Acyclovir cream)', '76', 1, '2018-04-21 18:08:36', '76', 4, 4, 1);
INSERT INTO `mm_products` VALUES (77, 'Alcohol 70 %  450 ml.', '77', 1, '2018-04-21 18:08:36', '77', 3, 3, 1);
INSERT INTO `mm_products` VALUES (78, 'Ammonia    15 ml.', '78', 1, '2018-04-21 18:08:36', '78', 1, 1, 1);
INSERT INTO `mm_products` VALUES (79, 'Betadine 15 ml. 1 x 12 Bt.', '79', 1, '2018-04-21 18:08:36', '79', 1, 1, 1);
INSERT INTO `mm_products` VALUES (80, 'Betadine 450 ml.', '80', 1, '2018-04-21 18:08:36', '80', 3, 3, 1);
INSERT INTO `mm_products` VALUES (81, 'Nss 0.9 % 1,000 cc.', '81', 1, '2018-04-21 18:08:36', '81', 3, 3, 1);
INSERT INTO `mm_products` VALUES (82, 'เจลว่านหางจระเข้', '82', 1, '2018-04-21 18:08:36', '82', 4, 4, 1);
INSERT INTO `mm_products` VALUES (83, 'ethyly chloride (สเปรย์ยาชา)', '83', 1, '2018-04-21 18:08:36', '83', 12, 12, 1);
INSERT INTO `mm_products` VALUES (84, 'ยาดม (พีเป๊กซ์)', '84', 1, '2018-04-21 18:08:36', '84', 1, 1, 1);
INSERT INTO `mm_products` VALUES (85, 'ยาหม่อง 15 gm.', '85', 1, '2018-04-21 18:08:36', '85', 12, 12, 1);
INSERT INTO `mm_products` VALUES (86, 'มิวโพรีน หลอด 5 gm.', '86', 1, '2018-04-21 18:08:36', '86', 4, 4, 1);
INSERT INTO `mm_products` VALUES (87, 'สเปร์ย Elmatacin', '87', 1, '2018-04-21 18:08:36', '87', 1, 1, 1);
INSERT INTO `mm_products` VALUES (88, 'Sterile water for Irrigation 1,000 ml.ขวดพลาสติค', '88', 1, '2018-04-21 18:08:36', '88', 12, 12, 1);
INSERT INTO `mm_products` VALUES (89, 'Betadine scrub 500 cc.', '89', 1, '2018-04-21 18:08:36', '89', 3, 3, 1);
INSERT INTO `mm_products` VALUES (90, 'Tony lotion (TA 0.1 %  ชนิดน้ำ)', '90', 1, '2018-04-21 18:08:36', '90', 3, 3, 1);
INSERT INTO `mm_products` VALUES (121, 'Neotape 1 \"', '107', 1, '2018-04-21 18:08:36', '121', 2, 2, 1);
INSERT INTO `mm_products` VALUES (122, 'Neotape 2 \"', '108', 1, '2018-04-21 18:08:36', '122', 12, 12, 1);
INSERT INTO `mm_products` VALUES (119, 'Micropore 0.5\"', '105', 1, '2018-04-21 18:08:36', '119', 1, 1, 1);
INSERT INTO `mm_products` VALUES (120, 'Neobun - Gel แผ่นแปะบรรเทาปวด', '106', 1, '2018-04-21 18:08:36', '120', 1, 1, 1);
INSERT INTO `mm_products` VALUES (118, 'Micropore 1\"', '104', 1, '2018-04-21 18:08:36', '118', 1, 1, 1);
INSERT INTO `mm_products` VALUES (108, 'Elastic  Bandage 4 ”', '94', 1, '2018-04-21 18:08:36', '108', 1, 1, 1);
INSERT INTO `mm_products` VALUES (109, 'Eye Pad', '95', 1, '2018-04-21 18:08:36', '109', 1, 1, 1);
INSERT INTO `mm_products` VALUES (110, 'Gauze drain', '96', 1, '2018-04-21 18:08:36', '110', 4, 4, 1);
INSERT INTO `mm_products` VALUES (111, 'Gauze 2x2', '97', 1, '2018-04-21 18:08:36', '111', 1, 1, 1);
INSERT INTO `mm_products` VALUES (112, 'Gauze 3x3', '98', 1, '2018-04-21 18:08:36', '112', 1, 1, 1);
INSERT INTO `mm_products` VALUES (113, 'Gauze 4x4', '99', 1, '2018-04-21 18:08:36', '113', 1, 1, 1);
INSERT INTO `mm_products` VALUES (114, 'Grove (ถุงมือ) ขนาด S', '100', 1, '2018-04-21 18:08:36', '114', 1, 1, 1);
INSERT INTO `mm_products` VALUES (115, 'Grove (ถุงมือ) ขนาด M', '101', 1, '2018-04-21 18:08:36', '115', 1, 1, 1);
INSERT INTO `mm_products` VALUES (116, 'Grove (ถุงมือ) ขนาด L', '102', 1, '2018-04-21 18:08:36', '116', 12, 12, 1);
INSERT INTO `mm_products` VALUES (117, 'Hot - Cold pack', '103', 1, '2018-04-21 18:08:36', '117', 2, 2, 1);
INSERT INTO `mm_products` VALUES (105, 'Arm  Sling', '91', 1, '2018-04-21 18:08:36', '105', 7, 7, 1);
INSERT INTO `mm_products` VALUES (106, 'Elastic  Bandage 2 ”', '92', 1, '2018-04-21 18:08:36', '106', 1, 1, 1);
INSERT INTO `mm_products` VALUES (107, 'Elastic  Bandage 3 ”', '93', 1, '2018-04-21 18:08:36', '107', 1, 1, 1);
INSERT INTO `mm_products` VALUES (123, 'sofra tullae/Bactigras', '109', 1, '2018-04-21 18:08:36', '123', 12, 12, 1);
INSERT INTO `mm_products` VALUES (124, 'swab (ไม้พันสำลี) ขนาด S       ', '110', 1, '2018-04-21 18:08:36', '124', 12, 12, 1);
INSERT INTO `mm_products` VALUES (125, 'swab ขนาด M                     ', '111', 1, '2018-04-21 18:08:36', '125', 4, 4, 1);
INSERT INTO `mm_products` VALUES (126, 'swab ขนาด L                        ', '112', 1, '2018-04-21 18:08:36', '126', 9, 9, 1);
INSERT INTO `mm_products` VALUES (127, 'Soft  Collar', '113', 1, '2018-04-21 18:08:36', '127', 12, 12, 1);
INSERT INTO `mm_products` VALUES (128, 'Sterile strip', '114', 1, '2018-04-21 18:08:36', '128', 1, 1, 1);
INSERT INTO `mm_products` VALUES (129, 'Tensoplast (สีน้ำตาล)', '115', 1, '2018-04-21 18:08:36', '129', 12, 12, 1);
INSERT INTO `mm_products` VALUES (130, 'Tensoplastic', '116', 1, '2018-04-21 18:08:36', '130', 1, 1, 1);
INSERT INTO `mm_products` VALUES (131, 'Transpore 1\"', '117', 1, '2018-04-21 18:08:36', '131', 1, 1, 1);
INSERT INTO `mm_products` VALUES (132, 'Transpore 0.5\"', '118', 1, '2018-04-21 18:08:36', '132', 1, 1, 1);
INSERT INTO `mm_products` VALUES (133, 'Tensofix ขนาด 5.0', '119', 1, '2018-04-21 18:08:36', '133', 12, 12, 1);
INSERT INTO `mm_products` VALUES (134, 'Tensofix ขนาด 7.5', '120', 1, '2018-04-21 18:08:36', '134', 4, 4, 1);
INSERT INTO `mm_products` VALUES (135, 'Tensofix ขนาด 10.0', '121', 1, '2018-04-21 18:08:36', '135', 5, 5, 1);
INSERT INTO `mm_products` VALUES (136, 'สำลีก้อน ', '122', 1, '2018-04-21 18:08:36', '136', 7, 7, 1);
INSERT INTO `mm_products` VALUES (137, 'ไม้กดลิ้น แบบแยกชิ้น', '123', 1, '2018-04-21 18:08:36', '137', 1, 1, 1);
INSERT INTO `mm_products` VALUES (138, 'ถ้วยล้างตา', '124', 1, '2018-04-21 18:08:36', '138', 4, 4, 1);
INSERT INTO `mm_products` VALUES (139, 'ตลับยา 5 gm.', '125', 1, '2018-04-21 18:08:36', '139', 4, 4, 1);
INSERT INTO `mm_products` VALUES (140, 'Blade No. 11 ', '126', 1, '2018-04-21 18:08:36', '140', 1, 1, 1);
INSERT INTO `mm_products` VALUES (141, 'Set ล้างแผล', '127', 1, '2018-04-21 18:08:36', '141', 12, 12, 1);
INSERT INTO `mm_products` VALUES (142, 'mask (ผ้าปิดจมูกแบบใช้แล้วทิ้ง)', '128', 1, '2018-04-21 18:08:36', '142', 1, 1, 1);
INSERT INTO `mm_products` VALUES (143, 'Easifix cohesive 2.5 cm x 4 M.', '129', 1, '2018-04-21 18:08:36', '143', 1, 1, 1);
INSERT INTO `mm_products` VALUES (144, 'Fixomull stretch  10 cm x 10 M.', '130', 1, '2018-04-21 18:08:36', '144', 12, 12, 1);
INSERT INTO `mm_products` VALUES (145, 'Inhibac Hospital Concentread 1 ลิตร', '131', 1, '2018-04-21 18:08:36', '145', 12, 12, 1);
INSERT INTO `mm_products` VALUES (146, 'แอลกอฮอล์ เจลล้างมือ แบบขวดปั้ม', '132', 1, '2018-04-21 18:08:36', '146', 3, 3, 1);
INSERT INTO `mm_products` VALUES (147, 'ซองซิปสั่งพิมพ์ # 7x10 Cm. (สีฟ้า)', '133', 1, '2018-04-21 18:08:36', '147', 12, 12, 1);
INSERT INTO `mm_products` VALUES (148, 'ซองซิปสั่งพิมพ์ # 9x12 Cm. (สีฟ้า)', '134', 1, '2018-04-21 18:08:36', '148', 12, 12, 1);
INSERT INTO `mm_products` VALUES (149, 'กระบอกฉีดยา  3 ML.', '135', 1, '2018-04-21 18:08:36', '149', 12, 12, 1);
INSERT INTO `mm_products` VALUES (150, 'กระบอกฉีดยา  5 ML.', '136', 1, '2018-04-21 18:08:36', '150', 12, 12, 1);
INSERT INTO `mm_products` VALUES (151, 'กระบอกฉีดยา  10 ML.', '137', 1, '2018-04-21 18:08:36', '151', 12, 12, 1);
INSERT INTO `mm_products` VALUES (152, 'set IV', '138', 1, '2018-04-21 18:08:36', '152', 12, 12, 1);
INSERT INTO `mm_products` VALUES (153, 'น้ำเกลือให้ทางหลอดเลือดดำ', '139', 1, '2018-04-21 18:08:36', '153', 12, 12, 1);
INSERT INTO `mm_products` VALUES (154, 'NSS 500 ml.', '140', 1, '2018-04-21 18:08:36', '154', 12, 12, 1);
INSERT INTO `mm_products` VALUES (155, 'LRS 500 ml.', '141', 1, '2018-04-21 18:08:36', '155', 12, 12, 1);
INSERT INTO `mm_products` VALUES (156, '5%D/2 500 ml.', '142', 1, '2018-04-21 18:08:36', '156', 12, 12, 1);
INSERT INTO `mm_products` VALUES (157, 'ถ้วยสำหรับใส่ยารับประทานแบบพลาสติค 30 ml.', '143', 1, '2018-04-21 18:08:36', '157', 12, 12, 1);
INSERT INTO `mm_products` VALUES (158, 'Ventolin', '144', 1, '2018-04-21 18:08:36', '158', 3, 3, 1);
INSERT INTO `mm_products` VALUES (159, 'NSS 100 cc', '145', 1, '2018-04-21 18:08:36', '159', 4, 4, 1);
INSERT INTO `mm_products` VALUES (160, 'TA 0.1% 15 gm', '146', 1, '2018-04-21 18:08:36', '160', 12, 12, 1);
INSERT INTO `mm_products` VALUES (161, 'เข็มฉีดยา no.25', '147', 1, '2018-04-21 18:08:36', '161', 12, 12, 1);
INSERT INTO `mm_products` VALUES (162, 'เข็มฉีดยา no.18', '148', 1, '2018-04-21 18:08:36', '162', 12, 12, 1);

-- ----------------------------
-- Table structure for mm_unit_generics
-- ----------------------------
DROP TABLE IF EXISTS `mm_unit_generics`;
CREATE TABLE `mm_unit_generics`  (
  `unit_generic_id` int(11) NOT NULL AUTO_INCREMENT,
  `from_unit_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `to_unit_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `qty` int(6) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`unit_generic_id`),
  INDEX `mm_unit_generics_fk0` USING BTREE(`from_unit_id`),
  INDEX `mm_unit_generics_fk1` USING BTREE(`to_unit_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mm_unit_generics
-- ----------------------------
INSERT INTO `mm_unit_generics` VALUES (1, '1', '1', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (2, '2', '2', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (3, '3', '3', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (4, '4', '4', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (5, '5', '5', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (6, '6', '6', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (7, '7', '7', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (8, '8', '8', 1, NULL);
INSERT INTO `mm_unit_generics` VALUES (9, '9', '9', 1, NULL);

-- ----------------------------
-- Table structure for mm_units
-- ----------------------------
DROP TABLE IF EXISTS `mm_units`;
CREATE TABLE `mm_units`  (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`unit_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mm_units
-- ----------------------------
INSERT INTO `mm_units` VALUES (1, 'กล่อง', '1', '2018-04-21 00:34:23');
INSERT INTO `mm_units` VALUES (2, 'กระปุก', '1', '2018-04-21 00:34:43');
INSERT INTO `mm_units` VALUES (3, 'ขวด', '1', '2018-04-21 00:34:53');
INSERT INTO `mm_units` VALUES (4, 'แพ็ค', '1', '2018-04-21 00:35:10');
INSERT INTO `mm_units` VALUES (5, 'ลัง', '1', '2018-04-21 00:35:19');
INSERT INTO `mm_units` VALUES (6, 'TU', '1', '2018-04-21 00:35:45');
INSERT INTO `mm_units` VALUES (7, 'ถุง', '1', '2018-04-21 00:36:08');
INSERT INTO `mm_units` VALUES (8, 'ชิ้น', '1', '2018-04-21 00:36:23');
INSERT INTO `mm_units` VALUES (9, 'ห่อ', '1', '2018-04-21 00:36:47');
INSERT INTO `mm_units` VALUES (10, 'เม็ด', '1', '2018-04-21 00:37:07');
INSERT INTO `mm_units` VALUES (11, 'แคปซูล', '1', '2018-04-21 00:37:36');
INSERT INTO `mm_units` VALUES (12, 'หน่วย', '1', '2018-04-21 17:59:07');

-- ----------------------------
-- Table structure for um_people
-- ----------------------------
DROP TABLE IF EXISTS `um_people`;
CREATE TABLE `um_people`  (
  `people_id` int(11) NOT NULL AUTO_INCREMENT,
  `title_id` int(11) DEFAULT NULL,
  `fname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`people_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of um_people
-- ----------------------------
INSERT INTO `um_people` VALUES (1, 1, 'testF', 'testL', '2018-04-19 23:50:14');
INSERT INTO `um_people` VALUES (2, 1, 'staff', 'test', '2018-04-20 00:33:12');

-- ----------------------------
-- Table structure for um_people_users
-- ----------------------------
DROP TABLE IF EXISTS `um_people_users`;
CREATE TABLE `um_people_users`  (
  `people_user_id` int(13) NOT NULL,
  `people_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`people_id`, `user_id`),
  INDEX `um_people_users_fk1` USING BTREE(`user_id`)
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of um_people_users
-- ----------------------------
INSERT INTO `um_people_users` VALUES (1, 1, 1, '2018-04-17', '0000-00-00', 1);
INSERT INTO `um_people_users` VALUES (2, 2, 2, '2018-04-19', '0000-00-00', 1);

-- ----------------------------
-- Table structure for um_titles
-- ----------------------------
DROP TABLE IF EXISTS `um_titles`;
CREATE TABLE `um_titles`  (
  `title_id` int(11) NOT NULL,
  `title_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY USING BTREE (`title_id`)
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of um_titles
-- ----------------------------
INSERT INTO `um_titles` VALUES (1, 'นาง');
INSERT INTO `um_titles` VALUES (2, 'นาย');
INSERT INTO `um_titles` VALUES (3, 'นางสาว');

-- ----------------------------
-- Table structure for um_users
-- ----------------------------
DROP TABLE IF EXISTS `um_users`;
CREATE TABLE `um_users`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_right` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `is_active` int(1) DEFAULT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`user_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of um_users
-- ----------------------------
INSERT INTO `um_users` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin', 1, 1);
INSERT INTO `um_users` VALUES (2, 'staff', 'e10adc3949ba59abbe56e057f20f883e', 'staff', 1, 2);

-- ----------------------------
-- Table structure for wm_issue_products
-- ----------------------------
DROP TABLE IF EXISTS `wm_issue_products`;
CREATE TABLE `wm_issue_products`  (
  `issue_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_generic_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY USING BTREE (`issue_product_id`),
  INDEX `wm_issue_products_fk0` USING BTREE(`issue_generic_id`),
  INDEX `wm_issue_products_fk1` USING BTREE(`product_id`),
  INDEX `wm_issue_products_fk2` USING BTREE(`wm_product_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_issues
-- ----------------------------
DROP TABLE IF EXISTS `wm_issues`;
CREATE TABLE `wm_issues`  (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_code` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `transaction_issue_id` int(11) NOT NULL,
  `people_user_id` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`issue_id`),
  INDEX `wm_issues_fk0` USING BTREE(`transaction_issue_id`),
  INDEX `wm_issues_fk1` USING BTREE(`people_user_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_products
-- ----------------------------
DROP TABLE IF EXISTS `wm_products`;
CREATE TABLE `wm_products`  (
  `wm_product_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `warehouse_id` int(11) NOT NULL DEFAULT 0,
  `product_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(6) DEFAULT NULL,
  `lot_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date DEFAULT NULL,
  `people_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`warehouse_id`, `product_id`, `lot_no`),
  INDEX `wm_products_fk0` USING BTREE(`product_id`),
  INDEX `wm_products_fk2` USING BTREE(`people_user_id`)
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wm_products
-- ----------------------------
INSERT INTO `wm_products` VALUES ('1', 1, '1', 1, '1', '2019-04-21', '1', '2018-04-21 23:56:57', '2018-04-21 23:57:08');
INSERT INTO `wm_products` VALUES ('2', 1, '2', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('3', 1, '6', 9, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('4', 1, '7', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('5', 1, '11', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('6', 1, '12', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('7', 1, '13', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('8', 1, '17', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('9', 1, '20', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('10', 1, '21', 5, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('11', 1, '22', 18, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('12', 1, '23', 18, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('13', 1, '24', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('14', 1, '26', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('15', 1, '30', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('16', 1, '31', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('17', 1, '32', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('18', 1, '33', 19, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('19', 1, '34', 10, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('20', 1, '37', 58, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('21', 1, '38', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('22', 1, '39', 7, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('23', 1, '40', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('24', 1, '41', 30, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('25', 1, '43', 12, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('26', 1, '44', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('27', 1, '45', 50, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('28', 1, '46', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('29', 1, '48', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('30', 1, '49', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('31', 1, '50', 5, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('32', 1, '52', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('33', 1, '53', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('34', 1, '55', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('35', 1, '56', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('36', 1, '58', 5, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('37', 1, '61', 7, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('38', 1, '63', 140, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('39', 1, '64', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('40', 1, '67', 5, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('41', 1, '68', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('42', 1, '69', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('43', 1, '70', 19, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('44', 1, '72', 16, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('45', 1, '75', 36, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('46', 1, '76', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('47', 1, '77', 13, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('48', 1, '78', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('49', 1, '79', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('50', 1, '80', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('51', 1, '81', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('52', 1, '82', 10, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('53', 1, '84', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('54', 1, '86', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('55', 1, '87', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('56', 1, '89', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('57', 1, '90', 30, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('58', 1, '105', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('59', 1, '106', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('60', 1, '107', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('61', 1, '108', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('62', 1, '109', 7, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('63', 1, '110', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('64', 1, '111', 16, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('65', 1, '112', 19, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('66', 1, '113', 22, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('67', 1, '114', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('68', 1, '115', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('69', 1, '117', 2, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('70', 1, '118', 7, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('71', 1, '119', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('72', 1, '120', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('73', 1, '121', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('74', 1, '125', 34, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('75', 1, '126', 18, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('76', 1, '128', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('77', 1, '130', 11, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('78', 1, '131', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('79', 1, '132', 4, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('80', 1, '134', 5, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('81', 1, '135', 6, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('82', 1, '136', 7, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('83', 1, '137', 15, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('84', 1, '138', 18, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:17');
INSERT INTO `wm_products` VALUES ('85', 1, '139', 14, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('86', 1, '140', 1, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('87', 1, '142', 19, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('88', 1, '143', 45, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('89', 1, '146', 28, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('90', 1, '158', 3, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('91', 1, '159', 11, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');
INSERT INTO `wm_products` VALUES ('92', 1, '160', 8, '1', '2019-04-21', '1', '2018-04-21 00:00:00', '2018-04-21 01:04:18');

-- ----------------------------
-- Table structure for wm_receive_detail
-- ----------------------------
DROP TABLE IF EXISTS `wm_receive_detail`;
CREATE TABLE `wm_receive_detail`  (
  `receive_detail_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_id` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lot_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `expired_date` date NOT NULL,
  `receive_qty` int(12) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`receive_detail_id`),
  INDEX `wm_receives_detail_fk0` USING BTREE(`receive_id`),
  INDEX `wm_receives_detail_fk1` USING BTREE(`product_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wm_receive_detail
-- ----------------------------
INSERT INTO `wm_receive_detail` VALUES (1, '1', '1', '1', '2019-04-21', 1, '2018-04-22 00:05:06');

-- ----------------------------
-- Table structure for wm_receives
-- ----------------------------
DROP TABLE IF EXISTS `wm_receives`;
CREATE TABLE `wm_receives`  (
  `receive_id` int(13) NOT NULL AUTO_INCREMENT,
  `receive_date` date DEFAULT NULL,
  `receive_code` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `people_user_id` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`receive_id`),
  INDEX `wm_receives_fk0` USING BTREE(`people_user_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wm_receives
-- ----------------------------
INSERT INTO `wm_receives` VALUES (1, '2018-04-21', 'IN-0000001', '1', '2018-04-21 23:54:53');

-- ----------------------------
-- Table structure for wm_reqisition_comfirm_item
-- ----------------------------
DROP TABLE IF EXISTS `wm_reqisition_comfirm_item`;
CREATE TABLE `wm_reqisition_comfirm_item`  (
  `confirm_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `confirm_id` int(11) DEFAULT NULL,
  `wm_product_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirm_qty` int(11) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`confirm_item_id`),
  INDEX `wm_reqisition_comfirm_item_fk0` USING BTREE(`confirm_id`),
  INDEX `wm_reqisition_comfirm_item_fk1` USING BTREE(`wm_product_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_reqisition_comfirms
-- ----------------------------
DROP TABLE IF EXISTS `wm_reqisition_comfirms`;
CREATE TABLE `wm_reqisition_comfirms`  (
  `confirm_id` int(11) NOT NULL AUTO_INCREMENT,
  `confirm_date` date DEFAULT NULL,
  `requisition_order_id` int(11) DEFAULT NULL,
  `people_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`confirm_id`),
  INDEX `wm_reqisition_comfirms_fk0` USING BTREE(`requisition_order_id`),
  INDEX `wm_reqisition_comfirms_fk1` USING BTREE(`people_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_reqisition_order_items
-- ----------------------------
DROP TABLE IF EXISTS `wm_reqisition_order_items`;
CREATE TABLE `wm_reqisition_order_items`  (
  `requisition_order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_order_id` int(11) NOT NULL,
  `generic_id` int(11) NOT NULL,
  `requisition_qty` int(12) DEFAULT NULL,
  `unit_generic_id` int(11) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`requisition_order_item_id`),
  INDEX `wm_reqisition_order_items_fk0` USING BTREE(`requisition_order_id`),
  INDEX `wm_reqisition_order_items_fk1` USING BTREE(`generic_id`),
  INDEX `wm_reqisition_order_items_fk2` USING BTREE(`unit_generic_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for wm_reqisition_orders
-- ----------------------------
DROP TABLE IF EXISTS `wm_reqisition_orders`;
CREATE TABLE `wm_reqisition_orders`  (
  `reqisition_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `reqisition_code` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `reqisition_date` date DEFAULT NULL,
  `wm_requisition` int(11) DEFAULT NULL,
  `wm_withdraw` int(11) DEFAULT NULL,
  `people_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY USING BTREE (`reqisition_order_id`),
  INDEX `wm_reqisition_orders_fk0` USING BTREE(`wm_requisition`),
  INDEX `wm_reqisition_orders_fk1` USING BTREE(`wm_withdraw`),
  INDEX `wm_reqisition_orders_fk2` USING BTREE(`people_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_transaction_issues
-- ----------------------------
DROP TABLE IF EXISTS `wm_transaction_issues`;
CREATE TABLE `wm_transaction_issues`  (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY USING BTREE (`transaction_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wm_warehouses
-- ----------------------------
DROP TABLE IF EXISTS `wm_warehouses`;
CREATE TABLE `wm_warehouses`  (
  `warehouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY USING BTREE (`warehouse_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wm_warehouses
-- ----------------------------
INSERT INTO `wm_warehouses` VALUES (1, 'คลัง');
INSERT INTO `wm_warehouses` VALUES (2, 'เคาว์เตอร์');

SET FOREIGN_KEY_CHECKS = 1;
