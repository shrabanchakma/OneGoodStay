import PropTypes from "prop-types";
const CategoryBox = ({ category }) => {
  return (
    <div className="h-auto flex flex-col items-center hover:cursor-pointer border-b-4 border-transparent transition-color ease-out duration-150 hover:border-[#e41b43]">
      {<category.icon className="text-3xl" />}
      <p>{category.label}</p>
    </div>
  );
};

CategoryBox.propTypes = {
  category: PropTypes.object,
};

export default CategoryBox;
