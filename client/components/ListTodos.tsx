import {ActionIcon, List, Text} from '@mantine/core'
import {CheckCircleFillIcon, RepoDeletedIcon} from "@primer/octicons-react";
import {ENDPOINT, Todo} from "../src/App";
import AddTodo from "./AddTodo";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import GroupTitle from "./GroupTitle";


function ListTodos({groupID, group, deleteGroup}:
                       {
                           groupID: number,
                           group:any,
                           deleteGroup: any
                       }) {

    let { user }:any = useContext(AuthContext);
    const userObj = JSON.parse(user)

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (userObj.ID !== null) {
            GetPostsFromGroup(groupID, userObj.ID);
        }

    }, [group]);


    async function GetPostsFromGroup(ID: number, userObjID: number) {

        const updated = await fetch(`${ENDPOINT}/group/posts`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ID": ID,
                "user_id": userObjID
            })
        }).then(response => response.json())
        if (updated !== null) {
            await setTodos(updated)
        }


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

            <List >
                <GroupTitle group={group} deleteGroup={deleteGroup}/>
                {todos?.map((todo:Todo) => {


                    return (<List.Item
                        key={`todo_list__${todo.ID}`}>

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
                    </List.Item>)
                })}
                <AddTodo setTodos={setTodos} groupID={groupID}/>
            </List>
    )
}

export default ListTodos