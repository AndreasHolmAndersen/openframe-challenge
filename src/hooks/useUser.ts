import { useQuery } from "@tanstack/react-query";
import { User } from "../models/user/User";
import user from "../assets/user.json";

const useUsers = () => {
  //Query single user
  const queryUser = () =>
    useQuery<User, string>({
      queryKey: ["user"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return user;
      },
    });

  return { queryUser };
};

export default useUsers;
