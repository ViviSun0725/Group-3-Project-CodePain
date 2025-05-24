CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"pen_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" integer NOT NULL,
	"pen_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "favorites_user_id_pen_id_pk" PRIMARY KEY("user_id","pen_id")
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" integer NOT NULL,
	"following_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "follows_follower_id_following_id_pk" PRIMARY KEY("follower_id","following_id")
);
--> statement-breakpoint
CREATE TABLE "pen_tags" (
	"pen_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "pen_tags_pen_id_tag_id_pk" PRIMARY KEY("pen_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "pens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"html_code" text,
	"css_code" text,
	"js_code" text,
	"title" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"is_private" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" text NOT NULL,
	"is_pro" boolean DEFAULT false,
	"profile_image" text,
	"display_name" varchar(100),
	"bio" text,
	"profile_link1" text,
	"profile_link2" text,
	"profile_link3" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_pen_id_pens_id_fk" FOREIGN KEY ("pen_id") REFERENCES "public"."pens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_pen_id_pens_id_fk" FOREIGN KEY ("pen_id") REFERENCES "public"."pens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_users_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pen_tags" ADD CONSTRAINT "pen_tags_pen_id_pens_id_fk" FOREIGN KEY ("pen_id") REFERENCES "public"."pens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pen_tags" ADD CONSTRAINT "pen_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pens" ADD CONSTRAINT "pens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;