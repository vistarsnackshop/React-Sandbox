import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

interface GeminiData {
  [key: string]: string | number | boolean | null;
}

const ExportExcel: React.FC = () => {
  const [data, setData] = useState<GeminiData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3001/readGemini');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: GeminiData[] = await response.json();
        console.log("Fetched data:", jsonData); // Check if data is fetched
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = (): void => {
    if (data.length === 0) {
      console.error("No data to export");
      return;
    }
    
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'GeminiData');
      XLSX.writeFile(workbook, 'GeminiData.xlsx');
      console.log("Exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div>
      <button onClick={exportToExcel} disabled={data.length === 0}>
        Export to Excel
      </button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExportExcel;
