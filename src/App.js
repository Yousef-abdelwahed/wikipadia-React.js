import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [terms, setTerms] = useState("");
  const [resalt, setResalt] = useState([]);
  useEffect(() => {
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: terms,
        },
      });
      let query = respond.data.query.search;
      setResalt(query);
    };
    return () => {
      if (terms) {
        search();
      }
    };
  }, [terms]);
  const fetchResults = resalt.map((el) => {
    return (
      <tr key={el.pageid}>
        <td>{el.id}</td>
        <td>{el.title}</td>
        <td>{el.snippet}</td>
        <td>
          <span dangerouslySetInnerHTML={ />
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col ">
            <label className="my-2 fw-bold" htmlFor="searcj">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter title "
              required
              onChange={(e) => setTerms(e.target.value)}
              value={terms}
            ></input>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
            <tbody>{fetchResults}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
