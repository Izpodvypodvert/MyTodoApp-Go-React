import {ActionIcon, Text} from '@mantine/core'
import  {KeyedMutator} from "swr"
import { v4 as uuidv4 } from 'uuid';
import { RepoDeletedIcon} from "@primer/octicons-react";
import {ENDPOINT, Groups, Todo} from "../src/App";
import Grid from "@mui/material/Grid";
import ListTodos from "./ListTodos";
import React, {useEffect, useState} from "react";


function ListGroups({
                        groups,
                        setGroups,
                    }: {
    groups: Groups[] | undefined,
    setGroups:  React.Dispatch<React.SetStateAction<never[]>>,
}) {

    async function deleteGroup(ID: number) {
        const updated = await fetch(`${ENDPOINT}/group/delete/${ID}`, {
            method: 'DELETE',
        }).then(response => response.json())

        await setGroups(updated)
    }



    return (

        <Grid container spacing={2} minHeight={160}>
            {groups?.map((group: Groups) => {


                return (
                    <Grid xs key={uuidv4() + "__Grid"} item={true} display="flex" justifyContent="center"
                          alignItems="center">

                        {/*<div style={{display: 'flex'}}>*/}
                            <Text color="white">{group.Title}</Text>

                            <ActionIcon onClick={() => deleteGroup(group.ID)} color="green" size={24} radius="xl">
                                <RepoDeletedIcon size={20}/>
                            </ActionIcon>

                        {/*</div>*/}
                        <ListTodos key={uuidv4() + "__ListTodos"} groupID={group.ID}/>
                    </Grid>
                )
            })}
        </Grid>

    )
}

export default ListGroups