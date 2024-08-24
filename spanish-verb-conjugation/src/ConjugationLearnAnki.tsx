import { useEffect } from "react"
import { tenses } from "./types";
import { getConjugation } from "spanish-verbs";
import { DolphinSR, generateId } from "dolphinsr";
import type { Master, Review } from "dolphinsr";

type Props = {
    verbs: string[];
  }

const ConjugationLearnAnki = ({verbs}: Props) => {
    useEffect(()=>{
        const combinations = [
            {front: [0], back: [1]}
        ];	
       
       
       let vocab: Array<Master> = [
        {
            id: generateId(),
            combinations: combinations,
            fields: ["word1" + "form", "conjugation"]
        },
        {
            id: generateId(),
            combinations: combinations,
            fields: ["word2" + "form", "conjugation"]
        },
        {
            id: generateId(),
            combinations: combinations,
            fields: ["word3" + "form", "conjugation"]
        },
        {
            id: generateId(),
            combinations: combinations,
            fields: ["word4" + "form", "conjugation"]
        },
       ];
       const d = new DolphinSR();
       d.addMasters(...vocab);

       const card = d.nextCard();
       console.log(card);
    }, []);

    return <div>
        This is an anki learning mode.


    </div>
}

export default ConjugationLearnAnki
