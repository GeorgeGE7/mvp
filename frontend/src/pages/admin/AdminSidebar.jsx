import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="admin-dashboard" className="btn-alt admin-sidebar-title">
        <h2>Dashboard</h2>
      </Link>
      <ul className="admin-dashboard-list">
        <Link className="btn-alt" to="/admin-dashboard/users-table">Users</Link>
        <Link className="btn-alt" to="/admin-dashboard/posts-table">Products</Link>
        <Link className="btn-alt" to="/admin-dashboard/categories-table">Categories</Link>
        <Link className="btn-alt" to="/admin-dashboard/reviews-table">Reviews</Link>
        <Link className="btn-alt" to="/admin-dashboard/orders-table">Orders</Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
