import { useState, useEffect, useReducer } from "react";
import {db, auth} from '../firebase/config';
import {collection, addDoc, Timestamp} from 'firebase/firestore';


const initalState = {loading: null, error: null};

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "INSERT_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
};

export const useInsertDocument = (docCollection) => {
    const [response, dispacth] = useReducer(insertReducer, initalState);
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispacth(action);
        }
    };

    const insertDocument = async(document) => {
        checkCancelBeforeDispatch({type:"LOADING"});
        try {
            const newDocument = {...document, createAt: Timestamp.now()};

            const insertedDocument = await addDoc(collection(db, docCollection), newDocument);
            checkCancelBeforeDispatch({type:"INSERT_DOC", payload: insertedDocument});
            
        } catch (error) {
            checkCancelBeforeDispatch({type:"ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    },[]);

    return {insertDocument, response};
};