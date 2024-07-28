import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/Api";
import { useGetTodosQuery } from "./useGetTodosQuery";

export const useUpdateTodoMutation = () => {
    const { refetch } = useGetTodosQuery()
    return useMutation({
        mutationFn: (todo: { id: string; title: string; description: string, voiceNote: string }) => {
            return API.patch(`/todos/${todo.id}`, { title: todo.title, description: todo.description, voiceNote: todo.voiceNote });
        },
        onSuccess: () => {
            refetch();
        },
    }
    )


}