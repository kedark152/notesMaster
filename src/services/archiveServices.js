import axios from "axios";
import { toast } from "react-toastify";

export const archiveNote = async ({
  auth,
  noteId,
  noteData,
  dispatchNotes,
}) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${noteId}`,
      { note: noteData },
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "ARCHIVE-NOTE",
      payload: response.data,
    });
   
    toast.success("Note Archived");
  } catch (error) {
    console.log("Archive Note Error", error);
    toast.error("Error to archive note");
  }
};

export const unArchiveNote = async ({ auth, noteId, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/archives/restore/${noteId}`,
      {},
      { headers: { authorization: auth.token } }
    );

    dispatchNotes({
      type: "UNARCHIVE-NOTE",
      payload: response.data,
    });
   
    toast.success("Note Un-Archived");
  } catch (error) {
    console.log("Unarchive Note Error", error);
    toast.error("Error to Unarchive note");
  }
};
