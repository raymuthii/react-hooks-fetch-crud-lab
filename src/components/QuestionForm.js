import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data);
      });

    // Reset form
    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          id="prompt"
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />

        <label htmlFor="answer1">Answer 1:</label>
        <input
          id="answer1"
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />

        <label htmlFor="answer2">Answer 2:</label>
        <input
          id="answer2"
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />

        <label htmlFor="answer3">Answer 3:</label>
        <input
          id="answer3"
          type="text"
          name="answer3"
          value={formData.answer3}
          onChange={handleChange}
        />

        <label htmlFor="answer4">Answer 4:</label>
        <input
          id="answer4"
          type="text"
          name="answer4"
          value={formData.answer4}
          onChange={handleChange}
        />

        <label htmlFor="correctIndex">Correct Answer:</label>
        <select
          id="correctIndex"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">{formData.answer1}</option>
          <option value="1">{formData.answer2}</option>
          <option value="2">{formData.answer3}</option>
          <option value="3">{formData.answer4}</option>
        </select>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
