import "./App.css";
import RootNode from "./components/Root";
import { useContext, useState } from "react";
import { fileContext } from "./context";
import Button from "@mui/material/Button";
function App() {
  const { handleSubmit } = useContext(fileContext);
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <RootNode />
      <div>
        <Button
          className="submit-button"
          variant="contained"
          onClick={() => {
            handleSubmit();
            setShow(true);
          }}
        >
          Submit
        </Button>
        {show && <h5>Check console for paths</h5>}
      </div>
    </div>
  );
}

export default App;
