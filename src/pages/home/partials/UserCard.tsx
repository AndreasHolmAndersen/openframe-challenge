import { FC, useEffect, useState } from "react";
import useUsers from "../../../hooks/useUser";
import { User } from "../../../models/user/User";
import ErrorView from "../../../components/ErrorView";
import LoadingSpinner from "../../../components/LoadingSpinner";

const UserCard: FC = () => {
  //Hooks
  const { queryUser } = useUsers();

  //States
  const [user, setUser] = useState<User>();

  //Queries
  const fetchedUser = queryUser();

  //Effects
  useEffect(() => {
    if (fetchedUser.data && fetchedUser.isFetched) setUser(fetchedUser.data);
  }, [fetchedUser.data, fetchedUser.isFetched]);

  //Functions

  return (
    <div className="px-4 py-8 border rounded-lg shadow-md bg-slate-50 border-slate-200">
      {fetchedUser.isFetching && <LoadingSpinner padding="px-28 py-7" />}
      {fetchedUser.error && (
        <ErrorView title="Error" description="Failed to fetch user" />
      )}
      {fetchedUser.data && fetchedUser.isFetched && user && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Welcome {user.firstName}</h2>
          <p>Email: {user.email}</p>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
