import { useTodoApi } from '../context/TodoApiContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// post
export const useAddDiaryItem = () => {
  const { getData } = useTodoApi();
  const queryClient = useQueryClient();

  return useMutation(diary => getData.postDiary(diary), {
    onSuccess: () => queryClient.invalidateQueries('diary'), // todos 키를가진 데이터 갱신
    onError: error => console.log(error.data)
  });
};
// ~ post
