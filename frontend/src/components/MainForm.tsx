import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MainForm.css";

type Props = {
  id?: string;
  title: string;
  setTitle: (val: string) => void;
  link: string;
  setLink: (val: string) => void;
  difficulty: string;
  setDifficulty: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  category: string[];
  setCategory: (val: string[]) => void;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function MainForm({
  id,
  title,
  setTitle,
  link,
  setLink,
  difficulty,
  setDifficulty,
  code,
  setCode,
  notes,
  setNotes,
  category,
  setCategory,
  isEdit,
  onSubmit,
  onCancel,
}: Props) {
  const [categoryInput, setCategoryInput] = useState(category.join(", "));

  // Keep input in sync if category changes from parent
  useEffect(() => {
    setCategoryInput(category.join(", "));
  }, [category]);

  // Parse string to array before submit
  const parseCategories = (input: string): string[] => {
    return input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  async function addQuestion() {
    try {
      const parsedCategories = parseCategories(categoryInput);
      setCategory(parsedCategories);

      const questionData = {
        userId: "testUser123",
        title,
        link,
        difficulty,
        code,
        notes,
        category: parsedCategories,
      };

      const response = await axios.post(
        "http://localhost:3000/api/questions",
        questionData
      );
      console.log(response.data);
      onSubmit();
    } catch (err) {
      console.error("Error adding a question ", err);
      alert("Error adding question. Please try again");
    }
  }

  async function updateQuestion() {
    if (!id) {
      alert("Missing question ID for update.");
      return;
    }

    try {
      const parsedCategories = parseCategories(categoryInput);
      setCategory(parsedCategories);

      const questionData = {
        userId: "testUser123",
        title,
        link,
        difficulty,
        code,
        notes,
        category: parsedCategories,
      };

      const response = await axios.put(
        `http://localhost:3000/api/questions/${id}`,
        questionData
      );
      console.log(response.data);
      onSubmit();
    } catch (err) {
      console.error("Error updating question", err);
      alert("Error updating the question. Please try again");
    }
  }

  return (
    <form className="MainForm">
      <div className="row-title-difficulty">
        <div>
          <label className="label">Title</label>
          <input
            className="textbox-norm"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Two Sum"
          />
        </div>
        <div>
          <label className="label">Difficulty</label>
          <select
            className="textbox-norm"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="row-title-difficulty">
        <div>
          <label className="label">Link</label>
          <input
            className="textbox-norm"
            name="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://leetcode.com/problems/two-sum/"
          />
        </div>
        <div>
          <label className="label">Tags</label>
          <input
            className="textbox-norm"
            name="Category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Trees, Graphs, Arrays"
          />
        </div>
      </div>

      <label className="label">Code</label>
      <textarea
        className="textbox-large"
        name="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Sample Code Here"
      />

      <label className="label">Notes</label>
      <textarea
        className="textbox-large"
        name="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Time Complexity: O(n)"
      />

      <button
        type="button"
        className="submit-button"
        onClick={isEdit ? updateQuestion : addQuestion}
      >
        {isEdit ? "Save" : "Add"}
      </button>
    </form>
  );
}
