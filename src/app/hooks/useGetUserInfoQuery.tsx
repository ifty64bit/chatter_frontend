import { getUser } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

function useGetUserInfoQuery({ id }: { id: string }) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
        staleTime: Infinity,
    });
}

export default useGetUserInfoQuery;
