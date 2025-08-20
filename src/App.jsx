import { useState } from 'react';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [summary, setSummary] = useState('');
  const [bddSteps, setBddSteps] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateBDDSteps() {
    if (!summary.trim()) {
      setBddSteps("❗ Please enter a summary before generating.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `Generate Steps to Reproduce this bug in BDD format using Given/When/Then ONLY BDD STEPS. The summary is:\n\n"${summary}"`;

      const response = await axios({
        method: 'post',
        url: 'ADD YOUR API KEY',
        data: {
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }
      });

      const generatedText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response generated.';
      setBddSteps(generatedText);
    } catch (error) {
      console.error('Error generating BDD steps:', error);
      setBddSteps('❌ Error: Could not generate BDD steps. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h3>🧠 Onclusive QI Bug Bot</h3>
      <div className="container">
        {/* Left Side: Summary Input */}
        <div className="input-section">
          <textarea
            placeholder="📝 Enter bug summary here..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <button onClick={generateBDDSteps} disabled={loading}>
            {loading ? '⏳ Generating...' : 'Generate BDD Steps'}
          </button>
        </div>

        {/* Right Side: BDD Output */}
        <div className="answer-section">
  <strong style={{ color: "black" }}>📋 Steps to Reproduce :</strong>
  <div className="answer-block">{bddSteps}</div>
</div>
      </div>
    </div>
  );
}

export default App;