import { useTodoApi } from '../context/TodoApiContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// post
export const useDelete = () => {
  const { getData } = useTodoApi();
  const queryClient = useQueryClient();

  return useMutation(diary => getData.deleteItem(diary), {
    onSuccess: () => queryClient.invalidateQueries('diary'), // todos 키를가진 데이터 갱신
    onError: error => console.log(error.data)
  });
};
// ~ post
