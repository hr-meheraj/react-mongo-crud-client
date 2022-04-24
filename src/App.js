import './App.css'
import {useEffect, useState} from 'react';
import { useFetch } from './HOOK/useFetch';

function App() {
    const {loading,data, setData} = useFetch('https://node-mongodb-crud.hrmeheraj.repl.co/notes/');
    const [isPost, setIsPost] = useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        alert("submite")
        const userName = e.target.username.value;
        const note = e.target.note.value;
        const noteData  = {
            userName,
            note
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        };
        fetch('https://node-mongodb-crud.hrmeheraj.repl.co/notes',requestOptions)
        .then(response => response.json())
        .then(result => {
            const newData = [...data, noteData];
            setData(newData);
        });
    }
    const handleDelete = id => {
        fetch(`https://node-mongodb-crud.hrmeheraj.repl.co/notes/${id}`,{
            method: 'DELETE'
        })
        .then( res => res.json())
        .then( result => {
           const process = window.confirm("Do you want to delete it?");
           if(process){
            const newDeletedData = data.filter(eachData => eachData._id !== id);
            setData(newDeletedData);
           }
        })
    }
//     useEffect(() =>{
//         setData(data);
// //
//     }, [isPost])
  return (
    <div>
        {
            loading && <h2>Loading...</h2> 
        }
       <nav> 
           Navbar Header
        </nav>
        <br/>
        <div>
            <h2>All Data {data.length}</h2> 
            <form onSubmit={handleSubmit}>
                <input placeholder='enter your username' required name='username'/><br/>
                <textarea placeholder='enter your note' required name='note' rows='5'/>
                <input type='submit' value="Add Note"/>
            </form>
            <div classname='data-container'>
                {
                    data.map(eachData => (
                        <div key={eachData._id}>
                            <strong>{eachData.userName}</strong> : 
                            <p>{eachData.note}</p>
                            <button onClick={() => handleDelete(eachData._id)}>X</button>
                        </div>
                    ))

                }
            </div>
        </div>

    </div>
  );
}

export default App;
