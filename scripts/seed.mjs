import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ SANITY_API_TOKEN not set in .env.local");
  console.error("");
  console.error("To create a token:");
  console.error("  1. Go to https://www.sanity.io/manage");
  console.error("  2. Select your project (ID: " + projectId + ")");
  console.error("  3. Go to API → Tokens → Add API token");
  console.error("  4. Create a token with Editor access");
  console.error("  5. Add to .env.local: SANITY_API_TOKEN=your_token");
  console.error("");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: false, token });

async function uploadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, { filename });
    console.log(`  ✅ Uploaded: ${filename}`);
    return asset;
  } catch (err) {
    console.error(`  ⚠️  Failed to upload ${filename}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log("🌱 Seeding Sanity content...\n");

  console.log("Uploading images...");
  const [chinaHero, highlightsTour, yangtzeCruise, shanghaiExpress] = await Promise.all([
    uploadImage("https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80", "china-hero.jpg"),
    uploadImage("https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=80", "highlights-tour.jpg"),
    uploadImage("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", "yangtze-cruise.jpg"),
    uploadImage("https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80", "shanghai-express.jpg"),
  ]);

  console.log("");

  console.log("Creating destination...");
  const destination = await client.create({
    _type: "destination",
    name: "China",
    slug: { _type: "slug", current: "cn" },
    tagline: "Explore the Land of the Dragon",
    heroImage: chinaHero ? { _type: "image", asset: { _type: "reference", _ref: chinaHero._id } } : undefined,
    description:
      "China, a vast and ancient land, offers an unparalleled journey through thousands of years of history, culture, and natural beauty. From the iconic Great Wall snaking across mountains to the futuristic skyline of Shanghai, every corner tells a story.\n\nImmerse yourself in the vibrant street food scenes of Beijing's hutongs, cruise the mystical Yangtze River through dramatic gorges, and stand in awe before the Terracotta Warriors in Xi'an. Whether you are seeking ancient temples, modern marvels, or breathtaking landscapes, China delivers an experience that lingers long after you return home.",
    highlights: [
      "Great Wall of China",
      "Forbidden City",
      "Terracotta Warriors",
      "Li River Cruise",
      "Shanghai Skyline",
      "Giant Pandas",
    ],
    goodToKnow: [
      {
        _key: "visa",
        title: "Visa Requirements",
        content:
          "Most travellers require a visa to enter China. Tourist visas (L-visa) are typically valid for 30 days. Apply at least 2 weeks before your trip. Visas on arrival are limited to specific ports and nationalities.",
      },
      {
        _key: "currency",
        title: "Currency & Payments",
        content:
          "The official currency is the Chinese Yuan (CNY). Digital payments via Alipay and WeChat Pay are ubiquitous. Carry some cash for smaller vendors and rural areas. ATMs are widely available in cities.",
      },
      {
        _key: "best-time",
        title: "Best Time to Visit",
        content:
          "Spring (March–May) and Autumn (September–November) offer the most pleasant weather with mild temperatures and clear skies. Summer can be hot and humid, while winter brings cold temperatures but fewer crowds.",
      },
      {
        _key: "language",
        title: "Language",
        content:
          "Mandarin Chinese is the official language. English is spoken in major tourist areas and hotels, but learning a few phrases like 'Nǐ hǎo' (Hello) and 'Xiè xiè' (Thank you) goes a long way.",
      },
    ],
    metaTitle: "China Tours & Travel Packages",
    metaDescription:
      "Discover the best China tour packages. Explore the Great Wall, Forbidden City, and Terracotta Warriors with Royal Arabian's expertly crafted itineraries.",
  });
  console.log(`  ✅ Created destination: ${destination._id}\n`);

  console.log("Creating packages...");

  const packages = [
    {
      name: "China Highlights Tour",
      slug: { _type: "slug", current: "china-highlights-tour" },
      duration: "8 Days / 7 Nights",
      price: 6500,
      originalPrice: 7500,
      shortDescription:
        "Experience the best of China on this comprehensive tour. Visit the Great Wall, Forbidden City, Terracotta Warriors, and more. Perfect for first-time visitors seeking an authentic Chinese experience.",
      heroImage: highlightsTour ? { _type: "image", asset: { _type: "reference", _ref: highlightsTour._id } } : undefined,
      included: ["Flights", "4-Star Hotels", "Daily Breakfast", "Professional Guide", "Private Transfers", "Entrance Fees"],
      itinerary: [
        { _key: "day1", day: 1, title: "Arrival in Beijing", description: "Arrive at Beijing Capital International Airport. Transfer to your hotel. Evening welcome dinner at a traditional Peking duck restaurant." },
        { _key: "day2", day: 2, title: "Great Wall of China", description: "Full-day excursion to the Mutianyu section of the Great Wall. Enjoy a cable car ride up and toboggan ride down. Visit a jade factory en route back." },
        { _key: "day3", day: 3, title: "Forbidden City & Tiananmen Square", description: "Morning visit to Tiananmen Square and the Forbidden City. Afternoon explore the Temple of Heaven. Evening Peking opera performance." },
        { _key: "day4", day: 4, title: "Beijing to Xi'an", description: "Morning flight to Xi'an. Visit the Ancient City Wall by bicycle. Evening stroll through the Muslim Quarter food street." },
        { _key: "day5", day: 5, title: "Terracotta Warriors", description: "Full-day tour of the Terracotta Army Museum. See the thousands of life-sized warriors. Afternoon visit to the Big Wild Goose Pagoda." },
        { _key: "day6", day: 6, title: "Xi'an to Shanghai", description: "Morning flight to Shanghai. Visit the Bund and Huangpu River. Afternoon explore Yu Garden and the Old Town. Evening acrobatics show." },
        { _key: "day7", day: 7, title: "Shanghai Discovery", description: "Visit the Shanghai Tower for panoramic views. Explore the French Concession. Afternoon shopping on Nanjing Road. Farewell dinner on a Huangpu River cruise." },
        { _key: "day8", day: 8, title: "Departure", description: "Morning free time for last-minute shopping. Transfer to Shanghai Pudong Airport for your departure flight." },
      ],
      featured: true,
    },
    {
      name: "Yangtze River Cruise",
      slug: { _type: "slug", current: "yangtze-river-cruise" },
      duration: "6 Days / 5 Nights",
      price: 5200,
      shortDescription:
        "Sail through the breathtaking Three Gorges on a luxury Yangtze River cruise. Explore ancient towns, witness dramatic limestone cliffs, and experience the beauty of China's most famous waterway.",
      heroImage: yangtzeCruise ? { _type: "image", asset: { _type: "reference", _ref: yangtzeCruise._id } } : undefined,
      included: ["Cruise Cabin", "All Meals on Board", "Shore Excursions", "English-Speaking Guide", "Entertainment", "Airport Transfers"],
      itinerary: [
        { _key: "day1", day: 1, title: "Chongqing Embarkation", description: "Arrive in Chongqing. Board your luxury cruise ship. Welcome reception and safety briefing. Sail overnight through the night-lit city." },
        { _key: "day2", day: 2, title: "Fengdu Ghost City", description: "Morning visit to Fengdu Ghost City, a temple complex dedicated to the afterlife. Afternoon enjoy onboard cultural activities. Sail through first gorge." },
        { _key: "day3", day: 3, title: "Three Gorges", description: "Full day sailing through the magnificent Three Gorges: Qutang, Wu, and Xiling. Pass through the massive Five-Step Ship Lock. Shore excursion to Shennong Stream." },
        { _key: "day4", day: 4, title: "Three Gorges Dam", description: "Visit the Three Gorges Dam, the world's largest hydroelectric project. Afternoon cruise through the scenic Lesser Three Gorges. Captain's farewell dinner." },
        { _key: "day5", day: 5, title: "Yichang to Shanghai", description: "Disembark in Yichang. Flight to Shanghai. Afternoon at leisure. Evening exploration of the Bund and Huangpu River lights." },
        { _key: "day6", day: 6, title: "Departure", description: "Morning visit to Shanghai Tower. Transfer to airport for departure." },
      ],
      featured: true,
    },
    {
      name: "Shanghai Express",
      slug: { _type: "slug", current: "shanghai-express" },
      duration: "4 Days / 3 Nights",
      price: 3800,
      originalPrice: 4500,
      shortDescription:
        "A whirlwind tour of China's most dynamic city. Explore futuristic skyscrapers, historic gardens, vibrant markets, and world-class cuisine. Perfect for a short getaway or business extension.",
      heroImage: shanghaiExpress ? { _type: "image", asset: { _type: "reference", _ref: shanghaiExpress._id } } : undefined,
      included: ["Flights", "4-Star Hotel", "Daily Breakfast", "City Tour", "Private Transfers", "Guide"],
      itinerary: [
        { _key: "day1", day: 1, title: "Arrival in Shanghai", description: "Arrive at Shanghai Pudong Airport. Transfer to hotel in the city center. Evening walk along the Bund with stunning skyline views." },
        { _key: "day2", day: 2, title: "Modern Shanghai", description: "Morning visit to Shanghai Tower (observation deck). Explore the French Concession and Tianzifang arts district. Afternoon shopping on Nanjing Road." },
        { _key: "day3", day: 3, title: "Historic Shanghai", description: "Visit Yu Garden and the Old City God Temple bazaar. Afternoon explore the Shanghai Museum. Evening Huangpu River cruise with dinner." },
        { _key: "day4", day: 4, title: "Departure", description: "Morning visit to Zhujiajiao Water Town. Afternoon transfer to airport for departure." },
      ],
      featured: true,
    },
  ];

  for (const pkg of packages) {
    const doc = await client.create({
      _type: "package",
      ...pkg,
      destination: { _type: "reference", _ref: destination._id },
    });
    console.log(`  ✅ Created package: ${doc.name} (${doc._id})`);
  }

  console.log("\n🌱 Seeding complete!");
  console.log("Run `npm run dev` and visit http://localhost:3000/cn");
}

seed().catch((err) => {
  console.error("\n❌ Seeding failed:", err.message);
  process.exit(1);
});
