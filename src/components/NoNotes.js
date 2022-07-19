/* eslint-disable react/prop-types */
import "../styles/component/noNotes.css";
export const NoNotes = ({ icon, text }) => {
  return (
    <div className="empty-note-container">
      <i className="material-icons empty-note-icon">{icon}</i>
      <h4 className="empty-note-text">{text}</h4>
    </div>
  );
};
