import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getUser } from "../Api/users";

const useUserData = () => {
  const { user } = useAuth();
  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user && !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => await getUser(user?.email),
  });
  return { userData, isLoading, refetch };
};

export default useUserData;
