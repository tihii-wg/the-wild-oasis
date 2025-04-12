import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ options }) {
  const [searchParam, setSearchParams] = useSearchParams();

  function handleChenge(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParams(searchParam);
  }
  const sortValue = searchParam.get("sortBy") || "";

  return (
    <Select
      options={options}
      type="white"
      value={sortValue}
      onChange={handleChenge}
    />
  );
}

export default SortBy;
