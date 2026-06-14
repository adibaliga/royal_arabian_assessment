/**
 * Destination Schema for Sanity CMS
 * 
 * Copy this schema to your Sanity project's schemas folder.
 * Then import and add it to your schema index file.
 */

export default {
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: 'Destination name (e.g., "China")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: 'URL slug (e.g., "cn")',
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'Short tagline (e.g., "Explore the Land of the Dragon")',
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Hero banner image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Destination overview (2-3 paragraphs)",
      rows: 5,
    },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      description: 'Key highlights (e.g., "Great Wall", "Forbidden City")',
      of: [{ type: "string" }],
    },
    {
      name: "goodToKnow",
      title: "Good to Know",
      type: "array",
      description: "Practical information for travellers",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "content",
              title: "Content",
              type: "text",
              rows: 3,
            },
          ],
        },
      ],
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title",
      group: "seo",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      description: "SEO description",
      group: "seo",
    },
  ],
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
  ],
};
