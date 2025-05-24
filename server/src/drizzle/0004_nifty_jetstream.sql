ALTER TABLE "pen_tags" DROP CONSTRAINT "pen_tags_pen_id_pens_id_fk";
--> statement-breakpoint
ALTER TABLE "pen_tags" ADD CONSTRAINT "pen_tags_pen_id_pens_id_fk" FOREIGN KEY ("pen_id") REFERENCES "public"."pens"("id") ON DELETE cascade ON UPDATE no action;