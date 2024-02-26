  import { useState } from "react";

  export default function Item({title, id, status }) {
    const [checked, setChecked] = useState(status);
    const [editedTitle, setEditedTitle] = useState(title);
    const [visible, setVisible] = useState(true);
    const [editMode, setEditMode] = useState(false);
  
    const classes = ['todo'];
  
    if (checked) {
      classes.push('status');
    }
    
    const updateStatus = () => {
      setChecked(!checked,)
      const storedTodos = JSON.parse(localStorage.getItem('tasks'));
      storedTodos.forEach(el => {
        if (el.id === id) {
          el.status = !checked;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(storedTodos));
    };
  
    const removeElement = () => {
      setVisible(prev => !prev);
      const storedTodos = JSON.parse(localStorage.getItem('tasks'));
      const removeTodos = storedTodos.filter(item => item.id !== id);
      localStorage.setItem('tasks', JSON.stringify(removeTodos));
    };
  
    const editElement = () => {
      setEditMode(true);
    };
  
    const saveEditedTitle = () => {
      setEditMode(false);
      const storedTodos = JSON.parse(localStorage.getItem('tasks'));
      storedTodos.forEach(el => {
        if (el.id === id) {
          el.title = editedTitle;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(storedTodos));
    };
  
    const handleInputChange = (e) => {
      setEditedTitle(e.target.value);
    };
  
    return (
      <>
        {visible && (
          <li className={classes.join(' ')}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={updateStatus}
              />
              {editMode ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{editedTitle}</span>
              )}
              {editMode ? (
                <button onClick={saveEditedTitle}>SAVE</button>
              ) : (
                <button className="edit-button" onClick={editElement}>EDIT</button>
              )}
              <button
                className="material-icons black-text delete-button"
                onClick={removeElement}
              >
                X
              </button>
            </label>
          </li>
        )}
      </>
    );
  }
  
