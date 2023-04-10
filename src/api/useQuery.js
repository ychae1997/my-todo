import { useQuery } from '@tanstack/react-query';
import { useTodoApi } from '../context/TodoApiContext';

export const useTodoQuery = (today, key) => {
  const { getData } = useTodoApi();
  return useQuery([key, today], () => {
    return getData.getTodo(key, today);
  });
};
