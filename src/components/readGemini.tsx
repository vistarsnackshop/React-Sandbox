import React, { useState } from 'react';

// Define an interface to describe the structure of each data row
// This ensures type safety and clarity for the data returned from the API
interface DataRow {
  id: number; // Unique identifier for each row
  name: string; // Name of the person or entity
  phonenum: string; // Phone number (corresponds to the PHONENB column in the database)
  // Add other properties as needed based on your database schema
}

const ReadGemini: React.FC = () => {
  // State to hold the fetched data as an array of DataRow objects
  const [data, setData] = useState<DataRow[]>([]);

  // State to manage the value of the phone number input field
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // State to hold error messages, if any
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to fetch data from the server by phone number
   * Makes a POST request to the `/api/readGemini` endpoint
   */
  const fetchDataByPhoneNumber = async () => {
    try {
      // Send a POST request with the phone number as the payload
      const response = await fetch('http://localhost:3001/readGemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify({ phoneNumber }), // Include the phone number in the request body
      });
      console.log(response);
      // If the response is not OK (status code 2xx), throw an error
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Parse the JSON response into a DataRow array
      const fetchedData: DataRow[] = await response.json();

      // Update the `data` state with the fetched data
      setData(fetchedData);

      // Clear any existing error messages
      setError(null);
    } catch (error) {
      // Handle errors and display a user-friendly message
      setError('Error fetching data for the given phone number');
      console.error('Error fetching data:', error); // Log the error for debugging
    }
  };

  return (
    <div id="table-container" className="p-4">
      <div className="mb-4">
        {/* Input field to enter the phone number */}
        <input
          type="text" // Text input for entering phone numbers
          value={phoneNumber} // Controlled component tied to `phoneNumber` state
          onChange={(e) => setPhoneNumber(e.target.value)} // Update state on input change
          placeholder="Enter phone number" // Placeholder text for clarity
          className="border p-2 mr-2" // Basic styling for the input field
        />
        {/* Button to trigger the data fetch */}
        <button
          onClick={fetchDataByPhoneNumber} // Call the fetch function on click
          className="bg-blue-500 text-white px-4 py-2" // Styling for the button
        >
          Search
        </button>
      </div>

      {/* Display error message if an error occurs */}
      {error && <div className="text-red-500 font-semibold">{error}</div>}

      {/* Conditionally render the table if there is data */}
      {data.length > 0 && (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {/* Dynamically generate table headers based on the keys of the first data item */}
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key} // Use the key name as the React key
                  className="px-4 py-2 border-b text-left font-semibold text-gray-700 uppercase"
                >
                  {key} {/* Display the key name as the column header */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render table rows for each data item */}
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {/* Render table cells for each key-value pair in the data row */}
                {Object.entries(row).map(([key, value]) => (
                  <td key={key} className="px-4 py-2 border-b text-gray-600">
                    {value} {/* Display the value for the current key */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadGemini;
