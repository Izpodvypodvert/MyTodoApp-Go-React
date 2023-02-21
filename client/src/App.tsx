import './App.css'
import {Box} from '@mantine/core'
import useSWR from "swr"
import AddGroup from "../components/AddGroup";
import ListGroups from "../components/ListGroups";
import {useEffect, useState} from "react";

export interface Todo {
    ID: number
    text: string
    user_id: number
    group_id: number
    done: boolean
}

export interface Groups {
    ID: number
    Title: string
    user_id: number
    todos: Todo[]
}


export const ENDPOINT = 'http://localhost:3000'

const fetcher = (url: string, init?: RequestInit) => fetch(`${ENDPOINT}${url}`, init).then(response => response.json())

function App() {

  // const {data, mutate} = useSWR<Todo[]>('/posts',fetcher)

    // const {data: groups, mutate: setGroups} = useSWR<Groups[]>('/groups', fetcher)
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
                maxWidth: '40rem',
                margin: '0 auto',

            })}
        >
            <AddGroup setGroups={setGroups}/>
            <ListGroups groups={groups} setGroups={setGroups} />
        </Box>

  )
}

export default App




// <Grid container spacing={2} minHeight={160}>
//     {[...Array(5)].map((_, i) =>
//     <Grid xs key={i + "__Grid"} item={true} display="flex" justifyContent="center" alignItems="center">
//         <Container key={i + "__Container"}>
//             <ListTodos mutate={mutate} data={data} key={i + "__ListTodos"}/>
//
//             <AddTodo mutate={mutate} key={i + "__AddTodo"}/>
//         </Container>
//     </Grid>
// )}
// </Grid>