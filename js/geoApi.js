const baseUrl = 'https://geo.api.gouv.fr';

// Fonction pour obtenir toutes les régions
export async function getRegions() {
    try {
        const response = await fetch(`${baseUrl}/regions`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des régions');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Fonction pour obtenir les départements d'une région donnée
export async function getDepartmentsFromRegion(regionCode) {
    try {
        const response = await fetch(`${baseUrl}/regions/${regionCode}/departements`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des départements');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Fonction pour obtenir les communes d'un département donné
export async function getCitiesFromDepartment(departmentCode) {
    try {
        const response = await fetch(`${baseUrl}/departements/${departmentCode}/communes`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des communes');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}