import axios from 'axios';

const baseUrl = "http://localhost:8080";

const getAllToDo = (setToDo) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            console.log('data-->', data);
            setToDo(data)
        })
        .catch((err)=>console.log(err))
}

const addToDo = (text, setText, setToDo) => {

    axios
        .post(`${baseUrl}/save`, { text })
        .then((data) => {
            console.log('data-->', data);
            setText("")
            getAllToDo(setToDo)
        })
        .catch((err)=>console.log(err))
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios
        .post(`${baseUrl}/update`, { _id: toDoId, text })
        .then((data) => {
            console.log('data-->', data);
            setText("");
            setIsUpdating(false);
            getAllToDo(setToDo);
        })
        .catch((err) => console.log(err));
};

const deleteToDo = (_id,setToDo) => {
    axios
        .post(`${baseUrl}/delete`, { _id})
        .then((data) => {
            console.log('data-->', data);
            getAllToDo(setToDo);
        })
        .catch((err) => console.log(err));
};

export { getAllToDo, addToDo ,updateToDo,deleteToDo}


