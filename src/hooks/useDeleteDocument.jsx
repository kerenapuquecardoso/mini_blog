import { useState, useEffect, useReducer } from "react";
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase/config';

const initalState = {loading: null, error: null};

const deleteReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "DLETE_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispacth] = useReducer(deleteReducer, initalState);
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispacth(action);
        }
    };

    const deleteDocument = async(id) => {
        checkCancelBeforeDispatch({type:"LOADING"});
        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));
            checkCancelBeforeDispatch({type:"DELETE_DOC", payload: deletedDocument});
            
        } catch (error) {
            checkCancelBeforeDispatch({type:"ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    },[]);

    return {deleteDocument, response};
};