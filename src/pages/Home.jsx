import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Plus, Sparkles, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";
import ItemCard from "../components/ItemCard";
import Loading from "../components/Loading";

const categories = ["ID Card","Wallet","Keys","Electronics","Books","Bag","Clothing","Other"];
const colors = ["Black","White","Blue","Red","Green","Brown","Grey","Other"];
const locations = ["Library","Lara's Cafe","Hostel","Admin Block","Golden Jubilee","Sports Ground","Parking","Other","Unknown"];

export default function Home() {
  const [items,setItems] = useState([]); const [loading,setLoading] = useState(true); const [error,setError] = useState("");
  const [filters,setFilters] = useState({q:"",type:"",category:"",color:"",location:""});
  async function loadItems() { setLoading(true);setError("");try { const {data}=await api.get("/api/items");setItems(Array.isArray(data)?data:[]); }catch(err){setError(getErrorMessage(err));}finally{setLoading(false);} }
  useEffect(()=>{loadItems();},[]);
  const visible = useMemo(()=>items.filter(item=>{
    const q=filters.q.toLowerCase();
    return (!q || [item.description,item.category,item.location,item.color].some(v=>String(v||"").toLowerCase().includes(q)))
      && (!filters.type||item.type===filters.type)&&(!filters.category||item.category===filters.category)&&(!filters.color||item.color===filters.color)&&(!filters.location||item.location===filters.location);
  }),[items,filters]);
  const lost=items.filter(i=>i.type==="lost").length, found=items.filter(i=>i.type==="found").length;
  return <div className="page-stack">
    <section className="hero-panel"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content"><span className="eyebrow light-eyebrow"><Sparkles size={13}/> THE CAMPUS LOST & FOUND</span><h1>Good things<br/>find their <em>way back.</em></h1><p>One place to report, discover and return the things that matter.</p><div className="hero-actions"><Link to="/report" className="button button-white"><Plus size={17}/> Report an item</Link><a href="#browse" className="hero-text-link">Explore listings <span>↓</span></a></div></div><div className="hero-stats"><div><strong>{items.length}</strong><span>Total reports</span></div><div><strong>{lost}</strong><span>Lost items</span></div><div><strong>{found}</strong><span>Found items</span></div></div></section>
    <section className="section-heading" id="browse"><div><span className="eyebrow">CAMPUS COMMUNITY</span><h2>Explore reports</h2><p className="muted">Browse recent reports from around campus.</p></div><button className="icon-button" onClick={loadItems} title="Refresh"><SlidersHorizontal size={18}/></button></section>
    <div className="search-filter-row"><div className="search-box"><Search size={19}/><input placeholder="Search by item, color or location..." value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})}/></div><select aria-label="Type" value={filters.type} onChange={e=>setFilters({...filters,type:e.target.value})}><option value="">All reports</option><option value="lost">Lost</option><option value="found">Found</option></select><select aria-label="Category" value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}><option value="">All categories</option>{categories.map(v=><option key={v}>{v}</option>)}</select><select aria-label="Color" value={filters.color} onChange={e=>setFilters({...filters,color:e.target.value})}><option value="">All colors</option>{colors.map(v=><option key={v}>{v}</option>)}</select><select aria-label="Location" value={filters.location} onChange={e=>setFilters({...filters,location:e.target.value})}><option value="">All locations</option>{locations.map(v=><option key={v}>{v}</option>)}</select></div>
    {error && <div className="alert error">{error} <button onClick={loadItems}>Try again</button></div>}
    {loading ? <Loading label="Loading campus reports..."/> : visible.length ? <div className="items-grid">{visible.map(item=><ItemCard key={item._id} item={item}/>)}</div> : <div className="empty-state"><PackageSearch size={34}/><h3>No reports found</h3><p>Try changing your filters, or be the first to report an item.</p><Link to="/report" className="button button-primary">Report an item</Link></div>}
    <p className="results-note">Showing {visible.length} of {items.length} reports</p>
  </div>;
}