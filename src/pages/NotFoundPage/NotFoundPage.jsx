import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Ooops the page is not found</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
};
export default NotFoundPage;
