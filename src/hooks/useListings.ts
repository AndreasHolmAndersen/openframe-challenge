import { useQuery } from "@tanstack/react-query";
import listings from "../assets/listings.json";
import { Listing } from "../models/listing/Listing";

const useListings = () => {
  const queryListingsAmount = () =>
    useQuery<number, string>({
      queryKey: ["listings", "amount"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return listings.length;
      },
    });

  const queryAllListings = () =>
    useQuery<Listing[], string>({
      queryKey: ["listings", "all"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return listings;
      },
    });

  const querySingleListing = (id: string) =>
    useQuery<Listing, string>({
      queryKey: ["listings", id],
      queryFn: async ({ queryKey }) => {
        const [_key, id] = queryKey;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const listing = listings.find((listing) => listing.id === id);
        if (!listing) {
          throw new Error(`Listing with ID ${id} not found`);
        }
        return listing;
      },
    });

  return { queryListingsAmount, queryAllListings, querySingleListing };
};

export default useListings;
