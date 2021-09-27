import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = '/api/';

const changeUser = (authToken) => {
    axios.defaults.headers.common['Authorization'] = `token ${authToken}`
}

const login = (data) => {
    const result = axios.post('/auth/login', {
        email: data.email,
        password: data.password
    })
    return result
}

const register = async (data) => {
    try {
        const result = await axios.post('/auth/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        })
        return result
    } catch (err) {
        return err
    }
}

const getNotes = async (callback) => {
    try {
        const result = await axios.get('/notes')
        result.data.forEach(note => {
            callback(note)
        });
    } catch (err) {

    }
}

const addNote = (note) => {
    const result = axios.post('/notes', {
        title: note.title,
        text: note.text
    })
    return result
}

const updateNote = (note) => {
    const result = axios.put('/notes', {
        id: note.id,
        title: note.title,
        text: note.text
    })
    return result
}

const deleteNote = (id) => {
    const result = axios.delete('/notes', { data: { id: id } })
    return result
}

export {
    changeUser,
    login,
    register,
    getNotes,
    addNote,
    updateNote,
    deleteNote
}