import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeView from "../pages/home/HomeView";
import ListingsView from "../pages/listings/ListingsView";
import ListingView from "../pages/listing/ListingView";

//Available routes, if bigger application this should be moved to separate file
export class AppRoutes {
  static readonly index = "/";
  static readonly listings = "/listings";
  static readonly listing = (listingId: string = ":listingId") =>
    `/listings/${listingId}`;
}

const AppRouter: FC = () => {
  return (
    <Routes>
      {/*   Specific routes  */}
      <Route index path={AppRoutes.index} element={<HomeView />} />
      <Route path={AppRoutes.listings} element={<ListingsView />} />
      <Route path={AppRoutes.listing()} element={<ListingView />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={AppRoutes.index} />} />
    </Routes>
  );
};

export default AppRouter;
