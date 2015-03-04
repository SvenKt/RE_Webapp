-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Mrz 2015 um 00:02
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
  `requirement` varchar(200) CHARACTER SET utf8 COLLATE utf8_german2_ci DEFAULT NULL,
  `owner_id` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `requirements`
--

INSERT INTO `requirements` (`id`, `requirement`, `owner_id`) VALUES
(47, 'ljkn:muss:kjn:kj :fÃ¤hig sein, :kljn:kljn', 1),
(48, '1:muss:1:1 :fÃ¤hig sein, :1:1', 1),
(49, 'asd:muss:asd:asd :fÃ¤hig sein, :ad:asd', 1),
(50, 'dsf:muss:sdf:sdf :fÃ¤hig sein, :sdf:sdf', 1),
(58, 'sdf:muss:sdf:sdf :fÃ¤hig sein, :sdf:sdf', 7),
(59, 'asd:muss:asd::fÃ¤hig sein, :asd:asd', 7),
(61, 'asc:muss:asc:asc :fÃ¤hig sein, :asc:asc', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) unsigned NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `cookie` int(6) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `cookie`) VALUES
(1, 'sven', '25d55ad283aa400af464c76d713c07ad', '1234@1234.de', 352737),
(2, 'test', 'test', NULL, NULL),
(3, 'SvenKt', 'c3fbcd8f3855a7050a359679effbbdf4', 'sv-kujat@t-online.de', NULL),
(4, 'peter', '25d55ad283aa400af464c76d713c07ad', '123', NULL),
(5, 'ich', '25d55ad283aa400af464c76d713c07ad', 'ich_ich@t-online.de', NULL),
(6, 'admin', 'c3fbcd8f3855a7050a359679effbbdf4', 'ich@admin.de', NULL),
(7, 'peter2', '25d55ad283aa400af464c76d713c07ad', 'bla@bla.de', 280695);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `requirements`
--
ALTER TABLE `requirements`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_owner` (`owner_id`);

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
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `requirements`
--
ALTER TABLE `requirements`
ADD CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
