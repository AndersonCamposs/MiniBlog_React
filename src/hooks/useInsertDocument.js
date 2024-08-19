import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const initialState = { loading: null, error: null };

const insertReducer = (state, action) => {
  console.log('Entrei no insertReducer()');
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      console.log('Caí no default');

      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({ type: 'LOADING' });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({ type: 'INSERTED_DOC', payload: insertedDocument });
    } catch (error) {
      console.log(error);
      console.log(cancelled);
      checkCancelBeforeDispatch({ type: 'ERROR', payload: error.message });
    }
  };

  // useEffect(() => {
  //   return () => setCancelled(true);
  // }, [response.loading]);

  return { insertDocument, response };
};
