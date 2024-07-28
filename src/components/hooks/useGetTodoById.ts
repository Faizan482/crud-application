import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/Api";

export const useGetTodoById = (id: string | undefined) => useQuery({
    queryKey: ['todos', id],
    queryFn: async () => {
        const response = await API.get(`/todos/${id}`)
        return response.data
    },
    enabled: !!id
})