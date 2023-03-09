import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import TodosPage from "../pages/TodosPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Header from "../components/Header";
import AuthContext, {AuthProvider} from "../context/AuthContext";


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

// const fetcher = (url: string, init?: RequestInit) => fetch(`${ENDPOINT}${url}`, init).then(response => response.json())


function App() {

  // const {data, mutate} = useSWR<Todo[]>('/posts',fetcher)


    return (
        <Router>
            <AuthProvider>

            <Header/>
            <Routes>

                <Route path="/" element={<TodosPage/>}/>

                <Route path="/login/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
            </AuthProvider>
        </Router>

  )
}

export default App
