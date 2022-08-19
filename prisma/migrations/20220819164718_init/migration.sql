-- CreateTable
CREATE TABLE "Episode" (
    "dob" TEXT,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL PRIMARY KEY,
    "imageurl" TEXT NOT NULL,
    "episodeUrl" TEXT NOT NULL,
    "yearAired" INTEGER NOT NULL
);
