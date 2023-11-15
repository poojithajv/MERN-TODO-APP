import { Route } from 'react-router-dom'
import ProtectedRoute from '../middleware/ProtectedRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TodoRoutes from './TodoRoutes'

const routes = (
    <>
      <Route exact path="/login" element={<Login />} /> {/* Login Route */}
      <Route exact path="/" element={<Login />} />{/* Login Route */}
      <Route exact path='/register' element={<Register /> }/>
  
      <Route exact path='*' element={<Login />} />
      <Route exact element={<ProtectedRoute />}>
        {TodoRoutes}
  
      </Route>
    </>
  )
  
  export default routes