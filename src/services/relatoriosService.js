import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getCategories } from "./categoryService";

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

export const getAllIncidents = async () => {
    return await getIncidents();
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

export const getIncidentsByCategory = async () => {
    const [incidents, categories] = await Promise.all([getIncidents(), getCategories()]);

    const categoryCounts = incidents.reduce((acc, incident) => {
        const categoryId = incident.categoriaId;
        if (categoryId) {
            if (!acc[categoryId]) {
                acc[categoryId] = 0;
            }
            acc[categoryId]++;
        }
        return acc;
    }, {});

    const categoryData = Object.keys(categoryCounts).map(categoryId => {
        const category = categories.find(c => c.id === categoryId);
        return {
            name: category ? category.nome : "Sem Categoria",
            value: categoryCounts[categoryId],
        };
    });

    return categoryData;
};
