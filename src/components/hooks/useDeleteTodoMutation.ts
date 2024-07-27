import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/Api";
import { useGetTodosQuery } from "./useGetTodosQuery";

export const useDeleteTodoMutation = () => {
    const { refetch } = useGetTodosQuery();
    return useMutation({
        mutationFn: (id: string) => {
            return API.delete(`/todos/${id}`);
        },
        onSuccess: () => {
            refetch(); // Refetch the todos after a successful deletion
        },
    });
};