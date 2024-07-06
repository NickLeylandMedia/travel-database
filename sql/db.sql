-- public.meal_reviews definition

-- Drop table

-- DROP TABLE public.meal_reviews;

CREATE TABLE public.meal_reviews (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	title VARCHAR NOT NULL,
	content VARCHAR NOT NULL,
	score10 DECIMAL NOT NULL,
	date_eaten VARCHAR NULL,
	rowid INT8 NOT VISIBLE NOT NULL DEFAULT unique_rowid(),
	CONSTRAINT meal_reviews_pkey PRIMARY KEY (rowid ASC)
);


-- public.meals definition

-- Drop table

-- DROP TABLE public.meals;

CREATE TABLE public.meals (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	name VARCHAR NOT NULL,
	description VARCHAR NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	restaurant_id UUID NOT NULL,
	price DECIMAL NULL,
	CONSTRAINT meals_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX meals_un (restaurant_id ASC, name ASC)
);


-- public.restaurant_reviews definition

-- Drop table

-- DROP TABLE public.restaurant_reviews;

CREATE TABLE public.restaurant_reviews (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	restaurant_id UUID NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	title VARCHAR NOT NULL,
	content VARCHAR NOT NULL,
	score10 DECIMAL NOT NULL,
	date_visited VARCHAR NULL,
	CONSTRAINT restaurant_reviews_pk PRIMARY KEY (id ASC)
);


-- public.restaurant_tags definition

-- Drop table

-- DROP TABLE public.restaurant_tags;

CREATE TABLE public.restaurant_tags (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	name VARCHAR NOT NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	description VARCHAR NULL,
	CONSTRAINT restaurant_tags_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX restaurant_tags_un (name ASC)
);


-- public.restaurant_types definition

-- Drop table

-- DROP TABLE public.restaurant_types;

CREATE TABLE public.restaurant_types (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	name VARCHAR NOT NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	description VARCHAR NULL,
	CONSTRAINT restaurant_types_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX restaurant_types_un (name ASC)
);


-- public.restaurants definition

-- Drop table

-- DROP TABLE public.restaurants;

CREATE TABLE public.restaurants (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	name VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	state VARCHAR NOT NULL,
	coord VARCHAR NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	description VARCHAR NULL,
	picture VARCHAR NULL,
	zip VARCHAR NOT NULL,
	address VARCHAR NULL,
	active BOOL NOT NULL,
	seasonal BOOL NULL,
	month_closed_text VARCHAR NULL,
	month_closed_numeric DECIMAL NULL,
	year_closed VARCHAR NULL,
	summary VARCHAR NULL,
	CONSTRAINT restaurants_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX restaurants_un (name ASC, city ASC)
);


-- public.restaurants_tags_join definition

-- Drop table

-- DROP TABLE public.restaurants_tags_join;

CREATE TABLE public.restaurants_tags_join (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	restaurant_id UUID NOT NULL,
	restaurant_tag_id UUID NOT NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	CONSTRAINT restaurants_tags_join_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX restaurants_tags_join_un (restaurant_id ASC, restaurant_tag_id ASC)
);


-- public.restaurants_types_join definition

-- Drop table

-- DROP TABLE public.restaurants_types_join;

CREATE TABLE public.restaurants_types_join (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	restaurant_id UUID NOT NULL,
	restaurant_type_id UUID NOT NULL,
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	CONSTRAINT restaurants_types_join_pk PRIMARY KEY (id ASC),
	UNIQUE INDEX restaurants_types_join_un (restaurant_id ASC, restaurant_type_id ASC)
);


-- public.log definition

-- Drop table

-- DROP TABLE public.log;

CREATE TABLE public.log (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	posted_on TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	last_edited TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
	rowid INT8 NOT VISIBLE NOT NULL DEFAULT unique_rowid(),
	event_type VARCHAR NOT NULL,
	message VARCHAR NOT NULL,
	level VARCHAR NULL,
	request JSONB NOT NULL,
	response JSONB NOT NULL,
	CONSTRAINT log_pkey PRIMARY KEY (rowid ASC)
);