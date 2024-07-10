import React, { useState } from "react";
import './Accordian.css';
import data from './data';

const Accordian = ()=>{

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId){
        // console.log(getCurrentId);
        // setSelected(getCurrentId === selected ? null : getCurrentId);

        setSelected(prevSelected => prevSelected === getCurrentId ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId){
        // let copyMultiple = [...multiple];
        // const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        // // console.log(findIndexOfCurrentId);
        // if(findIndexOfCurrentId === -1){
        //     copyMultiple.push(getCurrentId);
        // }
        // else{
        //     copyMultiple.splice(findIndexOfCurrentId, 1);
        // }
        // setMultiple(copyMultiple);

        setMultiple(prevMultiple => {
            if(prevMultiple.includes(getCurrentId)){
                return prevMultiple.filter(id => id !== getCurrentId);
            }
            else{
                return [...prevMultiple, getCurrentId];
            }
        });
    }
    return(
        <div className="container">
            {/* <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button> */}

            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                {enableMultiSelection ? "Multi Selection":"Single Selection"}
            </button>
            <div className="accordian">
                {
                    data && data.length > 0 ?(
                        data.map ((dataItem) =>(
                            <div className="item">
                                <div className="title">
                                    <h3>{dataItem.question}</h3>
                                    {/* <span onClick={
                                        enableMultiSelection ?
                                        ()=> handleMultiSelection(dataItem.id)
                                        :
                                        ()=> handleSingleSelection(dataItem.id)} className="ansSym">+</span> */}
                                    <span
                                        onClick={() => enableMultiSelection
                                            ? handleMultiSelection(dataItem.id)
                                            :handleSingleSelection(dataItem.id)
                                        }
                                        className="ansSym"
                                    >
                                        {enableMultiSelection
                                        ?
                                        (multiple.includes(dataItem.id) ? '-' : '+')
                                        :
                                            (selected === dataItem.id ? '-' : '+')
                                        }
                                    </span>
                                </div>
                                {
                                    enableMultiSelection
                                    ?
                                        (multiple.indexOf(dataItem.id) !== -1 &&
                                        <div className="content">{dataItem.ans}</div>)
                                    :
                                        (selected === dataItem.id &&
                                        <div className="content">{dataItem.ans}</div>
                                    )
                                }
                                {/* {
                                    selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                                    <div className="content">{dataItem.ans}</div>
                                    : null
                                } */}
                            </div>
                        ))
                    ):(<div>No data found</div>)
                }
            </div>
        </div>
    )
}

export default Accordian;