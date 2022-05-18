-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_NewUser" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "NewUser";
DROP TABLE "NewUser";
ALTER TABLE "new_NewUser" RENAME TO "NewUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
