import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Timeline from "./components/Timeline";
import NewPost from "./components/NewPost";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import MyPosts from "./components/MyPosts";
import DetailedTeri from "./components/DetailedTeri";
import Header from "./components/Header";
import Landing from "./components/Landing";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="allContent max-w-3xl mx-auto ">
      <Header handleSearch={handleSearch} searchTerm={searchTerm} />
      <Landing />
      <main>
        <Switch>
          <PrivateRoute path="/son-postlar">
            <Timeline searchTerm={searchTerm} />
          </PrivateRoute>
          <PrivateRoute path="/yeni-post">
            {" "}
            <NewPost />{" "}
          </PrivateRoute>
          <PrivateRoute path="/kullanici/:id">
            <MyPosts />
          </PrivateRoute>
          <PrivateRoute path="/post-detay/:id">
            <DetailedTeri />
          </PrivateRoute>

          <Route path="/giris">
            {" "}
            <LoginForm />
          </Route>
          <Route path="/kayit-ol">
            <SignupForm />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
