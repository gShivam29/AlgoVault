import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "../styles/QuestionPage.css";
import Modal from "../components/Modal";
import MainForm from "../components/MainForm";

// Define the type of the question object
interface Question {
  userId: string;
  title: string;
  link: string;
  difficulty: string;
  code: string;
  notes: string;
  category: string[];
}

export default function QuestionPage() {
  const { id } = useParams(); // Get the question ID from URL params
  const [question, setQuestion] = useState<Question | null>(null); // Type the state correctly
  const [loading, setLoading] = useState(true); // Loading state for data
  const [error, setError] = useState<string | null>(null); // Error state
  const [isEditing, setIsEditing] = useState(true); //true cus we wanna make changes to the modal
  const [editedTitle, setEditedTitle] = useState("");
  const [editedLink, setEditedLink] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [editedDifficulty, setEditedDifficulty] = useState("");
  const [editedCategory, setEditedCategory] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  //get question data
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:3000/api/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching question.");
        setLoading(false);
      });
  }, [id]);

  //update question
  useEffect(() => {
    if (question) {
      setEditedTitle(question.title);
      setEditedLink(question.link);
      setEditedNotes(question.notes || "");
      setEditedCode(question.code || "");
    }
  }, [question]);

  function enableEdit() {
    setIsEditing(!isEditing);
  }

  // function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setEditedTitle(e.target.value);
  // }

  // function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setEditedLink(e.target.value);
  // }

  // function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   setEditedNotes(e.target.value);
  // }

  // function saveNotes() {
  //   if (!id) return;

  //   const updatedQuestion = {
  //     title: editedTitle,
  //     link: editedLink,
  //     notes: editedNotes,
  //     code: editedCode,
  //   };

  //   axios
  //     .put(`http://localhost:3000/api/questions/${id}`, updatedQuestion)
  //     .then((res) => {
  //       setQuestion(res.data.question); // Optional: Refresh the question state
  //       setIsEditing(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error saving updates:", err);
  //       setError("Failed to save updates.");
  //     });
  // }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!question) return <div>404 Not Found!</div>;

  return (
    <div className="split-container">
      <div className="left-panel">
        <div className="question-block">
          <h2>
            <a href={question.link} target="_blank" rel="noopener noreferrer">
              {question.title}
            </a>
          </h2>

          <p className="question-link">
            <a href={question.link} target="_blank" rel="noopener noreferrer">
              {question.link}
            </a>
          </p>
          <div className="user-notes">
            <p>{question.notes}</p>
          </div>
          <button onClick={enableEdit}>{isEditing ? "Close" : "Edittt"}</button>
          <button
            onClick={() => {
              if (question) {
                setEditedTitle(question.title || "");
                setEditedLink(question.link || "");
                setEditedNotes(question.notes || "");
                setEditedCode(question.code || "");
                setEditedDifficulty(question.difficulty || "");
                setEditedCategory(question.category || "");
                // setIsEditing(true);
              }
              setShowForm(true);
            }}
          >
            Edit
          </button>

          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <MainForm
              id={id}
              title={editedTitle}
              setTitle={setEditedTitle}
              link={editedLink}
              setLink={setEditedLink}
              difficulty={editedDifficulty}
              setDifficulty={setEditedDifficulty}
              code={editedCode}
              setCode={setEditedCode}
              notes={editedNotes}
              setNotes={setEditedNotes}
              isEdit={isEditing}
              setIsEdit={setIsEditing}
              category={editedCategory}
              setCategory={setEditedCategory}
              onSubmit={() => {
                if (!id) return;

                const updatedQuestion = {
                  title: editedTitle,
                  link: editedLink,
                  difficulty: editedDifficulty,
                  code: editedCode,
                  notes: editedNotes,
                  category: editedCategory,
                };

                axios
                  .put(
                    `http://localhost:3000/api/questions/${id}`,
                    updatedQuestion
                  )
                  .then((res) => {
                    setQuestion(res.data.question); // update state with latest info
                    setShowForm(false); // close the modal
                  })
                  .catch((err) => {
                    console.error("Error updating question:", err);
                    setError("Failed to update question.");
                  });
              }}
              onCancel={() => alert("Cancel clicked")}
            />
          </Modal>
        </div>
      </div>

      <div className="right-panel">
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="cpp"
          defaultValue={question.code || "// Write C++ code here"}
        />
      </div>
    </div>
  );
}

// return (
//     <div className="split-container">
//       <div className="left-panel">
//         <div className="question-block">
//           <h2>
//             <a href="https://example.com/question" target="_blank" rel="noopener noreferrer">
//               What is a closure in JavaScript?
//             </a>
//           </h2>
//           <p className="question-link">
//             <a href="https://example.com/question" target="_blank" rel="noopener noreferrer">
//               https://example.com/question
//             </a>
//           </p>
//           <div className="user-notes">
//             <p>
//               A closure is when a function "remembers" its lexical scope even when the function is executed outside that scope.
//             </p>
//             <p>
//               Useful in callbacks, factories, or maintaining private state in functions.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="right-panel">
//       <Editor
//       height="100%"
//       width="100%"
//       theme="vs-dark"
//       defaultLanguage="cpp"
//       defaultValue="//write c++ code here"
//     />

//         {/* Code editor or pre block will go here */}
//       </div>
//     </div>
//   );
