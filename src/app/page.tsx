"use client";
import "./page.scss";
import { useState, ChangeEvent } from "react";
import axios from "axios";

const models = [
  "gpt-4o-mini",
  "gpt-4o",
  "claude-3-haiku-20240307",
  "claude-3-sonnet-20240229",
  "claude-3-5-sonnet-20240620",
];

const Home = () => {
  const [input, setInput] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    setIsLoading(true);
    setEnglish("Loading...");
    setVietnamese("Loading...");
    try {
      const res = await axios.post("/api/translate", {
        japaneseText: input,
        model: selectedModel,
      });
      console.log(res.data);
      if (
        res.data &&
        res.data.result &&
        res.data.result.english &&
        res.data.result.vietnamese
      ) {
        setEnglish(res.data.result.english);
        setVietnamese(res.data.result.vietnamese);
      } else {
        console.error("Translation data is missing or incomplete.");
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setEnglish("Error occurred during translation");
      setVietnamese("Error occurred during translation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="main">
      <h1>Trilingual Translator</h1>
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Japanese text"
          className="text-input"
        />
      </div>
      <select
        className="model-select"
        value={selectedModel}
        onChange={handleModelChange}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      <button onClick={handleTranslate} disabled={isLoading}>
        {isLoading ? "Translating..." : "Translate"}
      </button>

      <div className="translation-container">
        <div className="translation-item">
          <h2 className="title">English</h2>
          <textarea value={english} readOnly className="text-input" />
        </div>
        <div className="translation-item">
          <h2 className="title">Vietnamese</h2>
          <textarea value={vietnamese} readOnly className="text-input" />
        </div>
      </div>
    </div>
  );
};

export default Home;
