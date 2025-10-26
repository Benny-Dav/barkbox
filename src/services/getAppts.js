import { apiClient } from "./config"

export const apiGetAppts = async () => {
    try{
        
    const response = await apiClient.get('/booking/all');
    console.log(response);
    return response.data;
    }catch(error){
        console.error(error);
        throw error;
};

};
// import { apiClient } from "./config";

// export const apiGetAppts = async () => {
//   const token = localStorage.getItem('authToken');

//   // Check if the token is available
//   if (!token) {
//     throw new Error('No authorization token found');
//   }

//   try {
//     const response = await apiClient.get('/booking/all', {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token in the header
//       },
//     });
//     return response.data; // Adjust according to your API response structure
//   } catch (error) {
//     // Handle errors, including 403
//     if (error.response && error.response.status === 403) {
//       throw new Error('Unauthorized access - 403');
//     } else {
//       throw new Error('Error fetching appointments');
//     }
//   }
// };