/* eslint-disable react/prop-types */

import "../styles/component/notescard.css"
import "../styles/utils/variable.css"
import { useNotes } from "../context/notes-context";
import { getCurrentDate } from "../utilities/getCurrentDate";

export const NotesCard = ({noteDetails}) =>{
  const {_id,title,body,isPinned} = noteDetails;
  const {dispatchNotes} = useNotes();
    return(<>
    <div className="note-container pd-xsm mg-sm flex-column" id={_id}>
        <div className="top-section align-center">
          <h2>{title}</h2>
          <i className={isPinned?`material-icons primary-color`:`material-icons grey`} onClick={()=>dispatchNotes({type:"NOTE-PIN",payload:{_id,title,body,isPinned}})}>push_pin</i>
        </div>
        <div className="mid-section">
          <p>{body}</p>
        </div>
        <div className="bottom-section align-center">
            <p className="creation-date">{`Created on ${getCurrentDate()}`}</p>
          <div className="icon-buttons align-center"> 
            <i className="material-icons" onClick={()=>dispatchNotes({type:"EDIT-NOTE",payload:{_id,title,body,isEditing:true,isPinned:isPinned}})}>edit</i>
            <i className="material-icons">palette</i>
            <i className="material-icons">label</i>
            <i className="material-icons">archive</i>
            <i className="material-icons" onClick={()=>dispatchNotes({type:"DELETE-NOTE",payload:_id})}>delete</i>
          </div> 
        </div>
        
    </div>
    
    </>)
}
