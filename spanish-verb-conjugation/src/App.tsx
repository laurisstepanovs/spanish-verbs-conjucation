import { useState } from "react";
import ConjugationCheckTab from "./ConjugationCheckTab";
import ConjugationLearnTab from "./ConjugationLearnTab";

const App = () => {
  const [ currentTabState, setCurrentTabState ] = useState("learn");

  return (
    <div className="App">
      <button onClick={()=>setCurrentTabState("learn")}>Learn</button>  
      <button onClick={()=>setCurrentTabState("check")}>Check</button>
      {currentTabState === "check" && <ConjugationCheckTab></ConjugationCheckTab>}
      {currentTabState === "learn" && <ConjugationLearnTab></ConjugationLearnTab>}
    </div>
  );
}

export default App;
