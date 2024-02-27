-- CreateTable
CREATE TABLE "teachers" (
    "id" UUID NOT NULL,
    "teacher_name" VARCHAR(32) NOT NULL,
    "teacher_phone" VARCHAR(32) NULL,
    "teacher_address" VARCHAR(32) NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);
