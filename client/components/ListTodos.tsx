import {ActionIcon, List, Text} from '@mantine/core'
import  {KeyedMutator} from "swr"
import { v4 as uuidv4 } from 'uuid';
import {CheckCircleFillIcon, RepoDeletedIcon} from "@primer/octicons-react";
import {ENDPOINT, Todo} from "../src/App";
import AddTodo from "./AddTodo";
import React, {useEffect, useState} from "react";


function ListTodos({groupID}:
                       {
                           groupID: number,
                       }) {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        GetPostsFromGroup(groupID);
    }, []);


    async function GetPostsFromGroup(ID: number) {
        const updated = await fetch(`${ENDPOINT}/group/posts`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"ID": ID})
        }).then(response => response.json())
        await setTodos(updated)
    }

    async function markTodoAsDone(ID: number) {
        const updated = await fetch(`${ENDPOINT}/posts/${ID}/done`, {
            method: 'PATCH',
        }).then(response => response.json())
        await setTodos(updated)
    }

    async function deleteTodo(ID: number) {
        const updated = await fetch(`${ENDPOINT}/posts/${ID}/delete`, {
            method: 'DELETE',
        }).then(response => response.json())
        await setTodos(updated)
    }



    return (

            <List spacing="xs" size="sm" mb={2} center>
                {todos?.map((todo:Todo) => {

                    return <List.Item
                        key={`todo_list__${uuidv4()}`}>

                        <div style={{display: 'flex'}}>
                            <Text color="white">{todo.text}</Text>
                            {todo.done ?
                                (
                                    <ActionIcon onClick={() => markTodoAsDone(todo.ID)} color="teal" size={24}
                                                radius="xl">
                                        <CheckCircleFillIcon size={20}/>
                                    </ActionIcon>
                                ) :
                                (
                                    <ActionIcon onClick={() => markTodoAsDone(todo.ID)} color="gray" size={24}
                                                radius="xl">
                                        <CheckCircleFillIcon size={20}/>
                                    </ActionIcon>
                                )}
                            <ActionIcon onClick={() => deleteTodo(todo.ID)} color="red" size={24} radius="xl">
                                <RepoDeletedIcon size={20}/>
                            </ActionIcon>

                        </div>
                    </List.Item>
                })}
                <AddTodo setTodos={setTodos} groupID={groupID}/>
            </List>
    )
}

export default ListTodos