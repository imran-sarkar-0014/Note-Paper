// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8oV7IEBxg34zo6aCkA7quij42Rnr6cwI",
    authDomain: "note-paper.firebaseapp.com",
    projectId: "note-paper",
    storageBucket: "note-paper.appspot.com",
    messagingSenderId: "35192631422",
    appId: "1:35192631422:web:d8cfecb327c43451b2e82f",
    measurementId: "G-4D7G2JJ53Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

const notesCol = collection(db, 'notes')



const getNotes = async (callback) => {
    const notesSnapShot = await getDocs(notesCol)
    notesSnapShot.docs.forEach(doc => {
        callback(
            {
                ...doc.data(), id: doc.id
            }
        )
    })
}

const addNotes = async (note) => {
    alert('addnote')
    const newData = await addDoc(notesCol, note)
    return newData.id

}

const updateNote = async (id, note) => {
    const result = await setDoc({ notesCol, id }, note)
}

const removeNote = async (id) => {
    const result = await deleteDoc({ notesCol, id })
}

export {
    getNotes,
    addNotes,
    updateNote,
    removeNote
}