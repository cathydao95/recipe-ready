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
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.recipes (id, title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) FROM stdin;
1	Mock Recipe 1	{beef,tomatoes,onions,garlic,pasta}	1. Cook beef. 2. Sauté tomatoes, onions, and garlic. 3. Cook pasta. 4. Combine all ingredients.	30	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
2	Mock Recipe 2	{chicken,potatoes,carrots,paprika}	1. Cook chicken. 2. Roast potatoes and carrots with paprika. 3. Combine all ingredients.	45	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg	\N	t
3	Mock Recipe 3	{salmon,asparagus,lemon,butter}	1. Grill salmon with asparagus. 2. Add lemon and butter. 3. Serve.	25	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
4	Mock Recipe 4	{pork,apples,cinnamon,onions}	1. Cook pork with apples and onions. 2. Add cinnamon for flavor. 3. Serve.	40	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg	\N	t
5	Mock Recipe 5	{pasta,cheese,milk,butter}	1. Cook pasta. 2. Make a cheese sauce with milk and butter. 3. Combine with pasta.	30	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
6	Mock Recipe 6	{shrimp,garlic,pasta,"olive oil"}	1. Sauté shrimp with garlic. 2. Cook pasta. 3. Drizzle with olive oil.	15	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150031/recipe-image/tmp-2-1675150030821_frx22v.jpg	\N	t
7	Mock Recipe 7	{turkey,cranberries,stuffing,gravy}	1. Roast turkey. 2. Make stuffing. 3. Serve with cranberries and gravy.	10	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
8	Mock Recipe 8	{beef,tortillas,salsa,lettuce,cheese}	1. Cook beef. 2. Assemble tacos with tortillas, salsa, lettuce, and cheese.	35	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150175/recipe-image/tmp-4-1675150173932_kru0nm.jpg	\N	t
9	Mock Recipe 9	{chicken,rice,"soy sauce",broccoli}	1. Cook chicken. 2. Cook rice. 3. Add soy sauce and broccoli. 4. Combine all ingredients.	20	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	\N	t
10	Mock Recipe 10	{salmon,dill,lemon,couscous}	1. Grill salmon with dill and lemon. 2. Serve with couscous.	40	http://res.cloudinary.com/dnu4wptmg/image/upload/v1675150168/recipe-image/tmp-3-1675150167278_rtbur4.jpg	\N	t
11	TEST FOR CATHY	{"Chicken Breast","Mixed Greens",Tomatoes,Cucumbers,"Balsamic Vinaigrette"}	1. Grill chicken until fully cooked. 2. Slice chicken into strips. 3. Toss mixed greens, tomatoes, and cucumbers. 4. Top with grilled chicken. 5. Drizzle with balsamic vinaigrette.	25	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	6	f
25	test2	{xc}	xc	4	https://res.cloudinary.com/dnu4wptmg/image/upload/v1698385398/recipe-image/hand-drawn-healthy-food-landing-page_23-2149080874_xlebmb.jpg	1	f
24	beef burger	{asdasd,asd}	1. Grill chicken until fully cooked. 2. Slice chicken into strips. 3. Toss mixed greens, tomatoes, and cucumbers. 4. Top with grilled chicken. 5. Drizzle with balsamic vinaigrette.	25	https://res.cloudinary.com/dnu4wptmg/image/upload/v1675149363/recipe-image/tmp-1-1675149361908_imoboq.jpg	1	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.users (id, first_name, last_name, email, hashed_password) FROM stdin;
1	cathy	dao	cathydao@gmail.com	$2b$10$A3PixT0sCjQj8b6f2WY.8u9fkiywg3AjEqx1C4dkFaiGleqAgNsay
2	ellie	meadows	elliemeadows@gmail.com	$2b$10$Dmt5MTEOK7mXRSPSNxrobuerDlXHsOpjwyx45TG3aO51rj/n2K/Na
3	bryan	dao	bryandao@gmail.com	$2b$10$5Idy3XMDU7RLIIteDeGRXe8daVD4card3jTPQTjew1a2fqRj4Q42y
4	patrick	dao	patrickdao@gmail.com	$2b$10$xJlscue7TTGG9PEnO45JmO121/DR3lQgd1c6eOPp27E36gOU2j3/y
5	thuy	dao	thuydao@gmail.com	$2b$10$6sHcTtilXIAKM/pgocKtg.SvYMOEGf37iktbxTDH7Hb5rvm2Adm3.
6	can	dao	candao@gmail.com	$2b$10$EoJzI9h3k7sZKLRl46gUH.EAnXhh12HMF0IXquq6Ojbm0DgpnM24K
\.


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.recipes_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


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
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

