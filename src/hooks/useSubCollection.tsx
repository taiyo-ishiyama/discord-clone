import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  DocumentData,
  Query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useAppSelector } from "../app/hooks";


interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (collectionName: string, subCollectionName: string) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);

  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );

    onSnapshot(collectionRefOrderBy, (snapShot) => {
      let results: Messages[] = [];
      snapShot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
    });
  }, [channelId]);
  return {subDocuments};
};

export default useSubCollection;
