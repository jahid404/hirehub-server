/*
  Warnings:

  - You are about to drop the column `companyDescription` on the `recruiter_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `companyLocation` on the `recruiter_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `companyLogo` on the `recruiter_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `recruiter_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `companyWebsite` on the `recruiter_profiles` table. All the data in the column will be lost.
  - Added the required column `description` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recruiter_profiles" DROP COLUMN "companyDescription",
DROP COLUMN "companyLocation",
DROP COLUMN "companyLogo",
DROP COLUMN "companyName",
DROP COLUMN "companyWebsite",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
