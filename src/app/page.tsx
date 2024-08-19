"use client";
import "./page.scss";
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useCallback,
} from "react";
import axios from "axios";
import { MODELS } from "@/utils/consts";

const Home = () => {
  const [input, setInput] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = useCallback(
    async (textToTranslate: string) => {
      if (!textToTranslate.trim() || isLoading) return;
      if (!textToTranslate.trim()) {
        setInput("");
        setEnglish("");
        setVietnamese("");
        return;
      }

      setIsLoading(true);
      setEnglish("Loading...");
      setVietnamese("Loading...");
      try {
        const res = await axios.post("/api/translate", {
          japaneseText: textToTranslate,
          model: selectedModel,
        });
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
    },
    [selectedModel, isLoading]
  );

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate(input);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setInput(pastedText);
    handleTranslate(pastedText);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="main">
      <h1>Trilingual Translator</h1>
      <div className="input-container">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Enter Japanese text"
          className="text-input"
        />
      </div>
      <div className="note">
        <p>Paste or press enter or click translate to translate</p>
      </div>
      <select
        className="model-select"
        value={selectedModel}
        onChange={handleModelChange}
      >
        {MODELS.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      <button
        className="translate-button"
        onClick={() => handleTranslate(input)}
        disabled={isLoading}
      >
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
