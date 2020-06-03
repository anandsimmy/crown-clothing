import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './firebase-config'

firebase.initializeApp(firebaseConfig)

export const createUserProfileInDB=async (userAuthObj, additionalData) => {
    
    if(!userAuthObj)
        return;
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

}

export const auth= firebase.auth()
export const firestore= firebase.firestore()

const provider= new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle= () => auth.signInWithPopup(provider)

export default firebase