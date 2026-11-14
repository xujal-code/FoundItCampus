import { useEffect,useMemo,useState } from "react";
import { Package } from "lucide-react";
import api,{getErrorMessage} from "../services/api";
import { useAuth } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";
import Loading from "../components/Loading";

function decode(token){try{return JSON.parse(atob(token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")));}catch{return null;}}
export default function MyItems(){
 const {token}=useAuth();const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");const [tab,setTab]=useState("all");
 useEffect(()=>{api.get("/api/items").then(({data})=>setItems(Array.isArray(data)?data:[])).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));},[]);
 const userId=decode(token)?.userId;const mine=useMemo(()=>items.filter(i=>String(i.reportedBy?._id||i.reportedBy)===String(userId)),[items,userId]);const shown=mine.filter(i=>tab==="all"||i.type===tab);
 return <div className="page-stack"><div className="section-heading"><div><span className="eyebrow">YOUR ACTIVITY</span><h1>My reports</h1><p className="muted">Keep track of items you've reported.</p></div></div><div className="tabs"><button className={tab==="all"?"active":""} onClick={()=>setTab("all")}>All reports ({mine.length})</button><button className={tab==="lost"?"active":""} onClick={()=>setTab("lost")}>Lost</button><button className={tab==="found"?"active":""} onClick={()=>setTab("found")}>Found</button></div>{error&&<div className="alert error">{error}</div>}{loading?<Loading/>:shown.length?<div className="items-grid">{shown.map(i=><ItemCard key={i._id} item={i}/>)}</div>:<div className="empty-state"><Package size={34}/><h3>No reports yet</h3><p>Your lost and found reports will appear here.</p></div>}</div>;
}