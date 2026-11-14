import { useEffect,useState } from "react";
import { Bell,Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import api,{getErrorMessage} from "../services/api";
import Loading from "../components/Loading";
export default function Notifications(){
 const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
 useEffect(()=>{api.get("/api/notifications").then(({data})=>setItems(Array.isArray(data)?data:[])).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));},[]);
 return <div className="page-stack"><div className="section-heading"><div><span className="eyebrow">STAY IN THE LOOP</span><h1>Notifications</h1><p className="muted">Updates about claims and your reports.</p></div></div>{error&&<div className="alert error">{error}</div>}{loading?<Loading/>:items.length?<div className="notification-list">{items.map(n=><div className={`notification-row ${n.isRead?"read":""}`} key={n._id}><div className="notification-icon"><Bell size={18}/></div><div><p>{n.message}</p><span><Clock3 size={13}/>{new Date(n.createdAt).toLocaleString()}</span>{n.relatedItem&&<Link to={`/items/${n.relatedItem._id||n.relatedItem}`}>View related item →</Link>}</div><i className={n.isRead?"read-dot":"unread-dot"}/></div>)}</div>:<div className="empty-state"><Bell size={34}/><h3>You're all caught up</h3><p>New claim updates will show up here.</p></div>}<p className="field-hint">Your current backend supports viewing notifications. Mark-as-read is not implemented yet.</p></div>;
}