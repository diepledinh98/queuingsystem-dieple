import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4SLFTgTrWX6t1ARp5z2BIWKS8XNYorFI",
    authDomain: "project-b4466.firebaseapp.com",
    projectId: "project-b4466",
    storageBucket: "project-b4466.appspot.com",
    messagingSenderId: "605211537466",
    appId: "1:605211537466:web:c212903173a797d63f4503"
};


export class FirebaseConfig {
    private static instance: FirebaseConfig | null = null;
    private fbApp: any = null;
    fbDB: any = null;
    auth: any = null;

    constructor() {
        this.fbApp = initializeApp(firebaseConfig);
        this.fbDB = getFirestore(this.fbApp);
        this.auth = getAuth(this.fbApp);
    }



    static getInstance() {
        if (this.instance == null) {
            this.instance = new FirebaseConfig();
        }

        return this.instance;
    }
}