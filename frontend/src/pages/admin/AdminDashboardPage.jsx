import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import { postActions } from "../../redux/slices/postSlice";
import "./admin.css";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(postActions.hideSearchBar());

  }, []);

  return <main className="admin-dashboard">
    <AdminSidebar />
    <AdminMain />
  </main>;
};

export default AdminDashboardPage;
