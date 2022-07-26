import AccordionItem from "./Accordionliste";
import { useState } from "react";
function AccordionList(){

const [toggle, setToggle] = useState(null);
let data=["damilare", "sunday","d=friday"]
let handleToggle=(id)=>{
    if(toggle===id){
        setToggle(null);
        return false
    }
   setToggle(id)
   
}
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                <h3>React Accordion</h3>
                <AccordionItem accordionData={data} handleToggle={handleToggle} toggle={toggle} />
                </div>
            </div>
        </div>
           
        
    )
}

export default AccordionList;