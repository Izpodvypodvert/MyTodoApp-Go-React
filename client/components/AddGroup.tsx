import React, {useState} from "react";
import {useForm} from '@mantine/form'
import {Button, Modal, Group, TextInput} from "@mantine/core";
import {ENDPOINT} from "../src/App";




function AddGroup({ setGroups }:  { setGroups: React.Dispatch<React.SetStateAction<never[]>> }) {
    const [open, setOpen] = useState(false)

    const formGroups = useForm({
        initialValues:{
            Title: '111',
            user_id: 1,
        }
    })

    async function createGroup(values: {Title: string, user_id: number}) {

        const updated = await fetch(`${ENDPOINT}/group/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        }).then(response => response.json())

        await setGroups(updated)
        formGroups.reset()
        setOpen(false)
    }

    return <>
        <Modal opened={open}
               onClose={() => setOpen(false)}
               title="Create group">
            <form onSubmit={formGroups.onSubmit(createGroup)}>
                <TextInput
                    required
                    mb={12}
                    label="Group"
                    placeholder="What do you want to do?"
                    {...formGroups.getInputProps("title")}/>
                <Button type="submit">Create group</Button>
            </form>
        </Modal>
        <Group position="center">
            <Button fullWidth variant="outline" mb={12} onClick={() => setOpen(true)}>
                Create new group
            </Button>
        </Group>
    </>
}

export default  AddGroup