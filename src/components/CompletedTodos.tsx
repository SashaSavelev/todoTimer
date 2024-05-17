import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Todo } from '../redux/slices/todoSlice';

interface Props {
    todos: Todo[];
    toggleRemoveTodo: (todoId: string) => void;
    toggleRemoveTodoWithTimer: (todoId: string) => void;
}

const ItemTypes = {
    CURRENT_TODO: 'current_todo',
    TODO_WITH_TIMER: 'todo_with_timer',
};

const CompletedTodos: React.FC<Props> = ({ todos = [], toggleRemoveTodo, toggleRemoveTodoWithTimer }) => {
    const completedTodos = todos.filter(todo => todo.completed).reverse();
    const todosWithTimer = todos.filter(todo => todo.withTimer);

    // Вычисление общего времени выполнения всех таймеров
    const totalElapsedTime = todosWithTimer.reduce((total, todo) => total + (todo.elapsedTime || 0), 0);

    // Функция для форматирования времени в формат "часы:минуты"
    const formatTime = (milliseconds: number) => {
      const hours = Math.floor(milliseconds / 3600000);
      const minutes = Math.floor((milliseconds % 3600000) / 60000);
      if (hours === 0) {
          return `${minutes} мин`;
      } else {
          return `${hours} ч ${minutes} мин`;
      }
  };
  

    const [totalTime, setTotalTime] = useState<string>('');

    useEffect(() => {
        setTotalTime(formatTime(totalElapsedTime));
    }, [totalElapsedTime]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.CURRENT_TODO, ItemTypes.TODO_WITH_TIMER],
        drop: (item: { id: string }, monitor) => {
            const itemType = monitor.getItemType();
            if (itemType === ItemTypes.CURRENT_TODO) {
                toggleRemoveTodo(item.id);
            } else if (itemType === ItemTypes.TODO_WITH_TIMER) {
                toggleRemoveTodoWithTimer(item.id);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className={`flex flex-col pt-9 ${isOver ? 'bg-greyish' : ''}`}>
            <div className="grid grid-cols-3">
                <div className="flex justify-start  py-2 text-white text-2xl">Сегодня</div>
                <div className="w-1/5"></div>
                <div className="flex justify-end  py-2 w-full text-blue text-2xl">{totalTime}</div>
                <hr className="w-full border-t border-light-grey" style={{ gridColumn: '1 / span 3' }} />
            </div>

            {completedTodos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                    <div className="grid grid-cols-3">
                        <div className=" py-4 w-1/2 text-light-grey">
                            <s>{todo.text}</s>
                        </div>
                        <div className="py-4 w-full text-right  text-white" style={{ whiteSpace: 'nowrap' }}>
                            {todo.withTimer && (
                                <>
                                    {todo.startTime && (
                                        <p>
                                            {new Date(todo.startTime).toLocaleTimeString().substr(0, 5)} -{' '}
                                            {new Date(todo.startTime + todo.elapsedTime).toLocaleTimeString().substr(0, 5)}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="py-4 w-full  flex justify-end  text-blue" style={{ whiteSpace: 'nowrap' }}>
                            {todo.withTimer && todo.startTime && (
                                <>
                                    {todo.elapsedTime >= 3600000 ? (
                                        <>
                                            {Math.floor(todo.elapsedTime / 3600000)} ч {Math.floor((todo.elapsedTime % 3600000) / 60000)} мин
                                        </>
                                    ) : (
                                        <>{Math.floor(todo.elapsedTime / 60000)} мин</>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {index !== completedTodos.length - 1 && (
                        <div className="grid grid-cols-3">
                            <hr className="w-full border-t border-gray-300" style={{ gridColumn: '1 / span 3' }} />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CompletedTodos;
