CREATE TABLE "profile" (
	"uid" varchar(20) PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"location" varchar(255),
	"bio" varchar(100),
	"created_at" timestamp (0) DEFAULT now(),
	CONSTRAINT "profile_username_unique" UNIQUE("username"),
	CONSTRAINT "profile_email_unique" UNIQUE("email")
);
