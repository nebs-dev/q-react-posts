import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import withPostDataFetching from './hoc/withPostDataFetching';
import { PostProvider } from './context/PostContext';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import LogContext from './context/LogContext';

const PostsWithDataFetching = withPostDataFetching(Posts);

const App: React.FC = () => {
  const logMessage = 'Hello from';

  return (
    <Router>
      <LogContext.Provider value={{ logMessage }}>
        <div className="app">        
          <Header />

          <main className="main">
            <PostProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/posts" />} />
                <Route path="/posts" element={<PostsWithDataFetching />} />
                <Route path="/post/:id" element={<Post />} />
              </Routes>
            </PostProvider>
          </main>

          <Footer />
        </div>
      </LogContext.Provider>
    </Router>
  );
};

export default App;
