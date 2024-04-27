import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
// import PostsPage from "./pages/posts/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import CreatePostPage from "./pages/createPost/CreatePostPage";
import PostDetailsPage from "./pages/posts/PostDetailsPage";
import CategoryPage from "./pages/category/CategoryPage";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import ReviewsTable from "./pages/admin/ReviewsTable";
import OrdersTable from "./pages/admin/OrdersTabel";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetForgotPasswordPage from "./pages/auth/ResetForgotPasswordPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import CartPage from "./pages/cart/CartPage";
import OrdersPage from "./pages/orders/OrdersPage";
import EmailVerification from "./pages/emailVerification/EmailVerification";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter className="App">
      <ToastContainer theme="dark" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/cart" element={<CartPage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup/:userId/verify/:token"
          element={!user ? <EmailVerification /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-forgot-password/:userId/:token"
          element={<ResetForgotPasswordPage />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/orders/:id"
          element={user ? <OrdersPage /> : <Navigate to="/" />}
        />
        {/* <Route path="/posts" element={<PostsPage />} /> */}
        <Route path="posts">
          {/* TODO create-post on navlinks */}
          <Route
            path="create-product"
            element={user ? <CreatePostPage /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetailsPage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
        </Route>
        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="reviews-table"
            element={user?.isAdmin ? <ReviewsTable /> : <Navigate to="/" />}
          />
          <Route
            path="orders-table"
            element={user?.isAdmin ? <OrdersTable /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
