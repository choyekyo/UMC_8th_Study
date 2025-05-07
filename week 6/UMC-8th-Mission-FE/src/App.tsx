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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage2 from './pages/HomePage2';
import LpDetailPage from './pages/LpDetatilPage';

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
      },
      { 
        path: "lp/:id", 
        element: <LpDetailPage /> 
      },
    ], 
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/> } 
    </QueryClientProvider>
  );
}

export default App
