import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Todo, incrementElapsedTime } from '../redux/slices/todoSlice';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Popup } from './Popup';

interface Props {
  todo: Todo;
  userId: string;
  onCompleteWithTimer: (todoId: string) => void;
}

const ItemTypes = {
  TODO_WITH_TIMER: 'todo_with_timer'
};

const TodoWithTimer: React.FC<Props> = ({ todo, userId, onCompleteWithTimer }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const TIMER_FORBIDDEN = 10000;

  const localElapsedTimeRef = useRef(todo.elapsedTime);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    localElapsedTimeRef.current = todo.elapsedTime;
  }, [todo.elapsedTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (todo.withTimer && todo.currentlyWorking) {
      interval = setInterval(() => {
        dispatch(incrementElapsedTime({ userId, todoId: todo.id }));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, userId, todo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO_WITH_TIMER,
    item: { id: todo.id },
    canDrag: () => {
      if (localElapsedTimeRef.current <= TIMER_FORBIDDEN) {
        console.log(localElapsedTimeRef.current)
        setShowPopup(true);
        return false;
      }
      return true;
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [todo.id]);

  const startTime = todo.startTime;
  const elapsedTime = startTime ? Math.floor((currentTime - startTime) / 1000) : 0;
  const elapsedTimeFormatted = formatTime(elapsedTime);

  const currentTimeFormatted = new Date(currentTime).toLocaleTimeString();
  const startTimeFormatted = startTime ? new Date(startTime).toLocaleTimeString() : '';

  return (
    <>
      <div className="flex flex-col hover:bg-dark-grey">
        <div ref={drag} className={`${isDragging ? "opacity-15" : "opacity-100"} grid grid-cols-3`}>
          <div className="py-4 w-1/2 text-light-grey">{todo.text}</div>
          <div className="py-4 w-full text-right text-white">
            {startTimeFormatted.substr(0, 5)} - {currentTimeFormatted.substr(0, 5)}
          </div>
          <div className="py-4 w-full flex justify-end text-blue">{elapsedTimeFormatted}</div>
          <hr className="w-full border-t border-light-grey" style={{ gridColumn: "1 / span 3" }} />
        </div>
      </div>
      {showPopup && <Popup message="Задачи длительностью менее 10 секунд не сохраняюся" onClose={handleClosePopup} />}
    </>
  );
};

export default TodoWithTimer;
