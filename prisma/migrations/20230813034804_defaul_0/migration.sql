-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Consumer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "remoteJid" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Consumer" ("createdAt", "id", "position", "remoteJid", "updatedAt") SELECT "createdAt", "id", "position", "remoteJid", "updatedAt" FROM "Consumer";
DROP TABLE "Consumer";
ALTER TABLE "new_Consumer" RENAME TO "Consumer";
CREATE UNIQUE INDEX "Consumer_remoteJid_key" ON "Consumer"("remoteJid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
