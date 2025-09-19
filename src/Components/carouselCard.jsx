import { FaEdit, FaTrash } from "react-icons/fa";

const CarouselCard = ({ slide, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded-lg p-4 relative mt-11">
    <img src={slide.image} alt={slide.title} className="w-full h-48 object-cover rounded mb-3"/>
    <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
    <p className="text-gray-600 mb-3">{slide.description}</p>
    <div className="flex gap-2">
      <button onClick={() => onEdit(slide)} className="text-blue-600"><FaEdit /></button>
      <button onClick={() => onDelete(slide._id)} className="text-red-600"><FaTrash /></button>
    </div>
  </div>
);

export default CarouselCard;
