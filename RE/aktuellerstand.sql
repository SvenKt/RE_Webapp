-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Mrz 2015 um 02:05
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
  `owner_id` int(11) unsigned DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `team_id` int(6) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `requirements`
--

INSERT INTO `requirements` (`id`, `requirement`, `owner_id`, `priority`, `team_id`) VALUES
(58, 'sdf:muss:sdf:sdf :fÃ¤hig sein, :sdf:sdf', 7, NULL, NULL),
(59, 'asd:muss:asd::fÃ¤hig sein, :asd:asd', 7, NULL, NULL),
(66, 'sdfsdfsd:muss:liglig:lgÃ¶oih :fÃ¤hig sein, :luioh:luhluh', 1, 0, NULL),
(67, 'uzbho75457:muss:gergerg:46877eerg :fÃ¤hig sein, :ergerg:egerg', 1, 0, NULL),
(68, 'erger:muss:gerg:ergt :fÃ¤hig sein, :zhr:rjhrjz', 1, 0, NULL),
(71, 'asef:muss:liuh:liuh  :fÃ¤hig sein, :liuh:luih', 1, 3, NULL),
(72, 'fgafg:muss:afgafg:adfgadfg   :fÃ¤hig sein, :adfg:adfgadfg', 1, 3, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE IF NOT EXISTS `team` (
`id` int(6) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `creator_id` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`id`, `name`, `creator_id`) VALUES
(1, 'Orga1', NULL),
(2, 'blabla', NULL),
(3, 'blabla3', NULL),
(4, 'blabla4', NULL),
(5, 'orga2', NULL),
(6, 'orga3', NULL),
(7, 'orga7', NULL),
(8, 'orga8', NULL),
(9, 'orga89', NULL),
(10, 'dfg', NULL),
(11, 'dfg5', NULL),
(12, 'dfg56', NULL),
(13, 'dfg567', NULL),
(14, 'dfg5675', NULL),
(15, 'dfg56754', NULL),
(16, 'dfg567545', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) unsigned NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `cookie` int(6) DEFAULT NULL,
  `team_id` int(6) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `cookie`, `team_id`) VALUES
(1, 'sven', '25d55ad283aa400af464c76d713c07ad', '1234@1234.de', 873616, 12),
(2, 'test', 'test', NULL, NULL, NULL),
(3, 'SvenKt', 'c3fbcd8f3855a7050a359679effbbdf4', 'sv-kujat@t-online.de', NULL, NULL),
(4, 'peter', '25d55ad283aa400af464c76d713c07ad', '123', NULL, NULL),
(5, 'ich', '25d55ad283aa400af464c76d713c07ad', 'ich_ich@t-online.de', NULL, NULL),
(6, 'admin', 'c3fbcd8f3855a7050a359679effbbdf4', 'ich@admin.de', NULL, NULL),
(7, 'peter2', '25d55ad283aa400af464c76d713c07ad', 'bla@bla.de', 280695, NULL),
(16, '', '', NULL, NULL, 9),
(17, '', '', NULL, NULL, 10);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `requirements`
--
ALTER TABLE `requirements`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_owner` (`owner_id`), ADD KEY `fk_team` (`team_id`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_creator` (`creator_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_team_in` (`team_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `requirements`
--
ALTER TABLE `requirements`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `requirements`
--
ALTER TABLE `requirements`
ADD CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
ADD CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

--
-- Constraints der Tabelle `team`
--
ALTER TABLE `team`
ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
