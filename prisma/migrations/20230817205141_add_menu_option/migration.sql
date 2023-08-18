-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuOption" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Message" ("createdAt", "id", "position", "text", "updatedAt") SELECT "createdAt", "id", "position", "text", "updatedAt" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE UNIQUE INDEX "Message_menuOption_key" ON "Message"("menuOption");
CREATE UNIQUE INDEX "Message_position_key" ON "Message"("position");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
