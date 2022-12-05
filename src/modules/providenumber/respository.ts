import { async } from "@firebase/util";
import { query } from "express";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
const db = FirebaseConfig.getInstance().fbDB

export const getProvideNumber = async () => {


    let providenumber: Array<undefined | object> = [];
    const q = collection(db, "providenumber");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        providenumber.push({ id, ...doc.data() });
    });



    return providenumber;
};

