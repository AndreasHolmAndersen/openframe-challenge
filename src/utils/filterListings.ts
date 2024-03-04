import { Listing } from "../models/listing/Listing";

const filterListings = (
  listings: Listing[],
  brands?: string[],
  years?: number[],
  priceRange?: number[],
  kmDrivenRange?: number[]
): Listing[] => {
  return listings.filter((listing) => {
    // Check if the listing's brand is included in the selected brands
    if (brands && brands.length > 0 && !brands.includes(listing.brand)) {
      return false;
    }

    // Check if the listing's year is included in the selected years
    if (years && years.length > 0 && !years.includes(listing.year)) {
      return false;
    }

    // Check if the listing's price falls within the selected price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      if (listing.price < minPrice || listing.price > maxPrice) {
        return false;
      }
    }

    // Check if the listing's kilometers driven falls within the selected range
    if (kmDrivenRange) {
      const [minKmDriven, maxKmDriven] = kmDrivenRange;
      if (
        listing.kilometersDriven < minKmDriven ||
        listing.kilometersDriven > maxKmDriven
      ) {
        return false;
      }
    }

    // If all conditions are met, include the listing
    return true;
  });
};

export default filterListings;
