import {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  
  const data = JSON.parse(localStorage.getItem('notesStorage'));
  const [notes, setNotes] = useState(data || []);
  useEffect(() => {
    localStorage.setItem('notesStorage', JSON.stringify(notes));
  }, [notes])

  

  const [activeNote, setActiveNote] = useState(false);

  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();

  console.log(notes)

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    navigate(`/notes/${newNote.id}`)
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
      
    });
    
    setNotes(updatedNotesArray);

  }

  // useEffect(()=>{
  //   localStorage.setItem("notes", JSON.stringifynotes)
  // },[])

  const findIndex = (array, uniquedId) => {
    for (let i=0 ; i < array.length; i++) {
        if ((array[i].id) === uniquedId) {
            return i;
        }
    }
}

  const onDeleteNote = (idToDelete) => {
    const ans = window.confirm("Are you sure you want to delete this note?");
    if(ans) {
      if (notes.length > 1) {
        const index = findIndex(notes, idToDelete)
        notes.splice(index, 1);
        localStorage.setItem('notesStorage', JSON.stringify(notes));
        navigate(`/notes/${notes[0].id}`, {replace : true})
      }
      else {
        notes.splice(0, 1);
          localStorage.setItem('notesStorage', JSON.stringify(notes));
          navigate(`/notes`, {replace : true})
      }
    }
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
/*
  const showSidebar = () => {
    const sidebar = document.querySelector('.Sidebar');
    sidebar.style.display = (sidebar.style.display === 'none') ? 'block' : 'none';
  }*/

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  
/*
  const onSaveNote = (idToSave) => {
    
  }*/

  return (
    <div> 
      <header>
        <div class = "items">
          <button type="button" id="info" class = "buttons" onClick = {toggleSidebar} >
            <div class = "lines"></div>
            <div class = "lines"></div>
            <div class = "lines"></div>
          </button>
        </div>
        <div>
          <h1 class = "center">Lotion</h1>
          <h6 class = "center">Like Notion, but worse.</h6>
        </div>
        <div class = "items"></div>
      </header>
      <div class = "mainnn">
        {showSidebar && (
          <Sidebar
            id = "side"
            notes = {notes}
            onAddNote = {onAddNote}
            onDeleteNote = {onDeleteNote}
            activeNote = {activeNote}
            setActiveNote = {setActiveNote}> 
          </Sidebar>
        )}
        
        <Main
          activeNote = {getActiveNote()}
          onUpdateNote = {onUpdateNote}
          onDeleteNote = {onDeleteNote}>
        </Main>
      </div>
    </div>

  );
}

export default App;



    /*
    <body> 
      <header>
        <div id = "items">
          <button class = "menu-button">
            <div class = "menu"></div>
            <div class = "menu"></div>
            <div class = "menu"></div>
          </button>
        </div>
        <div>
          <h1 class = "center">Lotion</h1>
          <h6 class = "center">Like Notion, but worse.</h6>
        </div>
        <div class = "menu-button"></div>

      </header>
    </body>
    */

    /*<body>
      <header>
        <button>
          <div class = "menu"></div>
          <div class = "menu"></div>
          <div class = "menu"></div>
        </button>
        <div>
          <h1>Lotion</h1>
          <h6>Like Notion, but worse.</h6>
        </div>
      </header>
    </body>*/

    /*
    <div class = "content">
        <div id = "middle">
          <aside id = "main-screen">
          </aside>
          <aside id = "rules-info">
            <ul id = "how-to-play">
              <li><strong>How To Play</strong></li>
              <li>- Start typing. The letters will appear in the boxes</li>
              <li>- Remove letters with Backspace</li>
              <li>- Hit Enter/Return tp submit an answer</li>
              <li>- Letters with green background are in the right spot</li>
              <li>- Letters with yellow background exist in the word, but are in the wrong spots</li>
              <li>- Letters with gray background do not exist in the word</li>
              <li>- If you need a hint, click the ? icon</li>
            </ul>
          </aside>
        </div>
      </div>
      */
      /*
      <div class = "mainnn">
        <div class = "left">
          <div class = "left-title">

          </div>
          <div class = "left-body">

          </div>
        </div>
        <div class = "right">
          <div class = "right-title">

          </div>
          <div class = "right-body">
            
          </div>
        </div>
      </div>*/
      

