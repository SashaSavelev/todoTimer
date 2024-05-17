import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import type { Todo } from '../redux/slices/todoSlice';

interface Props {
    todos: Todo[];
    toggleRemove: (todoId: string) => void;
    onComplete: (todoId: string) => void;
}

const ItemTypes = {
    CURRENT_TODO: 'current_todo',
};

const CurrentTodos: React.FC<Props> = ({ todos = [], toggleRemove, onComplete }) => {
    const handleDragEnd = (todo: Todo) => {
        if (!todos.find(t => t.id === todo.id)) {
            onComplete(todo.id);
        }
    };

    return (
        <div className="flex flex-col ">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onDragEnd={() => handleDragEnd(todo)} />
            ))}
        </div>
    );
};

interface TodoItemProps {
    todo: Todo;
    onDragEnd: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDragEnd }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CURRENT_TODO,
        item: { id: todo.id },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <>
           
            <div ref={drag} className={`grid grid-cols-3 ${isDragging ? 'opacity-15' : 'opacity-100'}`}>
                <div className=" py-4 w-1/2 text-light-grey">{todo.text}</div>
                <div className=" py-4 w-1/2  text-white"></div>
                <div className=" py-4 w-1/2 text-blue  "></div>
                <hr className="w-full border-t border-light-grey" style={{ gridColumn: '1 / span 3' }} />
            </div>
        </>
    );
};

export default CurrentTodos;
