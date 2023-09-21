
import { useReducer, useState } from 'react';
import { getConjugation, Person0To5 } from 'spanish-verbs';
import { verbs, TTenses, tenses } from './types';

type Props = {
  verbs: string[];
}

interface IVerbItem {
  id: Person0To5;
  value: string;
  check: boolean;
}

type TVerbCheck = {
  check: boolean,
  values: IVerbItem[],
}

const initialValues:TVerbCheck  = {
  check: false,
  values: [
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
  ]
};

const reducer = (state:TVerbCheck, action: {
  tense?: TTenses;
  verb?: string;
  value?: any;
  type?: any;
  id?: any; 
}) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      return {
        ...state,
        values: state.values.map(item => {
          return item.id === action.id ? { ...item, value: action.value } : item;
        })
      };
    case "RESET_ITEMS":
      return {
        ...state,
        check: false,
        values: state.values.map(item => {
          return { ...item, check: false, value: "" };
        })
      };
    case "CHECK_ITEMS":
      return {
        ...state,
        check: true,
        values: state.values.map(item => {
          return getConjugation(action.verb ?? "", action.tense ?? "INDICATIVE_PRESENT", item.id) === item.value ? { ...item, check: true } : { ...item, check: false };
        })
      }
    default:
      return state;
  }
};

const ConjugationCheckTab = ({ verbs }: Props) => {
  const getRandomVerb = () => {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }
  const [currentTenseState, setCurrentTenseState] = useState<TTenses>("INDICATIVE_PRESENT");
  const [verbState, setVerbState] = useState(getRandomVerb());
  const [conjugation, dispatch] = useReducer(reducer, initialValues);

  const changeTense = (tense:string) => {
    dispatch({ type: "RESET_ITEMS" });
    setCurrentTenseState(tense as TTenses)
  }

  const setConjugationVerb = (index: number, value: string) => {
    dispatch({ type: "UPDATE_ITEM", id: index, value: value });
  }

  const chceck = () => {
    dispatch({ type: "CHECK_ITEMS", verb: verbState, tense: currentTenseState });
  }

  const textToSpeach = (text: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "es-ES";
    msg.text = text;
    msg.rate = 0.07;
    window.speechSynthesis.speak(msg);
}

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
                    <td><input value={conjugation.values[0].value} onChange={(event)=> setConjugationVerb(0, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[0].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 0))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                        <div><em>tu</em></div>
                        <div><strong>you</strong></div>
                    </td>
                    <td><input value={conjugation.values[1].value} onChange={(event)=> setConjugationVerb(1, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[1].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 1))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                        <div><em>él, ella, usted</em></div>
                        <div><strong>he, she, you (formal)</strong></div>
                    </td>
                    <td><input value={conjugation.values[2].value} onChange={(event)=> setConjugationVerb(2, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[2].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />
                    {conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 2))}>Listen</button>}
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>nosotros / nosotras</em></div>
                      <div><strong>we</strong></div>
                      </td>
                    <td><input value={conjugation.values[3].value} onChange={(event)=> setConjugationVerb(3, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[3].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 3))}>Listen</button>}</td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>vosotros / vosotras</em></div>
                      <div><strong>you</strong></div>
                      </td>
                    <td><input value={conjugation.values[4].value} onChange={(event)=> setConjugationVerb(4, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[4].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 4))}>Listen</button>}</td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>ellos / ellas / ustedes</em></div>
                      <div><strong>they</strong></div>
                    </td>
                    <td><input value={conjugation.values[5].value} onChange={(event)=> setConjugationVerb(5, event.target.value)} style={{ borderColor: conjugation.check ? conjugation.values[5].check ? "green" : "red" : "inherit"}} className="conjugation-input" type="text" placeholder="inser word in right form" />{conjugation.check && <button onClick={()=>textToSpeach(getConjugation(verbState, currentTenseState, 5))}>Listen</button>}</td>
                </tr>
            </tbody>
        </table>
        { !conjugation.check && <button onClick={()=> chceck()}>Chcek</button> }
        { conjugation.check && <>
          <button onClick={()=> {
            dispatch({ type: "RESET_ITEMS" });
          }}>Restart</button>
        <button onClick={()=> {
          setVerbState(getRandomVerb())
          dispatch({ type: "RESET_ITEMS" });
          }}>Next</button>
        </> }
        
    </div>
  );
}

export default ConjugationCheckTab;