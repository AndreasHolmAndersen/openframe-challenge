import { FC, useEffect, useState } from "react";
import useListings from "../../../hooks/useListings";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorView from "../../../components/ErrorView";
import { AppRoutes } from "../../../router/AppRouter";

const ListingsCard: FC = () => {
  //Hooks
  const { queryListingsAmount } = useListings();

  //States
  const [listingsAmount, setListingsAmount] = useState<number>();

  //Queries
  const fetchedListingsAmount = queryListingsAmount();

  //Effects
  useEffect(() => {
    if (fetchedListingsAmount.isFetched && fetchedListingsAmount.data)
      setListingsAmount(fetchedListingsAmount.data);
  }, [fetchedListingsAmount.data, fetchedListingsAmount.isFetched]);

  //Functions

  return (
    <div className="px-4 py-8 border rounded-lg shadow-md bg-slate-50 border-slate-200">
      {fetchedListingsAmount.isFetching && (
        <LoadingSpinner padding="px-20 py-7" />
      )}
      {fetchedListingsAmount.error && (
        <ErrorView title="Error" description="Failed to fetch listings" />
      )}
      {fetchedListingsAmount.data &&
        fetchedListingsAmount.isFetched &&
        listingsAmount && (
          <div className="flex flex-col">
            <p className="text-lg font-bold">Listings available right now!</p>
            <p className="pt-4 text-4xl font-black text-center">
              {listingsAmount}
            </p>
            <a
              href={AppRoutes.listings}
              className="pt-8 pb-2 -mb-8 text-xs text-blue-600 "
            >
              Click here to see all listings -{">"}
            </a>
          </div>
        )}
    </div>
  );
};

export default ListingsCard;
