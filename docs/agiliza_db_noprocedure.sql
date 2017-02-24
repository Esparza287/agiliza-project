-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-12-2016 a las 20:00:57
-- Versión del servidor: 5.7.9
-- Versión de PHP: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agiliza_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrativo`
--

DROP TABLE IF EXISTS `administrativo`;
CREATE TABLE IF NOT EXISTS `administrativo` (
  `id_administrativo` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_administrativo`),
  KEY `fk_admin_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administrativo`
--

INSERT INTO `administrativo` (`id_administrativo`, `id_usuario`, `vigencia`) VALUES
(3, 2, 1),
(5, 24, 1),
(6, 29, 1),
(7, 1, 1),
(8, 37, 1),
(9, 41, 1),
(10, 43, 1),
(11, 46, 1),
(12, 51, 1),
(13, 52, 1),
(14, 53, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_egreso` date DEFAULT NULL,
  `nivel_alumno` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  `asignado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_alumno`),
  KEY `fk_alumno_nivel_idx` (`nivel_alumno`),
  KEY `fk_alumno_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id_alumno`, `fecha_ingreso`, `fecha_egreso`, `nivel_alumno`, `id_usuario`, `vigencia`, `asignado`) VALUES
(2, NULL, NULL, 4, 3, 1, 1),
(3, NULL, NULL, 5, 4, 1, 0),
(4, NULL, NULL, 1, 5, 1, 0),
(8, NULL, NULL, 2, 32, 1, 0),
(9, NULL, NULL, 1, 33, 1, 0),
(10, NULL, NULL, 1, 38, 1, 0),
(11, NULL, NULL, 1, 39, 1, 0),
(12, NULL, NULL, 1, 40, 1, 0),
(13, NULL, NULL, 4, 44, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_curso`
--

DROP TABLE IF EXISTS `alumno_curso`;
CREATE TABLE IF NOT EXISTS `alumno_curso` (
  `id_alumno_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso_anual` int(11) DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_alumno_curso`),
  KEY `fk_alumno_curso_curso_anual_idx` (`id_curso_anual`),
  KEY `fk_alumno_curso_alumno_idx1` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno_curso`
--

INSERT INTO `alumno_curso` (`id_alumno_curso`, `id_curso_anual`, `id_alumno`) VALUES
(1, 7, 2),
(2, 7, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apoderado`
--

DROP TABLE IF EXISTS `apoderado`;
CREATE TABLE IF NOT EXISTS `apoderado` (
  `id_apoderado` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_apoderado`),
  KEY `fk_apoderado_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `apoderado`
--

INSERT INTO `apoderado` (`id_apoderado`, `id_usuario`, `vigencia`) VALUES
(2, 28, 1),
(3, 42, 1),
(4, 45, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apoderado_alumno`
--

DROP TABLE IF EXISTS `apoderado_alumno`;
CREATE TABLE IF NOT EXISTS `apoderado_alumno` (
  `id_apoderado_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `id_apoderado` int(11) DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_year` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_apoderado_alumno`),
  KEY `fk_apoderado_alumno_idx` (`id_apoderado`),
  KEY `fk_alumno_apoderado_idx` (`id_alumno`),
  KEY `fk_alumnoapd_year_idx` (`id_year`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `apoderado_alumno`
--

INSERT INTO `apoderado_alumno` (`id_apoderado_alumno`, `id_apoderado`, `id_alumno`, `id_year`) VALUES
(1, 2, 2, 2),
(2, 2, 13, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE IF NOT EXISTS `asignatura` (
  `id_asignatura` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_asignatura` varchar(45) NOT NULL,
  `descripcion_asignatura` varchar(100) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_asignatura`),
  KEY `fk_asignatura_especialidad_idx` (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id_asignatura`, `nombre_asignatura`, `descripcion_asignatura`, `id_especialidad`, `vigencia`) VALUES
(1, 'Lenguaje', NULL, 1, 1),
(2, 'Matemática', NULL, 1, 1),
(3, 'Historia', NULL, 1, 1),
(4, 'Biología', NULL, 1, 1),
(5, 'Quimica', NULL, 1, 1),
(6, 'Física', NULL, 1, 1),
(7, 'Ed. Física', NULL, 1, 1),
(8, 'Religión', NULL, 1, 1),
(9, 'Tecnología', NULL, 1, 1),
(10, 'Test', 'descripción de test', 1, 0),
(11, 'D. Técnico', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id_asistencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_detalle_periodo` int(11) DEFAULT NULL,
  `id_alumno_curso` int(11) DEFAULT NULL,
  `fecha_asistencia` datetime DEFAULT NULL,
  `estado_asistencia` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_asistencia`),
  KEY `fk_asistencia_alumno_curso_idx` (`id_alumno_curso`),
  KEY `fk_asistencia_periodo_d_idx` (`id_detalle_periodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloque`
--

DROP TABLE IF EXISTS `bloque`;
CREATE TABLE IF NOT EXISTS `bloque` (
  `id_bloque` int(11) NOT NULL AUTO_INCREMENT,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fin` datetime DEFAULT NULL,
  `hora_inicio_mostrar` time DEFAULT NULL,
  `hora_fin_mostrar` time DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_bloque`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `bloque`
--

INSERT INTO `bloque` (`id_bloque`, `hora_inicio`, `hora_fin`, `hora_inicio_mostrar`, `hora_fin_mostrar`, `vigencia`) VALUES
(1, '2016-03-06 08:15:00', '1900-09-05 09:00:00', '08:15:00', '09:00:00', 1),
(2, '2016-07-04 09:00:00', '2016-07-04 09:45:00', '09:00:00', '09:45:00', 1),
(3, '2016-08-04 10:00:00', '2016-08-04 10:45:00', '10:00:00', '10:45:00', 1),
(4, '2016-07-04 10:45:00', '2016-07-04 11:30:00', '10:45:00', '11:30:00', 1),
(5, '2016-08-04 11:45:00', '2016-08-04 12:30:00', '11:45:00', '12:30:00', 1),
(6, '2016-09-01 12:30:00', '2016-09-01 13:15:00', '12:30:00', '13:15:00', 1),
(7, '2016-10-03 14:15:00', '2016-10-03 15:00:00', '14:15:00', '15:00:00', 1),
(8, '2016-10-03 15:00:00', '2016-10-03 15:45:00', '15:00:00', '15:45:00', 1),
(9, '2016-10-03 16:00:00', '2016-10-03 16:45:00', '16:00:00', '16:45:00', 1),
(10, '2016-10-03 16:45:00', '2016-10-03 17:30:00', '16:45:00', '17:30:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carro_compra`
--

DROP TABLE IF EXISTS `carro_compra`;
CREATE TABLE IF NOT EXISTS `carro_compra` (
  `id_carro_compra` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime DEFAULT NULL,
  `neto` int(11) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT '1',
  `id_usuario` int(11) DEFAULT NULL,
  `forma_pago` varchar(45) DEFAULT NULL,
  `cantidad_cuotas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_carro_compra`),
  KEY `fk_carro_usuario_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `carro_compra`
--

INSERT INTO `carro_compra` (`id_carro_compra`, `fecha_creacion`, `neto`, `estado`, `id_usuario`, `forma_pago`, `cantidad_cuotas`) VALUES
(1, '2016-09-01 23:38:00', 113000, 0, 1, 'Tarjeta Credito', 2),
(2, '2016-09-04 22:45:52', 25000, 0, 1, 'Tarjeta Credito', 1),
(3, '2016-09-04 22:50:27', 9500, 0, 1, 'PayPal', 1),
(4, '2016-09-15 18:17:06', 11500, 0, 1, 'PayPal', 1),
(5, '2016-09-15 19:34:47', 25000, 0, 1, 'PayPal', 1),
(6, '2016-09-15 19:43:04', 25000, 0, 1, 'PayPal', 1),
(7, '2016-09-15 19:44:08', 25000, 0, 1, 'PayPal', 1),
(8, '2016-09-15 19:45:49', 25000, 0, 1, 'PayPal', 1),
(9, '2016-09-15 19:47:35', 25000, 0, 1, 'PayPal', 1),
(10, '2016-09-15 19:48:51', 25000, 0, 1, 'PayPal', 1),
(11, '2016-09-15 19:49:50', 25000, 0, 1, 'PayPal', 1),
(12, '2016-09-15 19:53:50', 25000, 0, 1, 'PayPal', 1),
(13, '2016-09-15 20:09:12', 25000, 0, 1, 'Tarjeta Credito', 6),
(14, '2016-09-21 03:15:42', 25000, 0, 3, 'PayPal', 1),
(15, '2016-09-21 03:18:15', 5000, 0, 3, 'PayPal', 1),
(16, '2016-09-21 03:24:22', 6500, 0, 3, 'PayPal', 1),
(17, '2016-09-21 03:27:35', 6500, 0, 3, 'PayPal', 1),
(18, '2016-09-21 03:31:16', 3000, 0, 3, 'PayPal', 1),
(19, '2016-09-21 03:32:14', 3000, 0, 3, 'PayPal', 1),
(20, '2016-09-24 01:53:04', 25000, 0, 3, 'PayPal', 1),
(21, '2016-09-24 02:18:19', 5000, 0, 3, 'PayPal', 1),
(22, '2016-09-24 02:20:51', 6500, 0, 3, 'PayPal', 1),
(23, '2016-09-24 02:27:46', 3000, 0, 3, 'PayPal', 1),
(24, '2016-09-24 02:28:29', 3000, 0, 3, 'PayPal', 1),
(25, '2016-09-24 02:29:26', 3000, 0, 3, 'PayPal', 1),
(26, '2016-09-24 02:36:00', 3000, 0, 3, 'PayPal', 1),
(27, '2016-09-24 02:37:26', 3000, 0, 3, 'PayPal', 1),
(28, '2016-09-24 02:46:09', 3000, 0, 3, 'PayPal', 1),
(29, '2016-09-24 02:47:51', 6500, 0, 3, 'PayPal', 1),
(30, '2016-09-24 02:48:37', 3000, 0, 3, 'PayPal', 1),
(31, '2016-09-24 02:49:22', 3000, 0, 3, 'PayPal', 1),
(32, '2016-09-24 02:52:45', 3000, 0, 3, 'PayPal', 1),
(33, '2016-09-24 02:55:10', 3000, 0, 3, 'PayPal', 1),
(34, '2016-09-24 02:56:26', 3000, 0, 3, 'Tarjeta Credito', 5),
(35, '2016-09-24 03:00:33', 3000, 0, 3, 'Tarjeta Credito', 1),
(36, '2016-09-24 03:01:08', 8000, 0, 3, 'PayPal', 1),
(37, '2016-09-24 03:02:22', 8000, 0, 3, 'Tarjeta Credito', 1),
(38, '2016-09-24 03:06:21', 14500, 0, 3, 'PayPal', 1),
(39, '2016-09-24 09:24:01', 3000, 0, 3, 'PayPal', 1),
(40, '2016-09-24 09:26:33', 3000, 0, 3, 'PayPal', 1),
(41, '2016-09-24 09:29:12', 6500, 0, 3, 'PayPal', 1),
(42, '2016-09-24 09:31:51', 3000, 0, 3, 'PayPal', 1),
(43, '2016-09-24 09:34:05', 6500, 0, 3, 'PayPal', 1),
(44, '2016-09-24 10:10:49', 25000, 0, 3, 'PayPal', 1),
(45, '2016-11-22 03:16:44', 5000, 1, 3, NULL, NULL),
(46, '2016-11-24 16:38:09', 93000, 1, 2, NULL, NULL),
(47, '2016-12-14 21:48:25', 25000, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Vestimenta'),
(2, 'Accesorios'),
(3, 'Útiles Escolares'),
(4, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

DROP TABLE IF EXISTS `curso`;
CREATE TABLE IF NOT EXISTS `curso` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_curso` varchar(100) NOT NULL,
  `limite_curso` int(11) DEFAULT NULL,
  `cantidad_letras` int(11) DEFAULT '1',
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `descripcion_curso`, `limite_curso`, `cantidad_letras`, `vigencia`) VALUES
(1, '1° Medio', 30, 2, 1),
(2, '2° Medio', 30, 2, 1),
(3, '3° Medio', 30, 2, 1),
(4, '4° Medio', 30, 2, 1),
(5, 'Practica Profesional', 67, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_anual`
--

DROP TABLE IF EXISTS `curso_anual`;
CREATE TABLE IF NOT EXISTS `curso_anual` (
  `id_curso_anual` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso_anual` varchar(45) DEFAULT NULL,
  `fecha_curso_anual` int(11) DEFAULT NULL,
  `profesor_jefe` varchar(45) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `letra_curso` varchar(45) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_curso_anual`),
  KEY `fk_asignacion_curso_idx` (`id_curso`),
  KEY `fk_curso_anual_especialidad_idx` (`id_especialidad`),
  KEY `fk_curso_anual_profe_idx` (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `curso_anual`
--

INSERT INTO `curso_anual` (`id_curso_anual`, `nombre_curso_anual`, `fecha_curso_anual`, `profesor_jefe`, `id_curso`, `id_especialidad`, `id_profesor`, `letra_curso`, `estado`) VALUES
(1, '1° Medio A', 2016, NULL, 1, 1, 6, 'A', 1),
(2, '1° Medio B', 2016, NULL, 1, 1, 7, 'B', 1),
(3, '2° Medio A', 2016, NULL, 2, 1, 8, 'A', 1),
(4, '2° Medio B', 2016, NULL, 2, 1, 9, 'B', 1),
(5, '3° Medio A', 2016, NULL, 3, 2, 10, 'A', 1),
(6, '3° Medio B', 2016, NULL, 3, 4, 11, 'B', 1),
(7, '4° Medio A', 2016, NULL, 4, 2, 12, 'A', 1),
(8, '4° Medio B', 2016, NULL, 4, 4, 6, 'B', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_asignatura`
--

DROP TABLE IF EXISTS `detalle_asignatura`;
CREATE TABLE IF NOT EXISTS `detalle_asignatura` (
  `id_detalle_asignatura` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  `horas_asignatura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_asignatura`),
  KEY `fk_detalleasig_curso_idx` (`id_curso`),
  KEY `fk_detalleasig_asignatura_idx` (`id_asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_asignatura`
--

INSERT INTO `detalle_asignatura` (`id_detalle_asignatura`, `id_curso`, `id_asignatura`, `horas_asignatura`) VALUES
(17, 2, 10, 8),
(18, 3, 10, 12),
(32, 1, 9, 2),
(33, 2, 9, 2),
(42, 1, 4, 2),
(43, 2, 4, 2),
(44, 1, 6, 2),
(45, 2, 6, 2),
(46, 1, 5, 2),
(47, 2, 5, 2),
(52, 1, 8, 2),
(53, 2, 8, 2),
(62, 1, 2, 0),
(63, 2, 2, 4),
(64, 3, 2, 4),
(65, 4, 2, 4),
(68, 1, 1, 4),
(69, 2, 1, 4),
(70, 3, 1, 4),
(71, 4, 1, 4),
(72, 1, 3, 4),
(73, 2, 3, 4),
(74, 3, 3, 2),
(75, 4, 3, 2),
(76, 1, 7, 2),
(77, 2, 7, 2),
(78, 3, 7, 2),
(79, 4, 7, 2),
(80, 1, 11, 2),
(81, 2, 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carro`
--

DROP TABLE IF EXISTS `detalle_carro`;
CREATE TABLE IF NOT EXISTS `detalle_carro` (
  `id_detalle_carro` int(11) NOT NULL AUTO_INCREMENT,
  `id_carro` int(11) DEFAULT NULL,
  `id_implemento` int(11) DEFAULT NULL,
  `neto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_carro`),
  KEY `fk_detalle_carro_idx` (`id_carro`),
  KEY `fk_detalle_implemento_idx` (`id_implemento`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_carro`
--

INSERT INTO `detalle_carro` (`id_detalle_carro`, `id_carro`, `id_implemento`, `neto`, `cantidad`) VALUES
(34, 1, 1, 25000, 4),
(35, 1, 2, 5000, 1),
(36, 1, 6, 8000, 1),
(37, 2, 1, 25000, 1),
(38, 3, 3, 6500, 1),
(39, 3, 4, 3000, 1),
(40, 4, 2, 5000, 1),
(41, 4, 3, 6500, 1),
(42, 5, 1, 25000, 1),
(43, 6, 1, 25000, 1),
(44, 7, 1, 25000, 1),
(45, 8, 1, 25000, 1),
(46, 9, 1, 25000, 1),
(47, 10, 1, 25000, 1),
(48, 11, 1, 25000, 1),
(49, 12, 1, 25000, 1),
(50, 13, 1, 25000, 1),
(51, 14, 1, 25000, 1),
(52, 15, 2, 5000, 1),
(53, 16, 3, 6500, 1),
(54, 17, 3, 6500, 1),
(55, 18, 4, 3000, 1),
(56, 19, 4, 3000, 1),
(57, 20, 1, 25000, 1),
(58, 21, 2, 5000, 1),
(59, 22, 3, 6500, 1),
(60, 23, 4, 3000, 1),
(61, 24, 4, 3000, 1),
(62, 25, 4, 3000, 1),
(63, 26, 4, 3000, 1),
(64, 27, 4, 3000, 1),
(65, 28, 4, 3000, 1),
(66, 29, 3, 6500, 1),
(67, 30, 4, 3000, 1),
(68, 31, 4, 3000, 1),
(69, 32, 4, 3000, 1),
(70, 33, 4, 3000, 1),
(71, 34, 4, 3000, 1),
(72, 35, 4, 3000, 1),
(73, 36, 6, 8000, 1),
(74, 37, 6, 8000, 1),
(75, 38, 5, 8000, 1),
(76, 38, 3, 6500, 1),
(77, 39, 4, 3000, 1),
(78, 40, 4, 3000, 1),
(79, 41, 3, 6500, 1),
(80, 42, 4, 3000, 1),
(81, 43, 3, 6500, 1),
(82, 44, 1, 25000, 1),
(83, 45, 2, 5000, 1),
(84, 46, 6, 8000, 1),
(85, 46, 2, 5000, 2),
(86, 47, 1, 25000, 1),
(87, 46, 1, 25000, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_curso_anual`
--

DROP TABLE IF EXISTS `detalle_curso_anual`;
CREATE TABLE IF NOT EXISTS `detalle_curso_anual` (
  `id_detalle_curso_anual` int(11) NOT NULL AUTO_INCREMENT,
  `id_asignatura` int(11) DEFAULT NULL,
  `id_curso_anual` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_curso_anual`),
  KEY `fk_detalle_curso_asignatura_idx` (`id_asignatura`),
  KEY `fk_detalle_curso_curso_anual_idx` (`id_curso_anual`),
  KEY `fk_detalle_curso_profesor_idx` (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_curso_anual`
--

INSERT INTO `detalle_curso_anual` (`id_detalle_curso_anual`, `id_asignatura`, `id_curso_anual`, `id_profesor`) VALUES
(123, 1, 37, NULL),
(124, 9, 37, NULL),
(125, 4, 37, NULL),
(126, 6, 37, NULL),
(127, 5, 37, NULL),
(128, 7, 37, NULL),
(129, 8, 37, NULL),
(130, 3, 37, NULL),
(131, 2, 37, NULL),
(132, 11, 37, NULL),
(133, 10, 38, NULL),
(134, 1, 38, NULL),
(135, 9, 38, NULL),
(136, 4, 38, NULL),
(137, 6, 38, NULL),
(138, 5, 38, NULL),
(139, 7, 38, NULL),
(140, 8, 38, NULL),
(141, 3, 38, NULL),
(142, 2, 38, NULL),
(143, 11, 38, NULL),
(144, 10, 39, NULL),
(145, 1, 39, 7),
(146, 7, 39, NULL),
(147, 3, 39, NULL),
(148, 2, 39, 6),
(149, 1, 40, NULL),
(150, 7, 40, NULL),
(151, 3, 40, NULL),
(152, 2, 40, NULL),
(153, 9, 49, NULL),
(154, 6, 49, NULL),
(155, 3, 49, NULL),
(156, 8, 49, NULL),
(157, 5, 49, NULL),
(158, 2, 49, 6),
(159, 11, 49, NULL),
(160, 7, 49, NULL),
(161, 4, 49, NULL),
(162, 1, 49, 7),
(163, 11, 50, NULL),
(164, 7, 50, NULL),
(165, 4, 50, NULL),
(166, 1, 50, NULL),
(167, 9, 50, NULL),
(168, 6, 50, NULL),
(169, 3, 50, NULL),
(170, 8, 50, NULL),
(171, 5, 50, NULL),
(172, 2, 50, NULL),
(173, 3, 51, NULL),
(174, 2, 51, NULL),
(175, 7, 51, NULL),
(176, 1, 51, NULL),
(177, 2, 52, NULL),
(178, 7, 52, NULL),
(179, 1, 52, NULL),
(180, 3, 52, NULL),
(181, 1, 1, 7),
(182, 2, 1, 13),
(183, 3, 1, 11),
(184, 4, 1, 14),
(185, 5, 1, NULL),
(186, 6, 1, 12),
(187, 7, 1, NULL),
(188, 8, 1, 8),
(189, 9, 1, 10),
(190, 11, 1, 9),
(191, 1, 2, NULL),
(192, 2, 2, NULL),
(193, 3, 2, NULL),
(194, 4, 2, NULL),
(195, 5, 2, NULL),
(196, 6, 2, NULL),
(197, 7, 2, NULL),
(198, 8, 2, NULL),
(199, 9, 2, NULL),
(200, 11, 2, NULL),
(201, 1, 3, NULL),
(202, 2, 3, NULL),
(203, 3, 3, NULL),
(204, 4, 3, NULL),
(205, 5, 3, NULL),
(206, 6, 3, NULL),
(207, 7, 3, NULL),
(208, 8, 3, NULL),
(209, 9, 3, NULL),
(210, 11, 3, NULL),
(211, 1, 4, NULL),
(212, 2, 4, NULL),
(213, 3, 4, NULL),
(214, 4, 4, NULL),
(215, 5, 4, NULL),
(216, 6, 4, NULL),
(217, 7, 4, NULL),
(218, 8, 4, NULL),
(219, 9, 4, NULL),
(220, 11, 4, NULL),
(221, 1, 5, NULL),
(222, 2, 5, NULL),
(223, 3, 5, NULL),
(224, 7, 5, NULL),
(225, 1, 6, NULL),
(226, 2, 6, NULL),
(227, 3, 6, NULL),
(228, 7, 6, NULL),
(229, 1, 7, NULL),
(230, 2, 7, NULL),
(231, 3, 7, NULL),
(232, 7, 7, NULL),
(233, 1, 8, NULL),
(234, 2, 8, NULL),
(235, 3, 8, NULL),
(236, 7, 8, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_implemento`
--

DROP TABLE IF EXISTS `detalle_implemento`;
CREATE TABLE IF NOT EXISTS `detalle_implemento` (
  `id_detalle_implemento` int(11) NOT NULL AUTO_INCREMENT,
  `talla` varchar(45) DEFAULT NULL,
  `id_implemento` int(11) DEFAULT NULL,
  `ruta_imagen_2` varchar(45) DEFAULT NULL,
  `ruta_imagen_3` varchar(45) DEFAULT NULL,
  `descripcion_detalle` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_implemento`),
  KEY `fk_detalle_implemento_idx` (`id_implemento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_implemento`
--

INSERT INTO `detalle_implemento` (`id_detalle_implemento`, `talla`, `id_implemento`, `ruta_imagen_2`, `ruta_imagen_3`, `descripcion_detalle`) VALUES
(1, 'XS, S, M, L, XL y XXL', 2, '20160906225245.png', '20160906225258.png', '<div><span style="color: inherit;">&lt;h1&gt;Soy un H1&lt;/h1&gt;</span></div><span style="background-color: rgb(255, 0, 0);">aaa</span> <span style="font-weight: bold;">sdfsdf &nbsp;</span><span style="font-style: italic;">sdfsd</span><div><span style="font-style: italic;"><br></span></div><div><span style="font-style: italic;"><table class="table table-bordered"><tbody><tr><td>sdf</td><td>sdf</td><td>sdf</td></tr><tr><td>sdf</td><td>sdf</td><td>sdf</td></tr></tbody></table><br></span></div>'),
(2, 'S', 1, '20160906225355.png', '20160906225406.png', 'Descripción'),
(3, 'S', 3, '20160906230905.png', '20160906230157.png', 'test'),
(4, 'Pequeña', 4, '20160906225753.png', '20160906225806.png', NULL),
(5, NULL, 5, '20160906225723.png', '20160906225734.png', NULL),
(6, NULL, 6, '20160906230219.png', '20160906230232.png', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_orden`
--

DROP TABLE IF EXISTS `detalle_orden`;
CREATE TABLE IF NOT EXISTS `detalle_orden` (
  `id_detalle_orden` int(11) NOT NULL AUTO_INCREMENT,
  `id_orden` int(11) DEFAULT NULL,
  `id_material` int(11) DEFAULT NULL,
  `cantidad_material` int(11) DEFAULT NULL,
  `observacion` varchar(300) DEFAULT NULL,
  `proveedor_1` int(11) DEFAULT '0',
  `proveedor_2` int(11) DEFAULT '0',
  `proveedor_3` int(11) DEFAULT '0',
  `proveedor_4` int(11) DEFAULT '0',
  `proveedor_5` int(11) DEFAULT '0',
  `proveedor_seleccion` int(11) DEFAULT NULL,
  `proveedor_mostrar` varchar(45) DEFAULT NULL,
  `valor_menor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_orden`),
  KEY `fk_detalle_orden_idx` (`id_orden`),
  KEY `fk_detalle_material_idx` (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_orden`
--

INSERT INTO `detalle_orden` (`id_detalle_orden`, `id_orden`, `id_material`, `cantidad_material`, `observacion`, `proveedor_1`, `proveedor_2`, `proveedor_3`, `proveedor_4`, `proveedor_5`, `proveedor_seleccion`, `proveedor_mostrar`, `valor_menor`) VALUES
(7, 0, 1, 2, 'hgfdsa', 0, 0, 0, 0, 0, NULL, NULL, NULL),
(8, 0, 2, 2, 'hgf', 0, 0, 0, 0, 0, NULL, NULL, NULL),
(9, 0, 2, 2, 'sedgh', 0, 0, 0, 0, 0, NULL, NULL, NULL),
(10, 0, 3, 2, 'sdfb', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL),
(11, 0, 2, 2, 'sedgh', 0, NULL, NULL, 0, 0, NULL, NULL, NULL),
(12, 0, 3, 2, 'sdfb', 0, NULL, NULL, 0, 0, NULL, NULL, NULL),
(13, 0, 2, 2, 'sedgh', 0, NULL, NULL, 0, 0, NULL, NULL, NULL),
(14, 0, 3, 2, 'sdfb', 0, NULL, NULL, 0, 0, NULL, NULL, NULL),
(15, 0, 1, 0, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL),
(31, 1, 2, 2, 'test', 1200, 1300, 1320, 0, 0, NULL, NULL, NULL),
(32, 1, 4, 3, 'test', 2300, 1800, 1300, 0, 0, NULL, NULL, NULL),
(33, 2, 5, 1, 'Test', 30000, 28900, 45000, 32000, 0, NULL, NULL, NULL),
(34, 2, 2, 3, 'Test', 1600, 1400, 1000, 2300, 0, NULL, NULL, NULL),
(35, 2, 1, 5, 'Test', 800, 900, 890, 1200, 0, NULL, NULL, NULL),
(36, 2, 3, 3, 'Test', 1300, 1500, 1800, 1000, 0, NULL, NULL, NULL),
(37, 2, 4, 2, 'Test', 2100, 2300, 1800, 1990, 0, NULL, NULL, NULL),
(38, 3, 2, 3, NULL, 400, 500, 0, 0, 0, NULL, NULL, NULL),
(39, 3, 3, 3, NULL, 800, 1200, 0, 0, 0, NULL, NULL, NULL),
(40, 4, 2, 2, 'hola soy una observaciónb', 1000, 800, 900, 1200, 0, NULL, NULL, NULL),
(41, 5, 5, 4, NULL, 32000, 28700, 46700, 0, 0, NULL, NULL, NULL),
(42, 5, 19, 2, NULL, 1200, 1300, 1300, 0, 0, NULL, NULL, NULL),
(43, 5, 20, 2, NULL, 900, 1000, 800, 0, 0, NULL, NULL, NULL),
(44, 5, 22, 7, NULL, 100, 200, 500, 0, 0, NULL, NULL, NULL),
(45, 5, 17, 7, NULL, 3200, 4000, 4300, 0, 0, NULL, NULL, NULL),
(46, 5, 10, 3, NULL, 9000, 12000, 6400, 0, 0, NULL, NULL, NULL),
(47, 5, 13, 2, NULL, 4000, 7000, 5000, 0, 0, NULL, NULL, NULL),
(48, 6, 2, 1, NULL, 1000, 1200, 0, 0, 0, NULL, NULL, NULL),
(49, 7, 9, 6, NULL, 1500, 1700, 0, 0, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_proveedores`
--

DROP TABLE IF EXISTS `detalle_proveedores`;
CREATE TABLE IF NOT EXISTS `detalle_proveedores` (
  `id_detalle_proveedores` int(11) NOT NULL AUTO_INCREMENT,
  `id_proveedor_material` int(11) DEFAULT NULL,
  `id_orden_material` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_proveedores`),
  KEY `fk_detalle_p_orden_idx` (`id_orden_material`),
  KEY `fk_detalle_p_proveedor_idx` (`id_proveedor_material`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_proveedores`
--

INSERT INTO `detalle_proveedores` (`id_detalle_proveedores`, `id_proveedor_material`, `id_orden_material`) VALUES
(60, 2, 1),
(61, 5, 1),
(62, 6, 1),
(71, 2, 2),
(72, 5, 2),
(73, 6, 2),
(74, 7, 2),
(75, 2, 4),
(76, 5, 4),
(77, 6, 4),
(78, 7, 4),
(81, 2, 3),
(82, 5, 3),
(89, 2, 5),
(90, 5, 5),
(91, 6, 5),
(92, 2, 6),
(93, 5, 6),
(94, 2, 7),
(95, 5, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(45) NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre_especialidad`) VALUES
(1, 'Plan General'),
(2, 'Electricidad'),
(3, 'Mecáníca Automotiz'),
(4, 'Mecánica Industrial'),
(5, 'Estructuras Metálicas'),
(6, 'Terminación en Contrucción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

DROP TABLE IF EXISTS `horario`;
CREATE TABLE IF NOT EXISTS `horario` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso_anual` int(11) DEFAULT NULL,
  `id_bloque` int(11) DEFAULT NULL,
  `dia_semana` varchar(45) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `fk_horario_curso_anual_idx` (`id_curso_anual`),
  KEY `fk_horario_bloque_idx` (`id_bloque`),
  KEY `fk_horario_profe_idx` (`id_profesor`),
  KEY `fk_horario_asignatura_idx` (`id_asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=297 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_curso_anual`, `id_bloque`, `dia_semana`, `id_profesor`, `id_asignatura`) VALUES
(1, 39, 1, 'lunes', 6, 2),
(2, 39, 2, 'lunes', 6, 2),
(3, 39, 3, 'lunes', NULL, NULL),
(4, 39, 4, 'lunes', NULL, NULL),
(5, 39, 5, 'lunes', NULL, NULL),
(6, 39, 6, 'lunes', NULL, NULL),
(7, 39, 7, 'lunes', NULL, NULL),
(8, 39, 8, 'lunes', NULL, NULL),
(9, 39, 9, 'lunes', NULL, NULL),
(10, 39, 10, 'lunes', NULL, NULL),
(11, 39, 1, 'martes', 6, 2),
(12, 39, 2, 'martes', 6, 2),
(13, 39, 3, 'martes', NULL, NULL),
(14, 39, 4, 'martes', NULL, NULL),
(15, 39, 5, 'martes', NULL, NULL),
(16, 39, 6, 'martes', NULL, NULL),
(17, 39, 7, 'martes', NULL, NULL),
(18, 39, 8, 'martes', NULL, NULL),
(19, 39, 9, 'martes', NULL, NULL),
(20, 39, 10, 'martes', NULL, NULL),
(21, 39, 1, 'miercoles', NULL, NULL),
(22, 39, 2, 'miercoles', NULL, NULL),
(23, 39, 3, 'miercoles', NULL, NULL),
(24, 39, 4, 'miercoles', NULL, NULL),
(25, 39, 5, 'miercoles', NULL, NULL),
(26, 39, 6, 'miercoles', NULL, NULL),
(27, 39, 7, 'miercoles', NULL, NULL),
(28, 39, 8, 'miercoles', NULL, NULL),
(29, 39, 9, 'miercoles', NULL, NULL),
(30, 39, 10, 'miercoles', NULL, NULL),
(31, 39, 1, 'jueves', NULL, NULL),
(32, 39, 2, 'jueves', NULL, NULL),
(33, 39, 3, 'jueves', NULL, NULL),
(34, 39, 4, 'jueves', NULL, NULL),
(35, 39, 5, 'jueves', NULL, NULL),
(36, 39, 6, 'jueves', NULL, NULL),
(37, 39, 7, 'jueves', NULL, NULL),
(38, 39, 8, 'jueves', NULL, NULL),
(39, 39, 9, 'jueves', 7, 1),
(40, 39, 10, 'jueves', 7, 1),
(41, 39, 1, 'viernes', NULL, NULL),
(42, 39, 2, 'viernes', NULL, NULL),
(43, 39, 3, 'viernes', NULL, NULL),
(44, 39, 4, 'viernes', NULL, NULL),
(45, 39, 5, 'viernes', NULL, NULL),
(46, 39, 6, 'viernes', NULL, NULL),
(47, 39, 7, 'viernes', NULL, NULL),
(48, 39, 8, 'viernes', NULL, NULL),
(49, 39, 9, 'viernes', NULL, NULL),
(50, 39, 10, 'viernes', NULL, NULL),
(51, 39, NULL, 'pendientes', 7, 1),
(52, 39, NULL, 'pendientes', 7, 1),
(53, 39, NULL, 'pendientes', NULL, NULL),
(54, 39, NULL, 'pendientes', NULL, NULL),
(55, 39, NULL, 'pendientes', NULL, NULL),
(56, 39, NULL, 'pendientes', NULL, NULL),
(57, 39, NULL, 'pendientes', NULL, NULL),
(58, 39, NULL, 'pendientes', NULL, NULL),
(243, 1, 1, 'lunes', 9, 11),
(244, 1, 2, 'lunes', 9, 11),
(245, 1, 3, 'lunes', 12, 6),
(246, 1, 4, 'lunes', 12, 6),
(247, 1, 5, 'lunes', NULL, NULL),
(248, 1, 6, 'lunes', NULL, NULL),
(249, 1, 7, 'lunes', NULL, NULL),
(250, 1, 8, 'lunes', NULL, NULL),
(251, 1, 9, 'lunes', NULL, NULL),
(252, 1, 10, 'lunes', NULL, NULL),
(253, 1, 1, 'martes', 14, 4),
(254, 1, 2, 'martes', 14, 4),
(255, 1, 3, 'martes', NULL, NULL),
(256, 1, 4, 'martes', NULL, NULL),
(257, 1, 5, 'martes', NULL, NULL),
(258, 1, 6, 'martes', NULL, NULL),
(259, 1, 7, 'martes', NULL, NULL),
(260, 1, 8, 'martes', NULL, NULL),
(261, 1, 9, 'martes', 10, 9),
(262, 1, 10, 'martes', 10, 9),
(263, 1, 1, 'miercoles', NULL, NULL),
(264, 1, 2, 'miercoles', NULL, NULL),
(265, 1, 3, 'miercoles', NULL, NULL),
(266, 1, 4, 'miercoles', NULL, NULL),
(267, 1, 5, 'miercoles', NULL, NULL),
(268, 1, 6, 'miercoles', NULL, NULL),
(269, 1, 7, 'miercoles', NULL, NULL),
(270, 1, 8, 'miercoles', NULL, NULL),
(271, 1, 9, 'miercoles', NULL, NULL),
(272, 1, 10, 'miercoles', NULL, NULL),
(273, 1, 1, 'jueves', 11, 3),
(274, 1, 2, 'jueves', 11, 3),
(275, 1, 3, 'jueves', NULL, NULL),
(276, 1, 4, 'jueves', NULL, NULL),
(277, 1, 5, 'jueves', NULL, NULL),
(278, 1, 6, 'jueves', NULL, NULL),
(279, 1, 7, 'jueves', NULL, NULL),
(280, 1, 8, 'jueves', NULL, NULL),
(281, 1, 9, 'jueves', NULL, NULL),
(282, 1, 10, 'jueves', NULL, NULL),
(283, 1, 1, 'viernes', NULL, NULL),
(284, 1, 2, 'viernes', NULL, NULL),
(285, 1, 3, 'viernes', NULL, NULL),
(286, 1, 4, 'viernes', NULL, NULL),
(287, 1, 5, 'viernes', 8, 8),
(288, 1, 6, 'viernes', 8, 8),
(289, 1, 7, 'viernes', NULL, NULL),
(290, 1, 8, 'viernes', NULL, NULL),
(291, 1, 9, 'viernes', NULL, NULL),
(292, 1, 10, 'viernes', NULL, NULL),
(293, 1, NULL, 'pendientes', 7, 1),
(294, 1, NULL, 'pendientes', 7, 1),
(295, 1, NULL, 'pendientes', 7, 1),
(296, 1, NULL, 'pendientes', 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `implemento`
--

DROP TABLE IF EXISTS `implemento`;
CREATE TABLE IF NOT EXISTS `implemento` (
  `id_implemento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_implemento` varchar(45) DEFAULT NULL,
  `descripcion_implemento` varchar(500) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `precio_implemento` int(11) DEFAULT NULL,
  `ruta_imagen` varchar(100) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  `stock_implemento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_implemento`),
  KEY `fk_implemento_categoria_idx` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `implemento`
--

INSERT INTO `implemento` (`id_implemento`, `nombre_implemento`, `descripcion_implemento`, `id_categoria`, `precio_implemento`, `ruta_imagen`, `vigencia`, `stock_implemento`) VALUES
(1, 'Buzo Deportivo', 'Un pantalón de buzo puede ser muy útil para la etapa de calentamiento o para realizar deporte.', 1, 25000, '20160906224917.png', 1, 1),
(2, 'Corbata', 'Banda o cinta adornada con bordados o flecos de oro y plata que se anuda en forma de lazo.', 1, 5000, '20160906225235.png', 1, 16),
(3, 'Insignia', 'Una insignia suele ser el emblema de una autoridad específica y generalmente de metal.', 2, 6500, '20160906230858.png', 1, 12),
(4, 'Libreta', 'Diseñada especialmente para lograr el mejor dialogo con los educadores de nuestros niños.', 3, 3000, '20160906234051.png', 1, 13),
(5, 'Polerón Curso', 'Conjunto deportivo de chaqueta o sudadera, suele ponerse sobre otras prendas.', 1, 8000, '20160906225712.png', 1, 19),
(6, 'Polera', 'Prenda de vestir que cubre desde el cuello hasta la cintura, con cuello alto y mangas largas.', 1, 8000, '20160906234124.png', 1, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_pago`
--

DROP TABLE IF EXISTS `info_pago`;
CREATE TABLE IF NOT EXISTS `info_pago` (
  `id_info_pago` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_titular` varchar(45) DEFAULT NULL,
  `numero_cuenta` varchar(45) DEFAULT NULL,
  `codigo_cvc` varchar(45) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `rut_comprador` varchar(45) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `id_carro_compra` int(11) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  PRIMARY KEY (`id_info_pago`),
  KEY `fk_pago_carro_idx` (`id_carro_compra`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `info_pago`
--

INSERT INTO `info_pago` (`id_info_pago`, `nombre_titular`, `numero_cuenta`, `codigo_cvc`, `fecha_vencimiento`, `rut_comprador`, `direccion`, `id_carro_compra`, `fecha_pago`) VALUES
(1, 'Cristian Canales', '4513680513300401', '123', '2017-02-01', NULL, 'Palmas de Mallorca 1763', 1, '2016-09-15 21:10:00'),
(2, 'Cristian Canales', '4513680513300401', '123', '2012-02-01', NULL, 'Palmas de Mallorca 1763', 2, '2016-09-15 21:10:00'),
(8, 'Diego San Martín Carvajal', '4513680513300401', '111', '2012-03-01', NULL, 'Villa San Francisco de Rauquen', 3, '2016-09-15 21:10:00'),
(9, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 4, '2016-09-15 21:10:00'),
(10, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 4, '2016-09-15 21:10:00'),
(11, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 4, '2016-09-15 21:10:00'),
(12, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 5, '2016-09-15 21:10:00'),
(13, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 6, '2016-09-15 21:10:00'),
(14, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 7, '2016-09-15 21:10:00'),
(15, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 8, '2016-09-15 21:10:00'),
(16, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 9, '2016-09-15 21:10:00'),
(17, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 10, '2016-09-15 21:10:00'),
(18, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 11, '2016-09-15 21:10:00'),
(19, NULL, 'PayPal Code', NULL, NULL, NULL, NULL, 12, '2016-09-15 21:10:00'),
(20, 'Cristian Canales', '4998471047263826', '111', '2015-02-01', NULL, 'Palmas de Mallorca 1763', 13, '2016-09-15 21:10:00'),
(21, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 14, '2016-09-15 21:10:00'),
(22, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 15, '2016-09-15 21:10:00'),
(23, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 16, '2016-09-15 21:10:00'),
(24, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 17, '2016-09-21 00:05:00'),
(25, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 18, '2016-09-21 00:20:00'),
(26, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 19, '2016-09-21 00:09:00'),
(27, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 20, '2016-09-24 04:09:11'),
(28, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 21, '2016-09-24 05:09:29'),
(29, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 22, '2016-09-24 05:09:55'),
(30, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 23, '2016-09-24 05:09:50'),
(31, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 24, '2016-09-24 05:09:35'),
(32, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 25, '2016-09-24 05:09:31'),
(33, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 26, '2016-09-24 05:09:05'),
(34, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 27, '2016-09-24 05:09:34'),
(35, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 28, '2016-09-24 05:09:14'),
(36, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 29, '2016-09-24 05:09:59'),
(37, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 30, '2016-09-24 05:09:01'),
(38, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 31, '2016-09-24 05:09:17'),
(39, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 32, '2016-09-24 05:09:51'),
(40, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 33, '2016-09-24 05:09:15'),
(41, 'Cristian Canales', '4513680513300401', '100', '2012-03-01', '12111111-1', 'Palmas de Mallorca 1763', 34, '2016-09-24 02:09:29'),
(42, 'Cristian Canales', '4513680513300401', '100', '2012-03-01', '12111111-1', 'Palmas de Mallorca 1763', 35, '2016-09-24 03:09:52'),
(43, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 36, '2016-09-24 06:09:13'),
(44, 'Cristian Canales', '4513680513300401', '100', '2012-03-01', '12111111-1', 'Palmas de Mallorca 1763', 37, '2016-09-24 03:09:22'),
(45, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 38, '2016-09-24 12:09:01'),
(46, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 39, '2016-09-24 12:09:10'),
(47, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 40, '2016-09-24 12:09:42'),
(48, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 41, '2016-09-24 12:09:25'),
(49, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 42, '2016-09-24 12:09:08'),
(50, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 43, '2016-09-24 12:09:12'),
(51, NULL, 'PayPal Code', NULL, NULL, '12111111-1', NULL, 44, '2016-09-24 01:09:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

DROP TABLE IF EXISTS `libro`;
CREATE TABLE IF NOT EXISTS `libro` (
  `id_libro` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_libro` int(11) DEFAULT NULL,
  `rango_libro` varchar(45) DEFAULT NULL,
  `titulo_libro` varchar(100) DEFAULT NULL,
  `autor_libro` varchar(45) DEFAULT NULL,
  `editorial_libro` varchar(45) DEFAULT NULL,
  `estado_libro` varchar(45) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  `valor_unitario` int(11) DEFAULT NULL,
  `origen` varchar(45) DEFAULT NULL,
  `observacion` varchar(100) DEFAULT NULL,
  `fecha_recepcion` date DEFAULT NULL,
  PRIMARY KEY (`id_libro`)
) ENGINE=InnoDB AUTO_INCREMENT=1303 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id_libro`, `codigo_libro`, `rango_libro`, `titulo_libro`, `autor_libro`, `editorial_libro`, `estado_libro`, `cantidad`, `vigencia`, `valor_unitario`, `origen`, `observacion`, `fecha_recepcion`) VALUES
(1, 2109, '2109-2111', 'La ciudad y los perros', 'Mario vargas llosa', 'Winacocha', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(2, 2112, '2112', 'Antologia de leyendas', 'Alfonso calderon', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(3, 2113, '2113', 'Antologia poetica', 'Hugo montes', 'Santillana', 'Bueno', 0, 1, 2000, 'R. propios', NULL, NULL),
(4, 2114, '2114-2127', 'Obra reunida poesia n', 'Oscar castro', 'Andes', 'Bueno', 13, 1, 3000, 'Donacion', NULL, NULL),
(5, 2128, '2128-2141', 'Obra reunida poesia n', 'Oscar castro', 'Andes', 'Bueno', 13, 1, 3000, 'Donacion', NULL, NULL),
(6, 2141, '2142', 'El teniente 1927-1940', 'Jose luis granese', 'Universidad', 'Bueno', 0, 1, 2000, 'Donacion', NULL, NULL),
(7, 2143, '2143-2144', 'Fisica i y ii', 'Resnick', 'Continental', 'Bueno', 2, 1, 7000, 'Donacion', NULL, NULL),
(8, 2145, '2145', 'Diccionario tecnico ingles-espa', 'Omega', 'Omega', 'Bueno', 0, 1, 20000, 'Donacion', NULL, NULL),
(9, 2146, '2146', 'Diccionario de electronica ingles-espa', 'Omega', 'Omega', 'Bueno', 1, 1, 20000, 'Donacion', NULL, NULL),
(10, 2147, '2147', 'Algebra curso de matematica', 'Fco. pros chile', 'No presenta', 'Bueno', 1, 1, 3000, 'Donacion', NULL, NULL),
(11, 2148, '2148-2155', 'Escuela del tecnico mecanico', '', 'Lavor', 'Bueno', 8, 1, 10000, 'Donacion', NULL, NULL),
(12, 2156, '2156-2157', 'Manual universal de la tecnica mecanica', 'Erik oberg', 'Lavor', 'Bueno', 2, 1, 10000, 'Donacion', NULL, NULL),
(13, 2158, '2158', 'Secretos del cosmo', 'Colin a. roman', 'Salvat', 'Bueno', 1, 1, 6000, 'Donacion', NULL, NULL),
(14, 2159, '2159', 'El enfemo imaginario', 'Moliere', 'Salvat', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(15, 2160, '2160', 'La busca', 'Pio barroja', 'Salvat', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(16, 2161, '2161-2163', 'Resumen de la historia de chile i-ii-iii', 'Francisco encina', 'Zig-zag', 'Bueno', 3, 1, 15000, 'Donacion', NULL, NULL),
(17, 2164, '2164', 'Quien se ha llevado mi queso', 'Spenser johnson', 'Eurano', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(18, 2165, '2165', 'Niebla', 'Miguel unamuno', 'Universitaria', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(19, 2166, '2166', 'Cuentos de amor locura y muerte', 'Horacio quiroga', 'Prosa', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(20, 2167, '2167', 'La vida simplemente', 'Oscar castro', 'Andres bello', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(21, 2168, '2168', 'A orillas del rio piedras me sente y llore', 'Paulo coelo', 'Grijaldo', 'Bueno', 1, 1, 3000, 'Donacion', NULL, NULL),
(22, 2169, '2169-2172', 'Tec. prac. para la tec. del automovil', 'Deutsche', 'Gtz', 'Bueno', 4, 1, 30000, 'Donacion', NULL, NULL),
(23, 2173, '2173-2178', 'Tec. prac. para la tec. del automovil (solu)', 'Deutsche', 'Gtz', 'Bueno', 6, 1, 30000, 'Donacion', NULL, NULL),
(24, 2179, '2179-2190', 'Mat. aplic. para la tec. del automovil', 'Deutsche', 'Gtz', 'Bueno', 12, 1, 30000, 'Donacion', NULL, NULL),
(25, 2191, '2191-2193', 'Mat. aplic. para la tec. del automovil', 'Deutsche', 'Gtz', 'Bueno', 3, 1, 3000, 'R. propios', NULL, NULL),
(26, 2194, '2194', 'Mat. aplic. para tecnicas mecanicas', 'Deutsche', 'Gtz', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(27, 2195, '2195', 'Conc. basico de matematicas moderno', 'Roberto hernandez', 'Codex', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(28, 2196, '2196', 'La europa del renacimiento', 'Bartolome', 'Anaya', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(29, 2197, '2197', 'La alta edad media', 'Julio valdion', 'Anaya', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(30, 2198, '2198', 'La evaluacion de valores y actitudes', 'Antonio bolivar', 'Anaya', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(31, 2199, '2199', 'Ecogeografia nueva geografia de chile', 'Pilar cereceda', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(32, 2200, '2200-2203', 'Aritmetica teorico-practico', 'Aurelio  baldor', 'Centroamerica', 'Bueno', 4, 1, 3000, 'R. propios', NULL, NULL),
(33, 2204, '2204-2205', 'Enciclopedia hispanica i y ii', 'Britannica', 'Britannica', 'Bueno', 2, 1, 10000, 'R. propios', NULL, NULL),
(34, 2206, '2206-2221', 'Enciclopedia hispanica ', 'Britannica', 'Britannica', 'Bueno', 16, 1, 10000, 'R. propios', NULL, NULL),
(35, 2222, '2222-2223', 'La fisica en sus apicaciones', 'Alberto maiztegui', 'Kapelusz', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(36, 2223, '2224', 'Atlas universal', 'Alejandro rios', 'Zig-zag', 'Bueno', 1, 1, 500000, 'R. propios', NULL, NULL),
(37, 2225, '2225-2226', 'Atlas geografico militar de chile', 'Igm', 'Igm', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(38, 2227, '2227', 'Don quijote de la mancha iv', 'Miguel de cervantes', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(39, 2228, '2228', 'Atlas univ. de chile regionalizado', '', '', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(40, 2229, '2229-2232', 'Consultor matematico', 'Licenciado l. galdos', 'Cultural ca', 'Bueno', 4, 1, 5000, 'R. propios', NULL, NULL),
(41, 2233, '2233-2235', 'Enciclopedia audiovisual-educativa', 'Oceano', 'Oceano', 'Bueno', 3, 1, 6000, 'R. propios', NULL, NULL),
(42, 2236, '2236-2238', 'Tecnologia mecanica procesos y materiales', 'R.l. timings', 'Alfaomega', 'Bueno', 3, 1, 3000, 'R. propios', NULL, NULL),
(43, 2239, '2239-2240', 'Historia de la literatura chilena i-ii', 'Maximino fernandez', 'Salesiana', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(44, 2241, '2241-2248', 'Historia de la tecnologia 1-5', 'Trevor williams', 'Xxi', 'Bueno', 8, 1, 2000, 'R. propios', NULL, NULL),
(45, 2249, '2249-2252', 'El valle y la monta', 'Oscar castro', 'Del pacifico', 'Bueno', 4, 1, 2000, 'R. propios', NULL, NULL),
(46, 2253, '2253', 'Diccionario de filosofia', 'Nicola abbagnano', 'Fce', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(47, 2254, '2254', 'Diccionario de la lengua espa', 'Cultura', 'Cultura', 'Bueno', 1, 1, 7000, 'R. propios', NULL, NULL),
(48, 2255, '2255', 'Graduado escolar matematico', 'Ceac', 'Ceas', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(49, 2256, '2256', 'Geometria', 'Clemens', 'Addison  wesley', 'Bueno', 1, 1, 4000, 'R. propios', NULL, NULL),
(50, 2257, '2257', 'Para que no me olvides', 'Marcela serrano', 'Los andes', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(51, 2258, '2258', 'Breve historia de la quimica', 'Isaac asimov', 'Alianza', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(52, 2259, '2259', 'La iglesia de nuestra fe', 'Luis kosters', 'Tomas lj.', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(53, 2260, '2260', 'Ser mujer hoy y ma', 'Neva milicic', 'Sudamericana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(54, 2261, '2261', 'Reivindicacion etica de lasexualidad', 'Tony mifsud', 'San pablo', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(55, 2262, '2262', 'Tecnologia de los metales', 'Deutsche', 'Gtz', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(56, 2263, '2263', 'Las manos sucias', 'Jean paul saltre', 'Losada', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(57, 2264, '2264', 'Ciencias la reproduccion humana', 'Britannica', 'Britannica', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(58, 2265, '2265', 'Ser mujer hoy y ma', 'Neva milicic', 'Sudamericana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(59, 2266, '2266', 'Hungria pintoresca', 'Elemer de miklos', 'Zig- zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(60, 2267, '2267', 'Cuentos chilenos contemporaneos', 'Varios autores', 'Andres bello', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(61, 2268, '2268', 'Monta', 'Olga aguilera', '"o""higgins"', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(62, 2269, '2269', 'La revolucion de la independencia', 'Domingo amunathegui', 'Univ. chile', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(63, 2271, '2271', 'Instalaciones agricolas', 'Luis martinez perez', 'Ca', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(64, 2272, '2272', 'El medico a palos', 'Moliere', 'Edaf', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(65, 2273, '2273', 'El decameron', 'Boccacio', 'Cia. general', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(66, 2274, '2274', 'Al descubrimiento', 'Ierrekohleer', 'Limusa', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(67, 2275, '2275', 'Esbozo biograficos y pasatiempos mat.', 'Mariano matix', 'Marcombo', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(68, 2276, '2276', 'Poesia chilena contemporanea', 'Nain nomes', 'Andres bello', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(69, 2277, '2277', 'Doce cuentos peregrinos', 'G.g.marquez', 'Sudamericana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(70, 2278, '2278', 'Antologia del cuento moderno', 'Cesar ecchi', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(71, 2279, '2279', 'Cristo en torremolinos', 'Jose maria ', 'Del pacifico', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(72, 2280, '2280', 'Las migajas de la creacion', 'John lenianh', 'Alianza', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(73, 2281, '2281', 'La novela chilena los mitos degradados', 'Cdomil goic', 'Universitaria', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(74, 2282, '2282', 'Perico trepa por chile', 'Marcela paz', 'Universitaria', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(75, 2283, '2283', 'Quimica para ni', 'Jamice vancleave', 'Limusa', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(76, 2284, '2284', 'Chile 1970-1973', 'Sergio vitar', 'Phd', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(77, 2285, '2285', 'Tecnicas modernas de redaccion', 'Ma. de lourdes', 'Harla', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(78, 2286, '2286', 'Conversaciones con la narrativa chilena', 'Juan andres pi', 'Los andes', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(79, 2287, '2287', 'Historia de la tecnologia', 'Gregor william', 'Xxi', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(80, 2288, '2288', 'La energia en experiencia', 'Williams garcia', 'Aka', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(81, 2289, '2289', 'Por un aprendizaje contructivista', 'Montse benlloch', 'Visor', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(82, 2290, '2290', 'El desarrollo de la tecnologia', 'Fernando alba', 'Cep', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(83, 2291, '2291', 'La revolucion industrial', 'Antonio escudero', 'Anaya', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(84, 2292, '2292', 'Iso 9000', 'Luis felipe sousa', 'Erika', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(85, 2293, '2293', 'Como se comenta un libro literario', 'Fernando lazaro', 'Catedra', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(86, 2294, '2294', 'Tablas de la tecnica del automovil', 'G. hamm', 'Reverte', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(87, 2295, '2295', 'Peque', 'Albrecht timm', 'Guarrama', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(88, 2296, '2296', 'Historia de las tecnicas', 'Plucasse', 'Universitaria', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(89, 2297, '2297-2298', 'Mecanica de taller soldaduras y uniones', 'Cultural', 'Cultural', 'Bueno', 2, 1, 3000, 'R. propios', NULL, NULL),
(90, 2299, '2299', 'Mec. de taller materiales  metrologia', 'Cultural', 'Cultural', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(91, 2300, '2300', 'Mecanica de taller prensas', 'Cultural ', 'Cultural', 'Bueno', 1, 1, 4000, 'R. propios', NULL, NULL),
(92, 2301, '2301-2302', 'Mec. de taller metro. ii,torno y fresadora', 'Cultural', 'Cultural', 'Bueno', 2, 1, 3000, 'R. propios', NULL, NULL),
(93, 2303, '2303-2304', 'Mecanica de taller prensa', 'Cultural', 'Cultural', 'Bueno', 2, 1, 3000, 'R. propios', NULL, NULL),
(94, 2305, '2305-2307', 'Manual de mantenimiento industrial ii-iv-v', 'Robert rosaler', 'Mcgraw-hill', 'Bueno', 3, 1, 4000, 'R. propios', NULL, NULL),
(95, 2308, '2308-2310', 'Manual de soldadura electrca i-ii-iii', 'Massimo vladimiro', 'Ciencia y tecnica', 'Bueno', 3, 1, 3000, 'R. propios', NULL, NULL),
(96, 2310, '2311', 'Manual de mecanica industrial solda. y mat.', 'Cultural', 'Cultural', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(97, 2312, '2312-2313', 'Manual de mec. indus. neumatica e hidraulica', 'Cultural', 'Cultural', 'Bueno', 2, 1, 3000, 'R. propios', NULL, NULL),
(98, 2314, '2314', 'Man. de mec. indus. automat. y robotica', 'Cultural', 'Cultural', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(99, 2315, '2315', 'Man. de mec. indus. maq. y control numerico', 'Cultural', 'Cultural', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(100, 2316, '2316-2318', 'Resistencia de materiales', 'William nash', 'Mcgraw-hill', 'Bueno', 3, 1, 2000, 'R. propios', NULL, NULL),
(101, 2319, '2319-2322', '1015 juegos y formas de jugadas de iniciacion', 'Gerald lasierra', 'Paidotrigo', 'Bueno', 4, 1, 2000, 'R. propios', NULL, NULL),
(102, 2323, '2323-2324', 'Nueva guia de la ciencia', 'Isaac aasimo', 'Plaza y james', 'Bueno', 2, 1, 3000, 'R. propios', NULL, NULL),
(103, 2325, '2325-2326', 'Ciencia e ingenieria de los materiales', 'William callister', 'Reverte', 'Bueno', 2, 1, 4000, 'R. propios', NULL, NULL),
(104, 2327, '2327-2328', 'Nuevo testamento', 'Cristiano', 'Cristiano', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(105, 2329, '2329', 'Curso elemental para el trabajo de los met.', 'Bbf', 'Bbf', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(106, 2330, '2330', 'Hidraulica', 'Bbf', 'Bbf', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(107, 2331, '2331-2333', 'Refrigeracion', 'Juan antonio ramirez', 'Ca', 'Bueno', 3, 1, 4000, 'R. propios', NULL, NULL),
(108, 2334, '2334-2336', 'Diccionario de enegia', 'V. daniel hunt', 'Marcomo', 'Bueno', 3, 1, 2000, 'R. propios', NULL, NULL),
(109, 2337, '2337-2339', 'Arte rupestre precolombino en el tingui.', 'Victor leon vargas', 'Grafica esconpio', 'Bueno', 3, 1, 2000, 'R. propios', NULL, NULL),
(110, 2340, '2340-2341', 'El proyectista de estrc. metalicas i-ii', 'Rnon. nast', 'Paraninfo', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(111, 2342, '2342', 'Manual de soldadura', '', '', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(112, 2343, '2343', 'Manual del industrial', 'Comp. de redact.', '', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(113, 2344, '2344', '101 esquemas de bobinas de corriente de agua', 'Jose ramirez', 'Ca', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(114, 2345, '2345', 'Dinamicas de grupo para la comunicacion', '', '', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(115, 2346, '2346', 'Iniciacion a los deportes de equipo', 'Domingo blazquez', 'Matinez roca', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(116, 2347, '2347', 'Manual del ingeniero mecanico', 'Baumeister', 'Mcgraw- hill', 'Bueno', 1, 1, 4000, 'R. propios', NULL, NULL),
(117, 2348, '2348', 'Metrologia geometrica dimensional', 'Roberto galacia', 'Agt', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(118, 2349, '2349', 'Tecnologia moderna vol 14', 'Salvat', 'Salvat', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(119, 2350, '2350', 'Tratado general de soldarura', 'Paul schimpke', 'Gili', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(120, 2351, '2351', 'Psicologia y pedagogia', 'Luria acar', '', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(121, 2352, '2352', 'Formacion de palabras al espa', 'Mevyn ', 'Catedra', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(122, 2353, '2353', 'La escuela y el tecnico mecanico', 'Gerie g.', 'Lavor', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(123, 2354, '2354', 'Tecnologia de los metales', 'Hans appold', 'Reverte', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(124, 2355, '2355', 'Hechos consumados', 'Juan radrigan', 'Lom', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(125, 2356, '2356', 'Los generos literarios sistema e historia', 'Antonio garcia', 'Catedra', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(126, 2357, '2357', 'Tecnicas modernas de redaccion', 'M. de lourdes', 'Hala', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(127, 2358, '2358', 'Ingenieria didacticas en educ.matematicas', 'Michele artigue', 'Iberoamerica', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(128, 2359, '2359', 'Los arboles de oro', 'Ramon carnicer', 'Seix barral', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(129, 2360, '2360', 'Confesiones de escritores', 'Dthe paris review', 'El ateneo', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(130, 2361, '2361', 'El enfonque comunic. de la ens. de la lengua', 'Carlos lomas', 'Pai dos', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(131, 2362, '2362', 'Bodas de sangre ', 'Federico garcia lorca', 'Andres bello', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(132, 2363, '2363', 'El rey lear', 'Wiliam shakespiare', 'Castilia', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(133, 2364, '2364', 'Hombres del sur', 'Manuel rojas', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(134, 2365, '2365', 'Aborig. chilenos ', 'Horacio zapatero', 'Andres bello', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(135, 2366, '2366', 'Crimen y castigos', 'Fedor dostoyevski', 'Bruguera', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(136, 2367, '2367', 'Cien a', 'G.g. marquez', 'Origen', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(137, 2368, '2368', 'Don juan tenorio', 'Jose zorrilla', 'Ercilla', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(138, 2369, '2369', 'El velero en la botella', 'Jorge diaz ', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(139, 2370, '2370', 'Manual de la creatividad', 'R. marin', 'Vives', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(140, 2371, '2371', 'Ortog. y redaccion para secretarias', 'Maqueo ', 'Lirmusa', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(141, 2372, '2372', 'Terminos literarios', 'Consuelo garcia', 'Akal', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(142, 2373, '2373', 'La voragine', 'Jose rivera', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(143, 2374, '2374', 'Dinamica de grupo', 'Balduino', 'Andreola', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(144, 2375, '2375', 'Bombas y centrifugas', 'E. carnicer', 'Paraninfo', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(145, 2376, '2376', 'La escuela y el tecnico mecanico', 'I. lana', 'Labor', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(146, 2377, '2377', 'Curso de tec. y construc. mecanicas', 'Orlando', 'Igm', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(147, 2378, '2378', 'El roto', 'Joaquin eduards', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(148, 2379, '2379', 'Hijo de ladron', 'Manuel rojas ', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(149, 2380, '2380', 'Torneado', 'J. jacob', 'Tecnica', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(150, 2381, '2381', 'Ajuste', 'J. poblet', 'Tecnica', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(151, 2382, '2382', 'En nuestra tierra huasa del colchagua', 'Victor leon', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(152, 2383, '2383', 'Calculo profes para mec. ajusadores', 'Neimann', 'Jbw', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(153, 2384, '2384', 'Estampado y matrizado de metales', 'Montenzon', 'Montenzon', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(154, 2385, '2385', 'Carpinteria y ebanisteria', 'Groneman', 'Mc graw hill', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(155, 2386, '2386', 'Muebles tapizados', 'Mario del fabro', 'Ceac', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(156, 2387, '2387', 'Alambique', 'Grao', 'Grao', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(157, 2388, '2388', 'Lo que todo peque', 'Robet nelson', 'Alfaomega', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(158, 2389, '2389', 'Invitacion a la biologia', 'Panamericana', 'Panamericana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(159, 2390, '2390', 'Cartografia cultural de chile', 'Ocho libros', 'Ocho libros', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(160, 2391, '2391', 'Cezanne', 'Cezanne', 'Cercle', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(161, 2392, '2392', 'Opazo', 'Rodolfo opazo', 'Almagro', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(162, 2393, '2393', '100 gran angular', 'Emilio ortega', 'Cm', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(163, 2394, '2394', 'Manual de pedagogia teatral', 'Veronica garcia ', 'Los andes', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(164, 2395, '2395', 'La generacion del 98', 'Donald chaw', 'Catedra', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(165, 2396, '2396', 'Diccionario de la literatura chilena', 'Efrai n szmulewicz', 'Andres bello', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(166, 2397, '2397', 'Tecnologia de los procesos de soldadura', 'P. t. houlcroft', 'Ceac', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(167, 2398, '2398', 'Recibidores y pasillos', 'Juan decusa', 'Ceac', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(168, 2399, '2399', 'Aritmetica y raciones de algebra', 'Manuel  lara', 'San francisco', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(169, 2400, '2400', 'Tecnicas y aprendizaje y estudio', 'Artus nogerol', 'Grau', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(170, 2401, '2401', 'Algebra y trigonometria con geometria', 'Virgilio gonzalez', 'Iberoamerica', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(171, 2402, '2402', 'Historia de las literat. antiguas y modernas', 'Ramon perez', 'Sopena', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(172, 2403, '2403', 'Inventado la empresa del xxi', 'Fernando flores', 'Dolmen', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(173, 2404, '2404', 'Cont. fundamentales de ddhh para la educ.', 'Lorena escalona', 'Andes', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(174, 2405, '2405', 'Los dd.hh. documentos basicos 2', 'Maximo pacheco', 'Juridica de chile', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(175, 2406, '2406', 'Control de riesgo de accidentes mayores', 'Alfaomega', 'Alfaomega', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(176, 2407, '2407', 'Seguridad e higiene de trabajo', 'Jose cortes', 'Alfaomega', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(177, 2408, '2408', 'Oliver twist', 'Charles dickens', 'Ercilla', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(178, 2409, '2409', 'Hamlet', 'W. shakespeare', 'Universitaria', 'Bueno', 1, 1, 1000, 'Rep. n 11', NULL, NULL),
(179, 2410, '2410-2411', 'Poemas y antipoemas', 'Nicanor parra', 'Catedra', 'Bueno', 2, 1, 3000, 'Rep. n 48-49', NULL, NULL),
(180, 2412, '2412', 'El se', 'Miguel angel asturias', 'Minelium', 'Bueno', 1, 1, 3000, 'Rep. n 73', NULL, NULL),
(181, 2413, '2413', 'Cuentos de la selva', 'Horacio quiroga', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 98', NULL, NULL),
(182, 2414, '2414', 'Rimas', 'Gustavo adolfo becqeer', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 100', NULL, NULL),
(183, 2415, '2415', 'Antologia de un cuento chileno moderno', 'Alfonso  calderon', 'Universitaria', 'Bueno', 1, 1, 4000, 'Rep. n 137', NULL, NULL),
(184, 2416, '2416', 'Leonardo da vinci', 'Leonardio da vinci', 'Icarito', 'Bueno', 1, 1, 1000, 'Rep. n 232', NULL, NULL),
(185, 2417, '2417', 'Cartas filosoficas', 'Voltaire', 'Ercilla', 'Bueno', 1, 1, 2000, 'Rep. n 288', NULL, NULL),
(186, 2418, '2418', 'Fisiologia humana', 'Steiner- middleton', 'Universitaria', 'Bueno', 1, 1, 6000, 'Rep. n 296', NULL, NULL),
(187, 2419, '2419', 'Antologia', ' gustavo adolfo becker', 'Salvat', 'Bueno', 1, 1, 1000, 'Rep. n 365', NULL, NULL),
(188, 2420, '2420', 'Rebelde magnifica ', 'Matilde ladron de gevara', 'Losada', 'Bueno', 1, 1, 5000, 'Rep. n 384', NULL, NULL),
(189, 2421, '2421', 'Los mejores sonetos', 'Pablo neruda', 'Andres bello', 'Bueno', 1, 1, 2000, 'Rep. n391', NULL, NULL),
(190, 2422, '2422', 'Balmaceda', 'Cecilia garcia', 'Zig-zag', 'Bueno', 1, 1, 2000, 'Rep. n 395', NULL, NULL),
(191, 2423, '2423', 'Dialogos escojidos', 'Platon', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep.n 514', NULL, NULL),
(192, 2424, '2424-2425', 'Principito', 'A. desaint', 'Colicheuque', 'Bueno', 2, 1, 1000, 'Rep. n 527-528', NULL, NULL),
(193, 2426, '2426', 'Hamlet', 'W. shakespeare', 'Salvat', 'Bueno', 1, 1, 4000, 'Rep. n 536', NULL, NULL),
(194, 2427, '2427', 'La republica', 'Platon ', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 551', NULL, NULL),
(195, 2428, '2428-2430', 'Antologia poetica g. mistral', 'Gabriela mistral', 'Tacora', 'Bueno', 3, 1, 2000, 'Rep. n 738-740', NULL, NULL),
(196, 2431, '2431-2433', 'Antologia poetica ', 'Ruben dario', 'Ercilla', 'Bueno', 3, 1, 1000, 'Rep. n 819-821', NULL, NULL),
(197, 2433, '2434', 'Abel sanchez', 'Miguel deunamuno', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 851', NULL, NULL),
(198, 2435, '2435-2439', 'Don quijote de la mancha 1', 'Miguel de cervantes', 'Ercilla', 'Bueno', 5, 1, 2000, 'Rep. n 909-913', 'test', '2016-12-13'),
(199, 2440, '2440-2445', 'Don quijote de la mancha 2', 'Miguel de cervantes', 'Ercilla', 'Bueno', 6, 1, 2000, 'Rep. n 933-938', NULL, NULL),
(200, 2446, '2446', 'Don quijote de la mancha iv', 'Miguel de cervantes', 'Ercilla', 'Bueno', 1, 1, 2000, 'Rep. n 988', NULL, NULL),
(201, 2447, '2447', 'El lazarillo de tornes', 'Anonimo', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 1040', NULL, NULL),
(202, 2448, '2448', 'Niebla', 'Miguel deunamuno', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 1088', NULL, NULL),
(203, 2449, '2449-2455', 'Niebla', 'Miguel deunamuno', 'Colicheuque', 'Bueno', 7, 1, 1000, 'Rep. n1091-1097', NULL, NULL),
(204, 2456, '2456-2457', 'Poemas (poesia selecta)', 'J. mandriquez', 'Ercilla', 'Bueno', 2, 1, 2000, 'Rep. n 1150-1151', NULL, NULL),
(205, 2458, '2458', 'Dibujo tecnico', 'Iven palma', 'Salesiana', 'Bueno', 1, 1, 4000, 'Rep.n 1490', NULL, NULL),
(206, 2459, '2459', 'Sobre la educ. cristiana y la ens. de chile', 'Cristiana', 'Cristiana', 'Bueno', 1, 1, 4000, 'Rep. n 1534', NULL, NULL),
(207, 2460, '2460', 'El  tunel', 'Ernesto sabato', 'No presenta', 'Bueno', 1, 1, 1000, 'Rep. n 1550', NULL, NULL),
(208, 2461, '2461-2463', 'Don  quijote de la mancha', 'Miguel de cervantes', 'Zig-zag', 'Bueno', 3, 1, 2000, 'Rep. n 1554-1557', NULL, NULL),
(209, 2464, '2464-2466', 'Dicc. sinonimos y antonimos', 'Zig-zag', 'Zig-zag', 'Bueno', 3, 1, 1000, 'Rep. n1569-1571', NULL, NULL),
(210, 2467, '2467', 'Premios novel de la literatura', 'Victor gutierrez', 'Zig-zag', 'Bueno', 1, 1, 2000, 'Rep. n 1575', NULL, NULL),
(211, 2468, '2468', 'Cultura mapuche', '', 'Pionero musical', 'Bueno', 1, 1, 1000, 'Rep. n 1592', NULL, NULL),
(212, 2469, '2469', 'Aventura de robinson cruose', 'Daniel defoe', 'Zig-zag', 'Bueno', 1, 1, 1000, 'Rep. n 1597', NULL, NULL),
(213, 2470, '2470', 'Algebra ( francisco prochile)', 'Francisco proschle', 'Ceres', 'Bueno', 1, 1, 3000, 'Rep. n 1601', NULL, NULL),
(214, 2471, '2471-2472', 'Dicc. espa', 'Zig-zag', 'Zig-zag', 'Bueno', 2, 1, 2000, 'Rep. n1606-1607', NULL, NULL),
(215, 2473, '2473', 'Las llaves del reino', 'A. j. cronin', 'Interamericana', 'Bueno', 1, 1, 5000, 'Rep. n 1616', NULL, NULL),
(216, 2474, '2474', 'Edipo rey', 'Soclocles', 'Zig-zag', 'Bueno', 1, 1, 1000, 'Rep. n 1617', NULL, NULL),
(217, 2475, '2475', 'Algebra (baldor)', 'Francisco proschle', 'Occidente', 'Bueno', 1, 1, 10000, 'Rep. n 1620', NULL, NULL),
(218, 2476, '2476', 'Geometria', 'Ximena carre', 'Arrayan', 'Bueno', 1, 1, 15000, 'Rep. n 1621', NULL, NULL),
(219, 2477, '2477-2478', 'Biografias escritores espa', '', 'Portada', 'Bueno', 2, 1, 2000, 'Rep. n 1630-1631', NULL, NULL),
(220, 2479, '2479-2481', 'Biografias escritores universales', '', '', 'Bueno', 3, 1, 2000, 'Rep. n1643-1645', NULL, NULL),
(221, 2482, '2482-2483', 'Grandes escritores  universales', 'Mora gladys', 'Colec. apuntes', 'Bueno', 2, 1, 2000, 'Rep. n1656-1657', NULL, NULL),
(222, 2484, '2484-2485', 'Edipo rey', 'Sofocles', 'Prosa', 'Bueno', 2, 1, 1000, 'Rep. n1696-1697', NULL, NULL),
(223, 2486, '2486-2487', 'Romeo y julieta', 'William shakespeare', 'Colicheuque', 'Bueno', 2, 1, 1000, 'Rep. n1698-99', NULL, NULL),
(224, 2488, '2488-2490', 'Historia de la musica', 'Pionero musical', 'Pionero musical', 'Bueno', 3, 1, 1000, 'Rep. n', NULL, NULL),
(225, 2491, '2491', 'Algebra moderna tomo i', '', '', 'Bueno', 1, 1, 15000, 'Rep. n 1830', NULL, NULL),
(226, 2492, '2492', 'Algebra (fco. prochile)', 'Francisco proschle', 'Occidente', 'Bueno', 1, 1, 3000, 'Rep. n 1838', NULL, NULL),
(227, 2493, '2493', 'Dicc. de sinonimos', 'Occidente', 'Occidente', 'Bueno', 1, 1, 2000, 'Rep. n 1927', NULL, NULL),
(228, 2494, '2494', 'Dicc. ilustrado de la lengua esp.', 'Zig-zag', 'Zig-zag', 'Bueno', 1, 1, 3000, 'Rep. n  1928', NULL, NULL),
(229, 2495, '2495', 'Revista chilena de historia y geografia', 'Raul silva', 'Hs', 'Bueno', 1, 1, 10000, 'Rep. n 1996', NULL, NULL),
(230, 2496, '2496', 'Leyendas y episodios nacionales', 'Aurelio diaz', 'Nascimiento', 'Bueno', 1, 1, 5000, 'Rep. n 2003', NULL, NULL),
(231, 2497, '2497', 'Arte colonial', 'Enrique melcherts', 'Parera', 'Bueno', 1, 1, 6000, 'Rep. n 2014', NULL, NULL),
(232, 2498, '2498', '20 pintores contemporaneos en chile', 'Pionero musical', 'Pionero musical', 'Bueno', 1, 1, 1000, 'Rep. n  2015', NULL, NULL),
(233, 2499, '2499', 'De la tierra a la luna', 'Julio verne', 'Sopena', 'Bueno', 1, 1, 1000, 'Rep. n 2037', NULL, NULL),
(234, 2500, '2500', 'Poesia prosa', 'Gabriela mistral', 'Pehuen', 'Bueno', 1, 1, 2000, 'Rep. n 2040', NULL, NULL),
(235, 2501, '2501', 'Antologia poetica', 'Antonio machado', 'Ercilla', 'Bueno', 1, 1, 1000, 'Rep. n 2041', NULL, NULL),
(236, 2502, '2502', 'La remolienda arturo y angel (c. de teatro)', 'Alejandro sieveking', 'Universitaria', 'Bueno', 1, 1, 5000, 'Rep. n 2055', NULL, NULL),
(237, 2503, '2503', 'Chile a color', 'Antartica', 'Antartica', 'Bueno', 1, 1, 15000, 'Rep. n', NULL, NULL),
(238, 2504, '2504', 'Algebra', 'Francisco proschle', 'Occidente', 'Bueno', 1, 1, 3000, 'Rep. n 2256', NULL, NULL),
(239, 2505, '2505-2506', 'Libro jose gregorio argomedo', 'Victor leon', 'Sm', 'Bueno', 2, 1, 5000, 'Rep. n2232-2233', NULL, NULL),
(240, 2507, '2507', 'Antologia de vicente huidobro', 'Vicente huidobro ', 'Zig-zag', 'Bueno', 1, 1, 3000, 'Rep. n2236', NULL, NULL),
(241, 2508, '2508', 'Antologia fundamental de p. neruda', 'Pablo neruda', 'Pehuen', 'Bueno', 1, 1, 10000, 'Rep. n 2236', NULL, NULL),
(242, 2509, '2509', 'Aediente paciencia', 'Antonio skarmeta', 'Sudamericana', 'Bueno', 1, 1, 2000, 'Rep. n 2237', NULL, NULL),
(243, 2510, '2510', 'Casa de mu', 'Enrique ibsen', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 2242', NULL, NULL),
(244, 2511, '2511', 'El patio', 'Jorge edwards', 'Sudamericana', 'Bueno', 1, 1, 3000, 'Rep. n 2255', NULL, NULL),
(245, 2512, '2512', 'El tunel', 'Ernesto sabato', 'No presenta', 'Bueno', 1, 1, 2000, 'Rep. n 2257', NULL, NULL),
(246, 2513, '2513', 'Heroes de nuestro tiempo (gandhi)', 'La tercera', 'La tercera', 'Bueno', 1, 1, 1000, 'Rep. n 2266', NULL, NULL),
(247, 2514, '2514', 'Heroes de nuestro tiempo (sor teresa de c)', 'La tercera', 'La tercera', 'Bueno', 1, 1, 1000, 'Rep n 2271', NULL, NULL),
(248, 2515, '2515', 'Manual de geogreafia de chile', '', '', 'Bueno', 1, 1, 15000, 'Rep. n  2277', NULL, NULL),
(249, 2516, '2516', 'Nada menios que todo un hombre', 'Miguel de unamuno', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 2278', NULL, NULL),
(250, 2517, '2517-2518', 'Narraciones extraordinarias', 'Edgar allan poe', 'Colicheuque', 'Bueno', 2, 1, 1000, 'Rep. n2279-2280', NULL, NULL),
(251, 2519, '2519', 'Observador del cielo', 'Immanuel velikovsky', 'Edivision', 'Bueno', 1, 1, 5000, 'Rep. n 2282', NULL, NULL),
(252, 2520, '2520', 'Psicologia', 'John cohen', 'Lavor', 'Bueno', 1, 1, 5000, 'Rep. n 2286', NULL, NULL),
(253, 2521, '2521', 'El perfume', 'Patrick suskind', 'Bp', 'Bueno', 1, 1, 2000, 'Rep. n 2300', NULL, NULL),
(254, 2522, '2522', 'Historia universal', 'Natalia navarrete', 'Occidente', 'Bueno', 1, 1, 15000, 'Rep. n 2304', NULL, NULL),
(255, 2523, '2523', 'La casa de bernano alba', 'Federico garcia lorca', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 2307', NULL, NULL),
(256, 2524, '2524', 'La ciudad anterior', 'Gonzalo contreras', 'Pbs', 'Bueno', 1, 1, 3000, 'Rep. n 2308', NULL, NULL),
(257, 2525, '2525', 'Nociones elementales de administracion', 'Oscar johansen', 'Universitaria', 'Bueno', 1, 1, 2000, 'Rep. n 2319', NULL, NULL),
(258, 2526, '2526', 'Para que no me olvides', 'Marcelaserrano', 'Alfaguara', 'Bueno', 1, 1, 3000, 'Rep. n 2320', NULL, NULL),
(259, 2527, '2527', 'Pink  floyd', 'Pionero musical', 'Pionero musical', 'Bueno', 1, 1, 1000, 'Rep. n 2323', NULL, NULL),
(260, 2528, '2528', 'Papal vuh', 'Anonimo', 'Cgl', 'Bueno', 1, 1, 1000, 'Rep. n 2325', NULL, NULL),
(261, 2529, '2529', 'Todos los fuegos el fuego', 'Julio cortazar', 'Edv', 'Bueno', 1, 1, 3000, 'Rep. n  2333', NULL, NULL),
(262, 2530, '2530-2531', 'Cien a', 'G.garcia marquez', 'Latinas', 'Bueno', 2, 1, 3000, 'Rep. n2336-2337', NULL, NULL),
(263, 2532, '2532', 'Chile a color geiografico', 'Antartica', 'Antartica', 'Bueno', 1, 1, 15000, 'Rep. n 2339', NULL, NULL),
(264, 2533, '2533', 'Dicc. sinonimos y antonimos', 'Nauta', 'Nauta', 'Bueno', 1, 1, 1000, 'Rep. n 2340', NULL, NULL),
(265, 2534, '2534', 'Enciclopedia visual del  universo', 'Ceac', 'Ceac', 'Bueno', 1, 1, 3000, 'Rep. n 2343', NULL, NULL),
(266, 2535, '2535', 'El arte de amar', 'E. fromm', 'Paidos', 'Bueno', 1, 1, 2000, 'Rep. n 2345', NULL, NULL),
(267, 2536, '2536', 'Gracia y forastero', '', '', 'Bueno', 1, 1, 2000, 'Rep. n 2352', NULL, NULL),
(268, 2537, '2537', 'Manual gramatica espa', 'Occidente', 'Occidente', 'Bueno', 1, 1, 2000, 'Rep. n 2358', NULL, NULL),
(269, 2538, '2538', 'Romeo y julieta', 'William shakespeare', 'Colicheuque', 'Bueno', 1, 1, 1000, 'Rep. n 2363', NULL, NULL),
(270, 2539, '2539', 'Siddharta', 'Hermann hesse', 'P&j', 'Bueno', 1, 1, 2000, 'Rep. n 2364', NULL, NULL),
(271, 2540, '2540-2541', 'Dicc. de lalengua espa', 'Occidente', 'Occidente', 'Bueno', 2, 1, 5000, 'Rep. n2368-2369', NULL, NULL),
(272, 2542, '2542', 'Fisica recreativa', 'Planeta ', 'Planeta', 'Bueno', 1, 1, 15000, 'Rep. n 2373', NULL, NULL),
(273, 2543, '2543', 'Croniica de una muerte enunciada', 'G. garcia marquez', 'Laovejanegra', 'Bueno', 1, 1, 2000, 'Rep. n 2379', NULL, NULL),
(274, 2544, '2544', 'Dicc. espa', 'Colicheuque', 'Colicheuque', 'Bueno', 1, 1, 2000, 'Rep. n 2380', NULL, NULL),
(275, 2545, '2545', 'Al aleph', 'Jorge l. borges', 'Ercilla', 'Bueno', 1, 1, 2000, 'Rep. n 2381', NULL, NULL),
(276, 2546, '2546', 'Dicc. enciclopedico (12 tomos)', 'Salvat', 'Salvat', 'Bueno', 1, 1, 2000, 'Rep. n 2383', NULL, NULL),
(277, 2547, '2547', 'Biografias', 'Arte', 'Arte', 'Bueno', 1, 1, 1000, 'Rep. n 2384', NULL, NULL),
(278, 2548, '2548', 'Dicc. de la lengua espa', 'Portada', 'Portada', 'Bueno', 1, 1, 2000, 'Rep. n 2411', NULL, NULL),
(279, 2549, '2549-2551', 'Diccionario  escolar de la lengua espa', 'Occidente', 'Occidente', 'Bueno', 3, 1, 2000, 'Rep. n2415-2417', NULL, NULL),
(280, 2552, '2552-2553', 'Lampalabra huevon', 'Cosme portocarrero', 'Lom', 'Bueno', 2, 1, 1000, 'Rep. n2420-2421', NULL, NULL),
(281, 2554, '2554-2555', 'Cuentos de urdemales', 'Anonimo', 'Colicheuque', 'Bueno', 2, 1, 2000, 'Rep. n2422-2423', NULL, NULL),
(282, 2556, '2556', 'Dicc. tecnico ingles-espa', 'Larousse', 'Larousse', 'Bueno', 1, 1, 2000, 'Rep. n  2425', NULL, NULL),
(283, 2557, '2557', 'Algebra', 'Francisco proschle', 'Occidente', 'Bueno', 1, 1, 3000, 'Rep. n 2428', NULL, NULL),
(284, 2558, '2558-2559', 'Nociones elementales de administracion', 'Oscar johansen', 'Universitaria', 'Bueno', 2, 1, 2000, 'Rep. n2481-2483', NULL, NULL),
(285, 2560, '2560', 'Prometeo encadenado', 'Esquilo', 'Olimpo', 'Bueno', 1, 1, 2000, 'Rep. n 2607', NULL, NULL),
(286, 2561, '2561', 'Pantaleon y las visitadoras', 'Mario vargas llosa', 'Alfaguara', 'Bueno', 1, 1, 3000, 'Rep. n  2607', NULL, NULL),
(287, 2562, '2562', 'Enciclopedia consulta', 'Godex', 'Godex', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(288, 2563, '2563-2565', 'Historia de la musica 3 tomos', 'Godex', 'Godex', 'Bueno', 3, 1, 4000, 'R. propios', NULL, NULL),
(289, 2566, '2566', 'El jugador', 'Fedor dostoieski', 'Salvat', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(290, 2567, '2567', 'Presencia de san fernando', 'Josefina acevedo', 'Hgv', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(291, 2568, '2568', 'Transparencias liricas', 'Varios autores', 'No presenta', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(292, 2569, '2569', 'En la tierra que habito', 'Olga aguilera', 'Gcp', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(293, 2570, '2570', 'Electrones, oidos y mensajes', 'John pierce', 'Universitaria', 'Bueno', 1, 1, 4000, 'R. propios', NULL, NULL),
(294, 2571, '2571-2586', 'El tesoro de la juventud', 'Portada', 'Portada', 'Bueno', 16, 1, 3000, 'Donacion', NULL, NULL),
(295, 2587, '2587', 'Sonetos e la realidad y sue', 'Olga aguilera', 'Gcp', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(296, 2588, '2588', 'Dos a', 'Julio verne', 'Prosa', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(297, 2589, '2589', 'La tia tula', 'Miguel de unamuno', 'Salvat', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(298, 2590, '2590', 'Lanchas en la bahia', '', '', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(299, 2591, '2591', 'Cuentos de amor de locura y muerte', 'Horacio quiroga', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(300, 2592, '2592', 'Tratado de maquinas motrices', 'W. valera', 'Lgn', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(301, 2593, '2593', 'La ciudad y los perros', 'Mario vargas llosa', 'Ercilla', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(302, 2594, '2594', 'Colmillo blanco', 'Jack london', 'Colicheuque', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(303, 2595, '2595', 'Magisterio y nino', 'Gabriela mistral', 'Andres bello', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(304, 2596, '2596', 'Fisica general', 'Henry perkins', 'Hispanoamericana', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(305, 2597, '2597', 'Narraciones extraordinarias', 'E.a.poe', 'Salvat', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(306, 2598, '2598', 'Werther', 'Goethe', 'Salvat', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(307, 2599, '2599', 'El medico aconseja', 'Jose mascaro', 'Salvat', 'Bueno', 1, 1, 5000, 'Donacion', NULL, NULL),
(308, 2600, '2600', 'Matematica apli. para tec. automoviles', 'Gtz', 'Gtz', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(309, 2601, '2601-2602', 'El vaso de leche y los mejores cuentos', 'Manuel rojas', 'Nascimiento', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(310, 2603, '2603', 'Volver al pais de los araucos', 'Raul mandrini', 'Sudamericana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(311, 2604, '2604', 'Autoretrato de chile', 'Nicomedes guzman', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(312, 2605, '2605', 'Formacion del tecnico mecanico', 'Rhein', 'No presenta', 'Bueno', 1, 1, 5000, 'Donacion', NULL, NULL),
(313, 2606, '2606', 'Eloy', 'Carlosdroguett', 'Universitaria', 'Bueno', 1, 1, 5000, 'R. propios', NULL, NULL),
(314, 2607, '2607', 'Antologia poetica', 'Vicente huidobro', 'Universitaria', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(315, 2608, '2608', 'Los de abajo', 'Mariano azuela', 'Tacora', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(316, 2609, '2609', 'Punta de rieles', 'Manuel rojas', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(317, 2610, '2610', 'Movimientos literarios', 'Gladys mora', 'Lo castillo', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(318, 2611, '2611-2613', 'Grandes escritores universales 1', 'Gladys mora', 'Lo castillo', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(319, 2614, '2614', 'Lkos cuentistas chilenos', 'Raul silva', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(320, 2615, '2615', 'Tecnico mecanico', 'Klingelnberg', 'Lavor', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(321, 2616, '2616', 'Popul uuh', 'Adrian recinos', 'Fce', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(322, 2617, '2617', 'Las doradas manzanas del sol', 'Ray bradbury', 'Minotauro', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(323, 2618, '2618', 'Cuentos 72 quimantu', 'Baldomero lillo', 'Quimaniu', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(324, 2619, '2619', 'La vida es sue', 'Calderon de la barca', 'Sopena', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(325, 2620, '2620', 'El ultimo grumete de la baquedano', 'Enesto langer', 'Lom', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(326, 2621, '2621', 'Los hombrecillos de los cuentos', '', '', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(327, 2622, '2622', 'El extranjero', 'Albert camus', 'Alianza', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(328, 2623, '2623', 'La amortajada', 'Maria luisa bombal', 'Universitaria', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(329, 2624, '2624', 'Martin rivas', 'Alberto blest gana', 'Andres bello', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(330, 2625, '2625', 'Leyendas y episoios nacionales', 'Joaquin diaz', 'Difusion chilena', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(331, 2626, '2626', 'Nieves y glaciares', 'Juan arguelles', 'Akal', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(332, 2627, '2627', 'Historias de las matematicas', 'Gtz', 'Gtz', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(333, 2628, '2628', 'Tec. mecanica practica 2 curso superior', '', '', 'Bueno', 1, 1, 15000, 'Donacion', NULL, NULL),
(334, 2629, '2629-2633', 'Calculos prof. para mecan. ajustadores', 'Lowisch-niemann', 'Jb', 'Bueno', 5, 1, 1000, 'Mineduc', NULL, NULL),
(335, 2634, '2634-2649', 'Enciclopedias monitor salvat', '', '', 'Bueno', 16, 1, 5000, 'Donacion', NULL, NULL),
(336, 2650, '2650-2655', 'Enciclopedia ii guerra mundial', '', '', 'Bueno', 6, 1, 10000, 'Donacion', NULL, NULL),
(337, 2656, '2656-2665', 'Enciclopeia del mar', '', '', 'Bueno', 10, 1, 3000, 'Donacion', NULL, NULL),
(338, 2666, '2666-2667', 'Poesia religiosa', 'Teresa de jesus', 'Ercilla', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(339, 2668, '2668-2669', 'Cuentos ', 'Anton chejov', 'Ercilla', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(340, 2670, '2670-2672', 'Marianela', 'Benito perez galdos', 'Delfin', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(341, 2672, '2673', 'Los hermanos', 'H.g wells', 'Zig-zag', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(342, 2674, '2674-2676', 'Casa de mu', 'Enrique ibsen', 'Sopena', 'Bueno', 3, 1, 2000, 'R. propios', NULL, NULL),
(343, 2677, '2677', 'Desolacion', 'Gabriela mistral', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(344, 2678, '2678', 'Mio cid', 'Anonimo', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(345, 2679, '2679-2684', 'Movimientos literarios', 'Gladys mora', 'Lo castillo', 'Bueno', 6, 1, 1000, 'R. propios', NULL, NULL),
(346, 2685, '2685-2688', 'El burlador de sevilla', 'Tirso de molina', 'Ercilla', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(347, 2688, '2689', 'Poesia universal', 'Maria romero', 'Zig-zag', 'Bueno', 1, 1, 3000, 'R. propios', NULL, NULL),
(348, 2690, '2690-2695', 'Fuente ovejuna', 'Lope de vega', 'Ercilla', 'Bueno', 6, 1, 1000, 'R. propios', NULL, NULL),
(349, 2696, '2696', 'El cantar de roldan', 'Anonimo', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(350, 2697, '2697', 'La vida del buscon llamado do pablos', 'Francisco de quevedo', 'Salvat', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(351, 2698, '2698-2701', 'Lina y su sombra', 'Oscar castro', 'Del pacifico', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(352, 2701, '2702', 'Chilenos en california', 'Enrique bunster', 'Del pacifico', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(353, 2703, '2703-2706', 'La voragine', 'Jose rivera', 'Ercilla', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(354, 2706, '2707', 'Seleccion de fabulas', 'Juan ruiz', 'Santillana', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(355, 2708, '2708-2709', 'Lavida es sue', 'Calderon de la barca', 'Marcos sastre', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(356, 2710, '2710', 'La hoja roja', 'Miguel delibes', 'Salvat', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(357, 2711, '2711', 'La fortuna de los rougon', 'Emilio zola', 'Malaga', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(358, 2712, '2712', 'Cuentos de amor delocura y muerte', 'Horacio quiroga', 'Losada', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(359, 2713, '2713', 'Don seguno sombra', 'Ricardo guiraldes', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(360, 2714, '2714-2716', 'La vida es sue', 'Calderon de la barca', 'Ercilla', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(361, 2717, '2717-2720', 'Platero y yo', 'Juan jimenez', 'Losada', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(362, 2720, '2721', 'Recordando mi vida', 'Rafael cumsille', 'El detallista', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(363, 2722, '2722-2723', 'Pedro paramo', 'Juan rulfo', 'Fce', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(364, 2724, '2724', 'Antologia poetica,do', 'Federico garcia lorca', 'Santillana', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(365, 2725, '2725', 'On panta', 'Mariano latorre', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(366, 2726, '2726', 'Como se cuenta un cuento', 'G.garcia marquez', 'Voluntad', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(367, 2727, '2727-2729', 'La araucana', 'Alonso de ercilla', 'Universitaria', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(368, 2730, '2730-2733', 'El mejor alcalde el rey', 'Lope de vega', 'Universitaria', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(369, 2734, '2734', 'La muerte y la muerte de quincas berro d.', 'Jorge amado', 'Andres bello', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(370, 2735, '2735', 'El reino de este mundo', 'Alejo carpentier', 'Seix barral', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(371, 2736, '2736', 'Diez negritos', 'Agatha christine', 'Molino', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(372, 2737, '2737', 'El tempano de kanasaca', 'Francisco coloane', 'Universitaria', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(373, 2738, '2738', 'Castellano espa', 'Amado alonso', 'Losada', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(374, 2739, '2739', 'Puente en la selva', 'B. traven', 'Cge', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(375, 2740, '2740', 'La odisea', 'Homero', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(376, 2741, '2741', 'Amor el diario de daniel', 'Michel quoist', 'Herder', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(377, 2742, '2742-2743', 'Seleccion de fabulas', 'Juan ruiz', 'Santillana', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(378, 2744, '2744', 'Hijo de ladron', 'Manuel rojas', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(379, 2745, '2745', 'Gran se', 'Eduardo barrios', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(380, 2746, '2746', 'Viaje maravilloso de nils holgersson', 'Selma lagerloff', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(381, 2747, '2747-2748', 'La gitanilla', 'Miguel de cervantes', 'Del pacifico', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(382, 2748, '2749', 'Huasipungo', 'Jorge icaza', 'Losada', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(383, 2750, '2750-2752', 'Comarca de jazmin', 'Oscar castro', 'Del pacifico', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(384, 2753, '2753', 'Marianela', 'Benito perez galdos', 'E-c', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(385, 2754, '2754', 'Biografia de escritores espa', 'Gladys mora', 'Lo castillo', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(386, 2755, '2755', 'Apologia de socrates', 'Platon', 'Renacimiento', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(387, 2756, '2756', 'Don segunda sombra', 'Ricardo guiraldes', 'Andres bello', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(388, 2757, '2757', 'El si de las ni', 'Leandro fernandez', 'Andres bello', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(389, 2758, '2758', 'Tala', 'Gabriela mistral', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(390, 2759, '2759', 'Cabo de hornos', 'Francisco coloane', 'Orbe', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(391, 2760, '2760-2762', 'Poesia selecta', 'Varios autores', 'Ercilla', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(392, 2763, '2763-2766', 'La celestina', 'Fernando de rojas', 'Ercilla', 'Bueno', 4, 1, 1000, 'R. propios', NULL, NULL),
(393, 2767, '2767', 'Articulos de costumbres', 'Mariano jose de larra', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(394, 2768, '2768', 'Mejor que el vino', 'Manuel rojas', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(395, 2769, '2769-2770', 'On juan tenorio', 'Jose zorrilla', 'Ercilla', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(396, 2771, '2771-2772', 'Libro de buen amor', 'Juan ruiz', 'Ercilla', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(397, 2773, '2773', 'Desolacion', 'Gabriela mistral', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(398, 2774, '2774', 'Antologia poetica de chilenos', 'Y. pino saavedra', 'No presenta', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(399, 2775, '2775', 'Antologia poetica', 'Varios autores', 'Santillana', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(400, 2776, '2776-2777', 'La perfecta casada', 'Fray luis de leon', 'Ercilla', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(401, 2778, '2778', 'De vivir corpus y  otros cuentos', 'Gabriel miro', 'Losada', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(402, 2779, '2779', 'El embajador de cosmos', 'Antonio cardenas', 'Arancibia hnos.', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(403, 2780, '2780', 'Antonio azorin', 'Azorin ', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(404, 2781, '2781', 'Literatura espa', 'Ernesto livacic', 'Em', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(405, 2782, '2782-2783', 'Alsino', 'Pedro prado', 'Andres bello', 'Bueno', 2, 1, 2000, 'R. propios', NULL, NULL),
(406, 2784, '2784', 'Monta', 'Voltaire ', 'Cge', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(407, 2785, '2785', 'El romancero', 'Carlos peltzer', 'Marcos sastre', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(408, 2786, '2786', 'Rojo y negro', 'Stendhal', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(409, 2787, '2787', 'El ruise', 'Oscar wilde', 'La nacion', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL);
INSERT INTO `libro` (`id_libro`, `codigo_libro`, `rango_libro`, `titulo_libro`, `autor_libro`, `editorial_libro`, `estado_libro`, `cantidad`, `vigencia`, `valor_unitario`, `origen`, `observacion`, `fecha_recepcion`) VALUES
(410, 2788, '2788', 'La vida simplemente', 'Oscar castro', 'No presenta', 'Bueno', 1, 1, 2000, 'R. propios', NULL, NULL),
(411, 2789, '2789', 'Calculo infinitesimal', 'J. thompson', 'Hispanoamericana', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(412, 2790, '2790-2791', 'Revista chilena de literatura', 'Varios autores', 'Univ.de chile', 'Bueno', 2, 1, 1000, 'R. propios', NULL, NULL),
(413, 2792, '2792', 'El hombre que rie', 'Victor hugo', 'Sopena', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(414, 2793, '2793', 'Cronicas marcianas', 'Ray bradbury', 'Minotauro', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(415, 2794, '2794-2818', 'Historia universal', '', '', 'Bueno', 25, 1, 1000, 'R. propios', NULL, NULL),
(416, 2819, '2819-2821', 'Cultura de la prehistoria 3 tomos', '', '', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(417, 2822, '2822', 'La guerra y la paz', 'Leon tolstoi', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(418, 2823, '2823', 'Jose miguel balmaceda', 'Cecilia garcia', 'Zig-zag', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(419, 2824, '2824', 'Compendio de historia americana', '', '', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(420, 2825, '2825', 'Historia del pacifico', 'Hendrik willem', 'Ercilla', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(421, 2826, '2826', 'Ensayos', 'Eugenio orrego', 'Univ.de chile', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(422, 2827, '2827', 'La revolucion de 1891', 'Anibal bravo', 'No presenta', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(423, 2828, '2828', 'Historia del ferrocarril', 'Maria piedad alliende', 'Pehuen', 'Bueno', 1, 1, 1000, 'R. propios', NULL, NULL),
(424, 2829, '2829', 'Soldadura y materiales i', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(425, 2830, '2830', 'Neumatica e hidraulica ii', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(426, 2831, '2831', 'Automatas y robotica iii', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(427, 2832, '2832', 'Maquinas y control numerico iv', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(428, 2833, '2833', 'Camiones y vehiculos pesados ', 'Gabriel cuesta', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(429, 2834, '2834', 'Guia practica de carpinteria i', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(430, 2835, '2835', 'Guia practica de carpinteria i i', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(431, 2836, '2836', 'Guia practica de carpinteria i i i', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(432, 2837, '2837', 'Guia practica de plomeria i', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(433, 2838, '2838', 'Guia practica de plomeria ii', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(434, 2839, '2839', 'Guia practica de plomeria iii', 'J. c. gil y otros', 'Cultural s.a.', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(435, 2840, '2840', 'Guia practica de electricidad y electronica i', 'Ricardo martin y otros', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(436, 2841, '2841', 'Guia practica de electricidad y electronica ii', 'Ricardo martin y otros', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(437, 2842, '2842', 'Guia practica de electricidad y electronica iii', 'Ricardo martin y otros', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(438, 2843, '2843', 'Manual del automovil electricidad y accesorios', 'D. hermogenes gil', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(439, 2844, '2844', 'Manual del automovil suspension y direccion', 'D. hermogenes gil', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(440, 2845, '2845', 'Manual del automovil el motor diesel ', 'D. hermogenes gil', 'Cultural s.a. ', 'Bueno', 1, 1, 1000, 'Donacion', NULL, NULL),
(441, 2846, '2846', 'Manual del automovil el motor de gasolina', 'D. hermogenes gil', 'Cultural s.a. ', 'Bueno', 1, 1, 0, 'Donacion', NULL, NULL),
(442, 2847, '2847', 'Historia de la tecnologia i', 'T. k. derry y otros', 'Siglo xxi', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(443, 2848, '2848', 'Historia de la tecnologia ii', 'T. k. derry y otros', 'Siglo xxi', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(444, 2849, '2849', 'Lanchas en la bahia', 'Manuel rojas', 'Zig - zag', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(445, 2850, '2850', 'Casa de mu', 'Enrique ibsen', 'Sopena s.a.', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(446, 2851, '2851', 'El general en su laberinto', 'Garcia marquez', 'Sudamericana', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(447, 2852, '2852', 'El lobo esterpario', 'Hermann hesse', 'Madrid', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(448, 2853, '2853', 'El arbol de judas', 'A. j. cronin', 'Selectas s. r. l.', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(449, 2854, '2854', 'Rese', 'S/a', 'S/e', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(450, 2855, '2855', 'Marianela', 'Benito perez galdos', 'Kapelusz', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(451, 2856, '2856', 'Hamlet', 'W. shakespeare', 'Colicheuque', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(452, 2857, '2857', 'Siddharta', 'Hermann hesse', 'Centro grafico', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(453, 2858, '2858', 'Juvenilla', 'M. cane', 'M. sastre', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(454, 2859, '2859', 'Coronacion', 'Jose donoso', 'Zig - zag', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(455, 2860, '2860', 'La araucana', 'A. de ercilla', 'Universitaria', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(456, 2861, '2861', 'El quijote de la mancha ii', 'M. de cervantes', 'La nacion', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(457, 2862, '2862-2866', 'El milagro de los andes', 'Balocchi y otros', 'America', 'Bueno', 5, 1, 0, 'R. propios', NULL, '2008-03-01'),
(458, 2867, '2867', 'Matematicas modernas', 'Dolciani y otros', 'Cultural s.a.', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(459, 2868, '2868', 'Platero y yo', 'Juan ramon jimenez', 'Losada', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(460, 2869, '2869', 'El quijote de la mancha ii', 'M. de cervantes', 'La nacion', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(461, 2870, '2870', 'Bodas de sangre', 'F. garcia lorca', 'L. universal', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(462, 2871, '2871', 'Matematica aplicada para tecnica mecanica', 'D. gesellschaft', 'Gtz', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(463, 2872, '2872-2881', 'Mi tierra huasa', 'E. neiman', 'Los afines', 'Bueno', 10, 1, 0, 'R. propios', NULL, '2008-03-01'),
(464, 2882, '2882-2883', 'La vida es sue', 'Calderon de la barca', 'Ercilla', 'Bueno', 2, 1, 0, 'R. propios', NULL, '2008-03-01'),
(465, 2884, '2884', 'Quo vadis', 'E. sienkiewicz', 'Antartica', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(466, 2885, '2885', 'Trabajo y salario', 'J. folliet y otros', 'Del atlantico', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(467, 2886, '2886', 'Ventura de pedro de valdivia', 'Jaime eyzaguirre', 'Mineduc', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(468, 2887, '2887', 'De los apeninos a los andes', 'Edumundo de amicis', 'La nacion', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(469, 2888, '2888', 'La gitanilla', 'M. de cervantes', 'La nacion', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(470, 2889, '2889', 'Guia didactica de dibujo tecnico', 'S/a', 'Mineduc', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(471, 2890, '2890', 'El tesoro de sierra madre', 'B. traven', 'L.g.e. mexico', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(472, 2891, '2891', 'El gran teatro del mundo y el medico de su honra', 'Pedro calderon d.c.b.', 'Carabela', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(473, 2892, '2892', 'Almanaque 2008', 'S/a', 'Televisa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2008-04-01'),
(474, 2893, '2893', 'Poesia selecta', 'J. manrique y otros', 'Ercilla', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(475, 2894, '2894', 'Poesia selecta', 'Luis de gongora y otro', 'Ercilla', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(476, 2895, '2895', 'Nada puede separarnos', 'Enrique neiman', 'Los afines', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(477, 2896, '2896', 'El pintor valenzuela llanos', 'J. v. badilla', 'Rumbos', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(478, 2897, '2897', 'La vida es sue', 'Calderon de la barca', 'Ercilla', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(479, 2898, '2898', 'Cuentos de pedro urdemales', 'Anonimo', 'Prosa s.a.', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(480, 2899, '2899', 'Por tierra del romance', 'Jose vargas badilla', 'Rumbos', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(481, 2900, '2900', 'La republica', 'Platon', 'Argentina', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(482, 2901, '2901', 'Manual del herrero', 'J.w.lillico', 'Gili', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(483, 2902, '2902', 'Para leer los medios (prensa, radio, cine y tv)', 'G. mitchel', 'Trillas', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(484, 2903, '2903', 'La araucana', 'A de ercilla', 'E. calpe', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(485, 2904, '2904', 'Historia de la blanca', 'L. goldschmied', 'Uteha', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(486, 2905, '2905', 'Comarza de jazmin', 'Oscar castro', 'Del pacifico', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(487, 2906, '2906', 'El libertador', 'Augusto mijares', 'Italgrafica', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(488, 2907, '2907', 'Guia del antiguo y nuevo testamento', 'E. zolli', 'Uteha', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(489, 2908, '2908', 'Aerodinamica 2', 'Ordo', 'Uteha', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(490, 2909, '2909', 'Mineria chilena', 'Cimm', 'Alfabeta', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(491, 2910, '2910', 'Antologia poetica', 'Oscar castro', 'Del pacifico', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(492, 2911, '2911', 'Principios y practica de la ense', 'J. johonnot', 'Apleton y cia', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(493, 2912, '2912', 'Huidobro. la marcha infinita', 'Volodia teitelboin', 'Sudamericana', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(494, 2913, '2913-2914', 'Cuadernos de teatro', 'Alejandro sieveking', 'Mineduc', 'Bueno', 2, 1, 0, 'R. propios', NULL, '2008-03-01'),
(495, 2915, '2915', 'La region un enfoque desde el estudio de la geografia', 'Ana errazuriz y otro', 'Jordan s.a. ', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(496, 2916, '2916', 'En busca de mi cielo', 'Olga aguilera', 'G. colchagua', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(497, 2917, '2917', 'Vecindario de estrellas', 'J. vargas badilla', 'G. colchagua', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(498, 2918, '2918', 'Entre romances y sue', 'J. vargas badilla', 'U.c. valparaiso', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(499, 2919, '2919', 'Artes', 'J. olivari y otros', 'N/t', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(500, 2920, '2920', 'Historia del trabajo', 'Francois barnet', 'Universitaria', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(501, 2921, '2921-2923', 'Enciclopedia de la ciencia y la tecnologia i, ii, iii', 'S/n', 'Oceano', 'Bueno', 3, 1, 0, 'R. propios', NULL, '2008-03-01'),
(502, 2924, '2924', 'Enciclopedia didactica de fisica y quimica', 'S/n', 'Oceano', 'Bueno', 1, 1, 0, 'Donacion', NULL, '2008-10-10'),
(503, 2925, '2925', 'Enciclopedia didactica de gramatica', 'S/n', 'Oceano', 'Bueno', 2, 1, 0, 'Donacion', NULL, '2008-10-10'),
(504, 2926, '2926', 'Enciclopedia didactica de matematicas', 'S/n', 'Oceano', 'Bueno', 1, 1, 0, 'Donacion', NULL, '2008-10-10'),
(505, 2927, '2927-2931', 'Cuento contigo, i, ii, iii, iv, v', 'L. fontaine y otros', 'Planeta', 'Bueno', 5, 1, 0, 'Donacion', NULL, '2008-10-10'),
(506, 2932, '2932-2934', 'Cultura ferroviaria de san fernando y sus ramales', 'Victor leon v. ', 'Geo black', 'Bueno', 3, 1, 0, 'Donacion', NULL, '2008-10-10'),
(507, 2935, '2935', 'Grandes figuras de nuestra historia-rebeca matte', 'Ana  m. larrain', 'Zig - zag ', 'Bueno', 1, 1, 0, 'Donacion', NULL, '2008-10-10'),
(508, 2936, '2936', 'Grandes figuras de nuestra historia-j. m. balmaceda', 'Cecilia garcia g.', 'Zig - zag ', 'Bueno', 1, 1, 0, 'Donacion', NULL, '2008-10-10'),
(509, 2937, '2937', 'Grandes figuras de nuestra historia  -  a. prat', 'Ana  m. larrain', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(510, 2938, '2938', 'Grandes figuras de nuestra hstra- manuel rojas', 'Floridor perez', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(511, 2939, '2939', 'Grandes figuras de nuestra hstra- a. alessandri p.', 'Fca. alessandri', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(512, 2940, '2940', 'Grandes figuras de nuestra hstra-manuel rodriguez', 'Ana maria larrain', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(513, 2941, '2941', 'Grandes figuras de nuestra hstra- d. de almagro', 'Juan j. faundez', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(514, 2942, '2942', 'Grandes figuras de nuestra hstra-v. p. rosales', 'Jaime quezada', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(515, 2943, '2943', 'Grandes figuras de nuestra hstra-c. naval de i.', 'Jorge inostroza', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(516, 2944, '2944', 'Grandes figuras de nuestra hstra-c. de la concep. ', 'Jorge inostroza', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(517, 2945, '2945', 'Grandes figuras de nuestra hstra-b.vicu', 'Jaime quezada', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(518, 2946, '2946', 'Grandes figuras de nuestra hstra- pablo neruda', 'Floridor perez', 'Zig - zag ', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(519, 2947, '2947-2948', 'Grandes figuras de nuestra hstra- diego portales', 'Juan j. faundez', 'Zig - zag ', 'Bueno', 2, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(520, 2949, '2949', 'Apologia de socrates - platon', 'Platon ', 'Olimpo', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(521, 2950, '2950', 'Profecias de nostradamus', 'H. j. forman', 'Latinoamericano', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(522, 2951, '2951', 'El ruise', 'Oscar wilde', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(523, 2952, '2952', 'El fantasma de canterville', 'Oscar wilde', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(524, 2953, '2953-2955', 'Yu lan, el ni', 'Pear s. buck', 'Zig - zag', 'Bueno', 3, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(525, 2956, '2956', 'Los conquistadores de la antartica', 'Francisco coloane', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(526, 2957, '2957', 'El diario de ana frank', 'Ana frank', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(527, 2958, '2958', 'Cuentos de los derechos del ni', 'Saul schkolnik', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(528, 2959, '2959', 'Colmillo blanco', 'Jack london', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(529, 2960, '2960', 'Mac, el microbio desconocido', 'Hernan del solar', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(530, 2961, '2961-2962', 'Encuentro entgre triton y otras obras - teatro para ni', 'Manuel gallegos', 'Zig - zag', 'Bueno', 2, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(531, 2963, '2963', 'Cuentos de la selva', 'Horacio quiroga', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(532, 2964, '2964', 'Robinson crusoe', 'Daniel defoe', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(533, 2965, '2965', 'Un dia en la vida de: judith guerrera de la fe', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(534, 2966, '2966', 'Un dia en la vida de: efrain, amigo del ni', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(535, 2967, '2967', 'Un dia en la vida de: amaru, correo inca', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(536, 2968, '2968', 'Un dia en la vida de: arnaldo, caballero cruzado', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(537, 2969, '2969', 'Un dia en la vida de:eramiro, gte. de la esmeralda', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(538, 2970, '2970', 'Un dia en la vida de:s. , buscador de oro en california', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(539, 2971, '2971', 'Un dia en la vida de: juanita, peque', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(540, 2972, '2972', 'Un dia en la vida de: tonko, el alacalufe', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(541, 2973, '2973', 'Un dia en la vida de: makarina, bella de rapa nui', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(542, 2974, '2974', 'Un dia en la vida de: ak, pintor de cuevas', 'Barcells y ana m', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(543, 2975, '2975', '20,000 leguas de viaje submarino', 'Julio verne', 'Prosa s.a.', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(544, 2976, '2976', 'La quintrala', 'Magdalena petit', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(545, 2977, '2977', 'La iliada', 'Homero', 'Ercilla', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(546, 2978, '2978', 'Edipo rey', 'Sofocles', 'Colicheuque', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(547, 2979, '2979', 'Papaito piernas largas', 'J. webster', 'Colicheuque', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(548, 2980, '2980', 'Lautaro, joven libertador de arauco', 'F. alegria', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(549, 2981, '2981', 'Oliver twist', 'Ch. dickens', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(550, 2982, '2982', 'Bodas de sangre romancero gitano ', 'F. garcia lorca', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(551, 2983, '2983', 'Cuento de chile uno', 'Floridor perez', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(552, 2984, '2984', 'Los cuentos de mis hijos', 'Horacio quiroga', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(553, 2985, '2985', 'Palomita blanca', 'E. lafourcade', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(554, 2986, '2986', 'El principe y el mendigo', 'Manuel rojas', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(555, 2987, '2987', 'El hombre de la rosa y otros cuentos', 'Manuel rojas', 'Zig - zag', 'Bueno', 1, 1, 2000, 'Donacion', NULL, '2008-10-10'),
(556, 2988, '2988', 'Diccionario enciclopedico ilustrado i   a - ch', 'S/a', 'Sopena', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(557, 2989, '2989', 'Diccionario enciclopedico ilustrado ii   d - ll', 'S/a', 'Sopena', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(558, 2990, '2990', 'Diccionario enciclopedico ilustrado iii m - r', 'S/a', 'Sopena', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(559, 2991, '2991', 'Diccionario enciclopedico ilustrado iv s- z', 'S/a', 'Sopena', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(560, 2992, '2992', 'Dise', 'Innova', 'Marcombo', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(561, 2993, '2993', 'Manual de instrucciones diccionario real academia', 'Rae', 'Espasa calpe', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(562, 2994, '2994', 'Virus en las computadoras', 'Ferreyra cortes', 'Computec', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(563, 2995, '2995', 'Actualizaciones y reparaciones de pc para inexpertos', ' rathbone', 'Megabyte', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(564, 2996, '2996-2997', 'Aprendamos computacion principios y aplicaciones', 'Roberts y otros', 'Universitaria', 'Bueno', 2, 1, 0, 'R. propios', NULL, '2008-03-01'),
(565, 2998, '2998-3000', 'Diccionario de computacion biling', 'Freedman', 'Mc granw hill', 'Bueno', 3, 1, 0, 'R. propios', NULL, '2008-03-01'),
(566, 3001, '3001-3002', 'Obtenga resultados con microsoft office 97', 'Mricrosoft', 'Mricrosoft', 'Bueno', 2, 1, 0, 'R. propios', NULL, '2008-03-01'),
(567, 3003, '3003', 'Oxford dictionary of computing', 'Pyne y otros', 'Oxford ', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(568, 3004, '3004', 'Windows 95 10', 'Yraolagoitia', 'Paraninfo', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(569, 3005, '3005', 'Dise', 'Garcia arregui', 'Alfaomega', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(570, 3006, '3006', 'Autocad', 'Alconchel', 'Mac graw hill ', 'Bueno', 1, 1, 0, 'R. propios', NULL, '2008-03-01'),
(571, 3007, '3007', 'Niebla', 'Miguel de unamuno', 'Olimpo', 'Bueno', 1, 1, 2000, 'R. propios', NULL, '2008-03-01'),
(572, 3008, '3008', 'Peque', 'Valenzuela y otros', 'Marmol s.a. ', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(573, 3009, '3009', 'La caba', 'Beecher harriet', 'Ediciones sm', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(574, 3010, '3010', 'El delincuente, el vaso de leche y otros cuentos', 'Rojas manuel', 'Zig- zag', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(575, 3011, '3011', 'Fuerte bulnes chiloe cielos cubiertos', 'Maria a. requena', 'Zig- zag', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(576, 3012, '3012', 'Los cuentos de mi hijos', 'Horacio quiroga', 'Zig- zag', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(577, 3013, '3013', 'Manual explora y acampar', 'Elvio pero', 'Zig- zag', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(578, 3014, '3014', 'La cabeza en la bolsa', 'Marjorie pourchet', 'Salesianos s.a.', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(579, 3015, '3015', 'El ruise', 'Oscar wilde', 'Panamericana', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(580, 3016, '3016', 'El gato negro y otros cuentos de horror', 'Edgar allan poe', 'Instar s.a.', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(581, 3017, '3017', 'La vuelta al mundo en ochenta dias', 'Jules verne', 'Instar s.a. ', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(582, 3018, '3018', 'Los perros rojos  - el ankus del rey', 'Rudyard kipling', 'Instar s.a. ', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(583, 3019, '3019', 'Folclor del carbon ', 'Oreste plath', 'Grijalbo', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(584, 3020, '3020', 'Geografia del mito y la leyenda chilenos', 'Oreste plath', 'Grijalbo', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(585, 3021, '3021', 'Pintura chilena contemporanea', 'Isabel aninat', 'Grijalbo', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(586, 3022, '3022', 'Los cien mejores poemas de amor de la lengua castellana', 'Pedro lastra y otros', 'Andres bello', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(587, 3023, '3023', 'Sandokan', 'Emilio salgari', 'Andres bello', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(588, 3024, '3024', 'Demian', 'Hermann hess', 'Ediciones del sur', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(589, 3025, '3025', 'Edipo rey', 'Sofocles', 'Ediciones del sur', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(590, 3026, '3026', 'El fantasma de canterville', 'Oscar wilde', 'Ediciones del sur', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(591, 3027, '3027', 'El lazarrillo de tormes', 'Anonimo', 'Ediciones del sur', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(592, 3028, '3028', 'Metamorfosis', 'Franz kafka', 'Ediciones del sur', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(593, 3029, '3029', 'Humanismo social', 'Alberto hurtado', 'Quebecor s.a.', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(594, 3030, '3030-3034', 'Atlas geografico de chile', 'Igm', 'Igm', 'Bueno', 5, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(595, 3035, '3035', 'Acercandonos al libro album - ver para leer', 'Cra', 'Mineduc', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(596, 3036, '3036', 'Chile sue', 'S. c. palacio moneda', 'Maval s.a. ', 'Bueno', 1, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(597, 3037, '3037', 'Sue', 'Oscar robles', 'O''higgins', 'Bueno', 1, 1, 2000, 'Donacion', NULL, NULL),
(598, 3038, '3038-3047', 'Diccionarios ingles books bits', '', 'B&b', 'Bueno', 10, 1, 0, 'R. propios', NULL, '2009-04-14'),
(599, 3048, '3048-3052', 'Coleccion cuento contigo tomos i al v', 'C. estudios publicos', 'Planeta', 'Bueno', 5, 1, 2000, 'Mineduc', NULL, '2008-12-13'),
(600, 3053, '3053-3072', 'Diccionario espa', '', 'Sopena', 'Bueno', 20, 1, 0, 'R. propios', NULL, '2009-04-21'),
(601, 3073, '3073', 'Dibujo tecnico para electrotecnica 1 curso basico cuaderno', 'Deutsche gesellschaft', '', 'Bueno', 1, 1, 30000, 'Donacion', NULL, NULL),
(602, 3074, '3074', 'Tcnologia mecanica practica 2  curso superior', 'Deutsche gesellschaft', '', 'Bueno', 1, 1, 30000, 'Donacion', NULL, NULL),
(603, 3075, '3075-3077', 'Introduccion al galvanismo', 'Heinz  wehner', 'Marcombo s.a.', 'Bueno', 3, 1, 1000, 'R. propios', NULL, NULL),
(604, 3077, '3078', 'Ctos. pedro urdemales', 'Ramon laval', 'Lom ediciones', 'Bueno', 1, 1, 2000, 'D. mineduc', NULL, NULL),
(605, 3079, '3079-3081', 'Curso de electricidad general tomos i, ii y iii', 'R. auge', 'Paraninfo', 'Bueno', 3, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(606, 3082, '3082', 'Diccionario electronica', 'Sw. amos', 'Paraninfo', 'Bueno', 1, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(607, 3083, '3083', 'Dise', 'Macario garcia', 'Alfaomega', 'Bueno', 1, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(608, 3084, '3084', 'Electronica digital fundamental', 'Antonio hermosa', 'Marcombo', 'Bueno', 1, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(609, 3085, '3085', 'Electrotecnia', 'Jose gracia ', 'Paraninfo', 'Bueno', 1, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(610, 3086, '3086-3092', 'Enciclopedia electronica moderna', 'J. m. angulo', 'Paraninfo', 'Bueno', 7, 1, 2000, 'D. mineduc', NULL, '2009-05-12'),
(611, 3093, '3093', 'Manual de seguridad y primeros auxilios', 'Hackett y robbins', 'Alfaomega', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(612, 3094, '3094', 'Mecanica', 'P. abbott', 'E. piramide', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(613, 3095, '3095', 'Mecanica de taller(soldaduras,uniones y caldereria', 'Varios autores', 'Cultural s.a.', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(614, 3096, '3096', 'Mecanica de taller (torno y fresadora)', 'Varios autores', 'Cultural s.a.', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(615, 3097, '3097', 'Nociones de calidad total', 'Mario gutierrez', 'Limusa', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(616, 3098, '3098-3099', 'Reparacion de averias electronicas (tomos i y ii)', 'James perozzo', 'Paraninfo', 'Bueno', 2, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(617, 3100, '3100', 'Soldadura aplicaciones y practica', 'Horwitz', 'Alfaomega', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(618, 3101, '3101', 'Tecnologia del hormigon', 'I.chileno del cemento', '', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(619, 3102, '3102', 'Tecnica y practica de la soldadura', 'Joseph w. giachino', 'Reverte s.a.', 'Bueno', 1, 1, 4000, 'D. mineduc', NULL, '2009-05-12'),
(620, 3103, '3103-3104', 'Informe verdad historica y nuevo trato', 'Michelle bachelet', 'Comisionado', 'Bueno', 2, 1, 4000, 'D. mineduc.', NULL, NULL),
(621, 3104, '3105', 'Se', 'Oscar robles v.', 'Imprenta o', 'Bueno', 1, 1, 4000, 'R.propios', NULL, '2009-08-10'),
(622, 3106, '3106-3108', 'Guia tecnica', 'Conama', 'Bmz', 'Bueno', 3, 1, 4000, 'Donacion', NULL, '2009-08-10'),
(623, 3109, '3109-3110', 'Reglamento  sanitario', 'Conama', 'Bmz', 'Bueno', 2, 1, 4000, 'Donacion', NULL, '2009-08-11'),
(624, 3111, '3111-3112', 'Guia para la elaboracion de planes de manejo de residuos peligrosos', 'Conama', 'Bmz', 'Bueno', 2, 1, 4000, 'Donacion', NULL, '2009-08-10'),
(625, 3113, '3113-3114', 'Antologia gabriela mistral', 'Bicentenario', '', 'Bueno', 2, 1, 4000, 'Utp', NULL, '2009-10-20'),
(626, 3115, '3115-3116', 'Antologia pablo neruda', 'Bicentenario', '', 'Bueno', 2, 1, 4000, 'Utp', NULL, '2009-10-20'),
(627, 3117, '3117', 'Manual del automovil', 'Cultural', 'Cultural ', 'Bueno', 1, 1, 38000000, 'R.propios', NULL, '2010-04-13'),
(628, 3118, '3118', 'Manual de motocicleta', 'Cultural', 'Cultural', 'Bueno', 1, 1, 15000, 'R.propios', NULL, '2010-04-13'),
(629, 3119, '3119', 'Manual de electricidad', 'Cultural', 'Cultural', 'Bueno', 1, 1, 19000, 'R.propios', NULL, '2010-04-13'),
(630, 3120, '3120', 'Manual de electronica', 'Cultural', 'Cultural', 'Bueno', 1, 1, 19000, 'R.propios', NULL, '2010-04-13'),
(631, 3121, '3121', 'Manual de carpinteria', 'Cultural', 'Cultural', 'Bueno', 1, 1, 17000, 'R.propios', NULL, '2010-04-13'),
(632, 3122, '3122', 'Manual de plomeria', 'Cultural', 'Cultural', 'Bueno', 1, 1, 17000, 'R.propios', NULL, '2010-04-13'),
(633, 3123, '3123', 'Maestro alba', 'Cultural', 'Cultural', 'Bueno', 1, 1, 19000000, 'R.propios', NULL, '2010-04-13'),
(634, 3124, '3124', 'Mecanica industrial', 'Cultural', 'Cultural', 'Bueno', 1, 1, 27000, 'R.propios', NULL, '2010-04-13'),
(635, 3125, '3125', 'Tecnologia aplicada', 'Cultural', 'Cultural', 'Bueno', 1, 1, 15000, 'R.propios', NULL, '2010-04-13'),
(636, 3126, '3126-3155', 'Atlas geografico de chile y el mundo    ', 'Instituto cartog. latino', 'Vicens vives', 'Bueno', 30, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(637, 3156, '3156-3185', 'Diccionario de la lengua castellana', 'Dr. rodolfo oroz', 'Universitaria', 'Bueno', 30, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(638, 3185, '3186', 'La  metamorfosis y otros relatos', 'Franz kafka', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(639, 3187, '3187- 3188', 'Historia general moderna', 'J. vicens vives', 'Vicens vives', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(640, 3190, '3190', 'Diez obras de fin de siglo', 'Ramon griffero', 'Frontera sur', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(641, 3191, '3191', 'Curso de matematicas elementales, algebra', 'Francisco pr', 'Edicion occidente', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(642, 3192, '3192', 'Historia ilustrada de chile', 'Walterio millar', 'Zig- zag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(643, 3193, '3193', 'Jugando con la luz', 'Pedro m. mejias', 'Nivola', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-12'),
(644, 3194, '3194', 'Gregor mendel , el fundador de la genetica', 'Alberto gomis', 'Nivola', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(645, 3195, '3195', 'Tabla periodica de los elementos', 'Varios autores', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(646, 3196, '3196', 'Chile ( fisico- politico), ', 'Varios autores', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(647, 3197, '3197', 'La eneida', ' virgilio', 'Biblioteca edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(648, 3198, '3198', 'El cantar del mio cid', 'Anonimo', 'Biblioteca edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(649, 3199, '3199', 'Historia contemporanea de chile i', 'Gabriel zalazar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(650, 3200, '3200', 'Planisferio politico con bandera de plastico inc', 'Instituto geografico m.', 'Cultura', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(651, 3201, '3201', 'Mapas murales, america del sur', 'Varios autores', 'Vicens vives', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(652, 3202, '3202', 'Geografia global', 'Gustavo d. buzai', 'Lugar editorial', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(653, 3203, '3203', 'El amante sin rostro', 'Jorge marchant lazcano', 'Tajamar editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(654, 3204, '3204', 'Pedro paramo, el llano en llamas', 'Juan rulfo', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(655, 3205, '3205', 'Cuando era muchacho', 'Jose santos gonzalez v.', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(656, 3206, '3206', 'El ni', 'Luis rios barrueto', 'Pehuen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(657, 3207, '3207', 'El si de las ni', 'Leandro fernandez', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(658, 3208, '3208', 'Martin rivas', 'Alberto blest gana', 'Ediciones b', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(659, 3209, '3209', 'Leonardo y la mano que dibuja el futuro', 'Luca novelli', 'Editex', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(660, 3210, '3210', 'El arbol de la memoria y otros poemas', 'Jorge teillier', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(661, 3211, '3211', 'Historia contemporanea de chile ii', 'Gabriel zalazar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(662, 3212, '3212', 'Fisica i', 'Ricardo castro ', 'Santillana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(663, 3213, '3213', 'Quimica manual esencial', 'Mario avila garrido', 'Santillana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(664, 3214, '3214', 'Eloy', 'Carlos droguett', 'Tajamar editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(665, 3215, '3215', 'La era del imperio (1875- 1914)', 'Eric hbsbawm', 'Editorial planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(666, 3216, '3216', 'La era de la revolucion 1789-1848', 'Eric hobsbawm', 'Editorial planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(667, 3217, '3217', 'Canto general', 'Pablo neruda', 'Editorial planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(668, 3218, '3218', 'Retratos, el tiempo de las reformas y los descubrimientos', 'Gerardo vidal guzman', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(669, 3219, '3219', 'Atlas de la historia de chile', 'Osvaldo silva', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(670, 3220, '3220', 'De muerte', 'Armando uribe arce', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(671, 3221, '3221', 'La vida es sue', 'Pedro calderon de la bar', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(672, 3222, '3222', 'El retrato de dorian gray', 'Oscar wilde', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(673, 3223, '3223-3224', 'Nueva historia de chile desde los origenes hasta nuestros dias', 'Carlos aldunate, h. aran', 'Zigzag', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(674, 3225, '3225', 'El cepillo de dientes, el velero en la botella', 'Jorge diaz', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(675, 3226, '3226', 'Mi nombre es malarrosa', 'Hernan rivera letelier', 'Aguilar chilena edic', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(676, 3227, '3227', 'Conversacion en la catedral', 'Mario vargas llosa', 'Aguilar chilena edic', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(677, 3228, '3228', 'La casa verde', 'Mario vargas llosa', 'Aguilar chilena edic', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(678, 3229, '3229', 'Vida la ciencia de la biologia', 'Purves, william', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(679, 3230, '3230', 'Santiago de chile historia de una sociedad urbana', 'Armando de ramon', 'Catalonia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(680, 3231, '3231', 'La suma de los dias', 'Isabel allende', 'Sudamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(681, 3232, '3232', 'Ines del alma mia', 'Isabel allende', 'Sudamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(682, 3233, '3233', 'La libertad segun hannah arendt', 'Maite larrauri-max', 'Tandem ', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(683, 3234, '3234', 'Los hermanos karamasov', 'Fiodor dostoievski', 'Gradifco', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(684, 3235, '3235', 'Historia general moderna siglos xviii xx                                                 ', 'J. vicens vives', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(685, 3236, '3236', 'Historia de chile 188-1994', 'Simon collier', 'Anormi', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(686, 3237, '3237', 'El proceso', 'Franz kafka', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(687, 3238, '3238', 'Geografia general', 'Armando aguilar', 'Prentice hall', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(688, 3239, '3239', 'Narraciones extraordinarias', 'Edgar allan poe', 'Octaedro', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(689, 3240, '3240', 'Bioarqueologia', 'Bernardo arriaza', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(690, 3241, '3241', 'Pueblos originarios de chile', 'Fresia barrientosa', 'Nativa ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(691, 3242, '3242', 'Historia del arte', 'J.r. triadu tur', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(692, 3243, '3243', 'Quimica', 'Raymond chang', 'Mc graw hill', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(693, 3244, '3244', 'Tratado de geografia humana', 'Daniel hiernaux', 'Anthropos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(694, 3245, '3245', 'Historia de los griegos', 'Indro montanelli', 'Random house m.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(695, 3246, '3246', 'Historia de los chilenos iii', 'Sergio villalobos', 'Taurus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(696, 3247, '3247', 'Historia de los chilenos iv', 'Sergio villalobos', 'Taurus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(697, 3248, '3248', 'Manual de geografia chile, america y el mundo', 'Pilar cereceda', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(698, 3249, '3249', 'Civilizaciones prehispanicas de america', 'Osvaldo silva', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(699, 3250, '3250', 'Historia del mundo contemporaneo', 'J. arostegui sanchez', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(700, 3251, '3251', 'Historia contemporanea de chile iii', 'Gabriel zalazar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(701, 3252, '3252', 'Arte latinoamericano del siglo xx', ' rodrigo gutierrez v.', 'Prensas universit', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(702, 3253, '3253', 'Ciencias para el mundo', 'M. delibes de castro', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(703, 3254, '3254', 'Algebra  y trigonometria', 'Sullivan', 'Pearson prentice h', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(704, 3255, '3255', 'Conocimientos fundamentales de matematicas', 'Elena de oteiza', 'Pearson educacion', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(705, 3256, '3256', 'Aritmetica', 'Baldor', 'Grupo e. patria', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(706, 3257, '3257', ' matematicas', 'L. galdos', 'Cultural', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(707, 3258, '3258', 'Fundamentos de fisica', 'Raymond serwey', 'Cengage learning', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(708, 3259, '3259', 'Biologia', 'Desalle- heithaus', 'Hol rinehart', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(709, 3260, '3260', 'La ciudad ausente', 'Ricardo piglia', 'Edi.zorro rojo', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(710, 3261, '3261', 'El camaleon y otros cuentos', 'Anton chejov', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(711, 3262, '3262', 'Poesia', 'Jorge manrique', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(712, 3263, '3263', 'Casa de mu', 'Henrik ibsen', 'Losada', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(713, 3264, '3264', 'Maria', 'Jorge isaacs', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(714, 3265, '3265', 'Antologia del cuento chileno', 'Alfonso calderon', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(715, 3266, '3266', 'Naturaleza muerta', 'Norbert schneider', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(716, 3267, '3267', 'Modernismo', 'Klaus- j', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(717, 3268, '3268', 'Chile arte actual', 'Gaspar galaz', 'Edic.universitarias', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(718, 3269, '3269', 'Experimentos cientificos', 'Janice vancleave', 'Limusa wiley', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(719, 3270, '3270', 'Quimica general', 'Ralph petrucci', 'P.prentice hall', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(720, 3271, '3271', 'Probabilidad y estadistica', 'Murray r. spiegel', 'Mc graw hill', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(721, 3272, '3272', 'Una verdad incomoda', 'Al gore', 'Gedisa ', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(722, 3273, '3273', 'Explicacion de todos mis tropiezos', 'Oscar bustamante', 'Uqbar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(723, 3274, '3274', 'Poemas para combatir la calvicie', 'Nicanor parra', 'Fondo cultura e.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(724, 3275, '3275', 'Las aventuras de sherlok holmes', 'Arthur conan d.', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(725, 3276, '3276', 'Historia contemporanea de chile v', 'Gabriel zalazar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(726, 3277, '3277', 'Breve historia de la filosofia', 'Humberto giannini', 'Catalonia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(727, 3278, '3278', 'Chile o una loca geografia', 'Benjamin subercaseaux', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(728, 3279, '3279', 'Apuntes de geo grafia fisica', 'Varios autores', 'Parramon', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(729, 3280, '3280', 'Historia de roma', 'Indro montanelli', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(730, 3281, '3281', '15 cuentos de amor y humor', 'Alfredo bryce e.', 'Peisa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(731, 3282, '3282', 'Ensayo sobre la ceguera', 'Jose saramago', 'Aguilar chilena edic.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(732, 3283, '3283', 'Hamlet', 'William shakespiare', 'Ediciones sm', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(733, 3284, '3284', 'Romeo y julieta', 'William shakespieare', 'Tinta fresca edic.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(734, 3285, '3285', 'Nociones elementales de administracion', 'Oscar johansen', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(735, 3286, '3286', 'Encuaderna tus libros', 'Karli frigge', 'Miguel a. salvatella', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(736, 3287, '3287', 'Poemas de amor', 'Raul zurita', 'Alianza edito. mago', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(737, 3288, '3288', 'El aleph', 'Jorge luis borges', 'Alianza editorial', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(738, 3289, '3289', 'Tragedias', 'Sofocles', 'Biblioteca edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(739, 3290, '3290', 'Historia de los chilenos tomo 2', 'Sergio villalobos', 'Taurus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(740, 3291, '3291', 'Cien a', 'Gabriel garcia marquez', 'Random house m.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(741, 3292, '3292', 'Ortega& gasset', 'Rudy & pepe pelayo', 'Literalia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(742, 3293, '3293', 'La voragine', 'Jose eustasio rivera', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(743, 3294, '3294', 'Altazor', 'Vicente huidobro', 'Andre bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(744, 3295, '3295', 'El fantasma de canterville', 'Oscar wilde', 'Tinta fresca', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(745, 3296, '3296', 'Reinas', 'Maren gootschalk', 'F.cultura econ. ', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(746, 3297, '3297', ' bodas de sangre, la casa de bernarda alba', 'Federico garcia lorca', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(747, 3298, '3298', 'Gaudi', 'Carme martin', 'Parramon', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(748, 3299, '3299', 'Cuentos de canterbury', 'Geoffrey chaucer', 'Gradifco', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(749, 3300, '3300', 'Confieso que he vivido', 'Pablo neruda', 'Pehuen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(750, 3301, '3301', 'La fuga', 'Pascal blanchet', 'Barbara fiore edic.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(751, 3302, '3302', 'Los detectives salvajes', 'Roberto bola', 'Anagrama', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(752, 3303, '3303', 'Hijo de ladron', 'Manuel rojas', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(753, 3304, '3304', 'Concurso intercentros de matematicas', 'Joaquin hernandez', 'Nivola', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(754, 3305, '3305', 'Bestiario', 'Julio cortazaar', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(755, 3306, '3306', 'Kavafis integro', ' miguel castillo didier', 'Tajamar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(756, 3307, '3307', 'Werther', 'Goethe j.w.', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(757, 3308, '3308', 'Talvez nunca, cronica nerudianas', 'Jose miguel varas', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(758, 3309, '3309', 'Explotados y benditos', 'Ascanio cavallo, c. diaz', 'Uqbar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(759, 3310, '3310', '   fisica conceptual', 'Paul g. hewitt', 'Addison wesley', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(760, 3311, '3311', 'Diccionariop abreviado oxford, de las religiones del mundo', 'John bowker', 'Paidos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(761, 3312, '3312', 'Canto de los rios que se aman', 'Raul zurita', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(762, 3313, '3313', 'Guia completa para organizar tu proyecto para la feria de cienc.', 'Bochonski', 'Limusa- wiley', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(763, 3314, '3314', 'Diccionario enciclopedico de quimica', 'Jacques angenault', 'Cecsa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(764, 3315, '3315', 'Fisica ii, para bachillerato', 'Eliezer braun', 'Trillas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(765, 3316, '3316', 'Una geografia humana renovada: lugares y regiones ', 'Abel albet', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(766, 3317, '3317', 'Quimica, conceptos y aplicaciones', 'John s. phillips', 'Mc graw hill', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(767, 3318, '3318', ' experimentos cientificos, sonido y audicion', 'Varios autores', 'Everest', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(768, 3319, '3319', ' historia de la pintura, del renacimiento a nuestros dias', 'Anna-carola kraube', 'K', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(769, 3320, '3320', ' surrealismo', ' leroy cathrin', ' taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(770, 3321, '3321', ' atlas de anatomia', ' anne m. gilroy', ' panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(771, 3322, '3322', ' artesanias para jugar', ' macarena barros', ' mis raices', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(772, 3323, '3323', 'Popol vuh', 'Anonimo', 'Fondo cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(773, 3324, '3324', 'Cubismo', 'Annie gantefuhrer-trier', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(774, 3325, '3325', 'Atlas historico', 'Joan roigobiol', 'Vicens vives', 'Bueno', 1, 1, 0, ' mineduc', NULL, '2011-07-11'),
(775, 3326, '3326', 'Diccionario de mitologia griega y romana', 'Pierre grimal', 'Paidos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(776, 3327, '3327', 'Casa de campo', 'Jose donoso', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(777, 3328, '3328', 'Diccionario de las religiones', 'Mircea eliade, ioan. couli', 'Paidos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(778, 3329, '3329', 'Sobredosis', 'Alberto fuguet', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(779, 3330, '3330', 'Cari', 'Ines stranger', 'Cuarto propio', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(780, 3331, '3331', 'Cabo de hornos', 'Francisco coloane', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(781, 3332, '3332', 'Los pasos perdidos', 'Alejo carpentier', 'Losada', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(782, 3333, '3333', 'Historia de las ideas y de la cultura en chile', 'Bernardo subercaseux', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(783, 3334, '3334', 'Breve historia universal', 'Ricardo krebs', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(784, 3335, '3335', ' winston churchill y sus grandes batallas', 'Alan mcdonald', 'El rompecabezas', 'Bueno', 1, 1, 0, 'Miniduc', NULL, '2011-07-11'),
(785, 3336, '3336', 'Leonardo da vinci', 'Antonio tello', 'Parramon', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(786, 3337, '3337', 'Charles chaplin', 'Pedro badran padaui', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11');
INSERT INTO `libro` (`id_libro`, `codigo_libro`, `rango_libro`, `titulo_libro`, `autor_libro`, `editorial_libro`, `estado_libro`, `cantidad`, `vigencia`, `valor_unitario`, `origen`, `observacion`, `fecha_recepcion`) VALUES
(787, 3338, '3338', 'Viaje de valparaiso a copiapo', 'Charles darwin', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(788, 3339, '3339', 'Discurso del metodo', 'Rene descartes', 'Pananmericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(789, 3340, '3340', 'Mapocho', 'Nona fernandez', 'Uqbar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(790, 3341, '3341', 'Historia del mundo', 'Carla rivera', 'Santillana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(791, 3342, '3342', 'Proyecto de obras completas', 'Roberto lire', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(792, 3343, '3343', 'La celestina', 'Fernando de rojas', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(793, 3344, '3344', 'Alma chilena', 'Carlos pezoa veliz', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(794, 3345, '3345', 'Antologia de obras de teatro', 'Egon wolff', 'Ril', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(795, 3346, '3346', 'Naufragios y rescates', 'Francisco coloane', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(796, 3347, '3347', 'Historia del siglo xx', 'Erichbsbawm', 'Critica', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(797, 3348, '3348', 'La era del capital 1848-1875', 'Eric hobsbawm', 'Critica', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(798, 3349, '3349', 'Historia de los chilenos', 'Sergio villalobos', 'Taurus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(799, 3350, '3350', 'Crimen y castigo', 'Fiodor dostoyevski', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(800, 3351, '3351', 'Periba', 'Lope de vega', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(801, 3352, '3352', 'Don juan tenorio', 'Jose zorrilla', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(802, 3353, '3353', 'Fausto', 'Johann w. goethe', 'Edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(803, 3354, '3354', 'Estadistica elemental', 'Robert johson', 'Cengage learning', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(804, 3355, '3355', 'Chile: cinco siglos de historia tomo i', 'Gonzalo vial', 'Zig-zag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(805, 3356, '3356', 'Chile: cinco siglos de historia tomo ii', 'Gonzalo vial', 'Zig- zag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(806, 3357, '3357', 'La odisea', 'Homero', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(807, 3358, '3358', 'Articulos', 'Mariano jose de larra', 'Catedra', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(808, 3359, '3359', 'Rimas y leyendas', 'Gustavo adolfo becquer', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(809, 3360, '3360', 'La guerra de los mundos', 'Herbert george wells', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(810, 3361, '3361', 'La segunda guerra mundial', 'Ricardo artola', 'Aianza', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(811, 3362, '3362', 'La noche de enfrente', 'Hernan del solas', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(812, 3363, '3363', 'Romancero gitano', 'Federico garcia lorca', 'Espasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(813, 3364, '3364', 'Novelas ejemplares', 'Miguel de cervantes', 'Edebe', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(814, 3365, '3365', 'Fisonomia hist', 'Jaime eyzaguirre', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(815, 3366, '3366', 'El burlador de sevilla y convidado de piedra', 'Tirso de molina', 'Zig-zag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(816, 3367, '3367', 'Kawesqar, hijos de la mujer sol', 'Paz errazuriz', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(817, 3368, '3368', 'El lugar sin limites', 'Jose donoso', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(818, 3369, '3369', 'El gaucho insufrible', 'Roberto bola', 'Anagrama', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(819, 3370, '3370', 'La iliada', 'Homero', 'Andres bello', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(820, 3371, '3371', 'El deseo, segun gilles deleuza', 'Maite larrauri', 'Tanoem', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(821, 3372, '3372', 'El gran arte', 'Rubem fonseca', 'Tajamar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(822, 3373, '3373', 'Prehistoria de chile', 'Grete mostny', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(823, 3374, '3374', 'Historia universal', 'Patricia jimenez r.', 'Santillana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(824, 3375, '3375', 'Historia de chile,desde la invasion incaica hasta nuestros dias', 'Armando de ramon', 'Catalonia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(825, 3376, '3376', 'Historia contemporanea de chile hombria y feminidad', 'Gabriel zalazar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(826, 3377, '3377', 'Historia universal', 'Secco ellauri', 'Bibliografica inter.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(827, 3378, '3378', 'La pintura en chile, desde la colonia hasta 1981', 'Milan ivelic, gaspar galaz', 'E. universitaria v.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(828, 3379, '3379', 'Imagenes de la identidad, la historia de chile en su patrimonio', 'Christian baez', 'Tajamar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(829, 3380, '3380', 'Atlas historico de chile', 'Instituto geografico m.', 'Igm', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(830, 3381, '3381', 'Warhol', 'Varios autores', 'Panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(831, 3382, '3382', 'Proyectos de exelencia para la feria de ciencias', 'Janice vancleave', 'Limusa-wiley', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(832, 3383, '3383', 'Algebra intermedia', 'R. david gustafson', 'Cengage learson', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(833, 3384, '3384', 'La biblia de la fisica y quimica', 'Varios autores', 'Lexus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(834, 3385, '3385', 'Biologia, la vida en la tierra', ' t.audesirk, g. audesirk', 'Prentice hall', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(835, 3386, '3386', 'Ecologia, conocer la casa de todos', 'Alicia hoffmann', 'Biblioteca americana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(836, 3387, '3387', 'Geografia humana', 'Juan romero', 'Ariel s.a.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(837, 3388, '3388', 'Geometria y trigonometria', 'J. baldor', 'Patria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(838, 3389, '3389', 'Historia de chile', 'S. villalobos, o. silva', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(839, 3390, '3390', 'Economia', 'Paul samuelson', 'Mc grau hill', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(840, 3391, '3391', 'Manual de historia de chile', 'Francisco frias v.', 'Zig- zag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(841, 3392, '3392', 'Impresionistas: la celebracion de la luz', 'Isabel kuhl', 'Parragon', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(842, 3393, '3393', 'Luz rabiosa', 'Rafael rubio', 'Camino del ciego', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(843, 3394, '3394', 'Un a', 'Juan emar', 'Tajamar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(844, 3395, '3395', 'Ayer', 'Juan emar', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(845, 3396, '3396', 'Poemas y antipoemas', 'Nicanor parra', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(846, 3397, '3397', 'Algebra, manual de preparacion pre- universitaria', 'Dto. creacion lexus', 'Lexus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(847, 3398, '3398', 'El mundo de la celula', 'Wayne m. becker', 'P. addison wesley', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(848, 3399, '3399', 'Grna atlas historico', 'Varios autores', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2011-07-11'),
(849, 3400, '3400-3440', 'Atlas escolar de chile y el mundo, sopena', 'Varios autores', 'Libertad s.a.', 'Bueno', 40, 1, 0, 'R. propios', NULL, '2011-07-11'),
(850, 3441, '3441-3545', 'Travesia literaria, antologia 2 medio', 'Varios autores', 'Alfaguara juvenil', 'Bueno', 104, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(851, 3546, '3546-3662', 'Relatos de este mundo y de otros', 'Varios autores', 'Tajamar', 'Bueno', 117, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(852, 3663, '3663-3761', 'Contextos antologia ilustrada de textos informativos', 'Varios autores', 'Planeta', 'Bueno', 99, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(853, 3762, '3762-3815', 'Palabras que cuentan el mundo', 'Varios autores', 'Alfaguara juvenil', 'Bueno', 54, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(854, 3816, '3816-3919', 'La vuelta al mundo en 100 textos, antologia literaria informativa', 'Varios autores', 'Planeta', 'Bueno', 104, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(855, 3919, '3919-4089', 'Voces del mundo, textos literarios e informativos', 'Maria magdalena browne', 'Pehuen ediciones', 'Bueno', 110, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(856, 4090, '4090-4194', 'Letras cardinales, antologia de obras literarias', 'Varios autores', 'Editorial universitaria', 'Bueno', 105, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(857, 4195, '4195-4315', 'Letras y mundo, antologia literaria e informativa', 'Varios autores', 'Alfaguara juvenil', 'Bueno', 121, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(858, 4316, '4316-4372', 'Palabras en cada puerta, antologia de obras literarias', 'M aria l perez david wall', 'Editorial universitaria', 'Bueno', 57, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(859, 4373, '4373-4489', 'La quinta pata, antologia literaria e informativa', 'Silvia aguilera florencia v', 'Lom ediciones', 'Bueno', 117, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(860, 4490, '4490-4512', 'Guia mis lecturas diarias, 1a 4 medio', 'Ministerio de educacion', 'Imprenta trama', 'Bueno', 23, 1, 0, 'Mineduc', NULL, '2012-12-26'),
(861, 4513, '4513-4514', 'Los dias del fuego, las saga de los confines 3', 'Liliana bodoc', 'Suma', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(862, 4515, '4515-4519', 'El ni', 'John boyne', 'Salamandra', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(863, 4520, '4520-4529', 'Siddhartha', 'Hermann hesse', 'Contemporanea', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(864, 4530, '4530-4531', 'El qvixote de matta', 'Germana matta ferrari', 'Electa', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(865, 4532, '4532-4541', 'Un viejo que leia novelas de amor', 'Luis sepulveda', 'Maxi tusquets', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(866, 4542, '4542-4546', 'El viejo y el mar', 'Ernest hemingway', 'Debolsillo', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(867, 4547, '4547-4548', 'El baile', 'Irene nemirovsky', 'Salamandra', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(868, 4549, '4549-4550', 'Creasr lectores activos', 'Dianne l. monson', 'Visor', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(869, 4551, '4551-4552', 'Doce cuentos peregrinos', 'Gabriel garcia marquez', 'Debolsillo', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(870, 4553, '4553-4554', 'Relatos   ', 'Rudyard kipling', 'Acantilado', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(871, 4555, '4555-4559', 'Ajedrez para ni', 'Murray chandler', 'Hispano europea', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(872, 4560, '4560-4564', 'America latina, epoca colonial', 'Gonzalo zaragoza', 'Anaya', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(873, 4565, '4565-4569', 'El curioso incidente del perro a medianoche', 'Mark haddon', 'Salamandra', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(874, 4570, '4570-4574', 'La fuga', 'Pascal blanchet', 'Barbara fiore', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(875, 4575, '4575-4579', 'El se', 'J.r.r. tolken', 'Minotauro', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(876, 4580, '4580-4584', 'El se', 'J.r.r. tolken', 'Minotauro', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(877, 4585, '4585-4589', 'El se', 'J.r.r. tolken', 'Minotauro', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(878, 4590, '4590-4596', 'Dark dude', 'Oscar hijuelos', 'Everest', 'Bueno', 7, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(879, 4597, '4597-4606', 'Marianela', 'Benito perez galdos', 'Andres bello', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(880, 4607, '4607-4616', 'Malinche', 'Laura esquibel', 'Suma', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(881, 4617, '4617-4618', 'Leseras', 'Catulo', 'Ediciones tacitas', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(882, 4619, '4619-4628', 'Preguntale a alicia', 'Anonimo', 'Salesianos impresores', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(883, 4629, '4629-4630', 'Magisterio y ni', 'Gabriela mistral', 'Andres bello', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(884, 4631, '4631-4640', 'La metamorfosis', 'Franz kafka', 'Ediciones era', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(885, 4641, '4641-4642', 'Las peliculas de mi vida', 'Alberto fuguet', 'Alfaguara juvenil', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(886, 4643, '4643-4644', 'Me llamo john lennon', 'Carmen gil', 'Parramon', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(887, 4645, '4645-4646', 'Luto en primavera', 'Guillermo blanco', 'Andres bello', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(888, 4647, '4647-4651', 'Hombres, maquinas y estrellas', 'Arturo aldunate phillips', 'Pehuen ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(889, 4651, '4652', 'La nube', 'Federico schopf', 'Cuarto propio', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(890, 4653, '4653-4654', 'La sombra del viento', 'Carlos ruiz zafon', 'Planeta', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(891, 4655, '4655-4659', 'Pantaleon y las visitadoras', 'Mario vargas llosa', 'Punto de lectura', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(892, 4660, '4660-4661', 'Lear rey y mendigo', 'Nicanor parra', 'Ediciones universi', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(893, 4662, '4662-4663', 'Violeta se fue a los cielos', 'Angel parra', 'Catalonia', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(894, 4664, '4664-4665', 'La mejor idea jamas pensada', 'Alvaro fischer', 'Ediciones b', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(895, 4666, '4666-4670', 'Confieso que he vivido', 'Pablo neruda', 'Pehuen ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(896, 4671, '4671-4672', 'Chile, cinco siglos de historia tomo 1 y 2', 'Gonzalo vial', 'Zigzag', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(897, 4673, '4673-4674', 'Chile, cinco siglos de historia tomo 1 y 2', 'Gonzalo vial', 'Zigzag', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(898, 4675, '4675-4676', 'Las cien mejores anecdotas de la 2 guerra mundial', 'Jesus hernandez', 'Meditaeditores', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(899, 4677, '4677-4681', 'Historia de la infancia en chilerepublicano', 'Jorge rojas flores', 'Salesianos impresores', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(900, 4682, '4682-4683', 'La pintura en chile', 'Milan ivelic', 'Ediciones universitarias', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(901, 4684, '4684-4688', 'Breve historia contemporanea de chile', 'Osvaldo silva', 'Lom ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(902, 4689, '4689-4690', 'Leonardo da vinci,,arte y ciencia del universo', 'Alessandro vessosi', 'Blume', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(903, 4691, '4691-4692', 'La revolucion industrial', 'Antonio escudero', 'Anaya ', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(904, 4983, '4983-4984', 'Historia de la ciencia y de la tecnologia', 'Silvia collini', 'Editex', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(905, 4695, '4695-4696', 'La mujer en la historia', 'Eulalia de vega', 'Anaya', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(906, 4697, '4697-4698', 'Historia del tiempo', 'Stephen w. hawking', 'Dracontos', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(907, 4699, '4699-4700', 'La historia de la tecnologia', 'Luca fraioli', 'Editex', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(908, 4701, '4701-4705', '¿ america latina moderna?', 'Jorge larra', 'Lom ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(909, 4706, '4706-4710', 'Historia contemporanea de chile i estado legitimidad', 'Gabriel salazar', 'Lom ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(910, 4711, '4711-4715', 'Historia contemporanea de chile, la econom', 'Gabriel salazar', 'Lom ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(911, 4716, '4716-4721', 'Historia contemporanea de chile,hombr', 'Gabriel salazar', 'Lom ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(912, 4722, '4722', 'Biodiversidad de chile, patrimonio y desafios', 'Conama', 'Ocholibros editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(913, 4723, '4723', 'Gu', 'Agust', 'Salesianos impresores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(914, 4724, '4724', 'Linneo, el principe de los bot', 'Antonio gonz', 'Nivola', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(915, 4725, '4725-4726', 'Aves de chile', 'Alvaro jaramillo', 'Lynx', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(916, 4726, '4727', 'Desaf', 'Joaqu', 'Nivola', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(917, 4728, '4728-4729', '100 cosas que debes saber sobre inventos', 'Duncan brwer', 'Signo editorial', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(918, 4730, '4730-4731', 'Historia de los inventos', 'Shobhit mahajan', 'Fullmann', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(919, 4732, '4732', 'Iconograf', 'Margarita cid lizondo', 'Ocholibros editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(920, 4733, '4733', 'Verdes raices, flora nativa y sus usos tradicionales', 'Javiera diaz', 'Editorial amanuta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(921, 4734, '4734-4735', 'Fundamentos de qu', 'Paula yurkanis', 'Pearson prentice hall', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(922, 4736, '4736-4737', 'Qu', 'John phillips', 'Mc graw hill', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(923, 4738, '4738-4739', 'Guinness world recors 2012', '', 'Planeta', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(924, 4740, '4740-4741', 'A la mesa con neruda', 'A', 'Liberalia', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(925, 4742, '4742-4743', 'Revisi', 'Jorge gonz', 'Ocholibros editores', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(926, 4744, '4744', 'Pintura chilena del siglo xix', 'Alberto valenzuela llanos', 'Origo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(927, 4745, '4745', 'Stanley kubrick, filmograf', 'Paul duncan', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(928, 4746, '4746-4750', 'Introducci', 'Enzo vald', 'Bibliograf', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(929, 4751, '4751-4755', 'Introducci', 'Enzo vald', 'Bibliograf', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(930, 4756, '4756-4757', '1000 ejercicios y juegos de gimnacia ritmica deportiva', 'Anna barta peregot', 'Paidotribo', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(931, 4758, '4758-4762', 'Dvd, p', 'Andr', '', 'Bueno', 6, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(932, 4763, '4763', 'Dvd, pelicula la lengua de las mariposas', 'Jos', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(933, 4764, '4764', 'Dvd, pelicula, la misi', '', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(934, 4765, '4765', 'Dvd, pelicula la madre', 'Vsevolod pudovkin', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(935, 4766, '4766-4767', 'Dvd, pelicula, la sociedad de los poetas muertos', 'Peter weir', '', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(936, 4767, '4768', 'Dvd documental la nostalgia de la luz', 'Patricio guzm', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-05-15'),
(937, 4769, '4769-4893', 'Prisma, antolog', 'C', 'Piedra del sol', 'Bueno', 124, 1, 0, 'Mineduc', NULL, '2013-06-10'),
(938, 4894, '4894-5121', 'Libertad bajo palabra, antolog', 'Ana mar', '', 'Bueno', 128, 1, 0, 'Mineduc', NULL, '2013-06-10'),
(939, 5122, '5122-5245', 'Literoscopio, antolog', 'Fernanda arrau', 'Ediciones sm chile ', 'Bueno', 124, 1, 0, 'Mineduc', NULL, '2013-06-10'),
(940, 5246, '5246-5307', 'Chile a trav', 'Juan andr', 'Alfaguara ediciones', 'Bueno', 62, 1, 0, 'Mineduc', NULL, '2013-06-10'),
(941, 5308, '5308-5320', 'Gu', 'Ministerio de educaci', 'Imprenta trama', 'Bueno', 12, 1, 0, 'Mineduc', NULL, '2013-06-10'),
(942, 5321, '5321-5336', 'Historia universal', 'Secco ellauri', 'Bibliograf', 'Bueno', 16, 1, 0, 'Mineduc', NULL, '2013-08-21'),
(943, 5337, '5337-5343', 'Terremotos y tsunamis en chile', 'Pilar cereceda', 'Origo ediciones', 'Bueno', 7, 1, 0, 'Mineduc', NULL, '2013-08-22'),
(944, 5344, '5344-5374', 'Cultura ciudadana', '', 'Ocholibros', 'Bueno', 30, 1, 0, 'Mineduc', NULL, '2013-08-23'),
(945, 5375, '5375-5384', 'Diccionario pocket ingl', 'Michael mayor', 'Pearson', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(946, 5385, '5385-5386', 'Reflexiones sobre geometr', 'Francois baule', 'Ediciones la vasija', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(947, 5387, '5387-5388', 'F', 'Paul tippens', 'Mc graw hill', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(948, 5389, '5389-5390', 'Dios creo los n', 'Stephen hawking', 'Cr', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(949, 5391, '5391-5392', 'Matem', 'Douglas jimenez', 'Tajamar ediciones', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(950, 5393, '5393', 'Geometr', 'Dr j a baldor', 'Grupo edito patria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(951, 5394, '5394', 'Matem', 'Malba tahan', 'Pluma y papel edi', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(952, 5395, '5395-5396', 'Diccionario cient', 'Sergio premafera', 'Edici radio uni chil', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(953, 5397, '5397-5398', 'Historia del arte', 'J r triad', 'Vicens vives', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(954, 5399, '5399-5403', 'Historia del pueblo mapuche', 'Jos', 'Lom', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(955, 5404, '5404-5408', 'Historia contemporanea de chile ii', 'Gabriel salazar', 'Lom', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(956, 5409, '5409-5413', 'Historia de chile v', 'Gabriel salazar', 'Lom', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(957, 5414, '5414-5416', 'La mujer en la historia', 'Eulelia de la vega', 'Anaya', 'Bueno', 3, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(958, 5417, '5417-5421', 'America latina la independencia', 'Gonzalo zaragoza', 'Anaya', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(959, 5422, '5422-5426', 'La ruta de los volcanes', 'Guia ecoturistica', 'Pehuen', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(960, 5427, '5427-5428', 'Proyectos fascinantes', 'Sally hewitt', 'Panamericana', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(961, 5429, '5429-5438', 'Cuentos tomo 1 y 2', 'Edgar allan poe', 'Alianza editorial', 'Bueno', 12, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(962, 5439, '5439-5440', 'La saga de los confines 2 los dias de sombra', 'Liliana bodoc', 'Suma', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(963, 5441, '5441-5442', 'Un mundo para julius', 'Julio ortega', 'Catedra', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(964, 5443, '5443-5444', 'Decamer', 'Giovanni bocaccio', 'Catedra', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(965, 5445, '545-5454', 'La ', 'Mar', 'Biblioteca breve', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(966, 5455, '5455-5456', 'Victoria', 'Joseph conrad', 'Biblioteca conrad', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(967, 5457, '5457-5466', 'Rimas y leyendas', 'Gustavo adolfo becquer', 'Andr', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(968, 5467, '5467-5471', 'Eclipse', 'Stephenie meyer', 'Alfaguara ediciones', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(969, 5472, '5472-5481', 'Mala onda', 'Alberto fuget', 'Punto de lectura', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(970, 5482, '5482-5491', 'El cartero de neruda', 'Antonio skarmeta', 'Deblsillo', 'Bueno', 10, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(971, 5492, '5492-5493', 'El beso y otros cuentos', 'Anton chejov', 'Alianza editorial', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(972, 5494, '5494-5495', 'El dardo en la palabra', 'Fernando l', 'Deblsillo', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(973, 5496, '5496-5497', 'Momentos estelares de la humanidad', 'Stefan zweig', 'Acantilado', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(974, 5498, '5498-5502', 'El hombre invisible', 'H.c. wells', 'Riosdetinta', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(975, 5502, '5502-5507', 'El coronel no tiene quien le escriba', 'Gabriel garc', 'Deblsillo', 'Bueno', 5, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(976, 5508, '5508-55096', 'Vida y ', 'J.m. coetzee', 'Literatura mondadori', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(977, 5510, '5510-5511', 'Zara y el librero de bagdad', 'Fernando marias', 'Ediciones sm chile ', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(978, 5512, '5512', '50 flores nativas', 'Gazi garib', 'Galbooks', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(979, 5513, '5513', 'Subterra pelicula dvd', 'Marcelo ferrari', 'Tranvideo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2013-10-11'),
(980, 5514, '5514-5515', 'Voces a toda m', 'V', 'Geo blace', 'Bueno', 2, 1, 0, 'Donaci', NULL, '2014-04-29'),
(981, 5516, '5516-', 'C', 'Juan colombo campbell', 'Editorial jur', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(982, 5517, '5517-', 'El santiago que se fu', 'Oreste plath', 'World color', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(983, 5518, '5518-', 'Galileo galilei', 'Arturo uslar pietri', 'Tajamar ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(984, 5519, '5519-', '"chile avanza en un mundo convulsionado ""el mercurio"""', 'El mercurio', 'El mercurio aguilar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(985, 5520, '5520-5521', 'Nuestros pintores contemporaneos', 'Paula guzm', 'Ley de donaciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(986, 5522, '5522-', 'Arqueolog', 'Aedeen cremin', 'Blume', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(987, 5523, '5523-', 'Fundamentos de f', 'Serway/vuille', 'Cengage learning', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(988, 5524, '5524-', 'Matem', 'Douglas jimenez', 'Tajamar ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(989, 5525, '5525-', '50 teorias psicol', 'Christian jarret', 'Blume', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(990, 5526, '5526-', 'Internet para docentes', 'Luis angulo aguirre', 'Editorial macro', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(991, 5527, '5527-', 'Discriominaci', 'Guitt', 'Trillas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(992, 5528, '5528-', 'Cine negro', 'Alaint silver/james ursini', 'Tasch', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(993, 5529, '5529-', 'Almanaque mundial 2010', 'Carlos huigo jimenez', 'Televisa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(994, 5530, '5530-', 'Guinness world records', 'Varios autores', 'Guiness world records', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(995, 5531, '5531-5532', 'Atlas geogr', 'Instituto cartogr', 'Vicens vives', 'Bueno', 2, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(996, 5533, '5533-', 'Blacksad', 'Juan d', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(997, 5534, '5534-', 'Gabinete de papel', 'Gonzalo mill', 'Ediciones diego p', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(998, 5535, '5535-', 'Cabra lesa', 'Daniela gonz', 'Ril', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(999, 5536, '5536-', 'Paula', 'Isabel allende', 'Deblsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1000, 5537, '5537-', 'El inutil', 'Joaquin edwards bello', ' pfeiffer', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1001, 5538, '5538-', 'El hombre blando', 'Gregory cohen', 'Desatanudos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1002, 5539, '5539-', 'Antolog', 'Pablo neruda', 'Biblioteca edaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1003, 5540, '5540-', 'El grotesco criollo: disc', 'Disc', 'Ediciones colihue', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1004, 5541, '5541-', 'Cabeza y orquideas', 'Karina pacheco', 'Borrador', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1005, 5542, '5542-', 'Relatos de humor', 'Montserrat amores-', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1006, 5543, '5543-', 'Illustration now 3', 'Julio wiedermann', 'Tasch', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1007, 5544, '5544-', 'Harry potter, y el misterio del principe', 'Jk rowling', 'Salamandra', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1008, 5545, '5545-', 'Historias de san peterburgo', 'Nikolai gogol', 'Alianza editorial', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1009, 5546, '5546-', 'Cuentos zen', 'Jon j. muth', 'Scholastic', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1010, 5547, '5547-', 'Write source', 'Dave kemper', 'Great sours', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1011, 5548, '5548-', 'Cl', 'Grinor rojo', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1012, 5549, '5549-', 'El caballo fantasma', 'Cornelia funke', 'Fondo de cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1013, 5550, '5550-5552', 'El tunel', 'Ernesto sabato', 'Editorial planeta', 'Bueno', 3, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1014, 5553, '5553-', 'El fantasma de karl marx', 'Roman de calan', 'Errata  naturae', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1015, 5554, '5554-', 'Los hombres de muchaca', 'Mariela rodr', 'Casals', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1016, 5556, '5556-', 'Cuentos completos', 'Graham green', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1017, 5557, '5557-', 'Matem', 'Patricia iba', 'Cengage learning', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1018, 5558, '5558-', 'Dvd violeta se fue a  los cielos', 'Angel parra', 'Andr', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1019, 5559, '5559-', 'Dvd subterra', 'Marcelo ferrari', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1020, 5560, '5560-', 'Dvd centenario, museo nacional de las bellas artes', 'Solo por las ni', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1021, 5561, '5561-', 'Diccionario de la lengua espa', 'Rodolfo oroz', 'Universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1022, 5562, '5562-5565', 'Tableros de ajedrez', '', '', 'Bueno', 4, 1, 0, 'Mineduc', NULL, '2014-11-26'),
(1023, 5566, '5566', 'La sobervia juventud', 'Pablo simonetti', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1024, 5567, '5567', 'El evangelio de venus', 'Alonso palomares', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1025, 5568, '5568', 'En la isla', 'Nicol', 'Ceibo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1026, 5569, '5569', 'American illustrators for kids', 'Julia schonlau', 'Monsa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1027, 5570, '5570', 'Doumtoum', 'Noel lang rodrigo garc', 'Dibbuks', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1028, 5571, '5571', 'Shakespiare macbeth', 'Jos', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1029, 5572, '5572', 'Calugas', 'Gabriela richards', 'Ceibo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1030, 5573, '5573', 'La nieta del se', 'Philippe claudel', 'Letras de bolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1031, 5574, '5574', 'El', 'Maximiliano figueroa', 'Diego portales', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1032, 5575, '5575', 'Poco hombre', 'Pedro lemebel', 'Diego portales', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1033, 5576, '5576', 'Diario de valparaiso', 'Al', 'Ril ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1034, 5577, '5577', 'Sabiduria chilena de tradicion oral', 'Gaston soublette', 'Ediciones uc', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1035, 5578, '5578', 'La musica originaria', 'Rafael diaz silva', 'Ediciones uc', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1036, 5579, '5579', 'L', 'Armando bucchi cariola', 'Fondos cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1037, 5580, '5580', 'Lexico seg', 'Armando bucchi cariola', 'Fondos cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1038, 5581, '5581', 'Maravillas de la naturaleza', 'Naumann & global', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1039, 5582, '5582', 'La quintrala y otros malos de adentro', 'Benjam', 'Diego portales', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1040, 5583, '5583', 'Literatura norteamericana', 'Bret harte', 'Larsen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1041, 5584, '5584', 'Franny y zooey', 'J. d. salinger', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1042, 5585, '5585', 'Literatura de los pueblos originarios', 'Luis hern', 'Larsen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1043, 5586, '5586', 'Voltaire enamorado', 'Nancy mitford', 'Duomo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1044, 5587, '5587', 'Polvo de huesos', 'Rosabetty mu', 'Ediciones t', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1045, 5588, '5588', 'An', 'Oscar nail kr', 'Ril editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1046, 5589, '5589', 'Federico si o si poeta', 'Josefina rillon', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1047, 5590, '5590', 'Cartas a barbara', 'Leo meter', 'L', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1048, 5591, '5591', 'Santiago en 100 palabras', 'Mario verdugo', 'Edicciones sara claro', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1049, 5592, '5592', 'Sobre la iondependencia en chile', 'Eduardo cavieres figueroa', 'E universitarias valp', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1050, 5593, '5593', 'Pr', 'Luis merino, rodrigo torres', 'Ril ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1051, 5594, '5594', '20 a', 'Unidad de curriculum y evaluaci', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1052, 5595, '5595', 'Clima extremo', 'Margaret hynes', 'Editorial panamericana', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1053, 5596, '5596', 'Chile 1973-1990', 'Hoppe-l', 'P', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1054, 5597, '5597', 'Chile en el siglo xxi', 'Laetitia boussard', 'Piso diez', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1055, 5598, '5598', 'Incorporaci', 'Sergio villalobos', 'Catalonia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1056, 5599, '5599', 'Valparaiso mas alla de la postal', 'Claudio abarca  lobos', 'E. universitarias', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1057, 5600, '5600', 'Homeostasis', 'Felipe monsdalve', 'Grijalbo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1058, 5601, '5601', 'Chicas bailarinas', 'Margaret atwood', 'Lumen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1059, 5602, '5602', 'La columna de hierro', 'Taylor caldwell', 'Oceano', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1060, 5603, '5603', 'Lola hoffmann la revoluci', 'Leonora calder', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1061, 5604, '5604', '359 delicados con filtro', 'Pedro serrano y carlos l', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1062, 5605, '5605', 'Amapolas el delirio de la flor del olvido', 'Libero amarlic', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1063, 5606, '5606', 'Gabriela mistral los poetas te han elegido', 'M', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1064, 5607, '5607', 'Algun dia nos lo contaremos todo', 'Daniela krien', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1065, 5608, '5608', 'Selecci', 'Nicolas guillen', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1066, 5609, '5609', 'Cuentos italianos', 'Elena martinez', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1067, 5610, '5610', 'Reducciones', 'Jaime luis huenun', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1068, 5611, '5611', 'El dominico blanco', 'Gustav meyrink', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1069, 5612, '5612', 'Llegamos para quedarnos', 'Francisco figueroa', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1070, 5613, '5613', 'Plauto comedia de la olla anfitri', 'Jaime vel', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1071, 5614, '5614', 'La locura de macario', 'Marisela aguilar', 'El naranjo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1072, 5615, '5615', 'Simbologia prehispanica del choapa', 'Jorge colvin', 'Ediciones bodeg', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1073, 5616, '5616', 'Un pais mental 100  poemas chinos', 'Miguel angel petrecca', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1074, 5617, '5617', 'Diccionario enciclopedico de la regi', 'Omar mella fuentes', 'Ngehuin', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1075, 5618, '5618', 'Ejercicios de razonamientos matem', 'Cesar flores', 'Universidad de concepciom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1076, 5619, '5619', 'Escombro simbolico y espacio publico', 'Hilda basoalto', 'Consejo nacional cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1077, 5620, '5620', 'Angelson h y el ultimatum', 'Kim fupz aakenson', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1078, 5621, '5621', 'Teatro 1', 'Juan radrig', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1079, 5622, '5622', 'Juegos que agudizan el ingenio', 'Jorge batliori', 'Narcea', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1080, 5623, '5623', 'La resilencia en entornos socioeducativos', 'Anna for', 'Narcea', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1081, 5624, '5624', 'Reflejo', 'Jeannie baker', 'Interm', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1082, 5625, '5625', 'Carmilla', 'Joseph sheridan le fanu', 'Fondo de cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1083, 5626, '5626', 'Diccionario enciclopedico acontecimientos historicos', 'Omar mella fuentes', 'Ngehuin', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1084, 5627, '5627', 'Por amor a la f', 'Walter lewin', 'Debate', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1085, 5628, '5628', 'European illustrators for kids', 'Julia schonlau', 'Monsa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1086, 5629, '5629', 'El arte de la cocina francesa julia child', 'Louisette bertholl', 'Debate', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1087, 5630, '5630', 'Historias y an', ' nora y stefan koldehoff', 'Robinbook', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1088, 5631, '5631', 'La reina descsalza', 'Ildefonso falcones', 'Grijalbo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1089, 5632, '5632', 'El ni', 'Nicolas candia', 'Eirl', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1090, 5633, '5633', 'Breve historia utop', 'Rafael herrera guillen', 'Nowtilus', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1091, 5634, '5634', 'Bar abierto', 'Hern', 'E universitarias valp', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1092, 5635, '5635', 'Psicomagia', 'Alejandro jodorowky', 'Ediciones siruela', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1093, 5636, '5636', 'Altazor', 'Vicente huidobro', 'Edi uni diego por.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1094, 5637, '5637', 'Street art', 'Benke carlsson', 'Ed gustavo gili', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1095, 5638, '5638', 'Ultimos poemas', 'Vicente huidobro', 'E universidad diego p', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1096, 5639, '5639', 'Zurita', 'Ra', 'E universitarias d port', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1097, 5640, '5640', 'La oscuridad que nos lleva', 'Tulio espinoza', 'Cuarto propio', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1098, 5641, '5641', 'Don juan tenorio', 'Jos', 'Everest', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1099, 5642, '5642', 'Romance del duende que me escribe las novelas', 'Hern', 'Prisa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1100, 5643, '5643', 'Me llamo garri gasparov', 'Manuel margarido', 'Parram', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1101, 5644, '5644', 'Viaje sentimental', 'Laurence sterne', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1102, 5645, '5645', 'Los mayas y sus raices de agua', 'Andr', 'Nostra', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1103, 5646, '5646', 'El libro de los valores', 'Julio orosco, sandra ardila', 'Tajamar ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1104, 5647, '5647', 'Vinos de chile', 'Harriet nahrwold', 'Contrapunto', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1105, 5648, '5648', 'Tarde o temprano', 'Thomas hardy', 'Pfeifter', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1106, 5649, '5649', 'Parcxco', 'Jordi sierra', 'Anaya', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1107, 5650, '5650', 'Antes de que yo muera', 'Germ', 'Uni. diego portales', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1108, 5651, '5651', 'Volver a los 17', 'Oscar contardo', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1109, 5652, '5652', 'El templo', 'Matthew reillly', 'La factoria de las ideas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1110, 5653, '5653', 'F', 'Rafael alem', 'Laetoli', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1111, 5654, '5654', 'Dynamuss', 'Luis felipe torres', 'Chancacazo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1112, 5655, '5655', 'Mala indole cuentos aceptados y aceptables', 'Javier marias', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1113, 5656, '5656', 'Telegraph avenue', 'Michael chabon', 'Mondadori', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1114, 5657, '5657', 'Locke&key. bienvenidos a lovecraft', 'Joe hill', 'Eirl', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1115, 5658, '5658', 'Boom', 'Mo yan', 'Kailas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1116, 5659, '5659', 'El tungsteno', 'C', 'Montesinos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1117, 5660, '5660', 'Huidobro antolog', 'Jos', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1118, 5661, '5661', 'Y entonces estaban ellas', 'Elisabet prudant soto', 'Ceibo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1119, 5662, '5662', 'El sol de los scorta', 'Laurent gaud', 'Salamandra', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1120, 5663, '5663', 'Perros y clarinetes', 'Sebasdti', 'La c', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1121, 5664, '5664', 'Obras reunidas', 'Jenaro prieto', 'Universidad de la frontera', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1122, 5665, '5665', '50 animales que han cambiado el curso de la historia', 'Eric chaline', 'Librero', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1123, 5666, '5666', 'El palin juego tradicional de la cultura mapuche', 'Carlos l', 'E universitarias valp', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1124, 5667, '5667', 'Mapuche ', 'Jos', 'Catalonia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1125, 5668, '5668', 'La se', 'Virguinia woolf', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1126, 5669, '5669', 'El jard', 'Kate morton', 'Punto de lectura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1127, 5670, '5670', 'Siddhartha', 'Hermann hesse', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1128, 5671, '5671', 'Siempre estar', 'Andr', 'Bru', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1129, 5672, '5672', 'Goobye columbus', 'Philip roth', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1130, 5673, '5673', 'El soneto chileno', 'Juan cristobal moreno', 'E tacitas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1131, 5674, '5674', 'Mi cuerpo es una celda', 'Andr', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1132, 5675, '5675', 'Aqu', 'Paul auster', 'Mondadori', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1133, 5676, '5676', 'Dal', 'Robrt descharnes, gilles nerer', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1134, 5677, '5677', 'El socio', 'Jenaro prieto', 'Origo ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1135, 5678, '5678', 'El escritor sin fronteras', 'Mariano jose v', 'Manon', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1136, 5679, '5679', 'El cantar del mio cid', 'An', 'Origo ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1137, 5680, '5680', 'Space invaders', 'Nona fern', 'Alquimia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1138, 5681, '5681', 'El beso m', 'Mathias malzieu', 'Random grupo editorial', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1139, 5682, '5682', 'El nuevo libro del abc', 'Karl philipp moritz', 'Barbara flore', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1140, 5683, '5683', 'Corre historias vividas', 'Dean karmazes', 'Paldotribo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1141, 5684, '5684', 'Didacticas de las operaciones mentales: juzgar', 'Alberto gromi', 'Narcea', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1142, 5685, '5685', 'Silencio. nace una semilla', 'Manuel jofr', 'Piso diez', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1143, 5686, '5686', 'Intervenci', 'Rosa santiba', 'Grao', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1144, 5687, '5687', 'El rey banal', 'Antonie ozamam', 'Dibbuks', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1145, 5688, '5688', 'Hab', 'Gabriel gellon', 'Siglo 21', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1146, 5689, '5689', 'El teorema del patito feo', 'Luis javier plata', 'Siglo 21', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1147, 5690, '5690', 'Silencio. nace una semilla', 'Manuel jofr', 'Piso diez', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1148, 5691, '5691', 'El detective ausente', 'David blanco laserna', 'Anaya', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1149, 5692, '5692', 'El valle del terror, los misterios de sherlock holmes', 'Arthur conan doyle', 'Claridad', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1150, 5693, '5693', 'Francisco, el pa', 'Isabel g', 'Khaf', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1151, 5694, '5694', 'Diez cuentos para dormir mal', 'Ricardo rosas', 'Chancacazo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1152, 5695, '5695', 'Un color surgido desde el espacio', 'H.p.lovecraft', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1153, 5696, '5696', 'Predadores de silencio', 'Daniel bautista', 'Edelvives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1154, 5697, '5697', 'La historia del amor', 'Nicole krauss', 'Salamandra', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1155, 5698, '5698', 'Noticias sobre ti misma', 'Fatima sime', 'Cuarto propio', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1156, 5699, '5699', 'Qu', 'F. javier mart', 'Catarata', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1157, 5700, '5700', 'Reglamento de basquetbol', 'Escuela argentina de arbitros', 'Stadium', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1158, 5701, '5701', 'El principito', 'Antoine de saint exupery', 'Origo ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1159, 5702, '5702', 'Bacon & friends', 'Josep busquet', 'Diabolo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1160, 5703, '5703', 'Elaboraci', 'Susana pardo', 'Noveduc', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1161, 5704, '5704', 'Las verdaderas historias de l arte', 'Sylvain coissard', 'Oceano', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1162, 5705, '5705', 'Fogwill la gran ventana de los sue', 'Rodolfo fogwill', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1163, 5706, '5706', 'Contarlo todo', 'Jeremias gamboa', 'Mondadori', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1164, 5707, '5707', 'Noche de invierno', 'Valerio massimo', 'Grijalbo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1165, 5708, '5708', 'Adis a las armas', 'Ernest hemingway', 'Lumen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1166, 5709, '5709', 'El contrato social', 'Jean jacques rousseau', 'Herder', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1167, 5710, '5710', 'Eleanor &park', 'Rainbow rowell', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1168, 5711, '5711', 'Fuenzalida', 'Nona fernandez', 'Mondadori', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1169, 5712, '5712', 'El francotirador paciente', 'Arturo p', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1170, 5713, '5713', 'Duchamp', 'Janis mink', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1171, 5714, '5714', 'Enciclopedia completa de la guitarra', 'Nick freeth', 'Parram', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1172, 5715, '5715', 'El espejo de agua, ecuatorial', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1173, 5716, '5716', 'Poemas articos', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1174, 5717, '5717', 'Altazor', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1175, 5718, '5718', 'Temblor de cielo', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1176, 5719, '5719', 'Ultimos poemas', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03');
INSERT INTO `libro` (`id_libro`, `codigo_libro`, `rango_libro`, `titulo_libro`, `autor_libro`, `editorial_libro`, `estado_libro`, `cantidad`, `vigencia`, `valor_unitario`, `origen`, `observacion`, `fecha_recepcion`) VALUES
(1177, 5720, '5720', 'Mio cid campeador', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1178, 5721, '5721', 'Cagliostro', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1179, 5722, '5722', 'Ombligo, vital, total, acxtual', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1180, 5723, '5723', 'El oxigeno invisible', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1181, 5724, '5724', 'A la interperie', 'Vicente huidobro', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1182, 5725, '5725', 'Dvd vida yconciencia lo que tenemos en mente', 'Las minas producciones', '', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2015-09-03'),
(1183, 5726, '5726-5729', 'La cuesti', 'Cristi', 'Consejo nacional cultura', 'Bueno', 4, 1, 0, 'Donaci', NULL, '2016-08-04'),
(1184, 5730, '5730', 'Muchos gatos para un solo crimen', 'Ram', 'Lom', 'Bueno', 1, 1, 0, 'Donaci', NULL, '2016-08-04'),
(1185, 5731, '5731', 'Nunca seremos estrella de rock', 'Jordi sierra', 'Alfaguara ediciones', 'Bueno', 1, 1, 0, 'Donaci', NULL, '2016-08-04'),
(1186, 5732, '5732', 'Nuestro modo de vida', 'Fogwill', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1187, 5733, '5733', 'Mentira', 'Care santos', 'Edeb', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1188, 5734, '5734', 'Como sombras y sue', 'Luis zapata', 'Edic cal y arena', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1189, 5735, '5735', 'Vidas rotas', 'William c. gordon', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1190, 5736, '5736', 'Sombras de la plaza mayor', 'Rosa huertas', 'Edelvives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1191, 5737, '5737', 'Ante la ley', 'Franz kafka', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1192, 5738, '5738', 'Parias zugun', 'Adriana pinda', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1193, 5739, '5739', 'Una fantas', 'Julio verne', 'Sd ediciones', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1194, 5740, '5740', 'Un mundo propio', 'Graham greene', 'Ediciones la rota', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1195, 5741, '5741', 'Oki tripulante de terremotos', 'Juan carlos quezadas', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1196, 5742, '5742', 'Luis oyarz', 'Oscar contardo', 'Edic uni diego portales', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1197, 5743, '5743', 'Trentrenfil', 'Alberto trivero', 'Ediciones t', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1198, 5744, '5744', 'Formas breves', 'Ricardo piglia', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1199, 5745, '5745', 'El ojo en la nuca', 'Ilian stavans', 'Anagrama', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1200, 5746, '5746', 'Historia de pat hobby', 'Francis scott fitzgerald', 'Lonm', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1201, 5747, '5747', 'El matorral crategus', 'Branny cardoch', 'Editorial forja', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1202, 5748, '5748', 'Igualdad', 'Agust', 'Manifiestos', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1203, 5749, '5749', 'Leonardo da vinci, obra gr', 'Johannes nathan', 'Taschen', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1204, 5750, '5750', 'William shakespiare, romances , obras completas', 'William shakespiare', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1205, 5751, '5751', 'Global y roto', 'Bernardo santos', 'Amargord', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1206, 5752, '5752', 'Abecedario de p', 'Yord', 'Autom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1207, 5753, '5753', 'Kafkas', 'Luis gusm', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1208, 5754, '5754', 'Analectas', 'Confusio', 'Kailas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1209, 5755, '5755', 'Album del santa luc', 'Soledad ch', 'Planeta sostenible', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1210, 5756, '5756', 'La vida y otras geograf', 'Mario benedetti', 'Edelvives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1211, 5757, '5757', 'Obra poetica , juan mar', 'Francisco martinovich', 'Cuarto propio', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1212, 5758, '5758', 'Emergencias', 'Diamela eltit', 'Planeta sostenible', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1213, 5759, '5759', 'Cuentos escogidos', 'Guillermo blanco', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1214, 5760, '5760', 'Ampliaci', 'Patricio alvarado', 'Alquimia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1215, 5761, '5761', 'El mapa roto', 'Wenuan escalona', 'Del aire', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1216, 5762, '5762', 'Ejercicios de encuadre', 'Carlos araya d', 'Cuneta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1217, 5763, '5763', 'Volverse palestina', 'Lina meruane', 'Random house', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1218, 5764, '5764', 'Kalim', 'Ángel burgos', 'Bambu', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1219, 5765, '5765', 'El sangrador', 'Patricio jara', 'Planeta sostenible', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1220, 5766, '5766', 'Herramientas para ense', 'Silvina marsimian', 'Aique', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1221, 5767, '5767', 'Un sistema gr', 'Rosa llop', 'Gustavo gili', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1222, 5768, '5768', 'La casa del sordo', 'Sim', 'La pollera', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1223, 5769, '5769', 'Desolaci', 'Gabriela mistral', 'Universidad diego port.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1224, 5770, '5770', 'Stendhal el arca y el fantasma', 'Estaher saura', 'Gadir', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1225, 5771, '5771', 'La historia del cine', 'Roman gubern', 'Anagrama', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1226, 5772, '5772', 'Los humanos', 'Matt haig', 'Roca', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1227, 5773, '5773', 'Est', 'Alberto mayol, tom', ' fund. chile moviliz.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1228, 5774, '5774', 'El gran libro de las abejas', 'Jutta gay, inga menkhoff', 'Fackeltr', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1229, 5775, '5775', 'Barba empapada de sangre', 'Daniel galera', 'Random house', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1230, 5776, '5776', 'La trilog', 'Suzy lee', 'Barbara fiore', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1231, 5777, '5777', 'Como escribir el gui', 'Miguel casamayor', 'Robin book', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1232, 5778, '5778', 'Hay un dinosaurio en mi sopa!', 'Alvaro chaos cador', 'Fondo cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1233, 5779, '5779', 'Tanguy y laverdure', 'Jean-michel charlier', 'Ponent mqn', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1234, 5780, '5780', 'Mobydick', 'Oliver jouvray, pierre alary', 'Dib-buks', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1235, 5781, '5781', 'Ciudades de papel', 'John green', 'Random house', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1236, 5782, '5782', 'Quai d''orsay , cr', 'Lanzac blain', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1237, 5783, '5783', 'Temporal', 'Nicanor parra', 'Universidad diego port.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-09'),
(1238, 5784, '5784', 'Heablemos de dineros', 'Gloria ayala person', 'Aguilar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1239, 5785, '5785', 'Un alma valiente', 'Nick vujicic', 'Aguilar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1240, 5786, '5786', 'Heavy metal', 'Andr', 'Robin book', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1241, 5787, '5787', 'Historias insolitas de la copa libertadores', 'Luciano wernicke', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1242, 5788, '5788', 'De bielsa a sampaoli', 'Rodrigoastorga', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1243, 5789, '5789', 'Bal', 'Juan villoro', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1244, 5790, '5790', 'Los mejores de america', 'Antonio mart', 'Uqbar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1245, 5791, '5791', 'Snoopy y el var', 'Charles m. schulz', 'Kraken', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1246, 5792, '5792', 'Cocina en familia', 'Carlo von m', 'Zigzag', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1247, 5793, '5793', 'El socio', 'Jenaro prieto', 'Universidad diego port.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1248, 5794, '5794', 'Lo mejor de octavio paz', 'Octavio paz', 'Seix barral', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1249, 5795, '5795', 'Bernard prince', 'Hermann y greg', 'Ponent mqn', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1250, 5796, '5796', 'Trent ', 'Leo rodolphe', 'Ponent mqn', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1251, 5797, '5797', 'El cantar de heike v.1', 'Jin taira, rumi sato', 'Satori', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1252, 5798, '5798', 'Los a', 'Carlos reyes,rodrigo elg', 'Hueders', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1253, 5799, '5799', 'Tanguy y laverdure', 'J.m. charlier ', 'Ponent mqn', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1254, 5800, '5800', 'Buddy longway', 'Derib', 'Dargaud- lombard', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1255, 5801, '5801', 'Recors guinness world 2015', 'Officially amazing', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1256, 5802, '5802', 'La ira de los angeles', 'John connolly', 'Tusquets, editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1257, 5803, '5803', 'How to invent', 'Lynn huggins-cooper', 'Qeb publishing', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1258, 5804, '5804', 'Macanudo 10', 'Ricardo liniers', 'Catalunia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1259, 5805, '5805', 'Don quijote de la mancha', 'Miguel de cervantes', 'Vicens vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1260, 5806, '5806', 'De animales a dioses', 'Yuval noah harari', 'Debate', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1261, 5807, '5807', 'Contrapunto', 'Aldous huxley', 'Edhasa', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1262, 5808, '5808', 'Itni', 'Iitni', 'Ocholibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1263, 5809, '5809', 'Tus pies toco en la sombra', 'Pablo neruda', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1264, 5810, '5810', 'Luis fernando rojas obra gr', 'Carola ureta, pedro a.', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1265, 5811, '5811', 'La mosca, acoso en las aulas', 'Gemma pasqual', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1266, 5812, '5812', 'El mundo de afuera', 'Jorge franco', 'Alfaguara', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1267, 5813, '5813', 'La hermana menor', 'Raymond chandler', 'Debolsillo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1268, 5814, '5814', 'Las 100 poesias de amor de la lengua castellana', 'J. francisco pe', 'Amargord', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1269, 5815, '5815', 'Las manos de juliette', 'Jahereh mafi', 'Fondo cultura', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1270, 5816, '5816', 'Underground', 'Haruki murakami', 'Tusquets, editores', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1271, 5817, '5817', 'Seg', 'Juan agust', 'Cuneta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1272, 5818, '5818', 'Preparativos para un viaje a kiev', 'Camilo marks', 'Random house', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1273, 5819, '5819', 'Bosques horizontales', 'Santiago barcaza', 'Ediciones t', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1274, 5820, '5820', 'Diario de un demente, la aut', 'Lu xun', 'Kailas', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1275, 5821, '5821', 'Un dia en la vida de conrad green', 'Ring lardner', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1276, 5822, '5822', 'El regate', 'Sergio rodr', 'Anagrama', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1277, 5823, '5823', 'Distancia de rescate', 'Samanta schweblin', 'Random house', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1278, 5824, '5824', 'El infierno de las mu', 'Jos', 'Uqbar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1279, 5825, '5825', 'Blue jeans, puedo so', 'Francisco de paula fernandez', 'Planeta', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1280, 5826, '5826', 'Virtual life, visi', 'Mario escobar', 'Edi. luis vives', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1281, 5827, '5827', 'Finis t', 'Alexis figueroa aracena', 'Lom', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-10'),
(1282, 5828, '5828', 'Una partida de ajedrez', 'Stefan zweig', 'Godot', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1283, 5829, '5829', 'La musica como pensamiento', 'Mark evan bonds', 'Acantilado', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1284, 5830, '5830', 'Gabo no contado', 'Dar', 'Aguilar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1285, 5831, '5831', 'Pablo de rokha y la revista multitud', 'Daniel rozas', 'Copygraph', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1286, 5832, '5832', 'La gl', 'Anna starobinets', 'Ediciones nevsky', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1287, 5833, '5833', 'Fronteras del conocimiento', 'Carlos alberto marmelada', 'Sekotia', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1288, 5834, '5834', 'Los agujeros negros', 'Jos', 'Catarata', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1289, 5835, '5835', 'Agujeros negros en el universo', 'Paulina lira, patricia arevalo', 'Edi universitaria', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1290, 5836, '5836', 'Qu', 'Walter sosa escudero', 'Siglo veintiuno', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1291, 5837, '5837', 'Mas alla de la contienda', 'Roman rolland', 'Nordicalibros', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1292, 5838, '5838', 'Ojo en tinta', 'Patricio contreras', 'Cinco ases', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1293, 5839, '5839', 'Apuntes al margen', 'Carla cordua', 'Universidad diego port.', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1294, 5840, '5840', 'Hotel nube en el mudo coraz', 'Jorge teillier', 'Tajamar', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1295, 5841, '5841', 'Fr', 'Carmen ibarlucea paredes', 'Amargord', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1296, 5842, '5842', 'Rebeli', 'Marisol ortiz de z', 'Bambu', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1297, 5843, '5843', 'Ultimate explorer guide for kids', 'Justin miles', 'Marshall', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1298, 5844, '5844', 'Ciencia oscura', 'Rick remender', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1299, 5845, '5845', 'Esteban', 'Matthieu bonhomme', 'Norma', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1300, 5846, '5846', 'Mi vecino miyazaki', 'Alvaro lopez martin', 'Diabolo', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-11'),
(1301, 5847, '5847-5849', 'Cielo , mar y tierra', 'Gabriela mistral', 'Biblioteca nacional', 'Bueno', 3, 1, 0, 'Mineduc', NULL, '2016-08-18'),
(1302, 5849, '5850', 'Gabriela mistral, unica y diversa', 'Pedro pablo zegers', 'Biblioteca nacional', 'Bueno', 1, 1, 0, 'Mineduc', NULL, '2016-08-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

DROP TABLE IF EXISTS `material`;
CREATE TABLE IF NOT EXISTS `material` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_material` varchar(45) DEFAULT NULL,
  `descripcion_material` varchar(100) DEFAULT NULL,
  `unidad_medida` varchar(45) DEFAULT NULL,
  `marca_material` varchar(45) DEFAULT NULL,
  `modelo_material` varchar(45) DEFAULT NULL,
  `medida_material` varchar(45) DEFAULT NULL,
  `stock_material` int(11) DEFAULT NULL,
  `id_tipo_material` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_material`),
  KEY `fk_material_seccion_idx` (`id_tipo_material`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id_material`, `codigo_material`, `descripcion_material`, `unidad_medida`, `marca_material`, `modelo_material`, `medida_material`, `stock_material`, `id_tipo_material`, `vigencia`) VALUES
(1, '56756', 'Desatornillador', 'Uni', 'Redline', 'Pequeño', '4 Pulgadas', 10, 1, 1),
(2, '34534', 'Martillo', 'Uni', 'Stanley', 'Portable', '15cm', NULL, 1, 1),
(3, '34681', 'Alicate', 'Uni', 'Stanley', 'Portable', '10cm.', NULL, 1, 1),
(4, '34567', 'Pie de Metro', 'Uni', 'Stanley', 'asdf', '15cm x 5cm', NULL, 1, 1),
(5, '78012398432', 'Taladro', 'Uni', 'Bosch', 'Portable', '17x43x10', NULL, 1, 1),
(6, '1', 'Aluminio', 'Metro', '.', '.', '30 mm', NULL, NULL, 1),
(7, '2', 'Machos', 'Juego', 'Totem', '.', '1/4"x20 UNC', NULL, NULL, 1),
(8, '1000', 'Aluminio', 'Metro', '', '', '30mm', NULL, 1, 1),
(9, '2000', 'Machos', 'Juego', 'Totem', '', '1/4"x20UNC', NULL, 1, 1),
(10, '2001', 'Micrometro Interior', 'Uni', 'Mitutoyo', '', '25-50mm', NULL, 1, 1),
(11, '3000', 'Lija para Acero', 'Pliego', 'Norton', '', 'Grano 100', NULL, 1, 1),
(12, '2002', 'Acero Rapido', 'Uni', '', '', '1/2" x 1/2" x 3"', NULL, 1, 1),
(13, '2003', 'Acero Rapido', 'Uni', '', '', '3/8" x 3/8" x 6"', NULL, 1, 1),
(14, '2004', 'Broca Centro', 'Uni', '', '', '4mm x 10mm', NULL, 1, 1),
(15, '2005', 'Fresa de punta plana, cuatro puntas', 'Uni', 'Addison', 'Normal', '14mm', NULL, 1, 1),
(16, '4000', 'Aceite de corte soluble', 'Litro', 'Wurth', 'Woc', '', NULL, 1, 1),
(17, '3001', 'Disco de corte', 'Uni', 'Wurth', '', '4 1/2"', NULL, 1, 1),
(18, '5000', 'Escobillon plastico', 'Uni', 'Clorinda', 'Con mango', 'Grande', NULL, 1, 1),
(19, '5001', 'Escobillon', 'Uni', 'Clorinda', 'Con Mango', 'Mediano', NULL, 1, 1),
(20, '5002', 'Escoba de rama', 'Uni', '', '4 Hebras', '', NULL, 1, 1),
(21, '2006', 'Tornillo Mecanico', 'Uni', 'Luque', 'Base fija', '5"', NULL, 1, 1),
(22, '5003', 'Waipe', 'Bolsa', '', '', '1 Kg', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

DROP TABLE IF EXISTS `matricula`;
CREATE TABLE IF NOT EXISTS `matricula` (
  `id_matricula` int(11) NOT NULL AUTO_INCREMENT,
  `numero_matricula` int(11) DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_apoderado` int(11) DEFAULT NULL,
  `fecha_matricula` datetime DEFAULT NULL,
  `id_year` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_matricula`),
  KEY `fk_matricula_alumno_idx` (`id_alumno`),
  KEY `fk_matricula_apoderado_idx` (`id_apoderado`),
  KEY `fk_matricula_year_idx` (`id_year`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`id_matricula`, `numero_matricula`, `id_alumno`, `id_apoderado`, `fecha_matricula`, `id_year`, `vigencia`) VALUES
(1, NULL, 2, 2, '2016-12-25 23:18:56', 2, 1),
(2, NULL, 13, 2, '2016-12-25 23:54:33', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

DROP TABLE IF EXISTS `nota`;
CREATE TABLE IF NOT EXISTS `nota` (
  `id_nota` int(11) NOT NULL AUTO_INCREMENT,
  `nota` int(11) NOT NULL,
  `posicion_nota` int(11) DEFAULT NULL,
  `id_alumno_curso` int(11) DEFAULT NULL,
  `id_detalle_periodo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_nota`),
  KEY `fk_nota_alumno_curso_idx` (`id_alumno_curso`),
  KEY `fk_nota_periodo_detalle_idx` (`id_detalle_periodo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`id_nota`, `nota`, `posicion_nota`, `id_alumno_curso`, `id_detalle_periodo`) VALUES
(1, 56, 1, 1, 49),
(2, 70, 2, 1, 49),
(3, 50, 1, 2, 49),
(4, 57, 2, 2, 49);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_material`
--

DROP TABLE IF EXISTS `orden_material`;
CREATE TABLE IF NOT EXISTS `orden_material` (
  `id_orden_material` int(11) NOT NULL AUTO_INCREMENT,
  `correlativo_orden` int(11) DEFAULT NULL,
  `id_responsable` int(11) DEFAULT NULL,
  `id_sector` int(11) DEFAULT NULL,
  `fecha_orden_material` date DEFAULT NULL,
  `id_plan_cuenta` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  `estado_orden` varchar(45) DEFAULT NULL,
  `descripcion_rechazo` varchar(300) DEFAULT NULL,
  `cantidad_proveedores` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_orden_material`),
  KEY `fk_orden_profesor_idx` (`id_responsable`),
  KEY `fk_orden_plan_cuenta_idx` (`id_plan_cuenta`),
  KEY `kf_orden_sector_idx` (`id_sector`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orden_material`
--

INSERT INTO `orden_material` (`id_orden_material`, `correlativo_orden`, `id_responsable`, `id_sector`, `fecha_orden_material`, `id_plan_cuenta`, `fecha_creacion`, `fecha_modificacion`, `vigencia`, `estado_orden`, `descripcion_rechazo`, `cantidad_proveedores`) VALUES
(1, 1, 10, 1, '2016-12-01', 1, '2016-12-06 02:03:09', '2016-12-06 02:03:09', 1, 'Análisis Comparativo', NULL, 3),
(2, 2, 6, 5, '2016-12-06', 1, '2016-12-06 05:19:54', '2016-12-06 05:19:54', 1, 'Análisis Comparativo', NULL, 4),
(3, 3, 10, 1, '2016-12-10', 1, '2016-12-10 09:14:49', '2016-12-10 09:14:49', 1, 'Análisis Comparativo', NULL, 2),
(4, 4, 10, 1, '2016-12-10', 1, '2016-12-10 09:15:32', '2016-12-10 09:15:32', 1, 'Análisis Comparativo', NULL, 4),
(5, 5, 9, 2, '2016-12-14', 1, '2016-12-26 02:47:02', '2016-12-26 02:47:02', 1, 'Análisis Comparativo', NULL, 3),
(6, 6, 6, 5, '2016-12-26', 1, '2016-12-26 02:55:50', '2016-12-26 02:55:50', 1, 'Análisis Comparativo', NULL, 2),
(7, 7, 8, 3, '2016-12-26', 1, '2016-12-26 03:49:34', '2016-12-26 03:49:34', 1, 'Análisis Comparativo', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_implemento` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_producto` int(11) DEFAULT NULL,
  `neto` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_implemento_idx` (`id_implemento`),
  KEY `fk_pedido_proveedor_idx` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_implemento`, `cantidad`, `precio_producto`, `neto`, `id_proveedor`) VALUES
(1, 1, 10, 10000, 100000, 5),
(2, 1, 10, 25000, 250000, 1),
(3, 1, 2, 25000, 50000, 4),
(4, 1, 10, 25000, 250000, 1),
(5, 1, 10, 25000, 250000, 1),
(6, 1, 10, 25000, 250000, 1),
(7, 1, 10, 25000, 250000, 1),
(8, 1, 10, 25000, 250000, 1),
(9, 1, 10, 25000, 250000, 1),
(10, 1, 10, 25000, 250000, 1),
(11, 1, 10, 25000, 250000, 1),
(12, 1, 10, 25000, 250000, 1),
(13, 1, 10, 25000, 250000, 1),
(14, 1, 10, 25000, 250000, 1),
(15, 1, 10, 25000, 250000, 1),
(16, 1, 10, 25000, 250000, 1),
(17, 1, 10, 25000, 250000, 1),
(18, 1, 10, 25000, 250000, 1),
(19, 1, 10, 25000, 250000, 1),
(20, 1, 10, 25000, 250000, 1),
(21, 1, 10, 25000, 250000, 1),
(22, 1, 10, 25000, 250000, 1),
(23, 1, 10, 25000, 250000, 1),
(24, 1, 10, 25000, 250000, 1),
(25, 1, 10, 25000, 250000, 1),
(26, 1, 10, 25000, 250000, 1),
(27, 1, 10, 25000, 250000, 1),
(28, 1, 10, 25000, 250000, 1),
(29, 1, 10, 25000, 250000, 1),
(30, 1, 10, 25000, 250000, 1),
(31, 1, 10, 25000, 250000, 1),
(32, 1, 10, 25000, 250000, 1),
(33, 1, 10, 25000, 250000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

DROP TABLE IF EXISTS `periodo`;
CREATE TABLE IF NOT EXISTS `periodo` (
  `id_periodo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `nombre_periodo` varchar(45) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_periodo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `periodo`
--

INSERT INTO `periodo` (`id_periodo`, `fecha_inicio`, `fecha_fin`, `nombre_periodo`, `vigencia`) VALUES
(1, '2016-03-06', '2016-07-14', 'Primer periodo', 1),
(2, '2016-07-24', '2016-12-29', 'Segundo periodo', 1),
(3, '2016-11-30', '2016-11-30', 'test', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo_asignatura_anual`
--

DROP TABLE IF EXISTS `periodo_asignatura_anual`;
CREATE TABLE IF NOT EXISTS `periodo_asignatura_anual` (
  `id_periodo_asignatura_anual` int(11) NOT NULL AUTO_INCREMENT,
  `id_periodo` int(11) DEFAULT NULL,
  `id_detalle_curso_anual` int(11) DEFAULT NULL,
  `cantidad_notas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_periodo_asignatura_anual`),
  KEY `fk_detalle_periodo_idx` (`id_periodo`),
  KEY `fk_detalle_curso_anual_idx` (`id_detalle_curso_anual`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `periodo_asignatura_anual`
--

INSERT INTO `periodo_asignatura_anual` (`id_periodo_asignatura_anual`, `id_periodo`, `id_detalle_curso_anual`, `cantidad_notas`) VALUES
(1, 1, 181, 2),
(2, 1, 182, 2),
(3, 1, 183, 2),
(4, 1, 184, 2),
(5, 1, 185, 2),
(6, 1, 186, 2),
(7, 1, 187, 2),
(8, 1, 188, 2),
(9, 1, 189, 2),
(10, 1, 190, 2),
(11, 1, 191, 2),
(12, 1, 192, 2),
(13, 1, 193, 2),
(14, 1, 194, 2),
(15, 1, 195, 2),
(16, 1, 196, 2),
(17, 1, 197, 2),
(18, 1, 198, 2),
(19, 1, 199, 2),
(20, 1, 200, 2),
(21, 1, 201, 2),
(22, 1, 202, 2),
(23, 1, 203, 2),
(24, 1, 204, 2),
(25, 1, 205, 2),
(26, 1, 206, 2),
(27, 1, 207, 2),
(28, 1, 208, 2),
(29, 1, 209, 2),
(30, 1, 210, 2),
(31, 1, 211, 2),
(32, 1, 212, 2),
(33, 1, 213, 2),
(34, 1, 214, 2),
(35, 1, 215, 2),
(36, 1, 216, 2),
(37, 1, 217, 2),
(38, 1, 218, 2),
(39, 1, 219, 2),
(40, 1, 220, 2),
(41, 1, 221, 2),
(42, 1, 222, 2),
(43, 1, 223, 2),
(44, 1, 224, 2),
(45, 1, 225, 2),
(46, 1, 226, 2),
(47, 1, 227, 2),
(48, 1, 228, 2),
(49, 1, 229, 3),
(50, 1, 230, 2),
(51, 1, 231, 2),
(52, 1, 232, 2),
(53, 1, 233, 2),
(54, 1, 234, 2),
(55, 1, 235, 2),
(56, 1, 236, 2),
(57, 2, 181, 2),
(58, 2, 182, 2),
(59, 2, 183, 2),
(60, 2, 184, 2),
(61, 2, 185, 2),
(62, 2, 186, 2),
(63, 2, 187, 2),
(64, 2, 188, 2),
(65, 2, 189, 2),
(66, 2, 190, 2),
(67, 2, 191, 2),
(68, 2, 192, 2),
(69, 2, 193, 2),
(70, 2, 194, 2),
(71, 2, 195, 2),
(72, 2, 196, 2),
(73, 2, 197, 2),
(74, 2, 198, 2),
(75, 2, 199, 2),
(76, 2, 200, 2),
(77, 2, 201, 2),
(78, 2, 202, 2),
(79, 2, 203, 2),
(80, 2, 204, 2),
(81, 2, 205, 2),
(82, 2, 206, 2),
(83, 2, 207, 2),
(84, 2, 208, 2),
(85, 2, 209, 2),
(86, 2, 210, 2),
(87, 2, 211, 2),
(88, 2, 212, 2),
(89, 2, 213, 2),
(90, 2, 214, 2),
(91, 2, 215, 2),
(92, 2, 216, 2),
(93, 2, 217, 2),
(94, 2, 218, 2),
(95, 2, 219, 2),
(96, 2, 220, 2),
(97, 2, 221, 2),
(98, 2, 222, 2),
(99, 2, 223, 2),
(100, 2, 224, 2),
(101, 2, 225, 2),
(102, 2, 226, 2),
(103, 2, 227, 2),
(104, 2, 228, 2),
(105, 2, 229, 2),
(106, 2, 230, 2),
(107, 2, 231, 2),
(108, 2, 232, 2),
(109, 2, 233, 2),
(110, 2, 234, 2),
(111, 2, 235, 2),
(112, 2, 236, 2),
(113, 3, 181, 2),
(114, 3, 182, 2),
(115, 3, 183, 2),
(116, 3, 184, 2),
(117, 3, 185, 2),
(118, 3, 186, 2),
(119, 3, 187, 2),
(120, 3, 188, 2),
(121, 3, 189, 2),
(122, 3, 190, 2),
(123, 3, 191, 2),
(124, 3, 192, 2),
(125, 3, 193, 2),
(126, 3, 194, 2),
(127, 3, 195, 2),
(128, 3, 196, 2),
(129, 3, 197, 2),
(130, 3, 198, 2),
(131, 3, 199, 2),
(132, 3, 200, 2),
(133, 3, 201, 2),
(134, 3, 202, 2),
(135, 3, 203, 2),
(136, 3, 204, 2),
(137, 3, 205, 2),
(138, 3, 206, 2),
(139, 3, 207, 2),
(140, 3, 208, 2),
(141, 3, 209, 2),
(142, 3, 210, 2),
(143, 3, 211, 2),
(144, 3, 212, 2),
(145, 3, 213, 2),
(146, 3, 214, 2),
(147, 3, 215, 2),
(148, 3, 216, 2),
(149, 3, 217, 2),
(150, 3, 218, 2),
(151, 3, 219, 2),
(152, 3, 220, 2),
(153, 3, 221, 2),
(154, 3, 222, 2),
(155, 3, 223, 2),
(156, 3, 224, 2),
(157, 3, 225, 2),
(158, 3, 226, 2),
(159, 3, 227, 2),
(160, 3, 228, 2),
(161, 3, 229, 2),
(162, 3, 230, 2),
(163, 3, 231, 2),
(164, 3, 232, 2),
(165, 3, 233, 2),
(166, 3, 234, 2),
(167, 3, 235, 2),
(168, 3, 236, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

DROP TABLE IF EXISTS `permisos`;
CREATE TABLE IF NOT EXISTS `permisos` (
  `id_premisos` int(11) NOT NULL AUTO_INCREMENT,
  `id_administrativo` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `matricula` tinyint(4) DEFAULT '0',
  `usuarios` tinyint(4) DEFAULT '0',
  `asignaciones` tinyint(4) DEFAULT '0',
  `mi_registro` tinyint(4) DEFAULT '0',
  `registros` tinyint(4) DEFAULT '0',
  `horario` tinyint(4) DEFAULT '0',
  `planificacion` tinyint(4) DEFAULT '0',
  `implementos` tinyint(4) DEFAULT '0',
  `talleres` tinyint(4) DEFAULT '0',
  `internado` tinyint(4) DEFAULT '0',
  `administracion` tinyint(4) DEFAULT '0',
  `biblioteca` tinyint(4) DEFAULT '0',
  `tienda` tinyint(4) DEFAULT '0',
  `moderacion` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_premisos`),
  KEY `fk_permisos_admin_idx` (`id_administrativo`),
  KEY `fk_permisos_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id_premisos`, `id_administrativo`, `id_usuario`, `matricula`, `usuarios`, `asignaciones`, `mi_registro`, `registros`, `horario`, `planificacion`, `implementos`, `talleres`, `internado`, `administracion`, `biblioteca`, `tienda`, `moderacion`) VALUES
(3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(5, 5, 24, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0),
(6, 6, 29, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(7, NULL, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(8, NULL, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(9, NULL, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(10, NULL, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(11, NULL, 28, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(12, NULL, 19, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0),
(13, NULL, 20, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0),
(14, NULL, 21, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0),
(15, NULL, 22, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0),
(19, NULL, 23, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0),
(20, NULL, 32, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(21, NULL, 33, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(25, NULL, 37, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0),
(26, NULL, 38, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(27, NULL, 39, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(28, NULL, 40, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(29, NULL, 41, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0),
(30, NULL, 42, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(31, NULL, 43, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0),
(32, NULL, 44, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(33, NULL, 45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(34, NULL, 46, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0),
(35, NULL, 47, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(36, NULL, 48, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(37, NULL, 49, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(38, NULL, 50, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(39, NULL, 51, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0),
(40, NULL, 52, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0),
(41, NULL, 53, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_cuenta`
--

DROP TABLE IF EXISTS `plan_cuenta`;
CREATE TABLE IF NOT EXISTS `plan_cuenta` (
  `id_plan_cuenta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_plan_cuenta` varchar(45) DEFAULT NULL,
  `descripcion_plan_cuenta` varchar(300) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_plan_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plan_cuenta`
--

INSERT INTO `plan_cuenta` (`id_plan_cuenta`, `nombre_plan_cuenta`, `descripcion_plan_cuenta`, `vigencia`) VALUES
(1, 'Nombre 1', 'Aquí debe poner una descripción de esta cuenta.', 1),
(2, 'Nombre 2', 'Aquí debe poner una descripción de esta cuenta.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `id_profesor` int(11) NOT NULL AUTO_INCREMENT,
  `horas_profesor` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_profesor`),
  KEY `fk_profe_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id_profesor`, `horas_profesor`, `id_usuario`, `vigencia`) VALUES
(6, 45, 19, 1),
(7, 30, 20, 1),
(8, 30, 21, 1),
(9, 30, 22, 1),
(10, 30, 23, 1),
(11, 10, 47, 1),
(12, 10, 48, 1),
(13, 20, 49, 1),
(14, 10, 50, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_asignaturas`
--

DROP TABLE IF EXISTS `profesor_asignaturas`;
CREATE TABLE IF NOT EXISTS `profesor_asignaturas` (
  `id_profesor_asignaturas` int(11) NOT NULL AUTO_INCREMENT,
  `id_profesor` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_profesor_asignaturas`),
  KEY `fk_dicta_profesor_idx` (`id_profesor`),
  KEY `fk_dicta_asignatura_idx` (`id_asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesor_asignaturas`
--

INSERT INTO `profesor_asignaturas` (`id_profesor_asignaturas`, `id_profesor`, `id_asignatura`) VALUES
(34, 6, 2),
(35, 7, 1),
(37, 12, 6),
(38, 11, 3),
(40, 8, 8),
(41, 13, 2),
(42, 13, 6),
(43, 10, 9),
(44, 9, 11),
(45, 14, 2),
(46, 14, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(45) DEFAULT NULL,
  `rut_proveedor` varchar(45) DEFAULT NULL,
  `direccion_proveedor` varchar(100) DEFAULT NULL,
  `contacto_proveedor` varchar(45) DEFAULT NULL,
  `telefono_proveedor` varchar(45) DEFAULT NULL,
  `correo_proveedor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `razon_social`, `rut_proveedor`, `direccion_proveedor`, `contacto_proveedor`, `telefono_proveedor`, `correo_proveedor`) VALUES
(1, 'Agiliza Desarollo', '99999999-1', 'alguna #123', 'Yilo', '999999', 'ccanalesdote@gmail.com'),
(2, 'Prueba', '11111111-1', 'Alguna #123', 'Test', '111111', 'prueba@agiliza.com'),
(3, 'Prueba', '22222222-2', 'Alguna #123', 'Test', '222222', 'prueba@agiliza.com'),
(4, 'Alvaro', '18722151-k', 'Alguna', 'Alvarito', '111111', 'cabreracornejoa@gmail.com'),
(5, 'Donde Marco', '17746456-2', 'Alguna', 'Narco', '222222', 'm.esparzavalderrama@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_material`
--

DROP TABLE IF EXISTS `proveedor_material`;
CREATE TABLE IF NOT EXISTS `proveedor_material` (
  `id_proveedor_material` int(11) NOT NULL AUTO_INCREMENT,
  `rut_proveedor_material` varchar(45) DEFAULT NULL,
  `razon_social` varchar(100) DEFAULT NULL,
  `direccion_proveedor_material` varchar(150) DEFAULT NULL,
  `telefono_proveedor_material` varchar(45) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_proveedor_material`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedor_material`
--

INSERT INTO `proveedor_material` (`id_proveedor_material`, `rut_proveedor_material`, `razon_social`, `direccion_proveedor_material`, `telefono_proveedor_material`, `vigencia`) VALUES
(1, '71111111-1', 'Ferretería Ejemplo', 'Alguna #123', '77777777', 0),
(2, '71111111-1', 'Ferretería 1', 'Alguna #123', '711111', 1),
(3, '71111111-1', 'Ferretería Ejemplo', 'Alguna #123', '22222222', 0),
(4, '71111111-1', 'Ferretería Ejemplo', 'Alguna #123', '55555', 0),
(5, '72111111-1', 'Ferretería 2', 'Alguna #123', '721111', 1),
(6, '73111111-1', 'Ferretería 3', 'Alguna #123', '731111', 1),
(7, '74111111-1', 'Ferretería 4', 'Alguna #123', '741111', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

DROP TABLE IF EXISTS `reserva`;
CREATE TABLE IF NOT EXISTS `reserva` (
  `id_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `id_alumno` int(11) DEFAULT NULL,
  `id_libro` int(11) DEFAULT NULL,
  `fecha_reserva` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reserva_alumno_idx` (`id_alumno`),
  KEY `fk_reserva_libro_idx` (`id_libro`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `id_alumno`, `id_libro`, `fecha_reserva`, `fecha_devolucion`, `estado`) VALUES
(1, 2, 1, '2016-12-17', '2016-12-22', 'perdido'),
(2, 2, 3, '2016-12-17', '2016-12-24', 'perdido'),
(3, 3, 7, '2016-12-17', '2016-12-20', 'completo'),
(4, 3, 8, '2016-12-17', '2016-12-20', 'completo'),
(5, 2, 460, '2016-12-19', '2016-12-24', 'completo'),
(6, 4, 4, '2016-12-19', '2016-12-20', 'prestado'),
(7, 4, 5, '2016-12-20', '2016-12-23', 'prestado'),
(8, 4, 6, '2016-12-20', '2016-12-25', 'prestado'),
(9, 10, 8, '2016-12-24', '2016-12-28', 'prestado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(45) DEFAULT NULL,
  `alias_rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `alias_rol`) VALUES
(1, 'Administrador', 'adm'),
(2, 'Alumno', 'alm'),
(3, 'Profesor', 'prf'),
(4, 'Apoderado', 'apd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
CREATE TABLE IF NOT EXISTS `rol_usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_rol`,`id_usuario`),
  KEY `fk_rol_usuario_idx` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`id_usuario`, `id_rol`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 2),
(19, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 3),
(24, 1),
(28, 4),
(29, 1),
(32, 2),
(33, 2),
(37, 1),
(38, 2),
(39, 2),
(40, 2),
(41, 1),
(42, 4),
(43, 1),
(44, 2),
(45, 4),
(46, 1),
(47, 3),
(48, 3),
(49, 3),
(50, 3),
(51, 1),
(52, 1),
(53, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

DROP TABLE IF EXISTS `sector`;
CREATE TABLE IF NOT EXISTS `sector` (
  `id_sector` int(11) NOT NULL,
  `nombre_sector` varchar(45) DEFAULT NULL,
  `responsable_sector` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_sector`),
  KEY `fk_especialidad_profesor_idx` (`responsable_sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`id_sector`, `nombre_sector`, `responsable_sector`) VALUES
(1, 'Terminación en Contrucciones', 10),
(2, 'Mecánica Industrial', 9),
(3, 'Contrucciones Metalicas', 8),
(4, 'Mecánica Automotriz', 7),
(5, 'Electricidad', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_material`
--

DROP TABLE IF EXISTS `tipo_material`;
CREATE TABLE IF NOT EXISTS `tipo_material` (
  `id_tipo_material` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_tipo_material` int(11) DEFAULT NULL,
  `nombre_tipo_material` varchar(45) DEFAULT NULL,
  `vigencia` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id_tipo_material`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_material`
--

INSERT INTO `tipo_material` (`id_tipo_material`, `codigo_tipo_material`, `nombre_tipo_material`, `vigencia`) VALUES
(1, 1020, 'Herramientas', 1),
(2, 1021, 'Consumo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `rut_usuario` varchar(45) DEFAULT NULL,
  `nombres_usuario` varchar(100) DEFAULT NULL,
  `apellido_paterno` varchar(45) DEFAULT NULL,
  `apellido_materno` varchar(45) DEFAULT NULL,
  `email_usuario` varchar(45) DEFAULT NULL,
  `hash_usuario` varchar(100) DEFAULT NULL,
  `direccion_usuario` varchar(45) DEFAULT NULL,
  `sexo_usuario` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_ultimo_login` datetime DEFAULT NULL,
  `telefono_usuario` bigint(20) DEFAULT NULL,
  `tipo_usuario` varchar(45) DEFAULT NULL,
  `main_page` varchar(45) DEFAULT NULL,
  `pass_temp` varchar(45) DEFAULT NULL,
  `imagen_url` varchar(100) DEFAULT 'default.png',
  `link_temporal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `rut_usuario`, `nombres_usuario`, `apellido_paterno`, `apellido_materno`, `email_usuario`, `hash_usuario`, `direccion_usuario`, `sexo_usuario`, `fecha_creacion`, `fecha_ultimo_login`, `telefono_usuario`, `tipo_usuario`, `main_page`, `pass_temp`, `imagen_url`, `link_temporal`) VALUES
(1, '000000000', 'Admin', 'Sys', '#', 'contacto@agiliza.xyz', '$2a$10$GsnAvrhNBhEdC346IStwZejJrfrk0P4I/S0b8rTr8Ja1wEeTTQUTG', 'Desconocida #000', 'Masculino', NULL, '2016-12-26 02:04:08', 56900000000, 'Administrador', 'inicio.panel', '1', '20161124022050.png', NULL),
(2, '174945764', 'Cristian Hernán', 'Canales', 'Dote', 'ccanales@agiliza.xyz', '$2a$10$8F7s3nnJZtmXrexzvy0UZeVq3HkCwJuEQ4Pjf8D9frLTKy9Mc0Sq6', 'Palmas de Mallorca #1763', 'Masculino', '2016-08-24 03:31:44', '2016-12-27 16:35:53', 951036575, 'Administrador', 'inicio.panel', '7811', '20161227153540.png', NULL),
(3, '178492004', 'Juan Hernán', 'Figueroa', 'Cabrera', 'juan@agiliza.cl', '$2a$10$q15lelwV664hKerZc3k0v.Zt84MmLXuSE3IwlcXId.1TjQ09MBZNu', 'alguna #123', 'Masculino', '2016-08-24 22:39:13', '2016-12-26 17:17:30', 912345678, 'Alumno', 'inicio.panel', 'MvA2Z051', 'default.png', NULL),
(4, '195662029', 'Javiera Sofía', 'Peñaloza', 'Gonzáles', 'javiera@agiliza.cl', '$2a$10$wOBShYJLf4I97psRbfA62.635MIophlqniRIfe8brrrdrAO/lahVe', 'alguna #123', 'Femenino', '2016-08-24 22:42:41', NULL, 56913111111, 'Alumno', 'inicio.panel', 'slD4E50O', 'default.png', NULL),
(5, '198963860', 'Jorge Bastian', 'Fuenzalida', 'Perez', 'jorge@agiliza.cl', '$2a$10$Ig7qJfN74d0KLeJC6DtKqe8PuD6Bl.4VCNgrpBkqqROh6.fmdZaE2', 'alguna #123', 'Masculino', '2016-08-24 23:04:58', '2016-12-27 01:45:51', 56914111111, 'Alumno', 'inicio.panel', 'w2V2lesQ', 'default.png', NULL),
(19, '137323907', 'Daniel', 'Lillo', 'Madariaga', 'daniellillo@agiliza.xyz', '$2a$10$2.YGJs95wdfbppzzPGCB.O39lLY74tReoEGJTsIEpzv2oScA.3JDq', 'Alguna #123', 'Masculino', '2016-11-21 21:58:53', '2016-12-23 16:31:19', 56911111111, 'Profesor', 'inicio.panel', 'uRzgdB3S', 'default.png', NULL),
(20, '152796099', 'Jose', 'Gerrero', 'Torres', 'joseguerrero@agiliza.xyz', '$2a$10$7kuuY67vRA6EGY6xJXt8kuM/BHhmBjWfn/uyKtyb36MjdjBYm1blG', 'Alguna #123', 'Masculino', '2016-11-21 22:28:49', NULL, 56911111111, 'Profesor', 'inicio.panel', 'Ybucx1Ie', 'default.png', NULL),
(21, '62881437', 'José', 'De la Cruz', 'Robledo', 'josedelacruz@agiliza.xyz', '$2a$10$wsnOZYpsKvRCH3o4C83pae9DgjQQRmYipZaqqWJsZb2yMtxD3ZQAm', 'Alguna #123', 'Masculino', '2016-11-21 23:49:10', '2016-11-22 03:07:51', 56911111111, 'Profesor', 'inicio.panel', 'dX7RJW9A', 'default.png', NULL),
(22, '152796099', 'Juan', 'Meneses', 'Mella', 'juanmeneses@agiliza.xyz', '$2a$10$ClK/0uqF7xzVqnnWoJlW3OAmMcyNp5NVIHuPIoQPQLzqga1M5Y8S2', 'Alguna #123', 'Masculino', '2016-11-21 23:50:03', NULL, 56911111111, 'Profesor', 'inicio.panel', 'HC10QcAx', 'default.png', NULL),
(23, '57989114', 'Fernando', 'Lopez', 'Gonzales', 'fernandolopez@agiliza.xwz', '$2a$10$Y.fp/xs/DIUGWIc5SITG7uT6U9B4EsPZfAyRO4IKGzk.yiIK1YhQy', 'Alguna #123', 'Masculino', '2016-11-21 23:50:42', NULL, 56911111111, 'Profesor', 'inicio.panel', 'xtKII3c4', 'default.png', NULL),
(24, '117896145', 'Francisca Ignacia', 'Salazar', 'Valdés', 'francisca@gmail.com', '$2a$10$n0J/7e6JjGIdRqcgDSEPn.14S7dQsNnQa5IjLuBXBZI9Ada/1fImC', 'Alguna #123', 'Femenino', '2016-11-22 02:23:23', NULL, 56991010716, 'Administrador', 'inicio.panel', 'Ny7QeB2F', 'default.png', NULL),
(28, '9544752K', 'Mariano Heriberto', 'Canales', 'Pavez', 'marianocanales@agiliza.xyz', '$2a$10$GsnAvrhNBhEdC346IStwZejJrfrk0P4I/S0b8rTr8Ja1wEeTTQUTG', 'Alguna #123', 'Masculino', '2016-11-22 03:03:33', '2016-12-19 21:46:51', 56922222222, 'Apoderado', 'inicio.panel', 'zfHFCIBM', '1482194409.png', NULL),
(29, '140109479', 'Marco', 'Esparza', 'Valderrama', 'marcoesparza@agiliza.xyz', '$2a$10$v.r/4qDYvqkM3HVmhVVyOuBb5MaRl6rlhHfuhsmzfaInhWN7aE8dm', 'Alguna #123', 'Masculino', '2016-11-24 00:41:45', '2016-12-20 15:10:29', 56911111111, 'Administrador', 'inicio.panel', 'kadath', '20161220144638.png', ''),
(32, '180165134', 'Jorge Ignacio', 'Jara', 'Guerrero', 'yilo.anm@gmail.com', '$2a$10$GsnAvrhNBhEdC346IStwZejJrfrk0P4I/S0b8rTr8Ja1wEeTTQUTG', 'Alguna #123', 'Masculino', '2016-11-26 18:06:44', '2016-12-19 21:39:29', 56922222222, 'Alumno', 'inicio.panel', '1', '1482194336.png', ''),
(33, '198405787', 'Daniel Alonso', 'Matus', 'Peñaloza', 'pedro@gmail.com', '$2a$10$Q4kDpG6OOSApMDiPKbHw0.SCytP82DgtEpWQGYjRofHs069ntb3HW', 'Alguna #123', 'Masculino', '2016-11-26 18:09:25', NULL, 56911111111, 'Alumno', 'inicio.panel', 'jHO7gJFT', 'default.png', NULL),
(37, '123436008', 'Marcelo Esteban', 'Chebi', 'Quintul', 'finanzasa21@gmail.com', '$2a$10$V307j98XvNDsRUAkEYBb4elazKh4e1Utl3/3qxt02NjoNYXwthYPG', 'Manso de Velasco 761', 'Masculino', '2016-11-25 15:43:28', '2016-11-28 00:52:51', 722711944, 'Administrador', 'inicio.panel', 'industrial', 'default.png', NULL),
(38, '22349479K', 'Felipe', 'Soto', 'Hidalgo', 'comunidadaee@gmail.com', '$2a$10$sCfrANmZIOrUuzPDpSp4yut/EF7Hbfcer7jPhpu9cW8gd3OTFhDlO', 'Alguna #123', 'Masculino', '2016-12-17 03:30:57', NULL, 56911111111, 'Alumno', 'inicio.panel', '9zFv5ssT', 'default.png', NULL),
(39, '17083206K', 'Marcos', 'Lopez', 'Undurraga', 'm.esparzarvalderrama@gmail.com', '$2a$10$3dc9uGHwc6HtPtwDRNQXWOlgzy7nrP4CcA8UtUzqn7naGZVuJmoxO', 'Alguna #123', 'Masculino', '2016-12-17 10:47:13', NULL, 123456789, 'Alumno', 'inicio.panel', 'GiWEQr8k', 'default.png', NULL),
(40, '18965328K', 'David Ignacio', 'Fernandez', 'Vargas', 'inaho.kaizuka.mod@gmail.com', '$2a$10$ne4.Py67VTWvU9nhfKif.ub1zJOzLOWrOSHDyCRRqXSXTBYqQ0tTq', 'Alguna #123', 'Masculino', '2016-12-17 23:59:05', NULL, 56911111111, 'Alumno', 'inicio.panel', '9CTZmLOs', 'default.png', NULL),
(41, '142610795', 'Maria Pilar', 'Lineros', 'Ramirez', 'pilarlineros.74@gmail.com', '$2a$10$/fLw0ePl87eLWy72quBxMOVxxqlbTgDvIc226Pfy5jcjsnCwBSaUS', 'alguna', 'Femenino', '2016-12-19 15:15:48', '2016-12-19 15:18:43', 12345678, 'Administrador', 'inicio.panel', 'marianita', 'default.png', NULL),
(42, '90559206', 'Luis Antonio', 'Esparza', 'Cabezas', 'cradle.of.filth_287@hotmail.com', '$2a$10$2rlwJ193EMU7cZkGjBIJM.8OGf.z1twEdQmpGJ3gcuhacQ6UofDLa', 'Alguna #123', 'Masculino', '2016-12-23 14:30:52', NULL, 12345678, 'Apoderado', 'inicio.panel', '5JUeS7Pm', 'default.png', NULL),
(43, '177462330', 'Pedro Antonio', 'Pavez', 'Videla', 'pedro1990.pp@gmail.com', '$2a$10$HWnIZgU2W83CKhjnXVW9rOf.MqQWx1/mWO3TrwqJ/RjEwtNP5LN9u', 'Alguna #123', 'Masculino', '2016-12-23 22:25:48', '2016-12-24 12:31:54', 11111111, 'Administrador', 'inicio.panel', 'yugo', '20161223223147.png', NULL),
(44, '201781280', 'Felipe', 'Yañez', 'Videla', 'elbestia@gmail.com', '$2a$10$uDsThO9nP8PSJHKdVI/adeetJfgb9AYRMPIEYobEZa0YX4sku2bO2', 'La tinaja s/n', 'Masculino', '2016-12-23 22:40:11', '2016-12-26 17:05:13', 76734528, 'Alumno', 'inicio.panel', 'JOyTTYgX', 'default.png', NULL),
(45, '95290027', 'Andrea', 'Vidal', 'Pereira', 'muyloca@gmail.com', '$2a$10$rh/XJMok0dVJgKiXJsoHIOKtYbYInhWvuOTKppDVX7UgJ/5PW1ef.', 'san fernando s/n', 'Femenino', '2016-12-23 22:41:36', NULL, 89632781, 'Apoderado', 'inicio.panel', 'VtGaGBlQ', 'default.png', NULL),
(46, '177466956', 'Andrés', 'Riveros', 'Marambio', 'androqk@gmail.com', '$2a$10$nJ7VS6kt5DAwE34W5.FBeO03Yelzun7cVP0NRK/Nb5bXZIKX7/7QO', 'Los Palacios s/n', 'Masculino', '2016-12-23 22:43:57', '2016-12-24 10:20:24', 11111111, 'Administrador', 'inicio.panel', '9DO9i80n', 'default.png', NULL),
(47, '96625200', 'Arturo', 'Pratt', 'chacon', 'alabordaje@gmail.com', '$2a$10$kp6mp0/KRjScmOdkqFA9A.rUZ.B1.Z71iMyTFu/BfCrvnirSJ0CcW', 'Iquique, bajo el mar s/n', 'Masculino', '2016-12-23 23:04:01', NULL, 736346392, 'Profesor', 'inicio.panel', 'dtnLzjuj', 'default.png', NULL),
(48, '88074521', 'Isaac', 'Newton', 'Perez', 'manzana@gmail.com', '$2a$10$v8BiF0eyqf8GUrsqHnon8.xuGpXrjvq3Ji85BLln7BFXU9ZaT2eDa', 'Francia', 'Masculino', '2016-12-23 23:06:32', NULL, 634462923, 'Profesor', 'inicio.panel', 'yTL4aBe3', 'default.png', NULL),
(49, '15890747K', 'Albert', 'Einstein', 'Maturana', 'matematicaforever@gmail.com', '$2a$10$S2JcKlqoXrNd/.vqw4.yXu9alWRhEYiXzvxQCqO.5DHfsZDZgXCfW', 'El trapiche', 'Masculino', '2016-12-23 23:09:02', NULL, 344375863, 'Profesor', 'inicio.panel', 'Bfagohho', 'default.png', NULL),
(50, '184334232', 'José Andrés', 'Aguirre', 'Pinto', 'eltato@gmail.com', '$2a$10$QWsQZBHYlo2JuOAbwv/8Luw.INRCajQ7R/3CtbK45fYkoDFPX5RDW', 'Rancagua', 'Masculino', '2016-12-23 23:13:20', NULL, 553782963, 'Profesor', 'inicio.panel', 'JIuzr3Gc', 'default.png', NULL),
(51, '19683821K', 'Diego', 'San Martin', 'Carvajal', 'dsanmartin09@gmail.com', '$2a$10$fsdTi3f/HUchxQcEUQglieYcq.Kf9uHa0cRZI/iiDMjBKnQh0o3Pa', 'Villa San Francisco de Rauquen', 'Masculino', '2016-12-24 01:01:51', '2016-12-24 01:14:42', 111111111, 'Administrador', 'inicio.panel', 'julio90', 'default.png', NULL),
(52, '18722151K', 'Alvaro Fabian', 'Cabrera', 'Cornejo', 'cabreracornejoa@gmail.com', '$2a$10$qsYj7FqMPOjW8rkBgs4IQ.Wleso8JQ/hJ2DtFkEfQBkGZjFP.dyxy', 'Villa Las Frutas, Las Frambuesas #126', 'Masculino', '2016-12-24 12:37:18', '2016-12-24 12:47:43', 975352432, 'Administrador', 'inicio.panel', '1111', '20161224123851.png', NULL),
(53, '176871059', 'Valeria Andrea', 'Urzua', 'Ubilla', 'valeriaurzuaubilla@gmail.com', '$2a$10$SoVxzJ0zMjKmsNchVmiYPu1S0e/144ZIbs0ZnDSQOCjgDB3J.ZR3q', 'Alguna #123', 'Femenino', '2016-12-24 15:02:13', '2016-12-24 15:14:07', 12345678, 'Administrador', 'inicio.panel', 'aQyt0Snu', 'default.png', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_token`
--

DROP TABLE IF EXISTS `usuario_token`;
CREATE TABLE IF NOT EXISTS `usuario_token` (
  `idusuario_token` int(11) NOT NULL AUTO_INCREMENT,
  `token` text,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idusuario_token`),
  KEY `fk_token_usuario_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_token`
--

INSERT INTO `usuario_token` (`idusuario_token`, `token`, `id_usuario`) VALUES
(3, 'd_FpBmrAvJ0:APA91bE5-SVFPPgxpRjO7Ydglq0XcKH10AqMwh4kri_-xzoV2xlw5ve8HNc6RIjVpqHq4ZUoibIXVYXShqHlbEY0-xTYLsSfWvSoe-qLMxHiqSGrUP8dUdE6pQSmGSZd__D-drKfCn18', 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `year`
--

DROP TABLE IF EXISTS `year`;
CREATE TABLE IF NOT EXISTS `year` (
  `id_year` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_year` varchar(45) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `asistente` tinyint(4) DEFAULT '0',
  `dias_asistencia` int(11) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_year`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `year`
--

INSERT INTO `year` (`id_year`, `nombre_year`, `year`, `asistente`, `dias_asistencia`, `estado`) VALUES
(1, 'Año 2015', 2015, 0, NULL, 0),
(2, 'Año 2016', 2016, 0, NULL, 1),
(3, 'Año 2017', 2017, 0, NULL, 0);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrativo`
--
ALTER TABLE `administrativo`
  ADD CONSTRAINT `fk_admin_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_alumno_nivel` FOREIGN KEY (`nivel_alumno`) REFERENCES `curso` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_curso`
--
ALTER TABLE `alumno_curso`
  ADD CONSTRAINT `fk_alumno_curso_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_curso_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `apoderado`
--
ALTER TABLE `apoderado`
  ADD CONSTRAINT `fk_apoderado_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `apoderado_alumno`
--
ALTER TABLE `apoderado_alumno`
  ADD CONSTRAINT `fk_alumno_apoderado` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumnoapd_year` FOREIGN KEY (`id_year`) REFERENCES `year` (`id_year`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_apoderado_alumno` FOREIGN KEY (`id_apoderado`) REFERENCES `apoderado` (`id_apoderado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD CONSTRAINT `fk_asignatura_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `fk_asistencia_alumno_curso` FOREIGN KEY (`id_alumno_curso`) REFERENCES `alumno_curso` (`id_alumno_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_asistencia_periodo_d` FOREIGN KEY (`id_detalle_periodo`) REFERENCES `periodo_asignatura_anual` (`id_periodo_asignatura_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carro_compra`
--
ALTER TABLE `carro_compra`
  ADD CONSTRAINT `fk_carro_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `curso_anual`
--
ALTER TABLE `curso_anual`
  ADD CONSTRAINT `fk_curso_anual_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_curso_anual_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_curso_anual_profe` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_asignatura`
--
ALTER TABLE `detalle_asignatura`
  ADD CONSTRAINT `fk_detalleasig_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalleasig_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_carro`
--
ALTER TABLE `detalle_carro`
  ADD CONSTRAINT `fk_detalle_carro_compra` FOREIGN KEY (`id_carro`) REFERENCES `carro_compra` (`id_carro_compra`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detallecarro_implemento` FOREIGN KEY (`id_implemento`) REFERENCES `implemento` (`id_implemento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_curso_anual`
--
ALTER TABLE `detalle_curso_anual`
  ADD CONSTRAINT `fk_detalle_curso_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_curso_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_curso_profesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_implemento`
--
ALTER TABLE `detalle_implemento`
  ADD CONSTRAINT `fk_detalle_implemento` FOREIGN KEY (`id_implemento`) REFERENCES `implemento` (`id_implemento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  ADD CONSTRAINT `fk_detalle_material` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_orden` FOREIGN KEY (`id_orden`) REFERENCES `orden_material` (`id_orden_material`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_proveedores`
--
ALTER TABLE `detalle_proveedores`
  ADD CONSTRAINT `fk_detalle_p_orden` FOREIGN KEY (`id_orden_material`) REFERENCES `orden_material` (`id_orden_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_p_proveedor` FOREIGN KEY (`id_proveedor_material`) REFERENCES `proveedor_material` (`id_proveedor_material`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `fk_horario_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horario_bloque` FOREIGN KEY (`id_bloque`) REFERENCES `bloque` (`id_bloque`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horario_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horario_profe` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `implemento`
--
ALTER TABLE `implemento`
  ADD CONSTRAINT `fk_implemento_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `info_pago`
--
ALTER TABLE `info_pago`
  ADD CONSTRAINT `fk_pago_carro` FOREIGN KEY (`id_carro_compra`) REFERENCES `carro_compra` (`id_carro_compra`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `fk_material_seccion` FOREIGN KEY (`id_tipo_material`) REFERENCES `tipo_material` (`id_tipo_material`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `fk_matricula_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_matricula_apoderado` FOREIGN KEY (`id_apoderado`) REFERENCES `apoderado` (`id_apoderado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_matricula_year` FOREIGN KEY (`id_year`) REFERENCES `year` (`id_year`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `fk_nota_alumno_curso` FOREIGN KEY (`id_alumno_curso`) REFERENCES `alumno_curso` (`id_alumno_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_nota_periodo_detalle` FOREIGN KEY (`id_detalle_periodo`) REFERENCES `periodo_asignatura_anual` (`id_periodo_asignatura_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orden_material`
--
ALTER TABLE `orden_material`
  ADD CONSTRAINT `fk_orden_plan_cuenta` FOREIGN KEY (`id_plan_cuenta`) REFERENCES `plan_cuenta` (`id_plan_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orden_profesor` FOREIGN KEY (`id_responsable`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kf_orden_sector` FOREIGN KEY (`id_sector`) REFERENCES `sector` (`id_sector`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_implemento` FOREIGN KEY (`id_implemento`) REFERENCES `implemento` (`id_implemento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pedido_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `periodo_asignatura_anual`
--
ALTER TABLE `periodo_asignatura_anual`
  ADD CONSTRAINT `fk_detalle_curso_anual` FOREIGN KEY (`id_detalle_curso_anual`) REFERENCES `detalle_curso_anual` (`id_detalle_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD CONSTRAINT `fk_permisos_admin` FOREIGN KEY (`id_administrativo`) REFERENCES `administrativo` (`id_administrativo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_permisos_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `fk_profe_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_asignaturas`
--
ALTER TABLE `profesor_asignaturas`
  ADD CONSTRAINT `fk_dicta_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_dicta_profesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_reserva_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reserva_libro` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id_libro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `fk_rol_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rol_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sector`
--
ALTER TABLE `sector`
  ADD CONSTRAINT `fk_sector_profesor` FOREIGN KEY (`responsable_sector`) REFERENCES `profesor` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_token`
--
ALTER TABLE `usuario_token`
  ADD CONSTRAINT `fk_token_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
