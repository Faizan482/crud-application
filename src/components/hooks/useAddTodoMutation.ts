import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/Api";
import { useGetTodosQuery } from "./useGetTodosQuery";

export const useAddTodoMutation = () => {
    const { refetch } = useGetTodosQuery();

    return useMutation({
        mutationFn: async (todo: {
            title: string;
            description: string;
            completed: boolean;
            voiceNote: string;
        }) => {
            return API.post("/todos", todo);
        },
        onSuccess: () => {
            refetch()
        }
    });
}