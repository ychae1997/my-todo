import { useTodoApi } from '../context/TodoApiContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// post
export const useAddTodoItem = () => {
  const { getData } = useTodoApi();
  const queryClient = useQueryClient();

  return useMutation(todoItem => getData.postTodo(todoItem), {
    onSuccess: () => queryClient.invalidateQueries('todos'), // todos 키를가진 데이터 갱신
    onError: error => console.log(error.data)
  });
};
// ~ post
