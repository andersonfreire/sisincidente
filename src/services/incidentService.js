import {
    addDoc, collection, deleteDoc, doc, getDoc, getDocs,
    orderBy, query, serverTimestamp, updateDoc, where
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Criar novo incidente
export const createIncidente = async (data) => {
    try {
        const colRef = collection(db, "incidentes");
        const payload = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            deleted: false,
        };
        const res = await addDoc(colRef, payload);
        return { id: res.id, success: true, message: "Incidente criado com sucesso!" };
    } catch (error) {
        console.error("Erro ao criar incidente: ", error);
        throw error;
    }
};

// Atualizar incidente existente
export const updateIncidente = async (id, updates) => {
    try {
        const docRef = doc(db, "incidentes", id);
        const payload = {
            ...updates,
            updatedAt: serverTimestamp(),
        };
        await updateDoc(docRef, payload);
        return { success: true, message: "Incidente atualizado com sucesso!" };
    } catch (error) {
        console.error("Erro ao atualizar incidente: ", error);
        throw error;
    }
};

// Buscar todos os incidentes
export const getIncidentes = async () => {
    try {
        const colRef = collection(db, "incidentes");
        const snap = await getDocs(query(colRef, orderBy("createdAt", "desc")));
        const incidentes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return incidentes;
    } catch (error) {
        console.error("Erro ao buscar incidentes: ", error);
        throw error;
    }
};

// Buscar incidente por ID
export const getIncidenteById = async (id) => {
    try {
        const docRef = doc(db, "incidentes", id);
        const snap = await getDoc(docRef);
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    } catch (error) {
        console.error("Erro ao buscar incidente pelo ID: ", error);
        throw error;
    }
};

// Deletar incidente
export const deleteIncidente = async (id) => {
    try {
        await deleteDoc(doc(db, "incidentes", id));
        return { success: true, message: "Incidente deletado com sucesso!" };
    } catch (error) {
        console.error("Erro ao deletar incidente: ", error);
        throw error;
    }
};
