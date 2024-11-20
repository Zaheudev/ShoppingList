import { Link } from 'react-router-dom';

const ShoppingListCard = ({ list }) => {
  return (
    <div className="shopping-list-card">
      <h3>{list.title}</h3>
      <Link to={`/list/${list._id}`}>View Details</Link>
    </div>
  );
};

export default ShoppingListCard;
