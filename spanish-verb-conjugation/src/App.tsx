import { useEffect } from 'react';
import { getConjugation } from 'spanish-verbs';

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
  const verbs = ["ir", "hablar", "estar"];

  useEffect(()=>{
    console.log(getConjugation('estar', tenses[1], 5));
  })

  const getRandomVerb = () => {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }

  return (
    <div className="App">
      <h1>ENGIISH VERB - {getRandomVerb()}</h1>

      <table>
            <tbody>
                <tr>
                    <td className="personal">
                        <div><em>yo</em></div>
                        <div><strong>I</strong></div>
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>

                </tr>
                <tr>
                    <td className="personal">
                        <div><em>tu</em></div>
                        <div><strong>you</strong></div>
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                        <div><em>él, ella, usted</em></div>
                        <div><strong>he, she, you (formal)</strong></div>
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" />
                    </td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>nosotros / nosotras</em></div>
                      <div><strong>we</strong></div>
                      </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>vosotros / vosotras</em></div>
                      <div><strong>you</strong></div>
                      </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                </tr>
                <tr>
                    <td className="personal">
                      <div><em>ellos / ellas / ustedes</em></div>
                      <div><strong>they</strong></div>
                    </td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                    <td><input className="conjugation-input" type="text" placeholder="inser word in right form" /></td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default App;
