# Setting up
To add the node modules to your project, run the following command:
```bash
npm install
```

Then install the following dependencies.

## Dependencies Needed
**Make sure you are in your project directory**
### React Router
```bash
npm install react-router-dom localforage match-sorter sort-by
```
### Tailwind CSS
- Run the following commands:
```bash 
npm install -D tailwindcss postcss autoprefixer
``` 
and 
```bash 
npx tailwindcss init -p
```

- Then add the following to your `tailwind.config.js` file

### React Toastify
```bash
npm install --save react-toastify
```

### React icons
```bash
npm i react-icons
```

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add the @tailwind directives for each of Tailwind’s layers to your `./src/index.css` file.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Running the project
To run the project, run the following command:
`npm run dev`