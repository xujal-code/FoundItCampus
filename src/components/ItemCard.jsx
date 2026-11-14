import { MapPin, CalendarDays, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imageSrc } from "../services/api";

export default function ItemCard({ item }) {
  const date = item.date ? new Date(item.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "Date not provided";
  return (
    <Link to={`/items/${item._id}`} className="item-card">
      <div className="item-image-wrap">
        {item.imageUrl ? <img src={imageSrc(item.imageUrl)} alt={item.category} className="item-image" /> : <div className="image-placeholder">No image</div>}
        <span className={`type-pill ${item.type}`}>{item.type === "lost" ? "Lost item" : "Found item"}</span>
        <span className="card-arrow"><ArrowUpRight size={17}/></span>
      </div>
      <div className="item-card-body">
        <div className="item-card-top"><span className="item-category">{item.category}</span><span className="item-color">{item.color}</span></div>
        <h3>{item.description}</h3>
        <div className="item-meta"><span><MapPin size={14}/>{item.location}</span><span><CalendarDays size={14}/>{date}</span></div>
      </div>
    </Link>
  );
}