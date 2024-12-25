import { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import { toast } from "react-hot-toast";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note.", {
        style: {
          backgroundColor: "#ff595e",
          color: "#fff",
        },
      });
    }
  };

  // Function to make URLs clickable
  const makeLinksClickable = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="note-link">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="col-md-3 col-sm-6">
      <div
        className="card my-3"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.125)",
          margin: "auto",
        }}
      >
        <div
          className="card-body"
          style={{
            backgroundColor: "#171717",
            color: "white",
            position: "relative",
            borderRadius: "5px",
            backdropFilter: "blur(15px) saturate(180%)",
            WebkitBackdropFilter: "blur(15px) saturate(180%)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <h5
              className="card-text"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {note.title}
            </h5>
            <div
              style={{
                color: "#e7e9ea",
                position: "absolute",
                bottom: "1rem",
                right: "5px",
                cursor: "pointer",
                display: "flex",
                width: "65px",
                height: "25px",
              }}
            >
              <i
                className="fa-solid fa-trash mx-2 my-2"
                onClick={() => {
                  handleDelete(note._id);
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2 my-2"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>
          <p className="card-text" style={{ marginBottom: "5px" }}>
            {makeLinksClickable(note.description)}
          </p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
