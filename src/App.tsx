import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = { id: string, title: string }

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksType = {
    [key: string]: {
        data: TaskType[]
        filter: FilterValuesType
    }
}

export const App = ()=> {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})

    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(task => task.id !== taskId) } })
    }

    function addTask(todolistId: string, title: string) {
        let newTask: TaskType = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]} })

    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.map(task => task.id === taskId ? {...task, isDone: newIsDone} : task)}})
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter}})
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id].data}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}
