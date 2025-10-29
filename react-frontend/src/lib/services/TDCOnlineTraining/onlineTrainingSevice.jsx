import axiosInstance from '@/lib/axios/axios';
const BASE_URL = '/api';

// Get CSRF Token
export const getCsrfToken = async () => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Error getting CSRF token:', error.message);
        throw new Error('Failed to get CSRF token');
    }
};

// Update Status
export const startExam = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/start-lecture`);
        return response.data;
    } catch (error) {
        console.error('Start Exam Error', error.message);
        throw error;
    }
};


// get Session One Status
export const CheckSessionOneStatus = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/check-status-sessionOne`);
        return response.data.session_one_status === 'Finished';
    } catch (error) {
        console.error('Error checking session status:', error);
        throw error;
    }
};

// Get Session Two Status
export const CheckSessionTwoStatus = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/check-SessionTwo-status`);
        return response.data.session_one_status === 'Finished';
    } catch (error) {
        console.error('Error checking session status:', error);
        throw error;
    }
}

/// Update User Account
export const updateUserAccount = async (userData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/update-account`, {
            currentPassword: userData.currentPassword,
            newPassword: userData.newPassword
        });
        return response.data;
    }
    catch (error) {
        console.error('Update User Account Error', error.message);
        throw error;
    }
}

// Saved Score
export const savedScore = async (data) =>{
    try {
        const response = await axiosInstance.post(`${BASE_URL}/saved-score-session1`, data);
        return response.data;
    } catch (error) {
        console.error('Error saving quiz score:', {
            message: error.message,
            response: error.response?.data // This will show the server error message
        });
        throw new Error('Failed to save quiz score');
    }
}

// Update  Session One  Status
export const updateSessionOne = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/sessionOneUpdate`);
        return response.data;
    } catch (error) {
        console.error('Start Exam Error', error.message);
        throw error;
    }
}
// Update Session Two Status
export const updateSessionTwo = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/sessionTwoUpdate`);
        return response.data;
    } catch (error) {
        console.error('Start Exam Error', error.message);
        throw error;
    }
}


// Saved Score
export const savedSessionTwoScore = async (data) =>{
    try {
        const response = await axiosInstance.post(`${BASE_URL}/saved-score-session2`, data);
        return response.data;
    } catch (error) {
        console.error('Error saving quiz score:', error.message);
        throw new Error('Failed to save quiz score');
    }
}


//get Score 
export const getSessionOneScore = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/get-sessionOne-score`);
        return response; 
    } catch (error) {
        console.error('Error to get score:', error.message);
        throw new Error('Failed to get score');
    }
}
export const getSessionTwoScore = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/get-sessionTwo-score`);
        return response; 
    } catch (error) {
        console.error('Error to get score:', error.message);
        throw new Error('Failed to get score');
    }
}

export const getTotalScore = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/get-Total-score`);
        return response; 
    } catch (error) {
        console.error('Error to get score:', error.message);
        throw new Error('Failed to get score');
    }
}

export const getUser = async() => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-auth-user`);
        return response.data;
    }catch (error) {
        console.error('Get User Error', error.message);
    }   
}