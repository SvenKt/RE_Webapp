-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Apr 2015 um 16:22
-- Server Version: 5.6.21
-- PHP-Version: 5.5.19

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
  `team_id` int(6) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `relations` varchar(50) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `requirements`
--

INSERT INTO `requirements` (`id`, `requirement`, `owner_id`, `priority`, `team_id`, `project_id`, `status`, `relations`, `timestamp`) VALUES
(175, 'asdf:muss:saddfg:sdfgsd :fÃ¤hig sein,:fgds:gsdfg', 29, 0, 102, 2, 'im Backlog', '', 1429105899248),
(176, 'Bei Klick auf TabellenkÃ¶pfe:muss:Redwire::fÃ¤hig sein,:die Anforderungen:zu sortieren', 27, 2, 100, 9, 'im Backlog', '', 1429105899248),
(177, 'Morgens:muss:Redwire:dem User   :die MÃ¶glichkeit bieten,:sich:einzuloggen', 27, 0, 100, 1, 'abgeschlossen', '', 1429105899248),
(178, 'Nach dem eintragen einer Anforderung:sollte:dieses Programm:dem Benutzer    :die MÃ¶glichkeit bieten,:direkt weitere Anforderungen:einzutragen', 27, 0, 100, 10, 'in Bearbeitung', '', 1429105899248),
(185, 'Abends:muss:Redwire::fÃ¤hig sein,:den User selbststÃ¤ndig:auszuloggen', 27, 1, 100, 2, 'im Backlog', '1', 1429105899248),
(188, 'Zur Mittagspause:sollte:Redwire::die MÃ¶glichkeit bieten,:alle User automatisch:auszuloggen', 30, 3, 100, 4, 'in Testphase', '', 1429105899248),
(190, 'Nach dem Login:muss:Redwire:dem User :die MÃ¶glichkeit bieten,:alle Anforderungen automatisch:einzusehen', 30, 0, 100, 8, 'im Backlog', '', 1429105899248),
(199, 'Immer (auÃŸer zur Mittagspause):sollte:Redwire:dem User         :die MÃ¶glichkeit bieten,:sich:einzuloggen', 30, 1, 100, 7, 'im Backlog', '', 1429105899248),
(213, 'Am Abend:muss:Redwire::fÃ¤hig sein,:selbstÃ¤ndig:zu speichern', 30, 2, 101, 9, 'im Backlog', '', 1429105899248),
(217, 'gssadg:muss:sgdgsadg:sdgsadg :fÃ¤hig sein,:sagsa:gasgdas', 30, 0, 101, 1, 'im Backlog', '', 1429105899248),
(232, 'Morgens:muss:Ã¤Ã¶Ã¼:Ã¼Ã¶Ã¤     :fÃ¤hig sein,:Ã¼Ã¼Ã¼:Ã¤Ã¤Ã¤', 27, 3, 101, 4, 'in Testphase', '', 1429106489827),
(235, 'FFFFFFF:muss:FFFFFFFF:FFFFFFFFF :fÃ¤hig sein,:UUUUU:UUUUU', 30, 0, 101, 5, 'im Backlog', '', 1429106932926),
(236, 'ZZZZZZZZ:muss:ZZZZZZZZZ:ZZZZZZZ :fÃ¤hig sein,:ZZZZZZZZ:ZZZZZZZZZ', 30, 0, 101, 7, 'im Backlog', '', 1429107172980),
(239, 'Immer:sollte:Redwire:dem User :die MÃ¶glichkeit bieten,:Ã„nderungen:zu sehen', 27, 1, 100, 3, 'im Backlog', '', 1429107308767);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE IF NOT EXISTS `team` (
`id` int(6) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `creator_id` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`id`, `name`, `creator_id`) VALUES
(76, 'test3', 1),
(83, '1', 1),
(87, '5', 1),
(88, '6', 1),
(92, 'a', 1),
(99, 'bla4', 1),
(100, 'gutgut', 27),
(101, 'schlechtschlecht', 27),
(102, 'blaaa', 29);

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `cookie`, `team_id`) VALUES
(1, 'sven', '25d55ad283aa400af464c76d713c07ad', '1234@1234.de', 990707, 100),
(5, 'admin', 'ed2b1f468c5f915f3f1cf75d7068baae', 'admin@wichtig.de', 395662, NULL),
(27, 'marvi', 'ed2b1f468c5f915f3f1cf75d7068baae', 'marv@i.com', 796883, 101),
(29, 'testUser2', 'ed2b1f468c5f915f3f1cf75d7068baae', 'testUser2@test.de', 366091, 102),
(30, 'testUser1', 'ed2b1f468c5f915f3f1cf75d7068baae', 'testUser1@test.de', 361633, 101);

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
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=240;
--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
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
