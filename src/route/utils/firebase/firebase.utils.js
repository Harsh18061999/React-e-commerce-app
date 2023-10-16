import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,  //singnup with email and password
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc, //get the data in document
  setDoc, //set the data in document
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore"
const firebaseConfig = {  //firebase configuration
    apiKey: "AIzaSyBX_gaVkdKpJfXlIj7gta_FQ3pusVY-UQM",
    authDomain: "crwn-clothing-db-5810d.firebaseapp.com",
    projectId: "crwn-clothing-db-5810d",
    storageBucket: "crwn-clothing-db-5810d.appspot.com",
    messagingSenderId: "319189476423",
    appId: "1:319189476423:web:2a8905a4e6b3f298cdbd62"
  };

  const firebaeApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth(); //get access token to singin user
  export const singnInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const singnInWithGoogleRedirct = () => signInWithRedirect(auth,provider);
  export const db = getFirestore();

  //addcollection and docment
  export const addCollectionAndDocument = async (collectionkey,objectsToAdd,field) => {
    const collectionRef = collection(db,collectionkey); 
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef,object);
    });

    await batch.commit();
    console.log("done");
  }

  export const getCategoriesAndDocument = async() => {
    const collectionRef = collection(db,'categories');

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    // console.log(querySnapshot.docs.map((docSnapshot) => docSnapshot.data()), " querySnapshot")
    // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
    //   const {title,items} = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // },{});

    // return categoryMap;
  }

  export const createUserDocumentFromAuth = async(userAuth,additionalText={}) => {
    const userDocRef = doc(db,'users',userAuth.uid); //connect users table
    const userSnapshot = await getDoc(userDocRef); //get user document

    if(!userSnapshot.exists()){ //check users exists or not
      const { displayName,email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{ //create a new document
          displayName,
          email,
          createdAt,
          ...additionalText
        })
      }catch (error){
        console.log("error creating the user",error.message)
      }

    }

    return userSnapshot;//return exists user or create user
  }

  export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return; //if not reciev email or password then return back
    return await createUserWithEmailAndPassword(auth,email,password) //firbase method to singup with email and password
  }

  export const signInAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return; //if not reciev email or password then return back
    return await signInWithEmailAndPassword(auth,email,password) //firbase method to singup with email and password
  }

  export const singnOutUser = async() => await signOut(auth);

  // export const onAuthStateChangedListener = (callBack) => {onAuthStateChanged(auth,callBack)}

  export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    })
  }