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


-- Create the bookmarked table
CREATE TABLE bookmarked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE);

-- Create ingredients Table
CREATE TABLE ingredients (
   id integer NOT NULL,
   name VARCHAR(255) UNIQUE NOT NULL
);



INSERT INTO recipes (id, first_name, last_name, email, hashed_password)
VALUES ('Cat' 'Dao','catdao@gmail.com','$2b$10$oA4R8CBBJaOpMMFUN4hrke0RWwzWvo/.Q7uYHtmrzw.ww3rxaI/7a');

INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe)
VALUES
    ('Spaghetti Carbonara', '{Spaghetti,Eggs,Pancetta,"Parmesan Cheese"}', '1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.', 30, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Chicken Alfredo', '{Fettuccine,Chicken,"Alfredo Sauce",Garlic,"Parmesan Cheese"}', '1. Cook chicken. 2. Cook pasta. 3. Make sauce. 4. Combine all.', 45, 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Vegetable Stir-Fry', '{Mixed Vegetables,Tofu,"Soy Sauce",Garlic,Ginger}', '1. Stir-fry vegetables. 2. Cook tofu. 3. Make sauce. 4. Combine all.', 25, 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Homemade Pizza', '{Pizza Dough,"Tomato Sauce","Mozzarella Cheese",Pepperoni}', '1. Roll out dough. 2. Spread sauce. 3. Add toppings. 4. Bake.', 40, 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Beef Tacos', '{Ground Beef,"Taco Seasoning",Tortillas,Lettuce,Tomato}', '1. Cook beef. 2. Season. 3. Assemble tacos.', 30, 'https://images.pexels.com/photos/7904958/pexels-photo-7904958.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Chocolate Chip Cookies', '{Flour,Sugar,Butter,"Chocolate Chips"}', '1. Mix ingredients. 2. Bake in the oven.', 15, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',NULL, true),
    ('Caesar Salad', '{Romaine Lettuce,"Caesar Dressing",Croutons,"Parmesan Cheese"}', '1. Toss lettuce with dressing. 2. Add croutons and cheese.', 10, 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Mushroom Risotto', '{Arborio Rice,Mushrooms,Onion,"White Wine",Broth}', '1. Sauté mushrooms and onion. 2. Cook rice with wine and broth.', 35, 'https://images.pexels.com/photos/6406460/pexels-photo-6406460.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, true),
    ('Grilled Salmon', '{Salmon Fillet,Lemon,Dill,"Olive Oil"}', '1. Marinate salmon. 2. Grill until done.', 20, 'https://images.pexels.com/photos/11267161/pexels-photo-11267161.jpeg?auto=compress&cs=tinysrgb&w=400',NULL, true),
    ('Beef Stroganoff', '{Beef Strips,Onion,Mushrooms,"Sour Cream",Paprika}', '1. Sauté beef, onion, and mushrooms. 2. Add sour cream and paprika.', 40, 'https://media.istockphoto.com/id/584213904/photo/chicken-with-mushrooms.jpg?b=1&s=612x612&w=0&k=20&c=7VgPetSTNbnvgT-eRm9OXBlssc5GKKxhaWQuYgg4bzA=', NULL, true),
    ('Quinoa Salad', '{"Quinoa","Cherry Tomatoes","Cucumber","Feta Cheese","Olive Oil","Lemon Juice"}', '1. Cook quinoa. 2. Chop vegetables. 3. Mix ingredients with olive oil and lemon juice.', 20, 'https://images.pexels.com/photos/16123122/pexels-photo-16123122/free-photo-of-close-up-of-salad.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),('Lentil Soup', '{"Lentils","Carrots","Onion","Celery","Tomato Paste","Vegetable Broth"}', '1. Sauté vegetables. 2. Add lentils and broth. 3. Simmer until lentils are tender.', 45, 'https://images.pexels.com/photos/6120506/pexels-photo-6120506.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),('Pan-Seared Steak', '{"Ribeye Steak","Salt","Pepper","Garlic","Butter"}', '1. Season steak. 2. Sear on high heat. 3. Finish with garlic and butter.', 25, 'https://images.pexels.com/photos/8694617/pexels-photo-8694617.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),
    ('Cauliflower Tacos', '{"Cauliflower Florets","Taco Seasoning","Corn Tortillas","Avocado","Lime"}', '1. Roast seasoned cauliflower. 2. Warm tortillas. 3. Assemble tacos with avocado and lime.', 30, 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),('Banana Pancakes', '{"Bananas","Eggs","Baking Powder","Flour","Maple Syrup"}', '1. Mash bananas. 2. Mix all ingredients. 3. Cook on griddle.', 20, 'https://images.pexels.com/photos/10311642/pexels-photo-10311642.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),
    ('Chicken Tikka Masala', '{"Chicken Breast","Yogurt","Tomato Sauce","Masala Spice","Rice"}', '1. Marinate chicken. 2. Grill chicken. 3. Simmer in tomato sauce with spices.', 60, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),
    ('Greek Salad', '{"Cucumber","Tomatoes","Red Onion","Feta Cheese","Olives","Olive Oil"}', '1. Chop vegetables. 2. Toss with feta and olives. 3. Dress with olive oil.', 15, 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),
    ('Lemon Garlic Shrimp', '{"Shrimp","Garlic","Butter","Lemon Juice","Parsley"}', '1. Sauté garlic in butter. 2. Add shrimp. 3. Finish with lemon juice and parsley.', 20, 'https://images.pexels.com/photos/3843224/pexels-photo-3843224.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE),
    ('Vegan Chili', '{"Beans","Tomatoes","Onion","Bell Peppers","Chili Powder","Cumin"}', '1. Cook vegetables with spices. 2. Add beans and tomatoes. 3. Simmer.', 50, 'https://images.unsplash.com/photo-1638329389022-daef2efb71b3?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGl8ZW58MHx8MHx8fDA%3D', NULL, TRUE),
    ('Buttermilk Fried Chicken', '{"Chicken Pieces","Buttermilk","Flour","Paprika","Garlic Powder"}', '1. Marinate chicken in buttermilk. 2. Dredge in seasoned flour. 3. Fry until golden.', 60, 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=400', NULL, TRUE);



    INSERT INTO ingredients (name) VALUES (‘Spam’), ('Rice Flour'), ('Wood Ear Mushrooms'), ('Fried Shallots'), ('Bean Sprouts'), ('Kimchi'), ('Gochujang'),('Fish Sauce'),('Oyster Sauce'), ('Sriracha'), ('Beef Shank'), ('Nori'), ('Seaweed'),('Kewpie Mayo'), ('Lemongrass'), ('Shrimp Paste'), ('Chili Oil'), ('Vienna Sausages');

