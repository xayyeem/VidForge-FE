import axios from "axios";

const API_BASE_URL = "http://localhost:5024/api/videos";

export const uploadVideo = async (formData, onProgress) => {
    return axios.post(`${API_BASE_URL}/upload`, formData, {
        onUploadProgress: (event) => {
            if (!event.total) return;

            const progress = Math.round(
                (event.loaded * 100) / event.total
            );

            onProgress(progress);
        }
    });
};

export const getVideos = (sort = 'NewestFirst') => {
    return axios.get(`${API_BASE_URL}/getvideos?sort=${sort}`);
}