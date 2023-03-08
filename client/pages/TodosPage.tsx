import {Box} from "@mantine/core";
import AddGroup from "../components/AddGroup";
import ListGroups from "../components/ListGroups";
import App, {ENDPOINT} from "../src/App";
import {useContext, useEffect, useState} from "react";




function TodosPage() {


    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    async function getGroups() {
        const updated = await fetch(`${ENDPOINT}/groups`, {
            method: 'GET',
        }).then(response => response.json())
        await setGroups(updated)
    }

    return (
        <Box
            sx={(theme) => ({
                padding: '2rem',
                width: '100%',
                maxWidth: '75rem',
                margin: '0 auto',

            })}
        >
            <AddGroup setGroups={setGroups}/>
            <ListGroups groups={groups} setGroups={setGroups} />
        </Box>

    )
}

export default TodosPage