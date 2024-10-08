import { useState } from "react";
import ConjugationCheckTab from "./ConjugationCheckTab";
import ConjugationLearnTab from "./ConjugationLearnTab";
import ConjugationLearnAnki from "./ConjugationLearnAnki";
import { verbs } from "./types";

const App = () => {
  const [ currentTabState, setCurrentTabState ] = useState("learn");
  const [ learn, setLearn ] = useState(verbs);
  const [ newVerb, setNewVerb ] = useState("");

  const deleteItem = (index: number) => {
    setLearn((prevState) => {
      const learnVerbs = [...prevState];
      learnVerbs.splice(index, 1);
      return learnVerbs;
    });
  }

  const addNewItem = () => {
    setLearn((prevState) => {
      const learnVerbs = [...prevState];
      learnVerbs.push(newVerb);
      setNewVerb("");
      return learnVerbs;
    });

  }

  return (
    <>
     <ConjugationLearnAnki verbs={learn}></ConjugationLearnAnki>
     <div className="verbs-list">
      {learn.map((item, index) => {
          return  <div key={item}>{item} = {index} <button onClick={()=>deleteItem(index)}>delete</button></div>;
        })}
     </div>

      <div>
        <input type="text" value={newVerb} onChange={(e)=>setNewVerb(e.target.value)} />
        <button onClick={addNewItem}>Add</button>
      </div>
  
      <div className="App">
        <button onClick={() => setCurrentTabState("learn")}>Learn</button> 
        <button onClick={() => setCurrentTabState("check")}>Check</button>
        {currentTabState === "check" && <ConjugationCheckTab verbs={learn}></ConjugationCheckTab>}
        {currentTabState === "learn" && <ConjugationLearnTab verbs={learn}></ConjugationLearnTab>}
      </div>
    </>
  );
}

export default App;
