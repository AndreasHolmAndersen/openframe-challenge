import { FC } from "react";
import UserCard from "./partials/UserCard";
import ListingsCard from "./partials/ListingsCard";

const HomeView: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold ">Openframe Code challenge</h1>
        <p className="mt-6 text-lg leading-8 ">
          Andreas Holm Andersen's solution for showing a lot of used cars
        </p>
      </div>
      <div className="flex items-center justify-around w-full">
        <UserCard />
        <ListingsCard />
      </div>
    </div>
  );
};

export default HomeView;
