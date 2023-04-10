import React, { useState } from 'react';
import { format } from 'date-fns';
import { useUpdatedTodoItem } from '../api/useUpdatedTodoItem';
import { useTodoQuery } from '../api/useQuery';
import Loading from './Loading';
import NotFound from './NotFound';
import TodoFilter from '../components/TodoFilter';
import TodoScreen from '../components/TodoScreen';

export default function Todo() {
  const filters = ['ALL', 'TODAY'];
  const [filter, setFilter] = useState(filters[0]);
  const handleFilter = el => setFilter(el);
  // filter handling
  const today = format(new Date(), 'yyyy.M.d');
  const { isLoading, error, data: todos } = useTodoQuery(today, 'todo');
  // get todos
  const { mutate: patchItem } = useUpdatedTodoItem();
  const handleCheck = checked => {
    const checkedList = todos.filter(todo =>
      todo.items.some(item => item.id === checked.id)
    )[0];
    const status = checked.checked ? 'done' : 'active';

    checkedList.items.forEach(item => {
      if (item.id === checked.id) {
        item.status = status;
      }
    });
    patchItem([checkedList.id, { items: checkedList.items }]);
  };
  // patch todo status
  return (
    <main>
      {isLoading && <Loading />}
      {error && <NotFound />}
      {todos && (
        <>
          <TodoFilter
            filters={filters}
            filter={filter}
            handleFilter={handleFilter}
          />
          <TodoScreen
            todos={todos}
            filter={filter}
            today={today}
            onCheck={handleCheck}
          />
        </>
      )}
    </main>
  );
}
