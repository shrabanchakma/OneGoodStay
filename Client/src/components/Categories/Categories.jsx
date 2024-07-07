import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading.jsx";
import { categories } from "./CategoriesData.js";
import CategoryBox from "./CategoryBox.jsx";
import queryString from "query-string";
import { useEffect } from "react";
const Categories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const getCategory = (category) => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
      const url = queryString.stringifyUrl({
        url: "/",
        query: { ...currentQuery, category: category },
      });
      navigate(url);
    }
  };
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div>
      <Heading label="Categories" />
      <div className="flex items-center justify-evenly gap-4 h-24 overflow-auto">
        {categories.map((category, idx) => (
          <CategoryBox
            key={idx}
            category={category}
            getCategory={getCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
