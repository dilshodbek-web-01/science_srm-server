-- CreateTable
CREATE TABLE "students" (
    "id" UUID NOT NULL,
    "student_name" VARCHAR(32) NOT NULL,
    "student_phone" VARCHAR(32) NULL,
    "student_group" VARCHAR(32) NULL,
    "parent_name" VARCHAR(32) NULL,
    "parent_phone" VARCHAR(32) NULL,
    "teacher_name" VARCHAR(32) NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
