// src/app/events/page.tsx

import { prisma } from "@/lib/prisma";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { dateStart: { gte: new Date() } },
    orderBy: [
      { isFeatured: "desc" },  // featured first
      { dateStart: "asc" },    // then by date
    ],
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      dateStart: true,
      location: true,
      isFeatured: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map((e) => (
          <li
            key={e.id}
            className={`border p-4 rounded hover:shadow ${
              e.isFeatured ? "border-yellow-400 bg-yellow-50" : ""
            }`}
          >
            <a href={`/events/${e.slug}`}>
              <h2 className="text-xl font-bold">{e.title}</h2>
              {e.dateStart && (
                <p className="text-gray-500">
                  {new Date(e.dateStart).toLocaleDateString()}
                  {e.location ? ` - ${e.location}` : ""}
                </p>
              )}
              {e.description && (
                <p className="text-gray-700 mt-2">{e.description.slice(0, 100)}...</p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}