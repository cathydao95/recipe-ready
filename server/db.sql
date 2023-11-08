--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookmarked; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.bookmarked (
    id integer NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer NOT NULL
);


ALTER TABLE public.bookmarked OWNER TO tpl1122_1;

--
-- Name: bookmarked_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.bookmarked_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookmarked_id_seq OWNER TO tpl1122_1;

--
-- Name: bookmarked_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.bookmarked_id_seq OWNED BY public.bookmarked.id;


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.ingredients OWNER TO tpl1122_1;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO tpl1122_1;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    ingredients text[] NOT NULL,
    instructions text NOT NULL,
    prep_time integer,
    image_url character varying(255) NOT NULL,
    user_id integer,
    public_recipe boolean DEFAULT true
);


ALTER TABLE public.recipes OWNER TO tpl1122_1;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO tpl1122_1;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    hashed_password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO tpl1122_1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl1122_1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bookmarked id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.bookmarked ALTER COLUMN id SET DEFAULT nextval('public.bookmarked_id_seq'::regclass);


--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bookmarked; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.bookmarked (id, user_id, recipe_id) FROM stdin;
16	1	76
22	2	13
23	2	63
24	3	2
25	3	16
28	1	83
32	1	86
33	1	87
34	1	88
35	1	89
36	1	90
39	1	92
40	1	91
41	1	93
42	1	96
58	1	101
64	1	102
65	1	103
66	1	104
67	1	105
68	1	106
69	1	107
72	1	108
74	1	110
77	1	128
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.ingredients (id, name) FROM stdin;
1	Chicken
2	Beef
3	Pork
4	Salmon
5	Tuna
6	Shrimp
7	Lamb
8	Turkey
9	Bacon
10	Sausage
11	Ham
12	Ground beef
13	Cod
14	Tofu
15	Eggs
16	Quail
17	Duck
18	Venison
19	Rabbit
20	Pheasant
21	Elk
22	Kangaroo
23	Buffalo
24	Ostrich
25	Bison
26	Goat
27	Grouse
28	Partridge
29	Wild boar
30	Squab
31	Guinea fowl
32	Alligator
33	Bear
34	Moose
35	Octopus
36	Squid
37	Anchovy
38	Crawfish
39	Clam
40	Crab
41	Lobster
42	Mussels
43	Scallop
44	Snail
45	Geoduck
46	Sea urchin
47	Horse
48	Pangolin
49	Ground chicken
50	Ground pork
51	Ground turkey
52	Apple
53	Banana
54	Orange
55	Strawberry
56	Blueberry
57	Raspberry
58	Blackberry
59	Grapes
60	Watermelon
61	Pineapple
62	Mango
63	Peach
64	Pear
65	Cherry
66	Kiwi
67	Lemon
68	Lime
69	Grapefruit
70	Cantaloupe
71	Potato
72	Carrot
73	Broccoli
74	Spinach
75	Lettuce
76	Cucumber
77	Avocado
78	Mushroom
79	Bell Pepper
80	Zucchini
81	Cabbage
82	Cauliflower
83	Asparagus
84	Eggplant
85	Kale
86	Celery
87	Radish
88	Corn
89	Peas
90	Green Beans
91	Parsley
92	Cilantro
93	Basil
94	Thyme
95	Oregano
96	Rosemary
97	Sage
98	Cumin
99	Coriander
100	Paprika
101	Chili Powder
102	Turmeric
103	Cayenne Pepper
104	Mustard Greens
105	Collard Greens
106	Swiss Chard
107	Bok Choy
108	Arugula
109	Watercress
110	Turnip
111	Rutabaga
112	Beet
113	Okra
114	Brussels Sprouts
115	Artichoke
116	Pumpkin
117	Squash
118	Sweet Potato
119	Radicchio
120	Fennel
121	Garlic
122	Ginger
123	Tomato
124	Pepper
125	Onion
126	Tomatoes
127	Beans
128	Artichoke hearts
129	Water chestnuts
130	Bamboo shoots
131	Olives
132	Pickles
133	Sauerkraut
134	Applesauce
135	Fruit cocktail
136	Cranberry sauce
137	Mandarin oranges
138	Guava
139	Papaya
140	Passion fruit
141	Lychee
142	Jackfruit
143	Coconut milk
144	Condensed milk
145	Evaporated milk
146	Cream of mushroom soup
147	Cream of chicken soup
148	Cream of celery soup
149	Cream of tomato soup
150	Clam chowder
151	Chicken broth
152	Beef broth
153	Vegetable broth
154	Sardines
155	Salt
156	 Black Pepper
157	Cinnamon
158	Nutmeg
159	Chili powder
160	Cayenne pepper
161	Garlic powder
162	Onion powder
163	Mustard
164	Ketchup
165	Mayonnaise
166	Mustard sauce
167	Soy sauce
168	Worcestershire sauce
169	Hot sauce
170	Barbecue sauce
171	Sriracha sauce
172	Teriyaki sauce
173	Honey
174	Vinegar
175	Olive oil
176	Coconut oil
177	Sesame oil
178	Peanut butter
179	Jam or jelly
180	Relish
181	Hoisin sauce
182	Fish sauce
183	Tahini
184	Salsa
185	Sour cream
186	Ranch dressing
187	Thousand Island dressing
189	Italian dressing
190	Flour
191	Sugar
192	Brown sugar
193	Baking powder
194	Baking soda
195	Cocoa powder
196	Chocolate chips
197	Vanilla extract
198	Milk
199	Butter
200	Yeast
201	Shortening
202	Cornstarch
203	Cream of tartar
204	Maple syrup
205	Molasses
206	Corn syrup
207	Powdered sugar
208	Almond extract
209	Cake flour
210	Pastry flour
211	Whole wheat flour
212	Bread flour
213	Confectioners sugar
214	Sweetened condensed milk
215	Heavy cream
216	Cream
217	Yogurt
218	Cheese
219	Whipped cream
220	Half-and-half
221	Buttermilk
222	Cottage cheese
223	Cream cheese
224	Ricotta cheese
225	Mozzarella cheese
226	Cheddar cheese
227	Parmesan cheese
228	Feta cheese
229	Swiss cheese
230	Gouda cheese
231	Provolone cheese
232	American cheese
233	Milk powder
234	Goat cheese
235	Blue cheese
236	Almond milk
237	Soy milk
238	Oat milk
239	Cashew milk
240	Rice milk
241	Hemp milk
242	Macadamia milk
243	Hazelnut milk
244	Flax milk
245	Pea milk
246	Sunflower milk
247	Nutritional yeast
248	Coconut cream
249	Coconut yogurt
250	Cashew cream
251	Rice
252	Brown Rice
253	White Rice
254	Wheat
255	Oats
256	Barley
257	Rye
258	Quinoa
259	Buckwheat
260	Millet
261	Sorghum
262	Amaranth
263	Farro
264	Spelt
265	Teff
266	Kamut
267	Wild rice
268	Couscous
269	Polenta
270	Freekeh
271	Bulgur
272	Pearl barley
273	Emmer
274	Einkorn
275	Triticale
276	Teff flour
277	Masa harina
278	Graham flour
279	Semolina
280	Vegetable Oil
284	Canola Oil
285	Peanut Oil
286	Sunflower Oil
287	Sesame Oil
288	Grapeseed Oil
289	Coconut Oil
290	Avocado Oil
291	Corn Oil
292	Walnut Oil
293	Flaxseed Oil
294	Almond Oil
295	Ranch Dressing
296	Italian Dressing
297	Caesar Dressing
298	Balsamic Vinaigrette
299	Blue Cheese Dressing
300	French Dressing
301	Thousand Island Dressing
302	Honey Mustard Dressing
303	Greek Dressing
304	Raspberry Vinaigrette
305	Poppy Seed Dressing
306	Sesame Ginger Dressing
308	Lemon Tahini Dressing
311	Asian Sesame Dressing
312	Red Wine Vinaigrette
313	White Wine Vinaigrette
314	Cilantro Lime Dressing
315	Avocado Dressing
316	Dijon Mustard Dressing
317	Garlic Parmesan Dressing
318	Chipotle Dressing
319	Creamy Tahini Dressing
320	Mango Vinaigrette
321	Almonds
322	Cashews
323	Peanuts
324	Walnuts
325	Pecans
326	Hazelnuts
327	Brazil Nuts
328	Macadamia Nuts
329	Pistachios
330	Sunflower Seeds
331	Pumpkin Seeds
332	Chia Seeds
333	Flaxseeds
334	Sesame Seeds
335	Hemp Seeds
336	Poppy Seeds
337	Pine Nuts
338	Chestnuts
283	Olive Oil
344	Coconut Cream
339	Shredded Coconut
345	Coconut Milk
348	Soy Nuts
349	Pine Nut Kernels
350	Watermelon Seeds
351	Black Sesame Seeds
352	White Sesame Seeds
355	Cacao Nibs
356	Popcorn Kernels
357	Chestnut Flour
358	Ground Flaxseeds
359	Ground Chia Seeds
360	Sunflower Seed Butter
361	Peanut Butter
362	Almond Butter
363	Cashew Butter
364	Hazelnut Butter
365	Pistachio Butter
366	Coconut Butter
367	Sesame Seed Butter
368	Fish
369	Tortillas
370	Rice Flour
371	Spam
372	Wood Ear Mushrooms
373	Fried Shallots
374	Bean Sprouts
375	Kimchi
376	Gochujang
379	Sriracha
381	Nori
382	Seaweed
383	Kewpie Mayo
384	Lemongrass
385	Shrimp Paste
386	Chili Oil
387	Vienna Sausages
380	Beef shank
378	Oyster sauce
346	Coconut Water
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.recipes (id, title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) FROM stdin;
1	Spaghetti Carbonara	{spaghetti,eggs,pancetta,"parmesan cheese"}	1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.	30	https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
2	Chicken Alfredo	{pasta,chicken,butter,garlic,"parmesan cheese"}	1. Cook chicken. 2. Cook pasta. 3. Make sauce. 4. Combine all.	45	https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
3	Vegetable Stir-Fry	{"mixed vegetables",tofu,"soy sauce",garlic,ginger}	1. Stir-fry vegetables. 2. Cook tofu. 3. Make sauce. 4. Combine all.	25	https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
4	Homemade Pizza	{flour,"tomato sauce","mozzarella cheese",pepperoni}	1. Roll out dough. 2. Spread sauce. 3. Add toppings. 4. Bake.	40	https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
5	Beef Tacos	{beef,"taco seasoning",tortillas,lettuce,tomato}	1. Cook beef. 2. Season. 3. Assemble tacos.	30	https://images.pexels.com/photos/7904958/pexels-photo-7904958.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
6	Chocolate Chip Cookies	{flour,sugar,butter,"chocolate chips"}	1. Mix ingredients. 2. Bake in the oven.	15	https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
7	Caesar Salad	{lettuce,"caesar dressing",croutons,"parmesan cheese"}	1. Toss lettuce with dressing. 2. Add croutons and cheese.	10	https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
8	Mushroom Risotto	{rice,mushrooms,onion,"white wine","”chicken broth”"}	1. Sauté mushrooms and onion. 2. Cook rice with wine and broth.	35	https://images.pexels.com/photos/6406460/pexels-photo-6406460.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
9	Grilled Salmon	{salmon,lemon,dill,"olive oil"}	1. Marinate salmon. 2. Grill until done.	20	https://images.pexels.com/photos/11267161/pexels-photo-11267161.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
10	Beef Stroganoff	{beef,onion,mushrooms,"sour cream",paprika}	1. Sauté beef, onion, and mushrooms. 2. Add sour cream and paprika.	40	https://media.istockphoto.com/id/584213904/photo/chicken-with-mushrooms.jpg?b=1&s=612x612&w=0&k=20&c=7VgPetSTNbnvgT-eRm9OXBlssc5GKKxhaWQuYgg4bzA=	\N	t
11	Quinoa Salad	{quinoa,tomatoes,cucumber,cheese,"olive oil",lemon}	1. Cook quinoa. 2. Chop vegetables. 3. Mix ingredients with olive oil and lemon.	20	https://images.pexels.com/photos/16123122/pexels-photo-16123122/free-photo-of-close-up-of-salad.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
12	Lentil Soup	{lentils,carrots,onion,celery,"tomato paste","vegetable broth"}	1. Sauté vegetables. 2. Add lentils and broth. 3. Simmer until lentils are tender.	45	https://images.pexels.com/photos/6120506/pexels-photo-6120506.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
13	Pan-Seared Steak	{steak,garlic,butter}	1. Season steak. 2. Sear on high heat. 3. Finish with garlic and butter.	25	https://images.pexels.com/photos/8694617/pexels-photo-8694617.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
14	Cauliflower Tacos	{cauliflower,tortillas,avocado,lime}	1. Roast seasoned cauliflower. 2. Warm tortillas. 3. Assemble tacos with avocado and lime.	30	https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
15	Banana Pancakes	{bananas,eggs,"baking powder",flour,"maple syrup"}	1. Mash bananas. 2. Mix all ingredients. 3. Cook on griddle.	20	https://images.pexels.com/photos/10311642/pexels-photo-10311642.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
16	Chicken Tikka Masala	{chicken,yogurt,"tomato sauce","masala spice",rice}	1. Marinate chicken. 2. Grill chicken. 3. Simmer in tomato sauce with spices.	60	https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
17	Greek Salad	{cucumber,tomatoes,onion,"feta cheese",olives,"olive oil"}	1. Chop vegetables. 2. Toss with feta and olives. 3. Dress with olive oil.	15	https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
18	Lemon Garlic Shrimp	{shrimp,garlic,butter,lemon,parsley}	1. Sauté garlic in butter. 2. Add shrimp. 3. Finish with lemon and parsley.	20	https://images.pexels.com/photos/3843224/pexels-photo-3843224.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
19	Vegan Chili	{beans,tomatoes,onion,"chili powder",cumin}	1. Cook vegetables with spices. 2. Add beans and tomatoes. 3. Simmer.	50	https://images.unsplash.com/photo-1638329389022-daef2efb71b3?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGl8ZW58MHx8MHx8fDA%3D	\N	t
20	Fried Chicken	{chicken,milk,flour,paprika,"garlic powder"}	1. Marinate chicken in milk. 2. Dredge in seasoned flour. 3. Fry until golden.	60	https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=400	\N	t
21	Beef Stir-Fry	{beef,broccoli,"soy sauce",garlic,onions}	1. Sauté garlic and onions. 2. Add beef and broccoli. 3. Stir in soy sauce.	30	https://images.pexels.com/photos/5836623/pexels-photo-5836623.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
22	Chicken Parmesan	{chicken,"tomato sauce",cheese,basil,garlic}	1. Bread chicken. 2. Fry until golden. 3. Top with sauce and cheese and bake.	45	https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHBhcm18ZW58MHx8MHx8fDA%3D	\N	t
23	Roast Duck	{duck,potatoes,carrots,rosemary,garlic}	1. Season duck. 2. Surround with vegetables. 3. Roast until crispy.	120	https://images.pexels.com/photos/18852572/pexels-photo-18852572/free-photo-of-fried-pieces-of-meat-on-white-plate.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
24	Pork Tacos	{pork,cumin,"chili powder",tortillas,avocado}	1. Cook pork with spices. 2. Serve on tortillas with avocado.	20	https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
25	Turkey Salad	{turkey,"mixed greens",apples,walnuts,yogurt}	1. Slice turkey. 2. Toss with greens, apples, and walnuts. 3. Dress with yogurt.	15	https://images.unsplash.com/photo-1656002609059-29bd82325682?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHR1cmtleSUyMHNhbGFkfGVufDB8fDB8fHww	\N	t
26	Crab Cakes	{crab,breadcrumbs,eggs,lemon,garlic}	1. Mix crab with other ingredients. 2. Form patties. 3. Fry until golden.	30	https://images.unsplash.com/photo-1606525252458-4013f7b4cd05?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhYiUyMGNha2V8ZW58MHx8MHx8fDA%3D	\N	t
27	Prawn Curry	{prawns,"coconut milk","curry powder",tomatoes,garlic}	1. Sauté garlic and tomatoes. 2. Add prawns and coconut milk. 3. Simmer with curry.	30	https://images.pexels.com/photos/9809033/pexels-photo-9809033.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
28	Scallop Pasta	{scallops,pasta,garlic,"chili powder","olive oil"}	1. Sear scallops. 2. Cook pasta. 3. Toss together with garlic and oil.	25	https://images.pexels.com/photos/11100906/pexels-photo-11100906.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
29	Lobster Bisque	{lobster,cream,"tomato paste",carrots,cayenne}	1. Cook lobster. 2. Sauté vegetables. 3. Blend with cream.	60	https://images.pexels.com/photos/7218638/pexels-photo-7218638.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
30	Grilled Salmon with Asparagus	{salmon,asparagus,lemon,butter,dill}	1. Season salmon. 2. Grill with asparagus. 3. Serve with lemon butter sauce.	20	https://images.unsplash.com/photo-1526471160464-18556e5e7d5f?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbG1vbiUyMGFzcGFyZ3VzfGVufDB8fDB8fHww	\N	t
31	Tuna Casserole	{tuna,pasta,milk,cheese,peas}	1. Mix tuna with pasta and peas. 2. Pour over milk. 3. Top with cheese and bake.	40	https://images.unsplash.com/photo-1586032340622-a86b847e8bdb?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxM\njA3fDB8MHxzZWFyY2h8MTB8fGNhc3Nlcm9sZXxlbnwwfHwwfHx8MA%3D%3D	\N	t
32	Tomato and Basil Bruschetta	{tomatoes,basil,garlic,"olive oil","balsamic vinegar"}	1. Chop tomatoes and basil. 2. Mix with garlic, oil, and vinegar. 3. Serve on toasted bread.	15	https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D	\N	t
33	Cheesy Broccoli Casserole	{broccoli,cheese,milk,flour,garlic}	1. Blanche broccoli. 2. Make cheese sauce with milk, flour, and garlic. 3. Bake.	30	https://media.istockphoto.com/id/952767700/photo/homemadede-pasta-bake-with-ham.jpg?b=1&s=612x612&w=0&k=20&c=yZ0fBqoSDLVPKkqj7d3o5B1Ns3lgc7xw2KuJ_hWn0k8=	\N	t
34	Avocado Toast	{avocado,bread,lemon,cayenne,tomatoes}	1. Mash avocado with lemon and cayenne. 2. Spread on toast. 3. Top with tomatoes.	10	https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
35	Banana Bread	{bananas,flour,sugar,"baking soda",eggs}	1. Mash bananas. 2. Mix with dry and wet ingredients. 3. Bake until done.	60	https://images.pexels.com/photos/1277202/pexels-photo-1277202.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
36	Vegetable Stir-Fry with Tofu	{tofu,"soy sauce",broccoli,carrots,rice}	1. Sauté tofu until golden. 2. Add vegetables and sauce. 3. Serve over rice.	25	https://images.pexels.com/photos/5848483/pexels-photo-5848483.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
37	Strawberry Cheesecake	{strawberries,"cream cheese",sugar,"graham cracker crust","vanilla extract"}	1. Mix cream cheese with sugar and vanilla. 2. Pour into crust. 3. Top with strawberries.	180	https://images.pexels.com/photos/17324803/pexels-photo-17324803/free-photo-of-a-slice-of-cheesecake-with-strawberries-on-top.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
38	Cherry Pie	{cherries,sugar,flour,butter,"vanilla extract"}	1. Make cherry filling. 2. Prepare pie crust. 3. Bake until crust is golden.	90	https://images.pexels.com/photos/6163264/pexels-photo-6163264.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
39	Garlic and Herb Roasted Potatoes	{potatoes,garlic,rosemary,"olive oil",parsley}	1. Dice potatoes. 2. Toss with garlic, herbs, and oil. 3. Roast until crispy.	60	https://images.pexels.com/photos/8250190/pexels-photo-8250190.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
40	Creamy Tomato Soup	{"tomato sauce",cream,basil,onions,garlic}	1. Sauté onions and garlic. 2. Add tomato sauce and cream. 3. Simmer with basil.	30	https://images.pexels.com/photos/17302314/pexels-photo-17302314/free-photo-of-a-creamy-tomato-soup.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
41	Szechuan Beef Stir-Fry	{beef,garlic,"soy sauce",onions,"chili powder"}	1. Stir-fry beef with garlic and onions. 2. Add soy sauce and chili. 3. Serve hot.	20	https://tipbuzz.com/wp-content/uploads/Kung-Pao-Beef-1.jpg	\N	t
42	Teriyaki Salmon Bowl	{salmon,"soy sauce",sugar,rice,broccoli}	1. Glaze salmon with teriyaki. 2. Serve over rice with steamed broccoli.	30	https://images.unsplash.com/photo-1684815595429-cf46bff6294f?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVyaXlha2klMjBzYW1vbnxlbnwwfHwwfHx8MA%3D%3D	\N	t
43	Thai Crab Curry	{crab,"coconut milk","chili powder",lime,garlic}	1. Cook crab in curry paste. 2. Add coconut milk and simmer. 3. Finish with lime.	40	https://images.unsplash.com/photo-1518710339019-eee82fe8d97f?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNyYWIlMjBjdXJyeXxlbnwwfHwwfHx8MA%3D%3D	\N	t
44	Pork Banh Mi	{pork,carrots,cucumbers,"soy sauce",sugar}	1. Marinate pork and grill. 2. Pickle veggies. 3. Assemble sandwiches.	25	https://images.pexels.com/photos/1483769/pexels-photo-1483769.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
45	Korean Bulgogi	{beef,"soy sauce",sugar,garlic,onions}	1. Marinate beef bulgogi style. 2. Grill or pan-fry. 3. Serve with kimchi.	35	https://images.pexels.com/photos/5774004/pexels-photo-5774004.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
46	Prawn Tempura	{prawns,flour,"baking powder",garlic,"soy sauce"}	1. Batter prawns and deep-fry. 2. Serve with dipping sauce.	20	https://images.pexels.com/photos/8953713/pexels-photo-8953713.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
47	Vegetable Spring Rolls	{carrots,cabbage,"rice paper","soy sauce",garlic}	1. Wrap vegetables in rice paper. 2. Fry until golden. 3. Serve with dip.	30	https://images.pexels.com/photos/6832047/pexels-photo-6832047.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
48	Chicken Pad Thai	{chicken,rice,eggs,"fish sauce",lime}	1. Stir-fry chicken and noodles. 2. Add sauce and eggs. 3. Toss with lime.	25	https://images.pexels.com/photos/11292523/pexels-photo-11292523.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
49	Beef Pho	{beef,rice,onions,cinnamon,"fish sauce"}	1. Simmer broth with spices. 2. Cook noodles and beef. 3. Assemble with herbs.	120	https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
50	Miso Glazed Eggplant	{eggplant,"soy sauce",sugar,garlic,ginger}	1. Glaze eggplant with miso. 2. Bake until tender. 3. Garnish with sesame.	45	https://images.pexels.com/photos/18330983/pexels-photo-18330983/free-photo-of-roasted-eggplant-and-lettuce.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
51	Sticky Rice Mango	{rice,"coconut milk",sugar,mangoes,"sesame seeds"}	1. Cook rice with coconut. 2. Serve with mango slices. 3. Sprinkle sesame seeds.	50	https://images.pexels.com/photos/12561882/pexels-photo-12561882.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
52	Duck Ramen	{duck,rice,garlic,"soy sauce","green onions"}	1. Prepare broth. 2. Cook noodles and duck. 3. Assemble with toppings.	60	https://images.pexels.com/photos/698549/pexels-photo-698549.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
53	Kimchi Fried Rice	{rice,eggs,kimchi,"soy sauce","sesame oil"}	1. Fry rice with kimchi and sauce. 2. Top with fried egg.	15	https://images.pexels.com/photos/8477639/pexels-photo-8477639.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
54	Shrimp Laksa	{prawns,"coconut milk","chili powder",rice,garlic}	1. Cook prawns in laksa paste. 2. Add coconut milk and noodles. 3. Simmer and serve.	35	https://images.pexels.com/photos/9772442/pexels-photo-9772442.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
55	Pork Gyoza	{pork,cabbage,ginger,"soy sauce","dumpling wrappers"}	1. Fill wrappers with pork mix. 2. Pan-fry until crisp. 3. Serve with dip.	30	https://images.pexels.com/photos/13055484/pexels-photo-13055484.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
56	Asian Chicken Salad	{chicken,cabbage,carrots,"soy sauce","sesame oil"}	1. Toss chicken with veggies. 2. Dress with soy and sesame. 3. Serve chilled.	15	https://images.pexels.com/photos/5292920/pexels-photo-5292920.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
57	Sesame Noodles	{pasta,"soy sauce","sesame oil",sugar,"green onions"}	1. Cook noodles. 2. Toss with sauce and onions. 3. Sprinkle with sesame seeds.	15	https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
58	Crispy Tofu with Veggies	{tofu,broccoli,carrots,"soy sauce",garlic}	1. Fry tofu until crispy. 2. Stir-fry with vegetables. 3. Glaze with soy sauce.	25	https://images.pexels.com/photos/6655415/pexels-photo-6655415.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
59	Beef and Asparagus	{beef,asparagus,"soy sauce",garlic,"sesame seeds"}	1. Stir-fry beef and asparagus. 2. Season with garlic and soy. 3. Garnish with sesame.	20	https://images.pexels.com/photos/7226383/pexels-photo-7226383.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
60	Chili Garlic Noodles	{pasta,"chili powder",garlic,"soy sauce","green onions"}	1. Cook pasta. 2. Sauté with garlic and chili. 3. Mix in green onions.	20	https://images.pexels.com/photos/5735836/pexels-photo-5735836.png?auto=compress&cs=tinysrgb&w=600	\N	t
61	Sweet and Sour Pork	{pork,pineapple,vinegar,"tomato sauce",sugar}	1. Fry pork until golden. 2. Add pineapple and sauce. 3. Serve with rice.	30	https://images.pexels.com/photos/7949919/pexels-photo-7949919.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
62	Beef Lo Mein	{beef,pasta,"soy sauce",garlic,cabbage}	1. Cook beef with vegetables. 2. Add pasta and sauce. 3. Toss until combined.	20	https://images.pexels.com/photos/15024300/pexels-photo-15024300/free-photo-of-chow-mein-noodles-with-vegetables-and-meat.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
63	Spicy Tuna Roll	{tuna,rice,"sesame seeds","soy sauce",wasabi}	1. Prepare sushi rice. 2. Roll tuna with rice. 3. Serve with wasabi and soy.	30	https://images.pexels.com/photos/7248704/pexels-photo-7248704.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
64	Cashew Chicken	{chicken,cashews,"soy sauce",garlic,broccoli}	1. Fry chicken with nuts. 2. Add broccoli and sauce. 3. Serve hot.	20	https://images.pexels.com/photos/3763792/pexels-photo-3763792.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
65	Margherita Pizza	{"tomato sauce",mozzarella,basil,flour,"olive oil"}	1. Spread sauce on dough. 2. Top with cheese and basil. 3. Bake until crust is golden.	30	https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww	\N	t
66	Fish Tacos	{fish,cabbage,lime,tortillas,avocado}	1. Grill fish with lime. 2. Assemble in tortillas with toppings.	20	https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaCUyMHRhY29zfGVufDB8fDB8fHww	\N	t
67	Classic Burger	{beef,lettuce,tomato,buns,cheese}	1. Grill beef patties. 2. Build burgers with toppings.	15	https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D	\N	t
68	Grilled Cheese Sandwich	{bread,cheese,butter,"tomato soup"}	1. Grill cheese between buttered bread. 2. Serve with tomato soup.	10	https://images.unsplash.com/photo-1617993739891-d2714da04511?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyaWxsZWQlMjBjaGVlc2V8ZW58MHx8MHx8fDA%3D	\N	t
69	Shepherd’s Pie	{"ground lamb",potatoes,carrots,peas,onion}	1. Layer cooked lamb with vegetables. 2. Top with mashed potatoes and bake.	60	https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
70	French Onion Soup	{onions,"beef broth",thyme,bread,cheese}	1. Caramelize onions. 2. Add broth and thyme. 3. Top with bread and cheese, then broil.	45	https://images.pexels.com/photos/5038909/pexels-photo-5038909.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
71	Mac and Cheese	{pasta,cheese,milk,butter,flour}	1. Make cheese sauce. 2. Combine with cooked pasta and bake.	35	https://images.pexels.com/photos/15483262/pexels-photo-15483262/free-photo-of-photo-of-mac-and-cheese-on-a-plate.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
72	Chicken Caesar Wrap	{chicken,lettuce,parmesan,tortilla,"caesar dressing"}	1. Toss chicken with lettuce and dressing. 2. Wrap in tortilla.	15	https://images.pexels.com/photos/9624298/pexels-photo-9624298.jpeg?auto=compress&cs=tinysrgb&w=600	\N	t
82	Ellie's Test Recipe	{asd,asd,asd}	1. asdasd. 2. asudhasd asasdasd . 3. asdasdasd 	45	https://res.cloudinary.com/dnu4wptmg/image/upload/v1699122449/recipe-image/salmonbowl_fdmlcd.jpg	2	f
111	Seafood Paella	{rice,shrimp,mussels,"chicken broth",saffron}	1. Cook seafood. 2. Add rice and broth. 3. Simmer until done.	55	https://images.pexels.com/photos/16743486/pexels-photo-16743486/free-photo-of-seafood-paella-with-lobster.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	\N	t
112	Tom Yum Soup	{shrimp,lemongrass,"lime leaves",chilis,mushrooms}	1. Boil broth with lemongrass. 2. Add shrimp and mushrooms. 3. Season with lime.	30	https://images.pexels.com/photos/10201775/pexels-photo-10201775.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
113	Shakshuka	{tomatoes,eggs,onions,"bell peppers",cumin}	1. Sauté veggies. 2. Pour in tomatoes. 3. Crack eggs into sauce and cook.	25	https://images.pexels.com/photos/3648979/pexels-photo-3648979.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
114	Falafel Wrap	{chickpeas,garlic,parsley,tahini,flatbread}	1. Make falafel mix and fry. 2. Spread tahini on bread. 3. Add falafels and wrap.	50	https://images.pexels.com/photos/15378370/pexels-photo-15378370/free-photo-of-falafel-salad-on-tortilla.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
115	Quinoa Salad	{quinoa,cucumbers,tomatoes,feta,"lemon juice"}	1. Cook quinoa. 2. Chop veggies and mix. 3. Combine with dressing.	20	https://images.pexels.com/photos/16123122/pexels-photo-16123122/free-photo-of-close-up-of-salad.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
116	Banh Xeo	{"rice flour","turmeric powder","coconut milk",pork,shrimp,"bean sprouts"}	1. Mix flour, turmeric, and coconut milk for batter. 2. Pour batter into hot skillet. 3. Add pork, shrimp, and bean sprouts. 4. Fold and serve with herbs.	30	https://media.gettyimages.com/id/657980786/photo/xeo-cake-with-vegetables-and-fish-sauce-vietnamese-crepe-vietnamese-crispy-pancake-vietnamese.jpg?s=612x612&w=0&k=20&c=faMSbEfIYYTzqprZp5TUllR3Dd2yZPwmUYsVCX7wNkg=	\N	t
117	Banh Cuon	{"rice flour",water,"ground pork","wood ear mushrooms","fried shallots"}	1. Steam rice batter to make sheets. 2. Cook pork and mushrooms. 3. Fill sheets with mixture, roll up. 4. Top with shallots and serve.	45	https://media.gettyimages.com/id/1186412198/photo/b%C3%A1nh-cu%E1%BB%91n-or-fresh-spring-rolls.jpg?s=612x612&w=0&k=20&c=vkJZpxCyBbfYqdMUYh91NHs9aqyx9cvFe6ktYTw3wWI=	\N	t
118	Soondubu Jjigae	{"soft tofu",kimchi,"seafood or pork",gochujang,"sesame oil","green onions"}	1. Sauté kimchi and protein in sesame oil. 2. Add gochujang and water, bring to boil. 3. Add tofu and simmer. 4. Garnish with green onions.	25	https://media.gettyimages.com/id/498160815/photo/sundubu-jjigae.jpg?s=612x612&w=0&k=20&c=4nosqkieYEwHkE3-iPVlNv5GWlMXTQYz0y3hbpqov3w=	\N	t
120	Loco Moco	{"ground beef",eggs,rice,"beef broth",onions,butter}	1. Form beef into patties and fry. 2. Cook rice. 3. Fry eggs. 4. Make gravy with broth and onions. 5. Assemble and serve.	30	https://media.istockphoto.com/id/1179654431/photo/homemade-hawaiian-loco-moco.jpg?b=1&s=612x612&w=0&k=20&c=QPgYQZQaxIjFowU22pIL_65o9nu5sU6QA7cAfu0xTMs=	\N	t
121	Bun Bo Hue	{"beef shank",oxtail,lemongrass,"rice noodles","shrimp paste","chili oil"}	1. Simmer beef and oxtail with lemongrass. 2. Cook noodles. 3. Strain broth, add shrimp paste and chili oil. 4. Serve noodles with sliced beef and pour broth over.	120	https://media.gettyimages.com/id/566047011/photo/bun-hue-is-hues-style-vermicelli-soup-at-the-vietnamese-vegetarian-restaurant-bo-de-tinh-tam.jpg?s=612x612&w=0&k=20&c=iy9AzawY8pV5wm42h7xGJERoojZBGaX2VnLsoMvAdRM=	\N	t
119	Spam Musubi	{Spam,rice,nori,"soy sauce",sugar,"rice vinegar"}	1. Slice and fry Spam. 2. Mix soy sauce and sugar, glaze Spam. 3. Press rice into musubi press. 4. Place Spam on rice, wrap with nori.	20	https://media.gettyimages.com/id/689904266/photo/spam-musubi.jpg?s=612x612&w=0&k=20&c=-AmiY0KHxglNTk3AfY-8eFOPuD2hWh2G1DUfRooZwsE=	\N	t
122	Basic Omelette	{eggs,milk,salt,pepper,butter,"cheese (optional)","ham (optional)","bell peppers (optional)"}	1. Beat eggs with milk, salt, and pepper. 2. Melt butter in a pan. 3. Cook eggs until set. 4. Add cheese and fillings if desired, fold omelette.	10	https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
123	Grilled Cheese Sandwich	{bread,cheese,butter}	1. Butter bread slices. 2. Place cheese between bread. 3. Grill on pan until golden brown on both sides.	10	https://images.pexels.com/photos/14941252/pexels-photo-14941252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	\N	t
124	Tomato Pasta	{pasta,"tomato sauce",salt,"olive oil"}	1. Cook pasta in salted water. 2. Heat tomato sauce. 3. Drain pasta, mix with sauce. 4. Drizzle with olive oil and garnish with basil.	15	https://images.pexels.com/photos/18411462/pexels-photo-18411462/free-photo-of-spaghetti-with-tomato-sauce-sprinkled-with-parmesan-and-topped-with-a-basil-leaves.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
125	Garden Salad	{lettuce,cucumber,tomatoes,carrots,"salad dressing"}	1. Chop lettuce, cucumber, tomatoes, and carrots. 2. Toss vegetables in a bowl. 3. Drizzle with salad dressing.	10	https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
126	Chicken Fried Rice	{rice,chicken,"soy sauce",peas,carrots,eggs,onion,garlic}	1. Cook rice. 2. Sauté chicken, veggies, and garlic. 3. Add rice, soy sauce, and scrambled eggs.	30	https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
127	Broccoli and Chicken Stir-Fry	{chicken,broccoli,"soy sauce"}	1. Sauté garlic and chicken. 2. Add broccoli and stir-fry. 3. Pour soy sauce and cook until done.	20	https://images.pexels.com/photos/262973/pexels-photo-262973.jpeg?auto=compress&cs=tinysrgb&w=300	\N	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.users (id, first_name, last_name, email, hashed_password) FROM stdin;
2	Ellie	Meadows	elliemeadows@gmail.com	$2b$10$Mtd1Rdd0f3gJOpuzXNUzyeLHqED/gn2wwNOG97HTO/JUGuxxtDMFm
3	Test	Account	test@gmail.com	$2b$10$Nfne1J9UlFYaVxj8BC/ieuqe2Pai9uFoaV1.GM9O5c2mitU2PiMU6
4	test	account	testaccount@gmail.com	$2b$10$gbMShC5eDOTlc9.PxpSPm.RfZIgGnyPE/ug3tq5Fc5XS8fK1c/cFu
5	new	account	newaccount@gmail.com	$2b$10$SQfyXalhF2YzjT9UM5QLju1bL/5DRg.anAlPNsvf4J1B5M8vQ2cIK
1	Cat	Dao	cathydao@gmail.com	$2b$10$oA4R8CBBJaOpMMFUN4hrke0RWwzWvo/.Q7uYHtmrzw.ww3rxaI/7a
\.


--
-- Name: bookmarked_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.bookmarked_id_seq', 77, true);


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 387, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.recipes_id_seq', 128, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: bookmarked bookmarked_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.bookmarked
    ADD CONSTRAINT bookmarked_pkey PRIMARY KEY (id);


--
-- Name: ingredients ingredients_name_key; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_name_key UNIQUE (name);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bookmarked bookmarked_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.bookmarked
    ADD CONSTRAINT bookmarked_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

