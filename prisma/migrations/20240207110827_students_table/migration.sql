-- CreateTable
CREATE TABLE "students" (
    "id" UUID NOT NULL,
    "student_name" VARCHAR(32) NOT NULL,
    "student_phone" INTEGER NOT NULL,
    "student_group" VARCHAR(32) NOT NULL,
    "parent_name" VARCHAR(32) NOT NULL,
    "parent_phone" INTEGER NOT NULL,
    "student_image" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_student_name_key" ON "students"("student_name");
