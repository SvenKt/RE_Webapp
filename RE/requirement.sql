-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Feb 2015 um 15:52
-- Server Version: 5.6.21
-- PHP-Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `requirement`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `requirements`
--

CREATE TABLE IF NOT EXISTS `requirements` (
`id` int(11) unsigned NOT NULL,
  `requirement` varchar(200) DEFAULT NULL,
  `owner_id` int(6) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `requirements`
--

INSERT INTO `requirements` (`id`, `requirement`, `owner_id`) VALUES
(1, 'Das System muss dem Nutzer die Möglichkeit bieten, sich einzuloggen', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(6) unsigned NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(60) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'sven', 'a8efc104ad9d5ba4e3bcbda231d2e042', 'neu@t-online'),
(2, 'test2', '827ccb0eea8a706c4c34a16891f84e7b', 'sven@ich'),
(3, 'test2', 'c20ad4d76fe97759aa27a0c99bff6710', 'sven@ich'),
(4, 'terik', '202cb962ac59075b964b07152d234b70', 'sven@ich'),
(5, 'test2', '202cb962ac59075b964b07152d234b70', 'sven@ich'),
(6, '', 'd41d8cd98f00b204e9800998ecf8427e', ''),
(7, 'neu', '83e71d83b2dcea23dcab3b64182494cc', 'neu'),
(8, 'neu2', '83e71d83b2dcea23dcab3b64182494cc', 'neu'),
(9, '123', '202cb962ac59075b964b07152d234b70', '123'),
(10, 'tom', '94846ab27a4abb8672589ca403d0dc43', 'sven'),
(11, 'thomas', '94846ab27a4abb8672589ca403d0dc43', '123'),
(12, 'marvin', '202cb962ac59075b964b07152d234b70', 'meineemail'),
(13, 'marvin94', 'f40790f3d45d9e181d39cbdbaf2bf030', 'kekse'),
(14, 'hallo', '598d4c200461b81522a3328565c25f7c', 'hallo'),
(15, 'hallo2', 'c4ca4238a0b923820dcc509a6f75849b', 'hallo'),
(16, 'hallo3', 'c4ca4238a0b923820dcc509a6f75849b', 'hallo'),
(17, 'hallo5', 'c81e728d9d4c2f636f067f89cc14862c', 'hallo'),
(18, 'sven-e', '6ea41f662929e80ec3595fa51c26940d', '12'),
(19, 'hammel', '25d55ad283aa400af464c76d713c07ad', '123'),
(20, 'nana', '185aef3b1c810799a6be8314abf6512c', 'bla'),
(21, 'mama', '25d55ad283aa400af464c76d713c07ad', '34'),
(22, 'LANG', '', '147'),
(23, 'lala', 'e40f01afbb1b9ae3dd6747ced5bca532', '147'),
(24, 'fredy', '11e085377b4a3c5efbfba3d09698a484', 'sv-kujat@t-online.de');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `requirements`
--
ALTER TABLE `requirements`
 ADD PRIMARY KEY (`id`), ADD KEY `owner_id` (`owner_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `requirements`
--
ALTER TABLE `requirements`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `requirements`
--
ALTER TABLE `requirements`
ADD CONSTRAINT `requirements_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
