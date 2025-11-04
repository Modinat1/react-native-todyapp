import { useQuery } from "@tanstack/react-query";

import { UserServices } from "../services/userServices";

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await UserServices.getUser();
      return res.data;
    },
  });
