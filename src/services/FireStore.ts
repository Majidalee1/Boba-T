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
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyDcQReHS0ZGehjk6GGwoPQSyla62MOfcRY",
  authDomain: "bubble-tea-f3d52.firebaseapp.com",
  projectId: "bubble-tea-f3d52",
  storageBucket: "bubble-tea-f3d52.appspot.com",
  messagingSenderId: "362244652400",
  appId: "1:362244652400:web:9465f5fc3f5818dcfd63b5",
  measurementId: "G-BHGLTWSSRB",
});

export const db = (collectionName: string) => {
  const firstore = getFirestore(app);
  return collection(firstore, collectionName);
};
export const storage = getStorage(app);

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
  async createById(id: string, data: T): Promise<T> {
    const docRef = await doc(this.dbCollection, id);
    setDoc(docRef, data);
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
    const Query = query(this.dbCollection, where("id", "==", id));
    const docSnapshot = await getDocs(Query);
    console.log("===getById====", id, docSnapshot);
    // docSnapshot.docs.map((val,i)=>console.log("====>>>>>",val.id))
    if (docSnapshot.docs.length > 0) {
      return {
        id: docSnapshot.docs[0].id,
        Id: docSnapshot.docs[0].id,
        ...docSnapshot.docs[0].data(),
      } as unknown as T;
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
  async delete(id: string) {
    const Query = query(this.dbCollection, where("id", "==", id));
    const docRef = await getDocs(Query);
    return await docRef.docs.map(async (doc) => await deleteDoc(doc.ref));
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

    console.log("data from firebase", data.docs);
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

  // get from sub collection
  async getSubCollection<
    SubcollectionType extends Record<string, any> | BaseEntity
  >(
    id: string,
    subCollectionName: string
  ): Promise<SubcollectionType[] | null> {
    const docRef = doc(this.dbCollection, id);
    const subCollectionRef = collection(docRef, subCollectionName);
    const subCollectionSnapshot = await getDocs(subCollectionRef);
    if (subCollectionSnapshot.empty) {
      return null;
    }
    return subCollectionSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as SubcollectionType)
    );
  }

  // create in sub collections
  async createInSubCollection<SubType extends Record<string, any> | BaseEntity>(
    id: string,
    subCollectionName: string,
    data: SubType
  ): Promise<SubType[] | null> {
    //     const parentDocRef = doc(database, "chats", route.params.id);
    // const subcollectionRef = collection(parentDocRef, "messages");
    const docRef = doc(this.dbCollection, id);
    const subCollectionRef = collection(docRef, subCollectionName);
    const docRefInSubCollection = await addDoc(subCollectionRef, data);
    const docSnapshot = await getDocs(subCollectionRef);

    return docSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as SubType)
    );
  }

  // delete from sub collection
  async deleteFromSubCollection(
    id: string,
    subCollectionName: string,
    subCollectionId: string
  ) {
    const docRef = doc(this.dbCollection, id);
    const subCollectionRef = collection(docRef, subCollectionName);
    const docRefInSubCollection = doc(subCollectionRef, subCollectionId);
    return await deleteDoc(docRefInSubCollection);
  }
}
