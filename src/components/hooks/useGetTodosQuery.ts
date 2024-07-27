import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/Api";

export const useGetTodosQuery = () => useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
        const response = await API.get('/todos')
        return response.data
    }
})