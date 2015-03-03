-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Mrz 2015 um 14:16
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `requirements`
--

INSERT INTO `requirements` (`id`, `requirement`, `owner_id`) VALUES
(1, 'Das System muss dem Nutzer die Möglichkeit bieten, sich einzuloggen', 1),
(2, 'ich muss muss essen fÃ¤hig sein und du.', 1),
(3, 'ich muss muss essen fÃ¤hig sein und du.', 1),
(4, 'Ã¶oij muss pij pij fÃ¤hig sein pj pij.', 1),
(5, 'd muss d fÃ¤hig sein d d.', 1),
(6, 'd muss 3 fÃ¤hig sein d d.', 1),
(9, 'bla muss abl abl fÃ¤hig sein bla bla.', 1),
(13, 'asx muss asx as fÃ¤hig sein asx asx.', 4),
(16, 'aa:muss:aa:a :fÃ¤hig sein :a:a:.', 5),
(19, 'ich:muss:ih:ioh  :fÃ¤hig sein :iu:iuh:.', 5),
(21, 'ihc:muss:iuh:iuh  :fÃ¤hig sein :piuh:piuh:.', 6),
(22, 'bla:muss:bla:bl :fÃ¤hig sein :bli:blubb:.', 6),
(23, 'ss:muss:guz:oz :fÃ¤hig sein :gzou:gz:.', 6),
(24, 'utzfguztfg:muss:fiz:tfizt :fÃ¤hig sein :fzitf:zitf:.', 6),
(25, 'iuhsdoiuh:muss:oiuhoiuh:oiuhoipuh :fÃ¤hig sein :piuopiuh:piuhpiuh:.', 6),
(26, 'kluh:muss:liuh:luih :fÃ¤hig sein :liuh:luh:.', 6),
(27, 'iu:muss:oiuhtrd::fÃ¤hig sein :zter:zers:.', 6),
(28, '645:muss:64:64 :fÃ¤hig sein :654654:4:.', 6),
(29, 'uzkg:muss:oguz:ozg :fÃ¤hig sein :ozg:ogz:.', 6),
(30, 'uzg:muss:uiogz:iozug :fÃ¤hig sein :izug:iguz:.', 6),
(31, '75:muss:izgu:gzi :fÃ¤hig sein :uzg:ugz:.', 6),
(32, 'pui:muss:iu:oiuh :fÃ¤hig sein :oiuhoiu:hoiuh:.', 6),
(33, 'asdoijaopdijaspodijapsodijasopdijaopsidjaposidjaspoj:muss:opuijpouijpoijpoijpojipoijpojpojipoijpoij:pouhuzhb8zjoiuzuigztjtrhgjf5zgrfzhdt4rf4 :fÃ¤hig sein :fuzrttzfgzrzh5rgugztrzth:ttugrtzrh65uggrghzrt', 6);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) unsigned NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'sven', '81dc9bdb52d04dc20036dbd8313ed055', NULL),
(2, 'test', 'test', NULL),
(3, 'SvenKt', 'c3fbcd8f3855a7050a359679effbbdf4', 'sv-kujat@t-online.de'),
(4, 'peter', '25d55ad283aa400af464c76d713c07ad', '123'),
(5, 'ich', '25d55ad283aa400af464c76d713c07ad', 'ich_ich@t-online.de'),
(6, 'admin', 'c3fbcd8f3855a7050a359679effbbdf4', 'ich@admin.de');

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
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
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
