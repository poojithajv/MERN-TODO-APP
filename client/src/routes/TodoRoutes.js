import AllTodos from '../components/Todos/AllTodos'
import CreateTodo from '../components/Todos/CreateTodo'
import UpdateTodo from '../components/Todos/UpdateTodo'
import { Route } from 'react-router-dom'

const userRoutes = (
    <>
      {/* User Module Routes */}
      <Route exact path="/all_todos" element={<AllTodos />} />
      <Route exact path="/create_todo" element={<CreateTodo />} />
      <Route exact path="/update_todo" element={<UpdateTodo />} />
    </>
  )
  export default userRoutes