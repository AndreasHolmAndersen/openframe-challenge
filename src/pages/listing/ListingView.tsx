import { FC, useEffect, useState } from "react";
import { Listing } from "../../models/listing/Listing";
import useListings from "../../hooks/useListings";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { AppRoutes } from "../../router/AppRouter";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorView from "../../components/ErrorView";

const ListingView: FC = () => {
  //Hooks
  const { querySingleListing } = useListings();
  const { listingId } = useParams();

  //States
  const [listing, setListing] = useState<Listing>();

  //Queries
  const fetchedListing = querySingleListing(listingId!);

  //Effects
  useEffect(() => {
    if (fetchedListing.data && fetchedListing.isFetched)
      setListing(fetchedListing.data);
  }, [fetchedListing.data, fetchedListing.isFetched]);

  return (
    <div className="flex flex-col w-full h-screen gap-12 p-8">
      <Breadcrumb
        items={[
          { text: "Home", url: AppRoutes.index },
          { text: "Listings", url: AppRoutes.listings },
          {
            text: `${listing?.brand ?? ""} ${listing?.name ?? ""}`,
            url: AppRoutes.listing(listingId),
          },
        ]}
      />
      <div className="flex items-center justify-center w-full h-full">
        {fetchedListing.isFetching && <LoadingSpinner />}
        {fetchedListing.isError && (
          <ErrorView title="Error" description="Failed to fetch listing" />
        )}
        {fetchedListing.data && fetchedListing.isFetched && listing && (
          <div className="flex flex-col p-4 mb-4 border border-gray-300 rounded-md shadow-md w-fit bg-slate-50">
            <p className="text-lg font-semibold text-gray-600">
              {listing.brand} {listing.name}
            </p>
            <p className="text-gray-600">Year: {listing.year}</p>
            <p className="text-gray-600">
              Kilometers Driven: {listing.kilometersDriven}
            </p>
            <p className="text-gray-600">Brand: {listing.brand}</p>
            <p className="text-gray-600">Model: {listing.name}</p>
            <p className="text-xl font-semibold text-green-600">
              DKK {listing.price}
            </p>
            <img
              src={listing.imageUrl}
              className="mt-4 rounded-md w-[500px] h-fit"
              alt="Car Image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingView;
