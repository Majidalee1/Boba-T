import "firebase/database";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  initializeFirestore,
  query,
  where,
  updateDoc,
  Query,
} from "firebase/firestore";
import { DataSnapshot } from "firebase/database";

interface BaseEntity {
  id: string;
}

// firebase service to get

export class FireStoreService<T extends Record<string, any> | BaseEntity> {
  private app: FirebaseApp;
  private firestore: Firestore;
  private readonly dbCollection: CollectionReference;

  constructor(collectionName: string) {
    this.app = initializeApp({
      apiKey: "AIzaSyDcQReHS0ZGehjk6GGwoPQSyla62MOfcRY",
      authDomain: "bubble-tea-f3d52.firebaseapp.com",
      projectId: "bubble-tea-f3d52",
      storageBucket: "bubble-tea-f3d52.appspot.com",
      messagingSenderId: "362244652400",
      appId: "1:362244652400:web:9465f5fc3f5818dcfd63b5",
      measurementId: "G-BHGLTWSSRB",
    });
    this.firestore = getFirestore(this.app);

    this.dbCollection = collection(this.firestore, collectionName);
  }
  async create(data: T): Promise<T> {
    const docRef = await addDoc(this.dbCollection, data);
    const docSnapshot = await getDoc(docRef);
    return { id: docSnapshot.id, ...docSnapshot.data() } as T;
  }

  // create multiple documents
  async createMany(data: T[]): Promise<T[]> {
    const response = await Promise.all(
      data.map(async (item) => await this.create(item))
    );
    return response;
  }

  // Get a document by its ID
  async getById(id: string): Promise<T | null> {
    const docRef = doc(this.dbCollection, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as T;
    }
    return null;
  }

  // Update an existing document
  async update(id: string, data: Partial<T>): Promise<T | null> {
    const docRef = doc(this.dbCollection, id);
    await updateDoc(docRef, data as DocumentData);
    const updatedDocSnapshot = await getDoc(docRef);
    if (updatedDocSnapshot.exists()) {
      return { id: updatedDocSnapshot.id, ...updatedDocSnapshot.data() } as T;
    }
    return null;
  }

  // Delete a document by its ID
  async delete(id: string): Promise<boolean> {
    const docRef = doc(this.dbCollection, id);
    await deleteDoc(docRef);
    return true;
  }

  // get filtered documents

  async getFiltered(
    field: keyof T extends string ? keyof T : never,
    operator: "<" | "<=" | "==" | ">=" | ">",
    value: string | number | boolean
  ): Promise<T[]> {
    const querySnapshot: Query<DocumentData> = await query(
      this.dbCollection,
      where(field, operator, value)
    );

    const data = await getDocs(querySnapshot);

    console.log("data from firebase", { data });
    return data.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );
  }

  // Get all documents in the collection
  async getAll(): Promise<T[]> {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      this.dbCollection
    );

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );
  }
}