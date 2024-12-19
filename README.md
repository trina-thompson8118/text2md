Text2Markdown
==============

A **React-based web application** that converts text from Word, Google Docs, or any other source into clean Markdown. It provides an easy-to-use interface for pasting rich text or HTML and instantly generating Markdown with support for headers, tables, and other formatting.

For a demo of this please visit [DEMO](https://text2md.vercel.app/).

Features
--------

-   **Markdown Conversion**: Automatically converts rich text or HTML into Markdown format.
-   **Sanitization**: Cleans HTML by removing unnecessary styles, comments, and metadata.
-   **Advanced Rules**:
    -   Proper handling of headers (`h1` through `h6`).
    -   Converts HTML tables into Markdown tables.
-   **Interactive UI**:
    -   Paste content to view instant conversion.
    -   Copy the generated Markdown with one click.
    -   Clear results to start fresh.
-   **Toast Notifications**: Provides feedback for actions like copying Markdown or handling errors.

Technologies Used
-----------------

-   **React**: Frontend framework for building the user interface.
-   **Next.js**: React framework for server-side rendering.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Third-Party Libraries**:
    -   `Turndown`: Converts HTML to Markdown.
    -   `React-Toastify`: Provides notifications.
    -   `Material-UI Icons`: Adds visual components.

Installation
------------

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  **Open the app:** Navigate to `http://localhost:3000` in your browser.

Usage
-----

1.  **Paste Content**:
    -   Copy text or HTML from any source (e.g., Word, Google Docs).
    -   Paste the content into the app using `Ctrl+V` or `Cmd+V`.
2.  **View Markdown**:
    -   The converted Markdown is displayed instantly.
3.  **Copy Markdown**:
    -   Click the "Copy" button to copy the Markdown to your clipboard.
4.  **Clear Results**:
    -   Use the "Clear" button to reset the app and paste new content.

Deployment
----------

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Start the production server:**

    ```bash
    npm start
    ```

3.  **Deploy**: Host the application on platforms like Vercel or Netlify.

Future Enhancements
-------------------

-   Support for dark mode for improved usability.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
---------------

-   **Turndown**: For providing a robust HTML-to-Markdown conversion library.
-   **React-Toastify**: For enabling user-friendly notifications.
-   **Open-Source Community**: For the tools and libraries used in this project.
