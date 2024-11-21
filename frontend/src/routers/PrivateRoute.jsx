import { useAuth } from "../context/Authcontext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// ตรวจสอบว่า userlogin หรือยัง ก่อนจะเข้าถึงเส้นทางอื่น
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <div>...loading</div>;
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

// replace คือ จะกลับไปหน้าก่อนหน้าที่จะเข้าถึง เช่น ปัจจุบัน หน้า/profile เปลี่ยนเป็น /login กด back จะไม่กลับไป /profile แต่กลับไปหน้า /login เอาไว้ป้องกันเวลาuser พิมพ์path ไปหาหน้าที่สำคัญ เช่น หน้า checkout

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children ต้องเป็น node และเป็น required
};

export default PrivateRoute;
