-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_id_key" ON "Users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_profile_id_key" ON "Users"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_address_key" ON "Users"("email_address");
