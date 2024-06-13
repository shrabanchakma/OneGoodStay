import { getHostedRooms } from "../Api/rooms";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

export const useHostedRooms = () => {
  const { user } = useAuth();
  const { data: rooms = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["hostedRoom", user?.email],
    queryFn: async () => {
      //   setLoading(false);
      return await getHostedRooms(user?.email);
    },
  });

  return { rooms, refetch };
};
