import { fetchSanity } from "@/lib/sanity";
import {
  destinationBySlug,
  featuredPackagesByDestination,
  chinaPageData,
  packageBySlug,
} from "@/lib/queries";

jest.mock("@/lib/sanity", () => ({
  fetchSanity: jest.fn(),
}));

const mockedFetch = jest.mocked(fetchSanity);

describe("GROQ query functions", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it("destinationBySlug calls fetchSanity with correct query", async () => {
    mockedFetch.mockResolvedValue(null);
    await destinationBySlug("cn");
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining('slug.current == $slug'),
      { slug: "cn" },
    );
  });

  it("featuredPackagesByDestination fetches featured packages for a destination", async () => {
    mockedFetch.mockResolvedValue([]);
    await featuredPackagesByDestination("dest-123");
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining("featured == true"),
      { destinationId: "dest-123" },
    );
  });

  it("chinaPageData returns combined destination and packages", async () => {
    mockedFetch.mockResolvedValue({ destination: null, packages: [] });
    const result = await chinaPageData("cn");
    expect(result).toEqual({ destination: null, packages: [] });
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining('"destination"'),
      { slug: "cn" },
    );
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining('"packages"'),
      { slug: "cn" },
    );
  });

  it("packageBySlug expands destination reference", async () => {
    mockedFetch.mockResolvedValue(null);
    await packageBySlug("test-pkg");
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining("destination->"),
      { slug: "test-pkg" },
    );
  });
});
