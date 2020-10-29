import React from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css";
import Home from './components/pages/Home'
import Signup from './components/pages/Join/Signup'
import Discover from './components/pages/Discover'

import LearningPaths from './components/pages/LearningPaths/LearningPaths'

import Display from './components/Display'
import Form from './components/Form'
import Videos from './components/Videos'



function App() {
 //Variable to hold url
 const url = "http://localhost:5000";
 //State to Hold Words
 const [words, setWords] = React.useState([]);

 //Empty Word
 const emptyWord = {
   name: "",
   age: 0,
   img: "",
 };
 const [selectedWord, setSelectedWord] = React.useState(emptyWord);

 //Function to get words via API
 const getWords = () => {
   fetch(url + "/word")
     .then(response => response.json())
     .then(data => {
       setWords(data)
     })
 }

 //useEffect to do initial call of getWords
 React.useEffect(() => {
   getWords()
 }, [])

 //handle create to create words
 const handleCreate = (newWord) => {
   fetch(url + "/word", {
     method: "post",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(newWord),
   }).then((response) => {
     getWords();
   });
 };

 //handleUpdate function for updating words
 const handleUpdate = (word) => {
   fetch(url + "/word/" + word._id, {
     method: "put",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(word),
   }).then(() => {
     // don't need the response from the post but will be using the .then to update the list of words
     getWords();
   });
 };

 const selectWord = (word) => {
   setSelectedWord(word);
 };

 const deleteWord = (word) => {
   fetch(url + "/word/" + word._id, {
     method: "delete",
     headers: {
       "Content-Type": "application/json",
     },
   }).then(() => {
     // don't need the response from the post but will be using the .then to update the list of words
     getWords();
   });
 };

    return (
        <>

            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route
            exact
            path="/discover"
            render={(rp) => (
              <Display
                selectWord={selectWord}
                deleteWord={deleteWord}
                {...rp}
                words={words}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                word={{}}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                word={selectedWord}
                handleSubmit={handleUpdate}
              />
            )}
          />
          <Route
            exact
            path="/videos"
            render={(rp) => <Videos {...rp} word={selectedWord} />}
          />
            </Switch>

        </>
    )
}

export default App



