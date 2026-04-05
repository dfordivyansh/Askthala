import { db } from "../config/firebase"; 
import { 
  collection, addDoc, query, where, onSnapshot, orderBy, updateDoc, doc, serverTimestamp 
} from "firebase/firestore";
// collection Refs
const complaintsRef=collection(db,"complaints")
export const createComplaint= async(complainData)=>{
    try {
        await addDoc(complaintsRef,{
            ...complainData,
            
            createdAt:serverTimestamp()
        })
        return {success:true};

    } catch (error) {
        console.error("Error creating complaint",error);
        throw error;
    }
}
// 2. Listen to User's Complaints (Real-time)
export const subscribeToUserComplaints=(userId,callback)=>{
    const q= query(
        complaintsRef,
        where("userId","==",userId),
        orderBy("createdAt","desc")
    )
    return onSnapshot(q,(snapshot)=>{
        const data=snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
        callback(data)
    })
}
// 3. Listen to ALL Complaints (Admin)
export const subscribeToAllComplaints = (callback) => {
  const q = query(complaintsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};
// 4. Update Status (Admin)
export const updateComplaintStatus = async (id, newStatus) => {
  const docRef = doc(db, "complaints", id);
  await updateDoc(docRef, { status: newStatus });
};