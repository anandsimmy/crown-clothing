import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './firebase-config'

firebase.initializeApp(firebaseConfig)

export const createUserProfileInDB=async (userAuthObj, additionalData) => {
    
    if(!userAuthObj)
        return;
    //if debugger is enabled google sign-in is working. need to debug more into google sign-in bug
    //debugger
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    if(!snapShot.exists){
        const { displayName, email }= userAuthObj
        const createdAt= new Date()
        try{
            userDocRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userDocRef
}

export const addCollectionsAndDocumentsInDB= async (collectionsKey, ObjectsToAdd) => {
    const collectionsRef= firestore.collection(collectionsKey)
    //we are using batch, to make sure all objs has been written to DB successfully
    const batch= firestore.batch()
    ObjectsToAdd.forEach(obj => {
        const newDocRef= collectionsRef.doc()
        batch.set(newDocRef, obj)
    })
    return await batch.commit()
}

export const transformCollectionArray=(snapShotObj)=>{
    //adding two extra properties, id and routeName
    const transformedArray= snapShotObj.docs.map(doc => {
        const { title, items }= doc.data()
        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    })
    //converting array to an object
    return transformedArray.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()]= collection
        return acc
    }, {})
}

export const auth= firebase.auth()
export const firestore= firebase.firestore()

export const googleProvider= new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle= () => auth.signInWithPopup(googleProvider)

export default firebase