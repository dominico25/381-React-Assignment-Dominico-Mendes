function Sidebar({notes, onAddNote, activeNote, setActiveNote,}) {
    
    return (
        <div class = "app-sidebar">
            <div class = "app-sidebar-header">
                <h1>Notes</h1>
                <button class = "add-button" onClick = {onAddNote}>+</button>
            </div>
            <div class = "app-sidebar-notes">
                {notes.map((note) => (
                    <div
                        class = {`app-sidebar-note ${note.id === activeNote && "active"}`}
                        onClick = {() => setActiveNote(note.id)}>
                        <div class = "sidebar-note-title">
                            <strong>{note.title}</strong>
                        </div>
                        <small class = "note-meta">
                            Last modified {new Date(note.lastModified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                        <div dangerouslySetInnerHTML = {{__html: note.body.substring(0,60)}} class = "markdown-preview"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;

//<p>{note.body && note.body.substr(0, 100) + "..."}</p>