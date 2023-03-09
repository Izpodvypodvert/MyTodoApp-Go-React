import {Box} from "@mantine/core";
import AddGroup from "../components/AddGroup";
import ListGroups from "../components/ListGroups";
import App, {ENDPOINT} from "../src/App";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";




function TodosPage() {

    let { user }:any = useContext(AuthContext);
    const userObj = JSON.parse(user)
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (userObj.ID !== null) {
            getGroups(userObj.ID);
        }
    }, []);

    async function getGroups(userObjID: number) {
        const updated = await fetch(`${ENDPOINT}/groups`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_id": userObjID
            })
        }).then(response => response.json())
        await setGroups(updated)
    }

    return (
        <Box
            sx={(theme) => ({
                backgroundColor:  'dark',
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,

            })}
        >
            <AddGroup setGroups={setGroups}/>
            <ListGroups groups={groups} setGroups={setGroups} />
        </Box>

    )
}

export default TodosPage