-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

-- Create the recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT[] NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INT,
    image_url VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    public_recipe boolean DEFAULT true
);

INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe)
VALUES
    ('Spaghetti Carbonara', 'Spaghetti, Eggs, Pancetta, Parmesan Cheese', '1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.', 30, 'https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg', NULL, true),
    ('Chicken Alfredo', 'Fettuccine, Chicken, Alfredo Sauce, Garlic, Parmesan Cheese', '1. Cook chicken. 2. Cook pasta. 3. Make sauce. 4. Combine all.', 45, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg', NULL, true),
    ('Vegetable Stir-Fry', 'Mixed Vegetables, Tofu, Soy Sauce, Garlic, Ginger', '1. Stir-fry vegetables. 2. Cook tofu. 3. Make sauce. 4. Combine all.', 25, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg', NULL, true),
    ('Homemade Pizza', 'Pizza Dough, Tomato Sauce, Mozzarella Cheese, Pepperoni', '1. Roll out dough. 2. Spread sauce. 3. Add toppings. 4. Bake.', 40, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg', NULL, true),
    ('Beef Tacos', 'Ground Beef, Taco Seasoning, Tortillas, Lettuce, Tomato', '1. Cook beef. 2. Season. 3. Assemble tacos.', 30, 'https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg', NULL, true),
    ('Chocolate Chip Cookies', 'Flour, Sugar, Butter, Chocolate Chips', '1. Mix ingredients. 2. Bake in the oven.', 15, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg',NULL, true),
    ('Caesar Salad', 'Romaine Lettuce, Caesar Dressing, Croutons, Parmesan Cheese', '1. Toss lettuce with dressing. 2. Add croutons and cheese.', 10, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg', NULL, true),
    ('Mushroom Risotto', 'Arborio Rice, Mushrooms, Onion, White Wine, Broth', '1. Sauté mushrooms and onion. 2. Cook rice with wine and broth.', 35, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg', NULL, true),
    ('Grilled Salmon', 'Salmon Fillet, Lemon, Dill, Olive Oil', '1. Marinate salmon. 2. Grill until done.', 20, 'https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg',NULL, true),
    ('Beef Stroganoff', 'Beef Strips, Onion, Mushrooms, Sour Cream, Paprika', '1. Sauté beef, onion, and mushrooms. 2. Add sour cream and paprika.', 40, 'http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg', NULL, true);


-- Create the bookmarked table
CREATE TABLE bookmarked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE);