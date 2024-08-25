// // import React, { useState } from "react";
// // import axios from "axios";
// // import Select from "react-select";
// // import "./App.css";

// // const App = () => {
// //   const [input, setInput] = useState("");
// //   const [response, setResponse] = useState(null);
// //   const [selectedOptions, setSelectedOptions] = useState([]);

// //   const options = [
// //     { value: "alphabets", label: "Alphabets" },
// //     { value: "numbers", label: "Numbers" },
// //     {
// //       value: "highest_lowercase_alphabet",
// //       label: "Highest lowercase alphabet",
// //     },
// //   ];

// //   const handleInputChange = (event) => {
// //     setInput(event.target.value);
// //   };

// //   const handleSelectChange = (selectedOptions) => {
// //     setSelectedOptions(selectedOptions);
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const parsedInput = JSON.parse(input);
// //       const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
// //       setResponse(res.data);
// //     } catch (error) {
// //       alert("Invalid JSON input or error fetching data");
// //     }
// //   };

// //   const renderResponse = () => {
// //     if (!response) return null;

// //     const selectedValues = selectedOptions.map((option) => option.value);
// //     const filteredResponse = {
// //       numbers: selectedValues.includes("numbers") ? response.numbers : [],
// //       alphabets: selectedValues.includes("alphabets") ? response.alphabets : [],
// //       highest_lowercase_alphabet: selectedValues.includes(
// //         "highest_lowercase_alphabet"
// //       )
// //         ? response.highest_lowercase_alphabet
// //         : [],
// //     };

// //     return (
// //       <div>
// //         <h2>Response:</h2>
// //         <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="App">
// //       <h1>BFHL Frontend</h1>
// //       <form onSubmit={handleSubmit}>
// //         <textarea
// //           rows="5"
// //           cols="40"
// //           value={input}
// //           onChange={handleInputChange}
// //           placeholder="Enter JSON data here"
// //         />
// //         <br />
// //         <button type="submit">Submit</button>
// //       </form>
// //       <br />
// //       <Select
// //         isMulti
// //         options={options}
// //         onChange={handleSelectChange}
// //         placeholder="Select fields to display"
// //       />
// //       {renderResponse()}
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css"; // Import the CSS file

// function App() {
//   const [jsonInput, setJsonInput] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setJsonInput(e.target.value);
//   };

//   const handleDropdownChange = (e) => {
//     const { options } = e.target;
//     const selectedValues = Array.from(options)
//       .filter((option) => option.selected)
//       .map((option) => option.value);
//     setSelectedOptions(selectedValues);
//   };

//   const handleSubmit = async () => {
//     try {
//       setError("");
//       const parsedInput = JSON.parse(jsonInput);
//       const response = await axios.post(
//         "http://localhost:5000/bfhl",
//         parsedInput
//       );
//       setResponseData(response.data);
//     } catch (err) {
//       setError("Invalid JSON input or error fetching data.");
//     }
//   };

//   const renderFilteredResponse = () => {
//     if (!responseData) return null;

//     const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

//     let filteredResponse = "";
//     if (selectedOptions.includes("Numbers")) {
//       filteredResponse += `Numbers: ${numbers.join(", ")}\n`;
//     }
//     if (selectedOptions.includes("Alphabets")) {
//       filteredResponse += `Alphabets: ${alphabets.join(", ")}\n`;
//     }
//     if (selectedOptions.includes("Highest lowercase alphabet")) {
//       filteredResponse += `Highest lowercase alphabet: ${highest_lowercase_alphabet.join(
//         ", "
//       )}\n`;
//     }

//     return filteredResponse || "No data to display.";
//   };

//   return (
//     <div>
//       <h1>Backend API Interaction</h1>
//       <textarea
//         rows="10"
//         cols="50"
//         value={jsonInput}
//         onChange={handleInputChange}
//         placeholder='Enter JSON here (e.g., {"data": ["A","C","z"]})'
//       />
//       <br />
//       <button onClick={handleSubmit}>Submit</button>
//       <br />
//       <select multiple onChange={handleDropdownChange}>
//         <option value="Numbers">Numbers</option>
//         <option value="Alphabets">Alphabets</option>
//         <option value="Highest lowercase alphabet">
//           Highest lowercase alphabet
//         </option>
//       </select>
//       <div>
//         <h2>Filtered Response</h2>
//         <pre>{renderFilteredResponse()}</pre>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitted(false); // Reset submission status before submitting
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post(
        "https://bj-backend.onrender.com/bfhl",
        parsedInput
      );
      setResponseData(response.data);
      setIsSubmitted(true); // Set submission status to true after successful submission
    } catch (err) {
      alert("Invalid JSON input or error fetching data.");
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    let filteredResponse = "";
    if (selectedOptions.includes("Numbers")) {
      filteredResponse += `Numbers: ${numbers.join(", ")}\n`;
    }
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse += `Alphabets: ${alphabets.join(", ")}\n`;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredResponse += `Highest lowercase alphabet: ${highest_lowercase_alphabet.join(
        ", "
      )}\n`;
    }

    return filteredResponse || "No data to display.";
  };

  return (
    <div className="container">
      <h1>Backend API Interaction</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here (e.g., {"data": ["A","C","z"]})'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {isSubmitted && (
        <>
          <label htmlFor="options">Select data to display:</label>
          <select
            id="options"
            multiple
            onChange={handleDropdownChange}
            className="multi-select"
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
        </>
      )}
      <div className="response">
        <h2>Filtered Response</h2>
        <pre>{renderFilteredResponse()}</pre>
      </div>
    </div>
  );
}

export default App;
