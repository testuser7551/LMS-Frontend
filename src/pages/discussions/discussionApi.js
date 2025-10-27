import {postRequest, deleteRequest} from "../../api/api";

const BASE_URL = '/api/discussion';


export const fetchDiscussion = async (disData) => {
    try {        
        const response = await postRequest(BASE_URL, disData);
        return response || [];
    } catch (error) {
        throw error;
    }
};

export const addDiscussion = async (disData) => {
    try {        
        const response = await postRequest(`${BASE_URL}/addDiss`, disData);
        return response || [];
    } catch (error) {
        throw error;
    }
};


export const likeDiscussion = async (disData) => {
    try {        
        const response = await postRequest(`${BASE_URL}/likeDis`, disData);
        return response || [];
    } catch (error) {
        throw error;
    }
};

export const deleteDiscussion = async (disData) => {
    try {        
        const response = await deleteRequest(`${BASE_URL}/deleteDis/${disData}`);
        return response || [];
    } catch (error) {
        throw error;
    }
};

