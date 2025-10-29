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

export const submitBookingEnrollment = async (enrollmentData, paymentData) => {
    try {
        const formData = new FormData();
        
        // Mapping frontend field names to backend expected names
        const fieldMapping = {
            firstName: 'firstname',
            familyName: 'lastname',
            middleName: 'middlename',
            address: 'address',
            cellphone: 'cellphone',
            email: 'email',
            document_path: 'document_path',
            business_name: 'business_name',
            business_email: 'business_email',
            citizenship: 'citizenship',
            age: 'age',
            gender: 'gender',
            birthday: 'birthday',
            height: 'height',
            weight: 'weight',
            civilStatus: 'civil_status',
            hairColor: 'hair',
            bodyBuild: 'build',
            skinColor: 'complexion',
            educationAttainment: 'education_attainment',
            schoolName: 'school_name',
            schoolAddress: 'school_address',
            spouseName: 'spouse_name',
            fatherName: 'father_name',
            motherName: 'mother_name',
            employerName: 'employer_name',
            employerTel: 'employer_tel',
            employerAddress: 'employer_address',
            courseEnrolled: 'course_enrolled',
            scheduledDate: 'date_booked',
            scheduledTime: 'time_booked'
        };

        // Map and append enrollment data with correct field names
        Object.entries(enrollmentData).forEach(([key, value]) => {
            const backendField = fieldMapping[key] || key;
            if (value !== undefined && value !== null) {
                formData.append(`enrollment[${backendField}]`, value);
            }
        });

        // Add payment data
        formData.append('payment[amount]', paymentData.amount);
        if (paymentData.paymentProof) {
            formData.append('payment[paymentProof]', paymentData.paymentProof);
        }


        // Debug log
        console.log('Submission Data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axiosInstance.post(`${BASE_URL}/booking-enrollment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error('Full error:', error);
        
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            
            if (error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                console.error('Validation errors:', validationErrors);
                const errorMessage = Object.entries(validationErrors)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n');
                throw new Error(errorMessage);
            }
            throw new Error(error.response.data.message || 'Error submitting enrollment');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Error setting up enrollment request');
        }
    }
};

export const Validator = async (enrollmentData) => {
    const formData = new FormData();
    
    // Append all enrollment data to FormData
    Object.keys(enrollmentData).forEach(key => {
        if (key === 'document_path') {
            // Ensure file is appended correctly
            formData.append(`enrollment[${key}]`, enrollmentData[key]);
        } else {
            formData.append(`enrollment[${key}]`, enrollmentData[key]);
        }
    });
    try{
        const response = await axiosInstance.post(`${BASE_URL}/validator-book-enrollment`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Enrollment Validation Error:', error.response?.data || error.message);
        throw error;
    }
}
