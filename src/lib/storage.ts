const DB_NAME = "bg-remover";
const DB_VERSION = 1;
const STORE = "images";

type ImageRecord = {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
  data: Blob;
  processed?: boolean;
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImage(file: File, processed = false): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();
  const rec: ImageRecord = {
    id,
    name: file.name,
    type: file.type,
    size: file.size,
    createdAt: Date.now(),
    data: file,
    processed,
  };
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    store.put(rec);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  db.close();
  return id;
}

export async function getImage(id: string): Promise<ImageRecord | undefined> {
  const db = await openDB();
  const rec = await new Promise<ImageRecord | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result as ImageRecord | undefined);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return rec;
}

export async function listImages(): Promise<ImageRecord[]> {
  const db = await openDB();
  const items: ImageRecord[] = [];
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        items.push(cursor.value as ImageRecord);
        cursor.continue();
      } else {
        resolve();
      }
    };
    req.onerror = () => reject(req.error);
  });
  db.close();
  items.sort((a, b) => b.createdAt - a.createdAt);
  return items;
}

export async function listProcessedImages(): Promise<ImageRecord[]> {
  const all = await listImages();
  return all.filter((r) => r.processed === true);
}
