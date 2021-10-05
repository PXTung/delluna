import { TypeContext } from "../../context/Type";

const Type = () => {
  return (
    <ul className="header-menu">
      <TypeContext.Consumer>
        {({ types }) =>
          types.map((type) => {
            return (
              <li className="header-item" key={type.id}>
                <a href={"/product/type/" + type.name} className="navbar-link">
                  {type.name}
                </a>
              </li>
            );
          })
        }
      </TypeContext.Consumer>
    </ul>
  );
};

export default Type;
