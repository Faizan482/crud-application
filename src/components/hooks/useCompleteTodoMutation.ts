import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/Api";
import { useGetTodosQuery } from "./useGetTodosQuery";

export const useCompleteTodoMutation = () => {
    const { refetch } = useGetTodosQuery()
    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) => {
            return API.patch(`/todos/${id}`, { completed });
        },
        onSuccess: () => {
            refetch();
        },
    }
    )


}