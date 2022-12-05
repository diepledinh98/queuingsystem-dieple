import { async } from "@firebase/util";
import { query } from "express";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
const db = FirebaseConfig.getInstance().fbDB

// export const getServices = async () => {
//     let services: Array<undefined | object> = [];
//     const q = collection(db, "services");

//     const querySnapshot = await getDocs(q);
//     let id: string
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());
//         id = doc.id
//         services.push({ id, ...doc.data() });
//     });
//     return services;
// };

// export const addService = async ({
//     service,
//     id,
// }: {
//     service: object;
//     id: string;
// }) => {
//     return setDoc(doc(db, "services", id), { ...service, id });
// };

// export const updateService = async ({
//     service,
//     id,
// }: {
//     service: object;
//     id: string;
// }) => {
//     return setDoc(doc(db, "services", id), { ...service, id });
// };