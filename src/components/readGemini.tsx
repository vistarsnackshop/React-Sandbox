import React, { useEffect, useState } from 'react';

// Define an interface to describe the structure of each data row
interface DataRow {
  id: number;
  name: string;
  // Add other properties based on the structure of your data
}

const ReadGemini: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
        async function getDataFromAPI() {
        try {
            // Use the proxied URL
            const response = await fetch('/api/readGemini');
            if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
            }
            const fetchedData: DataRow[] = await response.json();
            setData(fetchedData);
        } catch (error) {
            setError('Error fetching data from API');
            console.error('Error fetching data from API:', error);
        }
        }
        getDataFromAPI();
    }, []);
  

  // If there's an error, display it
  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div id="table-container" className="p-4">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {/* Render table headers based on keys in the first data item */}
            {data.length > 0 && 
              Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b text-left font-semibold text-gray-700 uppercase"
                >
                  {key}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {Object.entries(row).map(([key, value]) => (
                <td key={key} className="px-4 py-2 border-b text-gray-600">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadGemini;
