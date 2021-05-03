-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Maio-2021 às 20:51
-- Versão do servidor: 10.4.18-MariaDB
-- versão do PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `call_center`
--
CREATE DATABASE IF NOT EXISTS `call_center` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `call_center`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ramais`
--

CREATE TABLE `ramais` (
  `RAMAL_ID` int(11) NOT NULL,
  `RAMAL_NOME_USER` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `RAMAL_IP` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `RAMAL_STATUS` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `RAMAL_NUMERO` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `RAMAL_DTINCLUSAO` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ramais`
--

INSERT INTO `ramais` (`RAMAL_ID`, `RAMAL_NOME_USER`, `RAMAL_IP`, `RAMAL_STATUS`, `RAMAL_NUMERO`, `RAMAL_DTINCLUSAO`) VALUES
(179, 'Gabriel', '192.168.156.40', 'Ocupado', '(11)9652-4455', '2021-05-02 15:39:08'),
(180, 'Leandro', '150.168.525.6', 'Chamando', '(12)9531-8664', '2021-05-02 15:39:35'),
(181, 'Barbara', '210.896.155.01', 'Disponivel', '(55)7995-6642', '2021-05-02 15:40:10'),
(182, 'Bruno', '210.150.55.08', 'Indisponivel', '(11)9556-6612', '2021-05-02 15:40:37');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `ramais`
--
ALTER TABLE `ramais`
  ADD PRIMARY KEY (`RAMAL_ID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ramais`
--
ALTER TABLE `ramais`
  MODIFY `RAMAL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
