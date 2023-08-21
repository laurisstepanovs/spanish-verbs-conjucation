import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { getConjugation, Person0To5 } from 'spanish-verbs';

interface IVerbItem {
  id: Person0To5;
  value: string;
  check: boolean;
}

type TTenses = "INDICATIVE_PRESENT" |
"INDICATIVE_IMPERFECT" |
"INDICATIVE_PRETERITE" |
"INDICATIVE_FUTURE" |
"INDICATIVE_PERFECT" |
"INDICATIVE_PLUPERFECT" |
"INDICATIVE_FUTURE_PERFECT" |
"INDICATIVE_PRETERITE_PERFECT" |
"SUBJUNCTIVE_PRESENT" |
"SUBJUNCTIVE_IMPERFECT_RA" |
"SUBJUNCTIVE_IMPERFECT_SE" |
"SUBJUNCTIVE_FUTURE" |
"SUBJUNCTIVE_PERFECT" |
"SUBJUNCTIVE_PLUPERFECT" |
"SUBJUNCTIVE_FUTURE_PERFECT" |
"CONDITIONAL_PRESENT" |
"CONDITIONAL_PERFECT"

const initialValues: IVerbItem[] = [
  {
    id: 0,
    value: "",
    check: false,
  },
  {
    id: 1,
    value: "",
    check: false,
  },
  {
    id: 2,
    value: "",
    check: false,
  },
  {
    id: 3,
    value: "",
    check: false,
  },
  {
    id: 4,
    value: "",
    check: false,
  },
  {
    id: 5,
    value: "",
    check: false,
  },
];

const reducer = (state:IVerbItem[], action: {
  tense?: TTenses;
  verb?: string;
  value?: any;
  type?: any;
  id?: any; 
}) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      return state.map(item => {
        return item.id === action.id ? { ...item, value: action.value } : item;
      });
    case "RESET_ITEMS":
      return state.map(item => {
        return { ...item, check: false, value: "" };
      });
    case "CHECK_ITEMS":
      return state.map(item => {
        return getConjugation(action.verb ?? "", action.tense ?? "INDICATIVE_PRESENT", item.id) === item.value ? { ...item, check: true } : { ...item, check: false };
      })
    default:
      return state;
  }
};

const tenses = [
  "INDICATIVE_PRESENT",
  "INDICATIVE_IMPERFECT",
  "INDICATIVE_PRETERITE",
  "INDICATIVE_FUTURE",
  "INDICATIVE_PERFECT",
  "INDICATIVE_PLUPERFECT",
  "INDICATIVE_FUTURE_PERFECT",
  "INDICATIVE_PRETERITE_PERFECT",
  "SUBJUNCTIVE_PRESENT",
  "SUBJUNCTIVE_IMPERFECT_RA",
  "SUBJUNCTIVE_IMPERFECT_SE",
  "SUBJUNCTIVE_FUTURE",
  "SUBJUNCTIVE_PERFECT",
  "SUBJUNCTIVE_PLUPERFECT",
  "SUBJUNCTIVE_FUTURE_PERFECT",
  "CONDITIONAL_PRESENT",
  "CONDITIONAL_PERFECT"
];

const App = () => {
  const verbs = [
    "ser",
    "haber",
    "estar",
    "tener",
    "ir",
    "saber",
    "dar",
    "hacer",
    "poder",
    "decir",
  ];

  const getRandomVerb = () => {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }

  const [checked, setChecked] = useState(false);
  const [currentTenseState, setCurrentTenseState] = useState<TTenses>("INDICATIVE_PRESENT");
  const [verbState, setVerbState] = useState(getRandomVerb());
  const [conjugation, dispatch] = useReducer(reducer, initialValues);

  const changeTense = (tense:string) => {
    dispatch({ type: "RESET_ITEMS" });
    setChecked(false);
    setCurrentTenseState(tense as TTenses)
  }

  const setConjugationVerb = (index: number, value: string) => {
    dispatch({ type: "UPDATE_ITEM", id: index, value: value });
  }

  const chceck = () => {
    setChecked(true);
    dispatch({ type: "CHECK_ITEMS", verb: verbState, tense: currentTenseState });
  }

  const textToSpeach = (text: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "es-ES";
    msg.text = text;
    msg.rate = 0.07;
    window.speechSynthesis.speak(msg);
}

  useEffect(()=>{
    console.log(getConjugation(verbState, currentTenseState, 0));
    console.log(getConjugation(verbState, currentTenseState, 1));
    console.log(getConjugation(verbState, currentTenseState, 2));
    console.log(getConjugation(verbState, currentTenseState, 3));
    console.log(getConjugation(verbState, currentTenseState, 4));
    console.log(getConjugation(verbState, currentTenseState, 5));
  })

  return (
    <div className="App">
      <h1>VERB - {verbState}</h1>

      <select name="tenses" id="tenses" onChange={(event) => changeTense(event.target.value)}>
        { tenses.map(item => {
          return <option key={item} value={item}>{item}</option>
        }) }
      </select>

      <table>
            <tbody>
                <tr>
                    <td className="personal">
                        <div><em>yo</em></div>
                        <div><strong>I</strong></div>
                    </td>
                    <td><input value={conjugation[0].value} onChange={(event)=> setConjugationVerb(0, event.target.value)} style={{ borderColor: checked ? conjugation[0].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 0))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                        <div><em>tu</em></div>
                        <div><strong>you</strong></div>
                    </td>
                    <td><input value={conjugation[1].value} onChange={(event)=> setConjugationVerb(1, event.target.value)} style={{ borderColor: checked ? conjugation[1].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 1))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                        <div><em>él, ella, usted</em></div>
                        <div><strong>he, she, you (formal)</strong></div>
                    </td>
                    <td><input value={conjugation[2].value} onChange={(event)=> setConjugationVerb(2, event.target.value)} style={{ borderColor: checked ? conjugation[2].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 2))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>nosotros / nosotras</em></div>
                      <div><strong>we</strong></div>
                      </td>
                    <td><input value={conjugation[3].value} onChange={(event)=> setConjugationVerb(3, event.target.value)} style={{ borderColor: checked ? conjugation[3].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 3))}>Listen</button>}</td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>vosotros / vosotras</em></div>
                      <div><strong>you</strong></div>
                      </td>
                    <td><input value={conjugation[4].value} onChange={(event)=> setConjugationVerb(4, event.target.value)} style={{ borderColor: checked ? conjugation[4].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 4))}>Listen</button>}</td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>ellos / ellas / ustedes</em></div>
                      <div><strong>they</strong></div>
                    </td>
                    <td><input value={conjugation[5].value} onChange={(event)=> setConjugationVerb(5, event.target.value)} style={{ borderColor: checked ? conjugation[5].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{checked && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 5))}>Listen</button>}</td>
                </tr>
            </tbody>
        </table>
        { !checked && <button onClick={()=> chceck()}>Chcek</button> }
        { checked && <>
          <button onClick={()=> {
            dispatch({ type: "RESET_ITEMS" });
            setChecked(false);
          }}>Restart</button>
        <button onClick={()=> {
          setVerbState(getRandomVerb())
          dispatch({ type: "RESET_ITEMS" });
          setChecked(false);
          }}>Next</button>
        </> }
        
    </div>
  );
}

export default App;
