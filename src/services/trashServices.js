import axios from "axios";
import { toast } from "react-toastify";

export const moveToTrash = async ({ token, noteId, dispatchNotes }) => {
  try {
    const response = await axios({
      url: `/api/notes/trash/${noteId}`,
      method: "post",
      headers: {
        authorization: token,
      },
    });

    dispatchNotes({ type: "TRASH-NOTE", payload: response.data });
    toast.success("Note Moved to Trash");
  } catch (err) {
    console.error("Note Moved to Trash", err);
    toast.error("Error - Note Moved to Trash");
  }
};

export const restoreFromTrash = async ({ token, noteId, dispatchNotes }) => {
  try {
    const response = await axios.post(
      `/api/trash/restore/${noteId}`,
      {},
      { headers: { authorization: token } }
    );
    dispatchNotes({
      type: "RESTORE-FROM-TRASH",
      payload: response.data,
    });
    toast.success("Restored note");
  } catch (err) {
    console.error("restore from trash", err);
    toast.error("Error in restoring note");
  }
};

export const deleteFromTrash = async ({ token, noteId, dispatchNotes }) => {
  try {
    const response = await axios.delete(`/api/trash/delete/${noteId}`, {
      headers: { authorization: token },
    });
    dispatchNotes({
      type: "DELETE-FROM-TRASH",
      payload: response.data.trash,
    });
    toast.success("Permanently Deleted note");
  } catch (err) {
    console.error("delete from trash", err);
    toast.error("Error in deleting from trash");
  }
};
