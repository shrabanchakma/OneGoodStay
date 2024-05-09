import Heading from "../Shared/Heading.jsx";
import { categories } from "./CategoriesData.js";
import CategoryBox from "./CategoryBox.jsx";
const Categories = () => {
  console.log(categories);
  return (
    <div>
      <Heading label="Categories" />
      <div className="flex items-center justify-evenly h-24">
        {categories.map((category, idx) => (
          <CategoryBox key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
