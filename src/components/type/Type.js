import { TypeContext } from "../../context/Type";
import { Link } from "react-router-dom";

const Type = () => {
  return (
    <ul className="header-menu">
      <TypeContext.Consumer>
        {({ types }) =>
          types.map((type) => {
            return (
              <li className="header-item" key={type.id}>
                <Link to={"/product/type/" + type.name} className="navbar-link">
                  {type.name}
                </Link>
              </li>
            );
          })
        }
      </TypeContext.Consumer>
    </ul>
  );
};

export default Type;
