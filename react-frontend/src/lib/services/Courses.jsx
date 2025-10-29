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


export const TDCCourse = async () => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-tdc`);
        return response.data;
    }catch (error) {
        console.error('Error getting TDC Course:', error.message);
        throw new Error('Failed to fetch TDC Course');
    }
}

export const PDCCourse = async () => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-pdc`);
        return response.data;
    }catch (error) {
        console.error('Error getting PDC Course:', error.message);
        throw new Error('Failed to fetch PDC Course');
    }
}
export const MDCCourse = async () => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-mdc`);
        return response.data;
    }catch (error) {
        console.error('Error getting MDC Course:', error.message);
        throw new Error('Failed to fetch MDC Course');
    }
}
export const RefresherCourse = async () => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}/get-refresher`);
        return response.data;
    }catch (error) {
        console.error('Error getting Refresher Course:', error.message);
        throw new Error('Failed to fetch Refresher Course');
    }
}


