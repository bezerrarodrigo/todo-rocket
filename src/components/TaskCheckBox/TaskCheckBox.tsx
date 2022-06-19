import { TrashIcon } from '@heroicons/react/outline';
import { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';

type Todo = {
  id: string;
  content: string;
  isComplete?: boolean;
};

type TaskCheckBoxProps = {
  task: Todo;
  onTaskDelete: (id: string) => void;
  onTaskChecked: (isChecked: boolean) => void;
};

export function TaskCheckBox({
  task,
  onTaskDelete,
  onTaskChecked,
}: TaskCheckBoxProps) {
  //states
  const [checked, setChecked] = useState(false);

  //functions
  function handleCompleteTask(event: ChangeEvent) {
    setChecked(!checked);
    onTaskChecked(!checked);
  }

  return (
    <div className={styles.cardContainer}>
      <div>
        <input
          name={task.content}
          type="checkbox"
          value={task.content}
          onChange={e => handleCompleteTask(e)}
        />
        <label className={checked ? styles.taskChecked : ''} htmlFor={task.content}>
          {task.content}
        </label>
      </div>
      <button onClick={e => onTaskDelete(task.id)}>
        <TrashIcon height={24} />
      </button>
    </div>
  );
}
