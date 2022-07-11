-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2021 at 08:20 PM
-- Server version: 10.4.21-MariaDB-log
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_imamk`
--

-- --------------------------------------------------------

--
-- Table structure for table `Ingredients`
--

DROP TABLE IF EXISTS `Ingredients`;
CREATE TABLE `Ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `ingredient_category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Ingredients`
--

INSERT INTO `Ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_category`) VALUES
(1, 'Peanut Butter', 'Spread'),
(2, 'Jelly', 'Spread'),
(3, 'Sliced White Bread', 'Bread'),
(4, 'American Cheese', 'Cheese'),
(5, 'Unsalted Butter', 'Dairy'),
(6, 'Cheddar Cheese', 'Cheese');

-- --------------------------------------------------------

--
-- Table structure for table `MenuRecipes`
--

DROP TABLE IF EXISTS `MenuRecipes`;
CREATE TABLE `MenuRecipes` (
  `menu_recipe_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MenuRecipes`
--

INSERT INTO `MenuRecipes` (`menu_recipe_id`, `menu_id`, `recipe_id`, `recipe_number`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Menus`
--

DROP TABLE IF EXISTS `Menus`;
CREATE TABLE `Menus` (
  `menu_id` int(11) NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `menu_description` varchar(255) DEFAULT NULL,
  `menu_creator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Menus`
--

INSERT INTO `Menus` (`menu_id`, `menu_name`, `menu_description`, `menu_creator`) VALUES
(1, 'Sandwiches', 'Only the best sandwiches', 'God'),
(2, 'Fromage', 'YumYumYumYum', 'Cheesemaster');

-- --------------------------------------------------------

--
-- Table structure for table `MenuUsers`
--

DROP TABLE IF EXISTS `MenuUsers`;
CREATE TABLE `MenuUsers` (
  `menu_user_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `menu_user_rating` int(11) DEFAULT NULL,
  `menu_user_comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MenuUsers`
--

INSERT INTO `MenuUsers` (`menu_user_id`, `menu_id`, `username`, `menu_user_rating`, `menu_user_comment`) VALUES
(1, 1, 'xXx_1337Gamer_xXx', 10, 'I get them in my lunchbox and I love it'),
(2, 2, 'God', 1, 'Bruh'),
(3, 2, 'Cheesemaster', 10, 'C\'mon guys, it\'s CHEESE!');

-- --------------------------------------------------------

--
-- Table structure for table `RecipeIngredients`
--

DROP TABLE IF EXISTS `RecipeIngredients`;
CREATE TABLE `RecipeIngredients` (
  `recipe_ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_amount` varchar(255) NOT NULL,
  `recipe_step` int(11) NOT NULL,
  `recipe_action` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RecipeIngredients`
--

INSERT INTO `RecipeIngredients` (`recipe_ingredient_id`, `recipe_id`, `ingredient_id`, `ingredient_amount`, `recipe_step`, `recipe_action`) VALUES
(1, 1, 3, '2 slices', 1, 'Lay out bread flat on surface.'),
(2, 1, 1, '1 good knifeful', 2, 'Slather peanut butter on one side of one piece of bread.'),
(3, 1, 2, '1 good spoonful', 3, 'Slather jelly on one side of the other piece of bread. Stack bread so that the spreads are touching.'),
(4, 2, 3, '2 slices', 1, 'Stack bread.'),
(5, 2, 4, '1 slice', 2, 'Put cheese slice between bread slices.'),
(6, 2, 5, '1 tsp', 3, 'Coat heated pan with butter and grill the sandwich until golden on both sides.'),
(7, 3, 6, '1 block', 1, 'Just eat the block of cheddar cheese.');

-- --------------------------------------------------------

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;
CREATE TABLE `Recipes` (
  `recipe_id` int(11) NOT NULL,
  `recipe_name` varchar(255) NOT NULL,
  `recipe_description` varchar(255) DEFAULT NULL,
  `recipe_creator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Recipes`
--

INSERT INTO `Recipes` (`recipe_id`, `recipe_name`, `recipe_description`, `recipe_creator`) VALUES
(1, 'Peanut Butter Jelly Sandwich', 'A classic', 'God'),
(2, 'Grilled Cheese Sandwich', 'Check that cheesy goodness', 'Cheesemaster'),
(3, 'Block of Cheddar', 'Cheese chuck yum', 'Cheesemaster');

-- --------------------------------------------------------

--
-- Table structure for table `RecipeUsers`
--

DROP TABLE IF EXISTS `RecipeUsers`;
CREATE TABLE `RecipeUsers` (
  `recipe_user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `recipe_user_rating` int(11) DEFAULT NULL,
  `recipe_user_comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RecipeUsers`
--

INSERT INTO `RecipeUsers` (`recipe_user_id`, `recipe_id`, `username`, `recipe_user_rating`, `recipe_user_comment`) VALUES
(1, 1, 'Cheesemaster', 10, 'I\'m all about dat cheesy goodness, but you CAN\'T go wrong with a good PBJ!'),
(2, 1, 'xXx_1337Gamer_xXx', 10, 'My mom makes me PBJs when I am too busy pwning n00bs online'),
(3, 2, 'God', 10, 'The forbidden fruit was originally a grilled cheese sandwich but I was afraid Adam would eat it instantly'),
(4, 3, 'God', 1, 'Bruh'),
(5, 3, 'xXx_1337Gamer_xXx', 4, 'Bit weird but I\'ve eaten worse when on a gaming spree');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `username` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `user_email`, `user_description`) VALUES
('Cheesemaster', 'fondue4lyfe@aol.com', 'Gouda was my first love.'),
('God', 'theOG@hotmail.com', 'The big man himself.'),
('just_lurking', 'goaway@gmail.com', NULL),
('xXx_1337Gamer_xXx', 'watchmycodmontage@gmail.com', 'Sometimes Mountain Dew and Doritos don\'t do enough for me.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Ingredients`
--
ALTER TABLE `Ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD UNIQUE KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `MenuRecipes`
--
ALTER TABLE `MenuRecipes`
  ADD PRIMARY KEY (`menu_recipe_id`),
  ADD UNIQUE KEY `menu_recipe_id` (`menu_recipe_id`),
  ADD KEY `fk_menu_rec_menu` (`menu_id`),
  ADD KEY `fk_menu_rec_recipe` (`recipe_id`);

--
-- Indexes for table `Menus`
--
ALTER TABLE `Menus`
  ADD PRIMARY KEY (`menu_id`),
  ADD UNIQUE KEY `menu_id` (`menu_id`),
  ADD KEY `fk_menus_1` (`menu_creator`);

--
-- Indexes for table `MenuUsers`
--
ALTER TABLE `MenuUsers`
  ADD PRIMARY KEY (`menu_user_id`),
  ADD UNIQUE KEY `menu_user_id` (`menu_user_id`),
  ADD KEY `fk_menu_user_menu` (`menu_id`),
  ADD KEY `fk_menu_user_username` (`username`);

--
-- Indexes for table `RecipeIngredients`
--
ALTER TABLE `RecipeIngredients`
  ADD PRIMARY KEY (`recipe_ingredient_id`),
  ADD UNIQUE KEY `recipe_ingredient_id` (`recipe_ingredient_id`),
  ADD KEY `fk_rec_ing_recipe` (`recipe_id`),
  ADD KEY `fk_rec_ing_ingredient` (`ingredient_id`);

--
-- Indexes for table `Recipes`
--
ALTER TABLE `Recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`),
  ADD KEY `fk_recipes_1` (`recipe_creator`);

--
-- Indexes for table `RecipeUsers`
--
ALTER TABLE `RecipeUsers`
  ADD PRIMARY KEY (`recipe_user_id`),
  ADD UNIQUE KEY `recipe_user_id` (`recipe_user_id`),
  ADD KEY `fk_rec_user_recipe` (`recipe_id`),
  ADD KEY `fk_rec_user_username` (`username`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Ingredients`
--
ALTER TABLE `Ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `MenuRecipes`
--
ALTER TABLE `MenuRecipes`
  MODIFY `menu_recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Menus`
--
ALTER TABLE `Menus`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MenuUsers`
--
ALTER TABLE `MenuUsers`
  MODIFY `menu_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RecipeIngredients`
--
ALTER TABLE `RecipeIngredients`
  MODIFY `recipe_ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Recipes`
--
ALTER TABLE `Recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RecipeUsers`
--
ALTER TABLE `RecipeUsers`
  MODIFY `recipe_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `MenuRecipes`
--
ALTER TABLE `MenuRecipes`
  ADD CONSTRAINT `fk_menu_rec_menu` FOREIGN KEY (`menu_id`) REFERENCES `Menus` (`menu_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_menu_rec_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `Menus`
--
ALTER TABLE `Menus`
  ADD CONSTRAINT `fk_menus_1` FOREIGN KEY (`menu_creator`) REFERENCES `Users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `MenuUsers`
--
ALTER TABLE `MenuUsers`
  ADD CONSTRAINT `fk_menu_user_menu` FOREIGN KEY (`menu_id`) REFERENCES `Menus` (`menu_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_menu_user_username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `RecipeIngredients`
--
ALTER TABLE `RecipeIngredients`
  ADD CONSTRAINT `fk_rec_ing_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredients` (`ingredient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rec_ing_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `Recipes`
--
ALTER TABLE `Recipes`
  ADD CONSTRAINT `fk_recipes_1` FOREIGN KEY (`recipe_creator`) REFERENCES `Users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `RecipeUsers`
--
ALTER TABLE `RecipeUsers`
  ADD CONSTRAINT `fk_rec_user_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`recipe_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rec_user_username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
