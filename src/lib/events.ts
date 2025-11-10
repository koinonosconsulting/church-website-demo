// src/lib/events.ts

import { prisma } from "./prisma";

export async function updateNextFeaturedEvent() {
  // 1. Reset previous featured events
  await prisma.event.updateMany({ where: { isFeatured: true }, data: { isFeatured: false } });

  // 2. Find the next upcoming event
  const nextEvent = await prisma.event.findFirst({
    where: { dateStart: { gte: new Date() } },
    orderBy: { dateStart: "asc" },
  });

  if (nextEvent) {
    await prisma.event.update({
      where: { id: nextEvent.id },
      data: { isFeatured: true },
    });
  }
}