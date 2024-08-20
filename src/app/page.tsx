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
  const [selectedModel, setSelectedModel] = useState("claude-3-haiku-20240307");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = useCallback(
    async (textToTranslate: string) => {
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
        const { english: translatedEnglish, vietnamese: translatedVietnamese } =
          res.data.result || {};
        if (translatedEnglish && translatedVietnamese) {
          setEnglish(translatedEnglish);
          setVietnamese(translatedVietnamese);
        } else {
          setEnglish("");
          setVietnamese("");
          console.error("Translation data is missing or incomplete.");
        }
      } catch (error) {
        console.error("Translation Error:", error);
        setEnglish(
          "Error occurred during translation. Please try again later or choose another model."
        );
        setVietnamese(
          "Error occurred during translation. Please try again later or choose another model."
        );
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
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
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
      <h2 className="title">Japanese</h2>
      <div className="input-container">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Enter your Japanese paragraph here"
          className="text-input"
        />
      </div>
      <div className="note">
        <p>
          Paste or press command/control + enter or click translate to translate
        </p>
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
      <footer className="footer">
        <span>
          Developed by{" "}
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/le-hoang-tuan-bk/"
            target="_blank"
          >
            Tuan Le Hoang
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Home;
