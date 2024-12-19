"use client";

import { useEffect, useState } from "react";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";

export default function Home() {
  const [isPasted, setIsPasting] = useState(false);
  const [results, setResults] = useState(""); // Stores converted Markdown

  const sanitizeHTML = (html) => {
    return html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/g, "") 
      .replace(/ style="[^"]*"/g, "") 
      .replace(/<meta[^>]*>/g, "") 
      .replace(/<div[^>]*>/g, "")
      .replace(/<\/div>/g, "")
      .replace(/<span[^>]*>/g, "") 
      .replace(/<\/span>/g, "") 
      .replace(/<p[^>]*>/g, "")
      .replace(/<\/p>/g, ""); 
  };  

  const convertToMarkdown = (html) => {
    const turndownService = new TurndownService();
    turndownService.use(gfm);

    turndownService.addRule("headers", {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      replacement: function (content, node) {
        const level = Number(node.nodeName.charAt(1));
        return `\n${"#".repeat(level)} ${content}\n`;
      },
    });

    turndownService.addRule("table", {
      filter: "table",
      replacement: (content, node) => {
        const rows = Array.from(node.querySelectorAll("tr"));
        if (rows.length === 0) return "";

        const headerCells = Array.from(rows[0].querySelectorAll("th, td")).map((cell) =>
          cell.textContent.trim()
        );

        const headerRow = `| ${headerCells.join(" | ")} |`;
        const separatorRow = `| ${headerCells.map(() => "---").join(" | ")} |`;

        const dataRows = rows.slice(1).map((row) => {
          const cells = Array.from(row.querySelectorAll("td")).map((cell) =>
            cell.textContent.trim()
          );
          return `| ${cells.join(" | ")} |`;
        });

        return `\n${headerRow}\n${separatorRow}\n${dataRows.join("\n")}\n`;
      },
    });

    const sanitizedHTML = sanitizeHTML(html);
    const markdown = turndownService.turndown(sanitizedHTML);
    return markdown;
  };

  const handlePaste = (event) => {
    try {
      const clipboardHTML = event.clipboardData.getData("text/html");
      const clipboardPlainText = event.clipboardData.getData("text/plain");

      if (!clipboardHTML && !clipboardPlainText) {
        toast.error("Clipboard is empty or unsupported format.");
        return;
      }

      setIsPasting(true);
      const markdown = clipboardHTML
        ? convertToMarkdown(clipboardHTML)
        : clipboardPlainText;

      const cleanedMarkdown = markdown
        .replace(/^\*\*\s*|\s*\*\*$/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setResults(cleanedMarkdown);
    } catch (error) {
      console.error("Error handling paste event:", error);
      toast.error("An error occurred while pasting content.");
    }
  };

  let copyTimeout;
  const handleCopy = () => {
    clearTimeout(copyTimeout);
    navigator.clipboard.writeText(results);

    const toastOptions = {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "text-sm",
    };

    copyTimeout = setTimeout(() => {
      toast.success("Markdown copied to clipboard!", toastOptions);
    }, 500);
  };

  const handleClear = () => {
    setIsPasting(false);
    setResults("");
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <ToastContainer />
      {!isPasted && (
        <main className="max-w-5xl w-full p-6 md:p-10 rounded-2xl shadow-xl bg-white flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-extrabold text-4xl md:text-5xl leading-tight mb-4">
              Text2Markdown
            </h1>
            <p className="text-md md:text-lg font-light text-gray-600">
              Convert text from Word, Google Docs, or any source into clean Markdown with ease.
            </p>
            <div className="pt-4">
              <div className="font-bold pb-2 text-xl">How It Works:</div>
              <ul className="list-decimal list-inside text-left space-y-2">
                <li>Copy the text you want to convert to Markdown.</li>
                <li>
                  Paste it here using <span className="font-bold">Ctrl+V</span> or{" "}
                  <span className="font-bold">Cmd+V</span>.
                </li>
                <li>Your Markdown will appear instantly.</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <img
              src="/copyPaste.jpg"
              alt="Markdown Illustration"
              className="h-48 md:h-64 w-auto"
            />
          </div>
        </main>
      )}
      {isPasted && (
        <div className="max-w-5xl w-full bg-gray-100 p-4 md:p-6 rounded-lg">
          <h2 className="font-bold text-2xl mb-4 text-center md:text-left">Converted Markdown:</h2>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto max-h-72 max-w-full text-sm md:text-base">
            {results}
          </pre>
          <div className="flex flex-col md:flex-row justify-end gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              <ContentCopyIcon />
              Copy
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            >
              <ClearIcon />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
