import {ENDPOINT, Groups, Todo} from "../src/App";
import Grid from "@mui/material/Grid";
import ListTodos from "./ListTodos";
import React from "react";


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
                    <Grid xs key={group.ID + "__Grid"} item={true} display="flex" justifyContent="center"
                          alignItems="center">


                        <ListTodos groupID={group.ID} group={group} deleteGroup={deleteGroup}/>
                    </Grid>
                )
            })}
        </Grid>

    )
}

export default ListGroups