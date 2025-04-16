import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

// publicRoutes : 인증 없이 접근 가능한 라우트 
const publicRoutes: RouteObject[] = [
  {
    path: "", 
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path:"login", element:<LoginPage/>},
      {path: "signup", element: <SignupPage/>},
      {path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/>},
    ], // Outlet이 렌더링 되는 곳 
  },
];

// protectRoutes : 인증이 필요한 라우트 
const protectRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "my",
        element: <MyPage/>,
      }
    ], 
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectRoutes]);


function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
