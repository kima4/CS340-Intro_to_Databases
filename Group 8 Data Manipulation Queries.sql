-- Group 8 Data Manipulation Queries
-- Updated December 1, 2021


-- Main Table Pages

-- Recipes Page

-- Display all current recipes
SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes;

-- Search for a recipe by recipe name
SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes WHERE recipe_name = :recipe_name_Input;

-- Add a new recipe
INSERT INTO Recipes (recipe_name, recipe_description, recipe_creator)
VALUES (:recipe_name_Input, :recipe_description_Input, :username_from_dropdown_Input);

-- Retrieve data for a single recipe when clicking the "Update" link
SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes
WHERE recipe_id = :recipe_id_from_update_link;

-- Update a recipe using the "Update" link
UPDATE Recipes SET recipe_name = :recipe_name_Input, recipe_description = :recipe_description_Input, recipe_creator = :username_from_dropdown_Input
WHERE recipe_id = :recipe_id_from_update_link;

-- Delete a recipe
DELETE FROM Recipes WHERE recipe_id = :recipe_id_from_delete_button;



-- Ingredients Page

-- Display all current ingredients
SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients;

-- Search for an ingredient by ingredient name
SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients WHERE ingredient_name = :ingredient_name_Input;

-- Add a new ingredient
INSERT INTO Ingredients (ingredient_name, ingredient_category)
VALUES (:ingredient_name_Input, :ingredient_category_Input);

-- Retrieve data for a single ingredient when clicking the "Update" link
SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients
WHERE ingredient_id = :ingredient_id_from_update_link;

-- Update an ingredient using the "Update" link
UPDATE Ingredients SET ingredient_name = :ingredient_name_Input, ingredient_category = :ingredient_category_Input
WHERE ingredient_id = :ingredient_id_from_update_link;

-- Delete an ingredient
DELETE FROM Ingredients WHERE ingredient_id = :ingredient_id_from_delete_button;



-- Users Page

-- Display all current users
SELECT username, user_email, user_description FROM Users;

-- Search for a user by username
SELECT username, user_email, user_description FROM Users WHERE username = :username_Input;

-- Add a new user
INSERT INTO Users (username, user_email, user_description)
VALUES (:username_Input, :user_email_Input, :user_description_Input);

-- Retrieve data for a single user when clicking the "Update" link
SELECT username, user_email, user_description FROM Users
WHERE username = :username_from_update_link;

-- Update a single user's information using the "Update" link
UPDATE Users SET user_email = :user_email_Input, user_description = :user_description_Input
WHERE username = :username_from_update_link;

-- Delete a user
DELETE FROM Users WHERE username = :username_from_delete_button;



-- Menus Page

-- Display all current menus
SELECT menu_id, menu_name, menu_description, menu_creator FROM Menus;

-- Search for a menu by menu name
SELECT menu_id, menuPname, menu_description, menu_creator FROM Menus WHERE menu_name = :menu_name_Input;

-- Add a new menu
INSERT INTO Menus (menu_name, menu_description, menu_creator)
VALUES (:menu_name_Input, :menu_description_Input, :username_from_dropdown_Input);

-- Retrieve data for a single menu when clicking the "Update" link
SELECT menu_id, menu_name, menu_description, menu_creator FROM Menus
WHERE menu_id = :menu_id_from_update_link;

-- Update a menu using the "Update" link
UPDATE Menus SET menu_name = :menu_name_Input, menu_description = :menu_description_Input, menu_creator = :username_from_dropdown_Input
WHERE menu_id = :menu_id_from_update_link;

-- Delete a menu
DELETE FROM Menus WHERE menu_id = :menu_id_from_delete_button;








-- Junction Table Pages


-- RecipeIngredients

-- Get all rows from RecipeIngredients
SELECT recipe_ingredient_id, recipe_name, ingredient_name, ingredient_amount, recipe_step, recipe_action FROM RecipeIngredients 
INNER JOIN Recipes ON RecipeIngredients.recipe_id = Recipes.recipe_id
INNER JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id
ORDER BY RecipeIngredients.recipe_id, recipe_step;

-- Add a new recipe-ingredient relationship with auto-incrementing recipe step numbers
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_amount, recipe_step, recipe_action)
SELECT :recipe_id_from_dropdown, :ingredient_id_from_dropdown, :ingredient_amount_Input, :recipe_step_input, :recipe_action_Input
FROM RecipeIngredients WHERE recipe_id = :recipe_id_Input;

-- Retrieve data for a single recipe-ingredient relationship when clicking the "Update" link
SELECT recipe_ingredient_id, recipe_name, ingredient_name, ingredient_amount, recipe_step, recipe_action FROM RecipeIngredients 
INNER JOIN Recipes ON RecipeIngredients.recipe_id = Recipes.recipe_id
INNER JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id
WHERE recipe_ingredient_id = recipe_ingredient_id_from_update_link;

