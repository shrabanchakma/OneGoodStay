import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getUser } from "../Api/users";

const useUserData = () => {
  const { user } = useAuth();
  const { data: userData = {}, refetch } = useQuery({
    enabled: !!user && !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => await getUser(user?.email),
  });
  const role = userData?.role;
  const timeStamp = userData?.timeStamp;
  return { role, timeStamp, refetch };
};

export default useUserData;
