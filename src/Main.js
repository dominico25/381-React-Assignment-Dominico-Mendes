import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
//const[isEditMode, setIsEditMode] = useState[true];

function Main({notes, activeNote, onUpdateNote, onDeleteNote, isExistingNote}) {
    const [lastSaveDate, setLastSaveDate] = useState(null);
    const [isEditMode, setIsEditMode] = useState(true);
    const navigate = useNavigate();
    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        }, () => {
            setLastSaveDate(new Date());
        });
        const titleInput = document.getElementById("title");
        titleInput.style.outline = "none";
        setIsEditMode(true);
        navigate(`/notes/${activeNote.id}/edit`);
    };

   

    if(!activeNote) return <div class = "no-active-note">No note selected</div>
    
    return (
        <div class = "app-main">
            {isEditMode ? (
                <div class = "app-main-note-edit">
                    <header class = "title-header">
                        <div class = "left-main-header">
                            <input
                                type = "text"
                                id = "title"
                                value = {activeNote.title}
                                onChange = {(e) => onEditField("title", e.target.value)}
                                autoFocus>
                            </input>
                            <small class = "note-meta">
                                Last modified {new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </small>
                        </div>
                        <div class = "right-main-header">
                            {isEditMode ? (
                                <button class = "header-save-button" onClick = {() => {setIsEditMode(false); setLastSaveDate(new Date()); }}>Save</button>
                            ) : (
                                <button id = "edit-button" onClick = {() => setIsEditMode(true)}>Edit</button>
                            )}
                                <button class = "header-delete-button" onClick = {() => onDeleteNote(activeNote.id)}>Delete</button>
                        </div>
                        
                    </header>

                    <div id = "edit-quill">
                        <ReactQuill
                            id = "body"
                            placeholder = "Your note here..."
                            value = {activeNote.body}
                            onChange = {(value) => onEditField("body", value)}
                            modules={{
                                toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                [{'script': 'sub'}, {'script': 'super'}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                [{ 'align': [] }],
                                ['clean']
                                ],
                            }}>
                        </ReactQuill>
                    </div>
                </div>
            ) : (
            <div class = "app-main-note-preview">
                <header class = "title-header">
                    <div class = "left-main-header">
                        <h1 class = "preview-title">{activeNote.title}</h1>
                        <small class = "note-meta">
                            Last modified {new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                    </div>
                    <div class = "right-main-header">
                        {isEditMode ? (
                            <button class = "header-save-button" onClick = {() => {setIsEditMode(false); setLastSaveDate(new Date()); }}>Save</button>
                        ) : (
                            <button class = "header-edit-button" onClick = {() => setIsEditMode(true)}>Edit</button>
                        )}
                            <button class = "header-delete-button" onClick = {() => onDeleteNote(activeNote.id)}>Delete</button>
                    </div>
                    
                </header>
                <div dangerouslySetInnerHTML = {{__html: activeNote.body}} class = "markdown-preview"></div>
            </div>
            )}
        </div>
        );
    
    

}

export default Main;

/*
modules={{
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{ 'align': [] }],
      ['clean']
    ],
  }}>*/