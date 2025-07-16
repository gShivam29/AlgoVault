import React, { useState, useEffect } from "react";
import CollapsibleCategories from "../components/CollapsibleCategories";
import Modal from "../components/Modal";
import MainForm from "../components/MainForm";
import axios from "axios";
import "../styles/home.css";
// import GoogleLogin from "../components/GoogleLogin";
type Question = {
  _id: string;
  title: string;
  link: string;
  category: string[];
};

// const mockQuestions: Question[] = [
//   { id: "1", title: "Two Sum", link: "#", category: "Array" },
//   { id: "2", title: "Binary Search", link: "#", category: "Search" },
//   { id: "3", title: "Merge Sort", link: "#", category: "Sorting" },
//   { id: "4", title: "Quick Sort", link: "#", category: "Sorting" },
//   { id: "5", title: "Sliding Window", link: "#", category: "Array" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs1" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs2" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs3" },
//   { id: "6", title: "graph Window", link: "#", category: "AGraphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs5" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs6" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs7" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs8" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs9" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs10" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
//   { id: "6", title: "graph Window", link: "#", category: "Graphs4" },
// ];

const fetchQuestions = async (userId: string): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:3000/api/questions", {
      params: { userId },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching questions ", err);
    return [];
  }
};
export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const resetForm = () => {
    setTitle("");
    setLink("");
    setDifficulty("Easy");
    setCode("");
    setNotes("");
    setCategory([]);
  };

  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestions("testUser123");
      setQuestions(fetchedQuestions); // Set the fetched questions into the state
    };
    getQuestions();
  }, []);

  // Group questions by category
  console.log(questions);
  const questionsByCategory = questions.reduce((acc, q) => {
    const cat = q.category[0]; // Just first one
    acc[cat] = acc[cat] || [];
    acc[cat].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        textAlign: "center",
        padding: 20,
      }}
    >
      <h1>Hello, User!</h1>
      <button onClick={() => setShowForm(true)}>Add Question</button>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <MainForm
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          code={code}
          setCode={setCode}
          notes={notes}
          setNotes={setNotes}
          category={category}
          setCategory={setCategory}
          isEdit={isEditing}
          setIsEdit={setIsEditing}
          onSubmit={() => {
            alert("Submit clicked");
            resetForm();
          }}
          onCancel={() => alert("Cancel clicked")}
        />
      </Modal>
      {/* <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
          <GoogleLogin onLogin={(user) => {
            alert(`Logged in successfully as ${user.name} (${user.email})`);
          }}/>
      </Modal> */}
      <div className="categories" style={{}}>
        <CollapsibleCategories questionsByCategory={questionsByCategory} />
      </div>
    </div>
  );
}
