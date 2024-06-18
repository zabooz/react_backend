import { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "Hahahaha";
  });
  return (
    <div>
      <label htmlFor="select" className="form-label">
        Choose
      </label>
      <select
        name="select"
        id="select"
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="clothing">Clothing</option>
        <option value="household">household</option>
      </select>
      <ProductList
        category={category}
      ></ProductList>
      <input ref={ref} type="text" className="form-control" />
    </div>
  );
}

export default App;
