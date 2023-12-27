import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const addToFavorites = async (article) => {
  const userId = auth.currentUser.uid;

  try {
    const favoritesRef = doc(collection(firestore, 'favorites'), userId);
    const favoritesSnapshot = await getDoc(favoritesRef);
    const currentFavorites = favoritesSnapshot.exists() ? favoritesSnapshot.data().articles : [];
    const updatedFavorites = [...currentFavorites, article];
    await setDoc(favoritesRef, { articles: arrayUnion(...updatedFavorites) });
    console.log('Article added to favorites successfully');
  } catch (error) {
    console.error('Error adding article to favorites:', error.message);
  }
};

export { auth, firestore, addToFavorites };
