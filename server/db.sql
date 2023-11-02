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
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.recipes (id, title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) FROM stdin;
1	Spaghetti Carbonara	{Spaghetti,Eggs,Pancetta,"Parmesan Cheese"}	1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all.	30	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
2	Chicken Alfredo	{Fettuccine,Chicken,"Alfredo Sauce",Garlic,"Parmesan Cheese"}	1. Cook chicken. 2. Cook pasta. 3. Make sauce. 4. Combine all.	45	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg	\N	t
3	Vegetable Stir-Fry	{"Mixed Vegetables",Tofu,"Soy Sauce",Garlic,Ginger}	1. Stir-fry vegetables. 2. Cook tofu. 3. Make sauce. 4. Combine all.	25	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
4	Homemade Pizza	{"Pizza Dough","Tomato Sauce","Mozzarella Cheese",Pepperoni}	1. Roll out dough. 2. Spread sauce. 3. Add toppings. 4. Bake.	40	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg	\N	t
5	Beef Tacos	{"Ground Beef","Taco Seasoning",Tortillas,Lettuce,Tomato}	1. Cook beef. 2. Season. 3. Assemble tacos.	30	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
6	Chocolate Chip Cookies	{Flour,Sugar,Butter,"Chocolate Chips"}	1. Mix ingredients. 2. Bake in the oven.	15	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg	\N	t
7	Caesar Salad	{"Romaine Lettuce","Caesar Dressing",Croutons,"Parmesan Cheese"}	1. Toss lettuce with dressing. 2. Add croutons and cheese.	10	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
8	Mushroom Risotto	{"Arborio Rice",Mushrooms,Onion,"White Wine",Broth}	1. Sauté mushrooms and onion. 2. Cook rice with wine and broth.	35	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg	\N	t
9	Grilled Salmon	{"Salmon Fillet",Lemon,Dill,"Olive Oil"}	1. Marinate salmon. 2. Grill until done.	20	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
10	Beef Stroganoff	{"Beef Strips",Onion,Mushrooms,"Sour Cream",Paprika}	1. Sauté beef, onion, and mushrooms. 2. Add sour cream and paprika.	40	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.users (id, first_name, last_name, email, hashed_password) FROM stdin;
1	Cathy	Dao	cathydao@gmail.com	$2b$10$oA4R8CBBJaOpMMFUN4hrke0RWwzWvo/.Q7uYHtmrzw.ww3rxaI/7a
\.


--
-- Name: bookmarked_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.bookmarked_id_seq', 1, false);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.recipes_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: bookmarked bookmarked_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.bookmarked
    ADD CONSTRAINT bookmarked_pkey PRIMARY KEY (id);


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
-- Name: bookmarked bookmarked_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.bookmarked
    ADD CONSTRAINT bookmarked_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON DELETE CASCADE;


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

