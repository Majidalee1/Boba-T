import firebase from "firebase";
import "firebase/database";

interface BaseEntity {
  id: string;
}

class FirebaseService<T extends BaseEntity> {
  private database: firebase.database.Database;
  private collectionName: string;

  constructor(collectionName: string) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBSbMQkY61aZHpZGfX8PhwxTUv5MIyByCM",
        authDomain: "hulu-clone-69f07.firebaseapp.com",
        projectId: "hulu-clone-69f07",
        storageBucket: "hulu-clone-69f07.appspot.com",
        messagingSenderId: "963229812121",
        appId: "1:963229812121:web:c565ce793e4bd1897c3f08",
      });
    }
    this.database = firebase.database();
    this.collectionName = collectionName;
  }

  // Helper function to convert Firebase snapshot to array of objects
  private snapshotToArray(snapshot: firebase.database.DataSnapshot): T[] {
    const entities: T[] = [];
    snapshot.forEach((childSnapshot) => {
      const entity = {
        id: childSnapshot.key!,
        ...childSnapshot.val(),
      } as T;
      entities.push(entity);
    });
    return entities;
  }

  // Get all entities
  async getAllEntities(): Promise<T[]> {
    const snapshot = await this.database.ref(this.collectionName).once("value");
    return this.snapshotToArray(snapshot);
  }

  // Add an entity
  async addEntity(entity: T): Promise<T> {
    const ref = this.database.ref(this.collectionName).push();
    entity.id = ref.key!;
    await ref.set(entity);
    return entity;
  }

  // Update an entity
  async updateEntity(entity: T): Promise<void> {
    const ref = this.database.ref(`${this.collectionName}/${entity.id}`);
    await ref.update(entity);
  }

  // Delete an entity by ID
  async deleteEntityById(id: string): Promise<void> {
    const ref = this.database.ref(`${this.collectionName}/${id}`);
    await ref.remove();
  }

  // Create an entity from a model definition
  async createEntity(entity: Omit<T, "id">): Promise<T> {
    const ref = this.database.ref(this.collectionName).push();
    const id = ref.key!;
    const entityWithId = {
      id,
      ...entity,
    } as T;
    await ref.set(entityWithId);
    return entityWithId;
  }
}

export default FirebaseService;
