import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import api,{getErrorMessage} from "../services/api";

const categories=["ID Card","Wallet","Keys","Electronics","Books","Bag","Clothing","Other"];
const colors=["Black","White","Blue","Red","Green","Brown","Grey","Other"];
const locations=["Library","Lara's Cafe","Hostel","Admin Block","Golden Jubilee","Sports Ground","Parking","Other","Unknown"];

export default function ReportItem(){
 const navigate=useNavigate();const [form,setForm]=useState({type:"lost",category:"",color:"",description:"",location:"",date:new Date().toISOString().slice(0,10),verificationQuestion:""});
 const [file,setFile]=useState(null);const [preview,setPreview]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(false);
 function update(k,v){setForm(p=>({...p,[k]:v}));}
 async function submit(e){e.preventDefault();setError("");if(!file){setError("Please add a photo of the item.");return;}if(form.type==="found"&&!form.verificationQuestion.trim()){setError("Add a verification question so the owner can prove the item is theirs.");return;}setLoading(true);
  try{const body=new FormData();Object.entries(form).forEach(([k,v])=>{if(v)body.append(k,v);});body.append("image",file);await api.post("/api/items",body,{headers:{"Content-Type":"multipart/form-data"}});navigate("/");}
  catch(err){setError(getErrorMessage(err));}finally{setLoading(false);}
 }
 return <div className="narrow-page"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to explore</Link><div className="page-title-block"><span className="eyebrow">MAKE A REPORT</span><h1>Let's get it <em>back home.</em></h1><p className="muted">Share a few details so the right person can find it.</p></div>
 <form className="panel form-panel" onSubmit={submit}>
  <div className="form-section"><h3>What are you reporting?</h3><div className="choice-row"><button type="button" className={`choice-card ${form.type==="lost"?"selected":""}`} onClick={()=>update("type","lost")}><span className="choice-icon lost-icon">↗</span><strong>I lost something</strong><small>I'm looking for an item</small></button><button type="button" className={`choice-card ${form.type==="found"?"selected":""}`} onClick={()=>update("type","found")}><span className="choice-icon found-icon">✓</span><strong>I found something</strong><small>I want to return an item</small></button></div></div>
  <div className="form-section"><h3>Item details</h3><div className="form-grid">
   <label>Category<select required value={form.category} onChange={e=>update("category",e.target.value)}><option value="">Choose category</option>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Color<select required value={form.color} onChange={e=>update("color",e.target.value)}><option value="">Choose color</option>{colors.map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Location<select required value={form.location} onChange={e=>update("location",e.target.value)}><option value="">Where?</option>{locations.filter(x=>form.type!=="found"||x!=="Unknown").map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Date {form.type==="lost"?"lost":"found"}<input type="date" required value={form.date} onChange={e=>update("date",e.target.value)}/></label>
  </div><label className="field-full">Description<textarea required minLength="5" rows="4" placeholder="Add details that could help identify the item..." value={form.description} onChange={e=>update("description",e.target.value)}/></label>
  {form.type==="found"&&<label className="field-full">Ownership verification question<input required placeholder="Example: What is the sticker on the back?" value={form.verificationQuestion} onChange={e=>update("verificationQuestion",e.target.value)}/><small className="field-hint">The person claiming this item will answer this question.</small></label>}</div>
  <div className="form-section"><h3>Add a photo</h3><label className="upload-box">{preview?<img src={preview} alt="Selected item" className="upload-preview"/>:<><UploadCloud size={28}/><strong>Click to upload a photo</strong><span>JPG, PNG or WEBP · Keep the item clearly visible</span></>}<input type="file" accept="image/*" required onChange={e=>{const f=e.target.files?.[0];setFile(f||null);setPreview(f?URL.createObjectURL(f):"");}}/></label></div>
  {error&&<div className="alert error">{error}</div>}<div className="form-actions"><button type="button" className="button button-ghost" onClick={()=>navigate("/")}>Cancel</button><button className="button button-primary" disabled={loading}>{loading?"Submitting...":"Submit report"} <ImagePlus size={17}/></button></div>
 </form></div>;
}