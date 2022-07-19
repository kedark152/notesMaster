import axios from "axios";
import { toast } from "react-toastify";

export const createNewNote = async ({ auth, noteData, dispatchNotes }) => {
  try {
    const response = await axios({
      url: "/api/notes",
      method: "post",
      headers: {
        authorization: auth.token,
      },
      data: {
        note: noteData,
      },
    });

    dispatchNotes({
      type: "SAVE-NOTE",
      payload: response.data.notes,
    });

    toast.success("Created New Note");
  } catch (error) {
    console.log("createNewNote Error", error);
    toast.error("Error to create New Note");
  }
};
export const updateNote = async ({ auth, noteData, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/notes/${noteData._id}`,
      { note: noteData },
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "UPDATE-NOTE",
      payload: response.data.notes,
    });
   
    toast.success("Updated Note");
  } catch (error) {
    console.log("Update Note Error", error);
    toast.error("Error to Update Note");
  }
};
export const updateNoteLabels = async ({ auth, noteData, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/notes/${noteData._id}`,
      { note: noteData },
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "UPDATE-NOTE",
      payload: response.data.notes,
    });
  } catch (error) {
    console.log("Update Note Labels Error", error);
    toast.error("Error to Update Note Labels");
  }
};

export const updateNoteBgColor = async ({ auth, noteData, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/notes/${noteData._id}`,
      { note: noteData },
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "UPDATE-NOTE",
      payload: response.data.notes,
    });
  } catch (error) {
    console.log("Update Note BackGround Color Error", error);
    toast.error("Error to Update Note BackGround Color");
  }
};
export const updateNotePin = async ({ auth, noteData, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/notes/${noteData._id}`,
      { note: noteData },
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "UPDATE-NOTE",
      payload: response.data.notes,
    });
  
  } catch (error) {
    console.log("Update Note Pin Error", error);
    toast.error("Error to Update Note Pin");
  }
};
