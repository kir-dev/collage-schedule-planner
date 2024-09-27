-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_ownerGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_ownerUserId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerGroupId_fkey" FOREIGN KEY ("ownerGroupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- The Event table should have only one owner, either a user or a group. The ownerUserId and ownerGroupId columns should be mutually exclusive. If an event has an ownerUserId, it should not have an ownerGroupId, and vice versa.
ALTER TABLE IF EXISTS  "Event"
  ADD CONSTRAINT only_one_owner
  CHECK (
    ("ownerUserId" IS NOT NULL AND "ownerGroupId" IS NULL) OR
    ("ownerUserId" IS NULL AND "ownerGroupId" IS NOT NULL) OR
    ("ownerUserId" IS NULL AND "ownerGroupId" IS NULL)
  );
