// src/app/events/[slug]/page.tsx

import { prisma } from "@/lib/prisma";

interface Props {
  params: { slug: string };
}

export default async function EventDetailPage({ params }: Props) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) return <p>Event not found</p>;

  const startDate = event.dateStart ? new Date(event.dateStart).toLocaleString() : "TBA";
  const endDate = event.dateEnd ? new Date(event.dateEnd).toLocaleString() : null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      <p className="text-gray-500 mb-2">
        {startDate}
        {endDate ? ` - ${endDate}` : ""}
      </p>

      {event.location && <p className="text-gray-500 mb-4">Location: {event.location}</p>}

      {event.description && <p className="text-gray-700">{event.description}</p>}

      {event.capacity !== null && event.capacity !== undefined && (
        <p className="text-gray-500 mt-4">Capacity: {event.capacity}</p>
      )}
    </div>
  );
}