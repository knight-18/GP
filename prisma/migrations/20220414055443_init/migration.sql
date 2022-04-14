-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'ECE', 'EIE', 'EE', 'ME', 'CE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MODERATOR', 'MENTOR', 'MENTEE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scholarId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,
    "branch" "Branch" NOT NULL,
    "role" "Role" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "otpValue" TEXT NOT NULL,
    "otpExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_scholarId_key" ON "User"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
