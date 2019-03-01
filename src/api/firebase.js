import {firebaseApp } from "../config";

export async function loginHandler(id, pass, type) {
  let result;
  if (type === "email") result = await emailLoginHandler(id, pass);
  return result;
}

export async function emailLoginHandler(email, pass) {
  const result = await firebaseApp.auth().signInWithEmailAndPassword(email, pass)
    .catch(err => err);
    return result
}
