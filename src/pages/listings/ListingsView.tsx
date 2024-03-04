import { FC, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { AppRoutes } from "../../router/AppRouter";
import Table from "../../components/Table";
import useListings from "../../hooks/useListings";
import { Listing } from "../../models/listing/Listing";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorView from "../../components/ErrorView";
import { useNavigate } from "react-router-dom";
import ItemsPerPageSelector from "./partials/ItemsPerPageSelector";
import MultiSelect from "../../components/MultiSelect";
import RangeSlider from "../../components/RangeSlider";
import { Button } from "@mui/material";
import { getMaxValueInArray } from "../../utils/getMaxIntValue";
import filterListings from "../../utils/filterListings";

const ListingsView: FC = () => {
  //Hooks
  const { queryAllListings } = useListings();
  const navigate = useNavigate();

  //States
  const [listings, setListings] = useState<Listing[]>();
  const [filteredListings, setFilteredListings] = useState<Listing[]>();
  const [itemsPrPage, setItemsPrPage] = useState<number>(10);
  const [brandsFilter, setBrandsFilter] = useState<string[]>();
  const [yearsFilter, setYearsFilter] = useState<number[]>();
  const [priceRangeFilter, setPriceRangeFilter] = useState<number[]>();
  const [kmDrivenRangeFilter, setKmDrivenRangeFilter] = useState<number[]>();

  //Queries
  const fetchedListings = queryAllListings();

  //Effects
  useEffect(() => {
    if (fetchedListings.data && fetchedListings.isFetched) {
      setListings(fetchedListings.data);
      setFilteredListings(fetchedListings.data);
    }
  }, [fetchedListings.data, fetchedListings.isFetched]);

  //Functions
  const handleItemsPrPageChange = (option: number) => {
    setItemsPrPage(option);
  };

  const handleBrandsFilter = (brands: string[]) => {
    setBrandsFilter(brands);
  };

  const handleYearsFilter = (years: string[]) => {
    const yearsInt = years.map((year) => parseInt(year));
    setYearsFilter(yearsInt);
  };

  const handlePriceRangeFilter = (value: number[]) => {
    setPriceRangeFilter(value);
  };

  const handleKmDrivenRangeFilter = (value: number[]) => {
    setKmDrivenRangeFilter(value);
  };

  const getMaxPrice = () => {
    if (!listings) return 0;
    return getMaxValueInArray(listings.map((listing) => listing.price));
  };

  const getMaxKmDriven = () => {
    if (!listings) return 0;
    return getMaxValueInArray(
      listings.map((listing) => listing.kilometersDriven)
    );
  };

  const handleSubmitFilters = () => {
    if (!listings) return;
    const newlyFilteredListings = filterListings(
      listings,
      brandsFilter,
      yearsFilter,
      priceRangeFilter,
      kmDrivenRangeFilter
    );
    setFilteredListings(newlyFilteredListings);
  };

  const handleClearFilters = () => {
    setFilteredListings(listings);
    setBrandsFilter(undefined);
    setYearsFilter(undefined);
    setPriceRangeFilter([0, getMaxPrice()]);
    setKmDrivenRangeFilter([0, getMaxKmDriven()]);
  };

  return (
    <div className="flex flex-col w-full h-screen p-8">
      <Breadcrumb
        items={[
          { text: "Home", url: AppRoutes.index },
          { text: "Listings", url: AppRoutes.listings },
        ]}
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {fetchedListings.isLoading && <LoadingSpinner size="xl" />}
        {fetchedListings.isError && (
          <ErrorView title="Error" description="Failed to fetch listings" />
        )}
        {fetchedListings.isFetched &&
          fetchedListings.data &&
          filteredListings && (
            <>
              <div className="flex flex-col items-center w-full gap-8 p-4 sm:flex-row">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <ItemsPerPageSelector
                    options={[10, 25, 50]}
                    selected={itemsPrPage}
                    onItemSelect={handleItemsPrPageChange}
                  />
                  <MultiSelect
                    options={[
                      ...new Set(
                        filteredListings.map((listing) => listing.brand).sort()
                      ),
                    ]}
                    selected={brandsFilter ?? []}
                    label="Brands"
                    onItemSelect={handleBrandsFilter}
                  />
                  <MultiSelect
                    options={[
                      ...new Set(
                        filteredListings
                          .map((listing) => listing.year.toString())
                          .sort()
                      ),
                    ]}
                    selected={
                      yearsFilter?.map((years) => years.toString()) ?? []
                    }
                    label="Year"
                    onItemSelect={handleYearsFilter}
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <RangeSlider
                    min={0}
                    max={getMaxPrice()}
                    label="Price DKK"
                    step={1000}
                    onValueChange={handlePriceRangeFilter}
                  />
                  <RangeSlider
                    min={0}
                    max={getMaxKmDriven()}
                    label="Kilometers driven"
                    step={1000}
                    onValueChange={handleKmDrivenRangeFilter}
                  />
                </div>
                <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row md:flex-col md:gap-4">
                  <Button
                    variant="contained"
                    className="flex"
                    onClick={handleSubmitFilters}
                  >
                    Submit filters
                  </Button>
                  <Button
                    variant="contained"
                    disabled={
                      !brandsFilter &&
                      !yearsFilter &&
                      !priceRangeFilter &&
                      !kmDrivenRangeFilter
                    }
                    color="error"
                    className="flex"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>

              <Table<Listing>
                data={filteredListings}
                keys={["brand", "name", "kilometersDriven", "price", "year"]}
                itemsPerPage={itemsPrPage}
                onRowClick={(row) => navigate(AppRoutes.listing(row.id))}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default ListingsView;
