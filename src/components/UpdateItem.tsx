import {useState} from 'react';
import {Input} from "./Input";
import styles from '../Styles.module.css';

type UpdateRouteProps = {
    oldTitle: string;
    callBack: (newTitle: string) => void;
};

export const UpdateItem = ({ oldTitle, callBack }: UpdateRouteProps) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(oldTitle);

    const editHandler = () => {
        callBack(newTitle)
        setEdit(false);
          };

       return (
        edit
            ? <Input newTitle={newTitle} setNewTitle={setNewTitle} editHandler={editHandler}/>
            : <span className={styles.hoverEffect} onDoubleClick={() => setEdit(true)}>{oldTitle}</span>
    );
};


