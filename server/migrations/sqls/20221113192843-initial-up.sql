CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);


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

CREATE TABLE bookmarked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE);


INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe)    
VALUES
('Spaghetti Carbonara', '{spaghetti,eggs,pancetta,"parmesan cheese"}', '1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.', 30, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
('Chicken Alfredo', '{pasta,chicken,butter,garlic,"parmesan cheese"}', '1. Cook chicken. 2. Cook pasta. 3. Make sauce. 4. Combine all.', 45, 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
('Vegetable Stir-Fry', '{mixed vegetables,tofu,"soy sauce",garlic,ginger}', '1. Stir-fry vegetables. 2. Cook tofu. 3. Make sauce. 4. Combine all.', 25, 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true);
