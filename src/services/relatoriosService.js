import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const incidentCollection = collection(db, "incidentes");

const getIncidents = async (filters) => {
    let q = query(incidentCollection);
    if (filters) {
        for (const filter of filters) {
            q = query(q, where(filter.field, filter.operator, filter.value));
        }
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getOpenIncidents = async () => {
    return await getIncidents([{ field: "situacao", operator: "==", value: "Aberta" }]);
};

export const getOngoingIncidents = async () => {
    return await getIncidents([{ field: "situacao", operator: "==", value: "Em Andamento" }]);
};

export const getCompletedIncidents = async () => {
    return await getIncidents([{ field: "situacao", operator: "==", value: "Concluída" }]);
};
