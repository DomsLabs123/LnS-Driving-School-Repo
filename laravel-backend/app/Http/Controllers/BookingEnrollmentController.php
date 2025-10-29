<?php

namespace App\Http\Controllers;

use App\Models\BookingEnrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class BookingEnrollmentController extends Controller
{
    /**
     * Store a new booking enrollment.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                // Basic Information
                'enrollment.firstname' => 'required|string|max:255',
                'enrollment.lastname' => 'required|string|max:255',
                'enrollment.middlename' => 'required|string|max:255',
                'enrollment.address' => 'required|string',
                'enrollment.cellphone' => 'required|string',
                'enrollment.email' => 'required|email|unique:booking_enrollments,email',
                
                // Documents and Business Information
                'enrollment.document_path' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
                'enrollment.business_name' => 'nullable|string|max:255',
                'enrollment.business_email' => 'nullable|email',
                
                // Personal Information
                'enrollment.citizenship' => 'nullable|string|max:255',
                'enrollment.age' => 'required|integer|min:18',
                'enrollment.gender' => 'required|string|in:male,female,other',
                'enrollment.birthday' => 'required|date',
                'enrollment.height' => 'nullable|integer',
                'enrollment.weight' => 'nullable|integer',
                'enrollment.civil_status' => 'nullable|string|in:single,married,separated,widower',
                
                // Physical Characteristics
                'enrollment.hair' => 'nullable|string|max:255',
                'enrollment.build' => 'nullable|string|max:255',
                'enrollment.complexion' => 'nullable|string|max:255',
                
                // Educational Background
                'enrollment.education_attainment' => 'nullable|string|max:255',
                'enrollment.school_name' => 'nullable|string|max:255',
                'enrollment.school_address' => 'nullable|string',
                
                // Family Information
                'enrollment.spouse_name' => 'nullable|string|max:255',
                'enrollment.father_name' => 'nullable|string|max:255',
                'enrollment.mother_name' => 'nullable|string|max:255',
                
                // Employment Information
                'enrollment.employer_name' => 'nullable|string|max:255',
                'enrollment.employer_tel' => 'nullable|string|max:255',
                'enrollment.employer_address' => 'nullable|string',
                
                // Course and Schedule
                'enrollment.course_enrolled' => 'required|exists:courses,id',
                'enrollment.date_booked' => 'required|date',
                'enrollment.time_booked' => 'required|string',
                
                // Payment Information
                'payment.amount' => 'required|numeric|min:0',
                'payment.paymentProof' => 'required|image|max:2048',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            // Start database transaction
            DB::beginTransaction();

            try {
                // Handle document upload
                $documentPath = null;
                if ($request->hasFile('enrollment.document_path')) {
                    $documentPath = $request->file('enrollment.document_path')
                        ->store('booking_documents', 'public');
                }

                // Handle payment proof upload
                $paymentProofPath = null;
                if ($request->hasFile('payment.paymentProof')) {
                    $paymentProofPath = $request->file('payment.paymentProof')
                        ->store('payment_proofs', 'public');
                } else {
                    throw new \Exception('Payment proof is required.');
                }

                // Create booking enrollment
                $bookingEnrollment = BookingEnrollment::create([
                    'firstname' => $request->input('enrollment.firstname'),
                    'lastname' => $request->input('enrollment.lastname'),
                    'middlename' => $request->input('enrollment.middlename'),
                    'address' => $request->input('enrollment.address'),
                    'cellphone' => $request->input('enrollment.cellphone'),
                    'email' => $request->input('enrollment.email'),
                    'document_path' => $documentPath,
                    'business_name' => $request->input('enrollment.business_name'),
                    'business_email' => $request->input('enrollment.business_email'),
                    'citizenship' => $request->input('enrollment.citizenship'),
                    'age' => $request->input('enrollment.age'),
                    'gender' => $request->input('enrollment.gender'),
                    'birthday' => $request->input('enrollment.birthday'),
                    'height' => $request->input('enrollment.height'),
                    'weight' => $request->input('enrollment.weight'),
                    'civil_status' => $request->input('enrollment.civil_status'),
                    'hair' => $request->input('enrollment.hair'),
                    'build' => $request->input('enrollment.build'),
                    'complexion' => $request->input('enrollment.complexion'),
                    'education_attainment' => $request->input('enrollment.education_attainment'),
                    'school_name' => $request->input('enrollment.school_name'),
                    'school_address' => $request->input('enrollment.school_address'),
                    'spouse_name' => $request->input('enrollment.spouse_name'),
                    'father_name' => $request->input('enrollment.father_name'),
                    'mother_name' => $request->input('enrollment.mother_name'),
                    'employer_name' => $request->input('enrollment.employer_name'),
                    'employer_tel' => $request->input('enrollment.employer_tel'),
                    'employer_address' => $request->input('enrollment.employer_address'),
                    'course_enrolled' => $request->input('enrollment.course_enrolled'),
                    'date_booked' => $request->input('enrollment.date_booked'),
                    'time_booked' => $request->input('enrollment.time_booked'),
                    'amount' => $request->input('payment.amount'),
                    'proof_image' => $paymentProofPath,
                    'status' => 'pending'
                ]);

                DB::commit();

                return response()->json([
                    'message' => 'Booking enrollment created successfully',
                    'data' => $bookingEnrollment
                ], 201);

            } catch (\Exception $e) {
                DB::rollBack();
                
                // Clean up uploaded files if they exist
                if ($documentPath && Storage::disk('public')->exists($documentPath)) {
                    Storage::disk('public')->delete($documentPath);
                }
                if ($paymentProofPath && Storage::disk('public')->exists($paymentProofPath)) {
                    Storage::disk('public')->delete($paymentProofPath);
                }

                throw $e;
            }

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating booking enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function validateEnrollments(Request $request){
        $validator = Validator::make($request->all(), [
            'enrollment.firstName' => 'required|string|max:255',
            'enrollment.familyName' => 'required|string|max:255',
            'enrollment.middleName' => 'required|string|max:255',
            'enrollment.address' => 'required|string',
            'enrollment.cellphone' => 'required|string',
            'enrollment.email' => 'required|email|unique:booking_enrollments,email',
            'enrollment.document_path' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
            'enrollment.business_name' => 'nullable|string',
            'enrollment.business_email' => 'nullable|string',
            'enrollment.citizenship' => 'nullable|string',
            'enrollment.age' => 'nullable|integer|min:18',
            'enrollment.gender' => 'required|string|in:male,female',
            'enrollment.birthday' => 'required|date',
            'enrollment.height' => 'nullable|integer',
            'enrollment.weight' => 'nullable|integer',
            'enrollment.civilStatus' => 'nullable|string|in:single,married,widower,separated',
            'enrollment.hairColor' => 'nullable|string',
            'enrollment.bodyBuild' => 'nullable|string',
            'enrollment.skinColor' => 'nullable|string',
            'enrollment.educationAttainment' => 'nullable|string',
            'enrollment.schoolName' => 'nullable|string',
            'enrollment.schoolAddress' => 'nullable|string',
            'enrollment.spouseName' => 'nullable|string',
            'enrollment.fatherName' => 'nullable|string',
            'enrollment.motherName' => 'nullable|string',
            'enrollment.employerName' => 'nullable|string',
            'enrollment.employerTel' => 'nullable|string',
            'enrollment.employerAddress' => 'nullable|string',
            'enrollment.courseEnrolled' => 'required|exists:courses,id',
        ]);

            // Check if validation fails
        if ($validator->fails()) {
        return response()->json([
            'valid' => false,
            'errors' => $validator->errors()
        ], 422);
    }

      // If validation passes
      return response()->json([
        'valid' => true
    ]);

    }
}