-- Update a recipe-ingredient relationship using the "Update" link
UPDATE RecipeIngredients SET ingredient_amount = :ingredient_amount_Input, recipe_step = :recipe_step_input, recipe_action = :recipe_action_Input
WHERE recipe_ingredient_id = recipe_ingredient_id_from_update_link;

-- Delete a recipe-ingredient relationship
DELETE FROM RecipeIngredients WHERE recipe_ingredient_id = recipe_ingredient_id_from_delete_button;



-- RecipeUsers

-- Get all rows from RecipeUsers
SELECT recipe_user_id, recipe_name, username, recipe_user_rating, recipe_user_comment FROM RecipeUsers 
INNER JOIN Recipes ON RecipeUsers.recipe_id = Recipes.recipe_id
ORDER BY recipe_user_id;

-- Add a new recipe-user relationship
INSERT INTO RecipeUsers (recipe_id, username, recipe_user_rating, recipe_user_comment)
VALUES (:recipe_id_from_dropdown, :username_from_dropdown, :recipe_user_rating_Input, :recipe_user_comment_Input);

-- Retrieve data for a single recipe-user relationship when clicking the "Update" link
SELECT recipe_user_id, recipe_name, username, recipe_user_rating, recipe_user_comment FROM RecipeUsers 
INNER JOIN Recipes ON RecipeUsers.recipe_id = Recipes.recipe_id
WHERE recipe_user_id = recipe_user_id_from_update_link;

-- Update a recipe-user relationship using the "Update" link
UPDATE RecipeUsers SET recipe_user_rating = :recipe_user_rating_Input, recipe_user_comment = :recipe_user_comment_Input
WHERE recipe_user_id = recipe_user_id_from_update_link;

-- Delete a recipe-user relationship
DELETE FROM RecipeUsers WHERE recipe_user_id = recipe_user_id_from_delete_button;



-- MenuRecipes

-- Get all rows from MenuRecipes
SELECT menu_recipe_id, menu_name, recipe_name, recipe_number FROM MenuRecipes 
INNER JOIN Menus ON MenuRecipes.menu_id = Menus.menu_id
INNER JOIN Recipes ON MenuRecipes.recipe_id = Recipes.recipe_id
ORDER BY menu_recipe_id;

-- Add a new menu-recipe relationship with auto-incrementing recipe numbers
INSERT INTO MenuRecipes (menu_id, recipe_id, recipe_number)
SELECT :menu_id_from_dropdown, :recipe_id_from_dropdown, :recipe_number_Input
FROM MenuRecipes WHERE menu_id = :menu_id_Input;

-- Retrieve data for a single menu-recipe relationship when clicking the "Update" link
SELECT menu_recipe_id, menu_name, recipe_name, recipe_number FROM MenuRecipes 
INNER JOIN Menus ON MenuRecipes.menu_id = Menus.menu_id
INNER JOIN Recipes ON MenuRecipes.recipe_id = Recipes.recipe_id
WHERE menu_recipe_id = menu_recipe_id_from_update_link;

-- Update a menu-recipe relationship using the "Update" link
UPDATE MenuRecipes SET recipe_number = :recipe_number_Input
WHERE menu_recipe_id = menu_recipe_id_from_update_link;

-- Delete a menu-recipe relationship
DELETE FROM MenuRecipes WHERE menu_recipe_id = menu_recipe_id_from_delete_button;



-- MenuUsers

-- Get all rows from MenuUsers	
SELECT menu_user_id, menu_name, MenuUsers.username, menu_user_rating, menu_user_comment FROM MenuUsers 
INNER JOIN Menus ON MenuUsers.menu_id = Menus.menu_id
INNER JOIN Users ON MenuUsers.username = Users.username
ORDER BY menu_user_id;

-- Add a new menu-user relationship
INSERT INTO MenuUsers (menu_id, username, menu_user_rating, menu_user_comment)
VALUES (:menu_id_from_dropdown, :username_from_dropdown, :menu_user_rating_Input, :menu_user_comment_Input);

-- Retrieve data for a single menu-user relationship when clicking the "Update" link
SELECT menu_user_id, menu_name, MenuUsers.username, menu_user_rating, menu_user_comment FROM MenuUsers 
INNER JOIN Menus ON MenuUsers.menu_id = Menus.menu_id
INNER JOIN Users ON MenuUsers.username = Users.username
WHERE menu_user_id = menu_user_id_from_update_link;

-- Update a menu-user relationship using the "Update" link
UPDATE MenuUsers SET menu_user_rating = :menu_user_rating_Input, menu_user_comment = :menu_user_comment_Input
WHERE menu_user_id = menu_user_id_from_update_link;

-- Delete a menu-user relationship
DELETE FROM MenuUsers WHERE menu_user_id = menu_user_id_from_delete_button;









