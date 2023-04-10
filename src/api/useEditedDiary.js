import { useTodoApi } from '../context/TodoApiContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditedDiary = () => {
  const { getData } = useTodoApi();
  const queryClient = useQueryClient();

  // data = [id, payload]
  return useMutation((...data) => getData.putItem(...data), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['diary', { id: variables }]);
    },
    onError: error => console.log(error.data)
  });
};
