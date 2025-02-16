import { useState, useEffect, use } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import axios from "axios";

import "./App.css";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewcode() {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/get-Review`, {
        code,
      });

      setReview(response.data);
    } catch (error) {
      setReview("Error fetching review.");
      setError(true);
    }
    setLoading(false);
  }
  
  return (
    <>
      <main>
        <div className="left">
          <div className="code" >
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
                
              }
              padding={10}
              placeholder=" write your code here..."
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewcode} className="review">
            Review
          </div>
        </div>
        <div className="right">
        {loading ? (
        <div className="rocket-loader-container">
<div class="rocket-loader">
        <div class="rocket">
          <div class="flame"></div>
          <div class="smoke"></div>
          
        </div>
           
      </div>
      <div class="code-review-text">Code Review...</div>
        </div>
        
      
      
        
          ) : (
            <Markdown className={error ? "error-message" : ""}>{review}</Markdown>
          )}        </div>
      </main>
    </>
  );
}

export default App;
