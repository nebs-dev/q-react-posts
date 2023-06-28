# q-react-posts
This is a React application that displays a list of posts and associated comments fetched from the provided API. 

It includes two routes: /posts and /post/{id}. 

The /posts route shows a list of posts and associated comments, while the /post/{id} route displays details of a specific post. The application also provides a search feature to filter posts by user name.

# Installation
- Clone the repository: 
```bash
   git clone <repository-url>
```
- Navigate to the project directory: cd q-react-posts
- Install dependencies: 
```bash
   yarn install
```

# Usage
- Start the development server: 
```bash 
   yarn dev
```

- Open your browser and visit `http://localhost:3000` to access the application.

- Testing:
```bash
   yarn test
```

# Features
- List of Posts: View a list of posts fetched from the API.
- Associated Comments: Each post displays its associated comments.
- User Filtering: Filter posts by user name using the search input field.
- Post Details: Clicking on a post redirects to a new page showing the details of that post.
- Console Logging: Each component logs a message to the console when rendered.

# Development
- Vite: The project uses Vite as the build tool for the React application.
- TypeScript: The app is built with TypeScript for static type checking and enhanced developer experience.
- No 3rd Party State Management: State management is handled within the app without relying on 3rd party solutions.
- No 3rd Party UI Component Libraries: The app's UI components are built without using any external UI component libraries.

# API
The app fetches data from the JSONPlaceholder API.