/**
 * Package Schema for Sanity CMS
 * 
 * Copy this schema to your Sanity project's schemas folder.
 * Then import and add it to your schema index file.
 */

export default {
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: 'Package name (e.g., "China Highlights Tour")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      description: "Which destination does this package belong to?",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'Duration (e.g., "8 Days / 7 Nights")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (AED)",
      type: "number",
      description: "Starting price in AED",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "originalPrice",
      title: "Original Price (AED)",
      type: "number",
      description: "Optional: original price (for showing discount)",
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief description (2-3 sentences)",
      rows: 3,
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Package hero image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "included",
      title: "What's Included",
      type: "array",
      description: "List of inclusions",
      of: [{ type: "string" }],
    },
    {
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      description: "Day-by-day itinerary",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "number",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            },
          ],
          preview: {
            select: {
              day: "day",
              title: "title",
            },
            prepare({ day, title }: { day: number; title: string }) {
              return {
                title: `Day ${day}: ${title}`,
              };
            },
          },
        },
      ],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on destination page",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "destination.name",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle}` : "No destination",
        media,
      };
    },
  },
};
