import { useState, useEffect, useReducer } from "react";
import {db, auth} from '../firebase/config';
import {updateDoc, doc} from 'firebase/firestore';


const initalState = {loading: null, error: null};

const updatedReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "UPDATE_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
};

export const useUpdateDocument = (docCollection) => {
    const [response, dispacth] = useReducer(updatedReducer, initalState);
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispacth(action);
        }
    };

    const updateDocument = async(uid, data) => {
        checkCancelBeforeDispatch({type:"LOADING"});
        try {
            const docRef = await doc(db, docCollection, uid);
            const updateDocument  = await updateDoc(docRef, data);
            checkCancelBeforeDispatch({type:"UPDATE_DOC", payload: updateDocument});
            
        } catch (error) {
            checkCancelBeforeDispatch({type:"ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    },[]);

    return {updateDocument, response};
};