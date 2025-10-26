import { apiClient } from "./config";

export const apiBookAppt = async (payload) => {
    return await apiClient.post("/booking/book", payload);
};