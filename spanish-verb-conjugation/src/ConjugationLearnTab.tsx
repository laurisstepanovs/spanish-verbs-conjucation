import { getConjugation, Person0To5 } from 'spanish-verbs';
import { tenses, verbs } from "./types";

const ConjugationLearnTab = () => {
    return <>
        <h1>Learn Conjugation</h1>

        <table>
            <th>
                <td>Verbs</td>
            </th>
            {tenses.map((item, index)=>{
                return <th key={`tenses-${index}`}>
                    <td>{item}</td>
                  </th>
            })}
            {verbs.map((verb, index) => {
                return <tr key={`verbs-${index}`}>
                <td>{verb}</td>
                {tenses.map((tense, index2)=>{
                    return <td key={`verb-tense-${index2}`}>
                        <table>
                    <tbody>
                        <tr>
                            <td className="personal">
                                <div><em>yo</em></div>
                                <div><strong>I</strong></div>
                            </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td className="personal">
                                <div><em>tu</em></div>
                                <div><strong>you</strong></div>
                            </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td className="personal">
                                <div><em>él, ella, usted</em></div>
                                <div><strong>he, she, you (formal)</strong></div>
                            </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>nosotros / nosotras</em></div>
                              <div><strong>we</strong></div>
                              </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>vosotros / vosotras</em></div>
                              <div><strong>you</strong></div>
                              </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                        <tr>
                            <td className="personal">
                              <div><em>ellos / ellas / ustedes</em></div>
                              <div><strong>they</strong></div>
                            </td>
                            <td>{getConjugation(verb, tense, 0)}</td>
                        </tr>
                    </tbody>
                </table>
                    </td>
                })}
            </tr>
            })}
        </table>
    </>
}

export default ConjugationLearnTab;