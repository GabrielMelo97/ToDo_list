import { CheckCircle, Circle, PlusCircle, Trash } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import styles from './Tasks.module.css';

import ListIcon from '../assets/Clipboard.svg';

export default function Tasks(){

  interface TaskListProps {
    id: number;
    text: string;
    checked: boolean;
  }

  const [taskList, setTaskList] = useState<TaskListProps[]>([])

  const [newTask, setNewTask] = useState('');

  function handleNewTask(e: FormEvent){
    e.preventDefault();
    const newArrayNewTask = [
      ...taskList,
      {
        id: taskList.length + 1,
        text: newTask,
        checked: false
      }
    ]

    setTaskList(newArrayNewTask);
    setNewTask('');
  }

  function handleCheckTask(id:number){
    const newArraTaskCheck = taskList.map(task => {
      if(task.id === id){
        task.checked = !task.checked
      }

      return task;
    })

    setTaskList(newArraTaskCheck)
  }

  function handleDeleteTask(id:number){
    const newArrayDeleteTask = taskList.filter(task => task.id !== id)

    setTaskList(newArrayDeleteTask)
  }

  const tasksChecked = taskList.filter(task => task.checked == true).length;
  const newTaskEmpty = newTask == '' && true;
  
  return(
    <div className={styles.container}>
      <form onSubmit={handleNewTask}>
        <div className={styles.taskBar}>
          <input 
            type="text" 
            value={newTask} 
            onChange={e => setNewTask(e.target.value)} 
            placeholder='Adicione uma nova tarefa' 
            required
          />
          <button type='submit' disabled={newTaskEmpty}>
            Criar
            <PlusCircle size={20} weight="regular" />
          </button>
        </div>
      </form>

      <div className={styles.legendTasks}>
        <strong className={styles.taskCreate}>
          Tarefas criadas
          <span>{taskList.length}</span>
        </strong>

        <strong className={styles.taskCheck}>
          Concluídas
          <span>{tasksChecked} de {taskList.length}</span>
        </strong>
      </div>

      <ul className={styles.listTasks}>
        {taskList.length == 0 && (
          <div className={styles.listEmpty}>
            <img src={ListIcon} alt="list icon" />
            <div className={styles.textEmpty}>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p> Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
        {taskList.map(task => (   
          <li key={task.id}>
            <div className={styles.taskContainer}>
              <button type='button' onClick={() => handleCheckTask(task.id)}>

                {task.checked ?
                  (
                    <CheckCircle 
                      color='#5E60CE'
                      weight="fill" 
                      size={20} 
                      className={styles.checkTask} 
                    />
                   
                  )
                    :
                  (
                    <Circle 
                      weight="duotone" 
                      size={20} 
                      className={styles.checkTask} 
                    />
                  )
                }
               
              </button>

              {task.checked == true ?
                (
                  <p className={styles.textChecked}>
                    {task.text}
                  </p>
                )
                  :
                (
                  <p>
                    {task.text}
                  </p>
                )
              }

            </div>
            <button type='button' onClick={() => handleDeleteTask(task.id)} className={styles.trashButton}>
              <Trash 
                className={styles.trash} size={20} 
              />
            </button>
          </li>
        ))}

      </ul>
    </div>
  )
}