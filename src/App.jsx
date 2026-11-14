import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportItem from "./pages/ReportItem";
import ItemDetails from "./pages/ItemDetails";
import MyItems from "./pages/MyItems";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";

export default function App(){
 return <Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route element={<ProtectedRoute/>}><Route element={<Layout/>}>
   <Route path="/" element={<Home/>}/><Route path="/report" element={<ReportItem/>}/><Route path="/items/:id" element={<ItemDetails/>}/><Route path="/my-items" element={<MyItems/>}/><Route path="/notifications" element={<Notifications/>}/><Route path="/admin" element={<Admin/>}/>
  </Route></Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}