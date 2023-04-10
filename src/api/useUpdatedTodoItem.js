import { useTodoApi } from '../context/TodoApiContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatedTodoItem = () => {
  const { getData } = useTodoApi();
  const queryClient = useQueryClient();

  // data = [todo.id, payload]
  return useMutation((...data) => getData.updateTodo(...data), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['todos', { id: variables }]);
      console.log(data);
    },
    onError: error => console.log(error.data)
  });
};
