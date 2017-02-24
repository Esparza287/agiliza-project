-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2016 a las 01:59:58
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
  `rut_administrativo` varchar(45) NOT NULL,
  `tipo_administrativo` varchar(45) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_administrativo`),
  KEY `fk_admin_user_idx` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id_alumno`),
  KEY `fk_alumno_nivel_idx` (`nivel_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id_alumno`, `fecha_ingreso`, `fecha_egreso`, `nivel_alumno`, `id_usuario`) VALUES
(1, NULL, NULL, 1, 2),
(2, NULL, NULL, 3, 3),
(3, NULL, NULL, 4, 4),
(4, NULL, NULL, 4, 5);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE IF NOT EXISTS `asignatura` (
  `id_asignatura` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_asignatura` varchar(45) NOT NULL,
  `horas_asignatura` int(11) DEFAULT NULL,
  `descripcion_asignatura` varchar(100) DEFAULT NULL,
  `nivel_asignatura` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`),
  KEY `fk_asignatura_curso_idx` (`nivel_asignatura`),
  KEY `fk_asignatura_especialidad_idx` (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id_asignatura`, `nombre_asignatura`, `horas_asignatura`, `descripcion_asignatura`, `nivel_asignatura`, `id_especialidad`) VALUES
(1, 'Lenguaje y Comunicación', 12, NULL, NULL, NULL),
(2, 'Matemática', 12, NULL, NULL, NULL),
(3, 'Historia y Ciencias Sociales', 8, NULL, NULL, NULL),
(4, 'Biología', 12, NULL, NULL, NULL),
(5, 'Quimica', 6, NULL, NULL, NULL),
(6, 'Física', 6, NULL, NULL, NULL),
(7, 'Educación Física', 8, NULL, NULL, NULL),
(8, 'Religión', 2, NULL, NULL, NULL),
(9, 'Nueva Asignatura', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id_asistencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_horario` int(11) DEFAULT NULL,
  `id_alumno_curso` int(11) DEFAULT NULL,
  `fecha_asistencia` datetime DEFAULT NULL,
  `estado_asistencia` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_asistencia`),
  KEY `fk_asistencia_horario_idx` (`id_horario`),
  KEY `fk_asistencia_alumno_curso_idx` (`id_alumno_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloque`
--

DROP TABLE IF EXISTS `bloque`;
CREATE TABLE IF NOT EXISTS `bloque` (
  `id_bloque` int(11) NOT NULL AUTO_INCREMENT,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id_bloque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

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
(44, '2016-09-24 10:10:49', 25000, 0, 3, 'PayPal', 1);

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
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_anual`
--

DROP TABLE IF EXISTS `curso_anual`;
CREATE TABLE IF NOT EXISTS `curso_anual` (
  `id_curso_anual` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso_anual` varchar(45) DEFAULT NULL,
  `fecha_curso_anual` date DEFAULT NULL,
  `profesor_jefe` varchar(45) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_curso_anual`),
  KEY `fk_asignacion_curso_idx` (`id_curso`),
  KEY `fk_curso_anual_especialidad_idx` (`id_especialidad`),
  KEY `fk_curso_anual_profe_idx` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

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
(82, 44, 1, 25000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_curso_anual`
--

DROP TABLE IF EXISTS `detalle_curso_anual`;
CREATE TABLE IF NOT EXISTS `detalle_curso_anual` (
  `id_detalle_curso_anual` int(11) NOT NULL AUTO_INCREMENT,
  `id_asignatura` int(11) DEFAULT NULL,
  `id_curso_anual` int(11) DEFAULT NULL,
  `rut_profesor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_curso_anual`),
  KEY `fk_detalle_curso_asignatura_idx` (`id_asignatura`),
  KEY `fk_detalle_curso_curso_anual_idx` (`id_curso_anual`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id_detalle_orden`),
  KEY `fk_detalle_orden_idx` (`id_orden`),
  KEY `fk_detalle_material_idx` (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_orden`
--

INSERT INTO `detalle_orden` (`id_detalle_orden`, `id_orden`, `id_material`, `cantidad_material`, `observacion`) VALUES
(1, 15, 2, 2, NULL),
(2, 15, 1, 2, NULL),
(3, 16, 2, 2, 'test'),
(4, 16, 1, 2, 'test'),
(5, 17, 2, 0, NULL),
(6, 17, 1, 0, NULL),
(7, 0, 1, 2, 'hgfdsa'),
(8, 0, 2, 2, 'hgf'),
(9, 0, 2, 2, 'sedgh'),
(10, 0, 3, 2, 'sdfb'),
(11, 0, 2, 2, 'sedgh'),
(12, 0, 3, 2, 'sdfb'),
(13, 0, 2, 2, 'sedgh'),
(14, 0, 3, 2, 'sdfb'),
(15, 0, 1, 0, NULL),
(16, 18, 2, 0, NULL),
(17, 19, 1, 2, NULL),
(18, 19, 2, 2, NULL),
(19, 9, 1, 1, 'test'),
(20, 9, 2, 3, 'test'),
(21, 9, 3, 16, 'test'),
(22, 20, 3, 3, 'jkzdfhksd'),
(23, 10, 2, 2, NULL),
(24, 10, 4, 5, NULL),
(25, 10, 1, 1, NULL),
(26, 9, 4, 2, 'test');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(45) NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

DROP TABLE IF EXISTS `horario`;
CREATE TABLE IF NOT EXISTS `horario` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso_anual` int(11) DEFAULT NULL,
  `id_bloque` int(11) DEFAULT NULL,
  `id_detalle_curso_anual` int(11) DEFAULT NULL,
  `dia_semana` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `fk_horario_curso_anual_idx` (`id_curso_anual`),
  KEY `fk_horario_bloque_idx` (`id_bloque`),
  KEY `fk_horario_detalle_idx` (`id_detalle_curso_anual`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id_material`, `codigo_material`, `descripcion_material`, `unidad_medida`, `marca_material`, `modelo_material`, `medida_material`, `stock_material`, `id_tipo_material`, `vigencia`) VALUES
(1, '56756', 'Desatornillador', 'Uni.', 'Redline', 'Pequeño', '4 Pulgadas', 10, 1, 1),
(2, '34534', 'Martillo', 'Uni.', 'Stanley', 'Portable', '15cm', NULL, 1, 1),
(3, '34681', 'Alicate', 'Uni.', 'Stanley', 'Portable', '10cm.', NULL, 1, 1),
(4, '34567', 'Pie de Metro', 'Uni.', 'Stanley', 'asdf', '15cm x 5cm', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_alumno`
--

DROP TABLE IF EXISTS `nivel_alumno`;
CREATE TABLE IF NOT EXISTS `nivel_alumno` (
  `id_nivel_alumno` int(11) NOT NULL,
  `descripcion_nivel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_nivel_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nivel_alumno`
--

INSERT INTO `nivel_alumno` (`id_nivel_alumno`, `descripcion_nivel`) VALUES
(1, 'Primero Medio'),
(2, 'Segundo Medio'),
(3, 'Tercero Medio'),
(4, 'Cuarto Medio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

DROP TABLE IF EXISTS `nota`;
CREATE TABLE IF NOT EXISTS `nota` (
  `id_nota` int(11) NOT NULL AUTO_INCREMENT,
  `nota` int(11) NOT NULL,
  `id_periodo` int(11) DEFAULT NULL,
  `posicion_nota` int(11) DEFAULT NULL,
  `id_alumno_curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_nota`),
  KEY `fk_nota_periodo_idx` (`id_periodo`),
  KEY `fk_nota_alumno_curso_idx` (`id_alumno_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id_orden_material`),
  KEY `fk_orden_profesor_idx` (`id_responsable`),
  KEY `fk_orden_plan_cuenta_idx` (`id_plan_cuenta`),
  KEY `kf_orden_sector_idx` (`id_sector`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orden_material`
--

INSERT INTO `orden_material` (`id_orden_material`, `correlativo_orden`, `id_responsable`, `id_sector`, `fecha_orden_material`, `id_plan_cuenta`, `fecha_creacion`, `fecha_modificacion`, `vigencia`, `estado_orden`) VALUES
(9, 1, 2, 2, '2016-11-10', 1, '2016-11-20 19:11:08', '2016-11-20 19:11:08', 1, 'Enviada'),
(10, 2, 1, 1, '2016-11-18', 1, '2016-11-20 19:12:20', '2016-11-20 19:12:20', 1, 'Enviada'),
(11, 3, 5, 5, '2016-11-18', 1, '2016-11-20 22:48:37', '2016-11-20 22:48:37', 1, 'Pendiente'),
(12, 4, 1, 1, '2016-11-18', 2, '2016-11-20 22:51:27', '2016-11-20 22:51:27', 1, 'Pendiente'),
(13, 5, 5, 5, '2016-11-18', NULL, '2016-11-20 18:58:11', '2016-11-20 18:58:11', 1, 'Pendiente'),
(14, 6, 1, 1, '2016-11-18', NULL, '2016-11-20 18:58:19', '2016-11-20 18:58:19', 1, 'Pendiente'),
(15, 7, 1, 1, '2016-11-18', NULL, '2016-11-20 18:58:22', '2016-11-20 18:58:22', 1, 'Pendiente'),
(16, 8, 1, 1, '2016-11-18', NULL, '2016-11-20 18:58:24', '2016-11-20 18:58:24', 1, 'Pendiente'),
(17, 9, 2, 2, '2016-11-04', NULL, '2016-11-20 18:58:27', '2016-11-20 18:58:27', 1, 'Pendiente'),
(18, 11, 2, 2, '2016-11-17', NULL, '2016-11-20 18:58:29', '2016-11-20 18:58:29', 1, 'Pendiente'),
(19, 12, 1, 1, '2016-11-18', NULL, '2016-11-20 18:58:34', '2016-11-20 18:58:34', 1, 'Pendiente'),
(20, 13, 1, 1, '2016-11-02', NULL, '2016-11-20 18:58:40', '2016-11-20 18:58:40', 1, 'Enviada'),
(21, 14, NULL, NULL, '2016-11-20', NULL, '2016-11-20 20:00:10', '2016-11-20 20:00:10', 1, 'Enviada');

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
  `cantidad_notas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_periodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id_profesor`),
  KEY `fk_profe_user_idx` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id_profesor`, `horas_profesor`, `id_usuario`) VALUES
(1, NULL, 6),
(2, NULL, 7),
(3, NULL, 8),
(4, NULL, 9),
(5, NULL, 10);

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
(3, 1),
(4, 1),
(5, 1);

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
(1, 'Terminación en Contrucciones', 1),
(2, 'Mecánica Industrial', 2),
(3, 'Contrucciones Metalicas', 3),
(4, 'Mecánica Automotriz', 4),
(5, 'Electricidad', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_material`
--

DROP TABLE IF EXISTS `tipo_material`;
CREATE TABLE IF NOT EXISTS `tipo_material` (
  `id_tipo_material` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_material` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_material`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_material`
--

INSERT INTO `tipo_material` (`id_tipo_material`, `nombre_tipo_material`) VALUES
(1, 'Herramientas');

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
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `rut_usuario`, `nombres_usuario`, `apellido_paterno`, `apellido_materno`, `email_usuario`, `hash_usuario`, `direccion_usuario`, `sexo_usuario`, `fecha_creacion`, `fecha_ultimo_login`, `telefono_usuario`, `tipo_usuario`, `main_page`, `pass_temp`) VALUES
(1, '17494576-4', 'Admin', NULL, NULL, 'acm@agiliza.com', '$2a$10$7qryi0P7i4r32UMlxH0HJOy1KQa34irdapx8qZgfaATsCZRDE1FbO', 'Palma de Mallorca #1763', 'Masculino', NULL, '2016-09-21 02:20:03', 951036575, 'Administrador', 'inicio.panel', '1'),
(2, '11111111-1', 'Cristian', 'Canales', 'Dote', 'ccanales@agiliza.xyz', '$2a$10$7qryi0P7i4r32UMlxH0HJOy1KQa34irdapx8qZgfaATsCZRDE1FbO', 'alguna #123', 'Masculino', '2016-08-24 03:31:44', '2016-11-20 22:46:48', 56911111111, 'Administrador', 'inicio.panel', '1'),
(3, '12111111-1', 'Juan Hernán', 'Figueroa', 'cabrera', 'juan@agiliza.cl', '$2a$10$q15lelwV664hKerZc3k0v.Zt84MmLXuSE3IwlcXId.1TjQ09MBZNu', 'alguna #123', 'Masculino', '2016-08-24 22:39:13', '2016-10-04 21:58:50', 56912111111, 'Apoderado', 'home.panel', 'MvA2Z051'),
(4, '13111111-1', 'Javiera Sofía', 'Peñaloza', 'Gonzáles', 'javiera@agiliza.cl', '$2a$10$wOBShYJLf4I97psRbfA62.635MIophlqniRIfe8brrrdrAO/lahVe', 'alguna #123', 'Femenino', '2016-08-24 22:42:41', NULL, 56913111111, NULL, 'home.panel', 'slD4E50O'),
(5, '14111111-1', 'Jorge Bastian', 'Fuenzalida', 'Perez', 'jorge@agiliza.cl', '$2a$10$Ig7qJfN74d0KLeJC6DtKqe8PuD6Bl.4VCNgrpBkqqROh6.fmdZaE2', 'alguna #123', 'Masculino', '2016-08-24 23:04:58', '2016-09-21 02:16:39', 56914111111, NULL, 'home.panel', 'w2V2lesQ'),
(6, '11111111-1', 'Fernando', 'Lopez', 'Gonzalez', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, '11111111-1', 'Juan', 'Meneses', 'Mella', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, '11111111-1', 'Jose', 'de la Cruz', 'Robledo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '11111111-1', 'Jose', 'Gerrero', 'Torres', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, '11111111-1', 'Daniel', 'Lillo', 'Madariaga', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  ADD CONSTRAINT `fk_alumno_nivel` FOREIGN KEY (`nivel_alumno`) REFERENCES `nivel_alumno` (`id_nivel_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_user` FOREIGN KEY (`id_alumno`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_curso`
--
ALTER TABLE `alumno_curso`
  ADD CONSTRAINT `fk_alumno_curso_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_curso_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD CONSTRAINT `fk_asignatura_curso` FOREIGN KEY (`nivel_asignatura`) REFERENCES `curso` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_asignatura_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `fk_asistencia_alumno_curso` FOREIGN KEY (`id_alumno_curso`) REFERENCES `alumno_curso` (`id_alumno_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_asistencia_horario` FOREIGN KEY (`id_horario`) REFERENCES `horario` (`id_horario`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_detalle_curso_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `fk_horario_bloque` FOREIGN KEY (`id_bloque`) REFERENCES `bloque` (`id_bloque`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horario_curso_anual` FOREIGN KEY (`id_curso_anual`) REFERENCES `curso_anual` (`id_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_horario_detalle` FOREIGN KEY (`id_detalle_curso_anual`) REFERENCES `detalle_curso_anual` (`id_detalle_curso_anual`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `fk_nota_alumno_curso` FOREIGN KEY (`id_alumno_curso`) REFERENCES `alumno_curso` (`id_alumno_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_nota_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `fk_profe_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
