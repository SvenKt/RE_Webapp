-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Jun 2015 um 12:17
-- Server Version: 5.6.20
-- PHP-Version: 5.5.15

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2021 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE IF NOT EXISTS `team` (
`id` int(6) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `creator_id` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=106 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `cookie`, `team_id`) VALUES
(1, 'admin', '25d55ad283aa400af464c76d713c07ad', 'admin@wichtig.de', 152555, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_owner` (`owner_id`), ADD KEY `fk_team` (`team_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_creator` (`creator_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_team_in` (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2021;
--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
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
