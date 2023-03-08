import React, {useContext, useState} from "react";
import {useForm} from '@mantine/form'
import {Button, Group, Modal, Textarea, TextInput} from "@mantine/core";
import {ENDPOINT} from "../src/App";
import AuthContext from "../context/AuthContext";




function AddTodo({ setTodos, groupID }:  { setTodos:  React.Dispatch<React.SetStateAction<never[]>>, groupID: number }) {
    const [open, setOpen] = useState(false)

    let { user }:any = useContext(AuthContext);
    const userObj = JSON.parse(user)

    const form = useForm({
        initialValues:{
            text: '',
            user_id: userObj?.ID,
            group_id: groupID,
        }
    })

    async function createTodo(values: {text: string, user_id: number, group_id: number}) {
        const updated = await fetch(`${ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        }).then(response => response.json())

        await setTodos(updated)
        form.reset()
        setOpen(false)
    }

    return <>
        <Modal opened={open}
               onClose={() => setOpen(false)}
               title="Create todo">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput
                    required
                    mb={12}
                    label="Todo"
                    placeholder="What do you want to do?"
                    {...form.getInputProps("text")}/>
                {/*<Textarea*/}
                {/*    required*/}
                {/*    mb={12}*/}
                {/*    label="Body"*/}
                {/*    placeholder="Tell me more..."*/}
                {/*    {...form.getInputProps("body")}/>*/}
                <Button type="submit">Create todo</Button>
            </form>
        </Modal>
        <Group position="center">
            <Button fullWidth variant="outline" mb={12} onClick={() => setOpen(true)}>
                ADD TODO
            </Button>
        </Group>
    </>
}

export default  AddTodo