import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import ImgClipboard from '../../assets/clipboard.svg';
import { TaskCheckBox } from '../TaskCheckBox/TaskCheckBox';
import styles from './styles.module.css';
import { uid } from 'uid';

export const TodoList = () => {
  //states
  const [tasks, setTasks] = useState([
    {
      id: 'fvsdbanui456',
      content: 'Comprar fone de ouvido gamer.',
      isComplete: false,
    },
    { id: 'cnasjvnqfoa', content: 'Comprar TV 65 polegadas.', isComplete: false },
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [countTaskComplete, setCountTaskComplete] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  //functions
  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();
    const newTodo = {
      id: uid(),
      content: newTodoText,
      isComplete: false,
    };
    setTasks([...tasks, newTodo]);
    setNewTodoText('');
  }

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    setNewTodoText(event.target.value);
  }

  function handleDeleteTask(taskId: string) {
    const todoListAfterDeletedTask = tasks.filter(task => {
      return taskId !== task.id;
    });
    setTasks(todoListAfterDeletedTask);
    if (countTaskComplete > 0 && isChecked === false) {
      setCountTaskComplete(state => {
        return (state -= 1);
      });
    }
  }

  function handleInvalidNewTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('This field is required!');
  }

  function handleCountTaskChecked(isChecked: boolean) {
    if (isChecked) {
      setIsChecked(true);
      setCountTaskComplete(state => {
        return (state += 1);
      });
    } else {
      setIsChecked(false);
      setCountTaskComplete(state => {
        return (state -= 1);
      });
    }
  }

  //variables
  const isNewTaskEmpty = newTodoText.length === 0;

  return (
    <div className={styles.mainContainer}>
      <form className={styles.searchFieldContainer} onSubmit={handleCreateNewTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          name="todo"
          value={newTodoText}
          onChange={handleNewTaskText}
          onInvalid={handleInvalidNewTask}
          required
        />
        <button type="submit" disabled={isNewTaskEmpty}>
          Add
          <PlusCircleIcon />
        </button>
      </form>
      <header>
        <strong className={styles.criadasLabel}>
          Created tasks <span className={styles.badged}>{tasks.length}</span>
        </strong>
        <strong className={styles.concluidasLabel}>
          Completed{' '}
          <span className={styles.badged}>
            {countTaskComplete} of {tasks.length}
          </span>{' '}
        </strong>
      </header>
      <main>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map(todo => {
              return (
                <li key={todo.id}>
                  <TaskCheckBox
                    task={todo}
                    onTaskDelete={handleDeleteTask}
                    onTaskChecked={handleCountTaskChecked}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.emptyTodosContainer}>
            <img src={ImgClipboard} alt="Clipboard" />
            <strong>You don't have tasks registered yet</strong>
            <p>Create tasks and organize your to-do items</p>
          </div>
        )}
      </main>
    </div>
  );
};
