import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebase-config'

import { addItemToCart, decrementItemQuantity } from '../redux/cart/cart-utils'

firebase.initializeApp(firebaseConfig)

export const auth= firebase.auth()
export const firestore= firebase.firestore()

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
                cartItems: [],
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user in db', error.message)
        }
    }
    return userDocRef
}

export const addItemInOnlineCart= async (payload) => {
    const userAuthObj= await getCurrentUser()
    if(!userAuthObj)
        return
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    const userData= snapShot.data()
    const updatedCart= addItemToCart(userData.cartItems, payload)
    try{
        userDocRef.update({
            cartItems: updatedCart
        })
    }
    catch (error) {
        console.log('error adding item to online cart', error.message)
    }
}

export const subtractItemInOnlineCart= async (payload) => {
    const userAuthObj= await getCurrentUser()
    if(!userAuthObj)
        return
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    const userData= snapShot.data()
    const updatedCart= decrementItemQuantity(userData.cartItems, payload)
    try{
        userDocRef.update({
            cartItems: updatedCart
        })
    }
    catch (error) {
        console.log('error adding item to online cart', error.message)
    }
}

export const clearItemInOnlineCart= async (payload) => {
    const userAuthObj= await getCurrentUser()
    if(!userAuthObj)
        return
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    const userData= snapShot.data()
    const updatedCart= userData.cartItems.filter(cartItem => cartItem.id !== payload.id)
    try{
        await userDocRef.update({
            cartItems: updatedCart
        })
    }
    catch (error) {
        console.log('error adding item to online cart', error.message)
    }
}

export const getSavedCartItems= async() => {
    const userAuthObj= await getCurrentUser()
    if(!userAuthObj)
        return
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    const userData= snapShot.data()
    const savedCartItems= userData.cartItems
    return savedCartItems
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

export const getCurrentUser=() => {
    return new Promise((resolve, reject)=>{
        const unsubscribe= auth.onAuthStateChanged((userAuth)=>{
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

export const googleProvider= new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle= () => auth.signInWithPopup(googleProvider)

export default firebase