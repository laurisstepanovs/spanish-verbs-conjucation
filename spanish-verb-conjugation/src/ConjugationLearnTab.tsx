import { getConjugation } from 'spanish-verbs';
import { tenses, verbs } from "./types";
import { useState } from 'react';

const ConjugationLearnTab = () => {
    const [ enabledTenses, setEnabledTenses ] = useState<string[]>(["INDICATIVE_PRESENT", "INDICATIVE_PRETERITE", "INDICATIVE_FUTURE"]);

    return <>
        <h1>Learn Conjugation</h1>

        <div className='tense-options'>
        { tenses.map((tense, index) => {
            return <div key={`${tense}-${index}`}>
                <input type="checkbox" checked={enabledTenses.includes(tense)} id={tense} name={tense} onChange={(e)=> { setEnabledTenses(prevState => prevState.includes(tense) ? prevState.filter(e => e !== tense) : [...prevState, tense]) }} />
                <label>{tense}</label>
            </div>
        }) }
        </div>

        <table>
            <thead>
            <tr>
                <th>Verbs</th>
                <th style={{width: "160px", border: "solid 3px green"}}>Pronouns</th>
                {tenses.map((item, index)=>{
                return enabledTenses.includes(item) &&  <th key={`tenses-${index}`}>{item}</th>;
            })}
            </tr>
            </thead>
            <tbody>
            {verbs.map((verb, index) => {
                return <tr key={`verbs-${index}`}>
                <td>{verb}</td>
                <td style={{minWidth: "300px", border: "solid 3px green"}}><table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td className="personal">
                                <div><em>yo</em></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="personal">
                                <div><em>tu</em></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="personal">
                                <div><em>él, ella, usted</em></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>nosotros / nosotras</em></div>
                              </td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>vosotros / vosotras</em></div>
                              </td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>ellos / ellas / ustedes</em></div>
                            </td>
                        </tr>
                    </tbody>
                </table></td>
                {tenses.map((tense, index2)=>{
                    return enabledTenses.includes(tense) && <td width={300} key={`verb-tense-${index2}`}>
                        <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td>{getConjugation(verb, tense, 1)}</td>
                        </tr>
                        <tr>
                            <td>{getConjugation(verb, tense, 2)}</td>
                        </tr>
                        <tr>
                            <td>{getConjugation(verb, tense, 3)}</td>
                        </tr>
                        <tr>
                            <td>{getConjugation(verb, tense, 4)}</td>
                        </tr>
                        <tr>
                            <td>{getConjugation(verb, tense, 5)}</td>
                        </tr>
                    </tbody>
                </table>
                    </td>
                })}
            </tr>
            })}    
            </tbody>
        </table>
    </>
}

export default ConjugationLearnTab;