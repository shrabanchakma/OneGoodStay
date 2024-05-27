import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getUser } from "../Api/users";

const useUserRole = () => {
  const { user } = useAuth();
  const { data: userData = {}, refetch } = useQuery({
    enabled: !!user && !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => await getUser(user?.email),
  });
  const role = userData?.role;
  return [role, refetch];
};

export default useUserRole;
