## Project Setup and Dependencies

### Frontend Dependencies

To set up the frontend dependencies, follow these steps:

1. **Install Node Modules**: Run the following command in your project directory to install necessary Node modules:

```bash
npm install
```

2. **React Router**: Install React Router dependencies:

```bash
npm install react-router-dom localforage match-sorter sort-by
```

3. **Tailwind CSS**: Install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

    Then add the following configuration to your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

    Finally, add the Tailwind directives to your `./src/index.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **React Toastify**: Install React Toastify:

```bash
npm install --save react-toastify
```

5. **React Icons**: Install React Icons:
```bash
npm i react-icons
```

6. **Install Axios**: Install Axios for making HTTP requests:
```bash
npm i axios
```

### Backend Dependencies

To set up the backend dependencies, follow these steps:

1. **Go to Backend Folder**: Navigate to the backend folder in your project.

2. **Install Node Modules**: Run the following command to install necessary Node modules:

```bash
npm install nodemon express cors mysql
```

### Running the Project

After setting up dependencies, you can run the project by following these steps:

1. **Frontend**: In the frontend directory, run the following command:

```bash
npm run dev
```

2. **Backend**: In the backend directory, run the following command:
```bash
npm start
```

Ensure both frontend and backend servers are running concurrently for the full functionality of the project.
