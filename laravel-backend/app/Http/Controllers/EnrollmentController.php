<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class EnrollmentController extends Controller
{
    public function store(Request $request)
    {
        // Validate enrollment data
        $validator = Validator::make($request->all(), [
            'enrollment.firstName' => 'required|string|max:255',
            'enrollment.familyName' => 'required|string|max:255',
            'enrollment.middleName' => 'required|string|max:255',
            'enrollment.address' => 'required|string',
            'enrollment.cellphone' => 'required|string',
            'enrollment.email' => 'required|email|unique:enrollments,email',
            'enrollment.document_path' => 'required|file|mimes:pdf,doc,docx,png,jpg|max:2048',
            'enrollment.business_name' => 'nullable|string',
            'enrollment.business_email' => 'nullable|string',
            'enrollment.citizenship' => 'nullable|string',
            'enrollment.age' => 'required|integer|min:18',
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
            'payment.amount' => 'required|numeric|min:0',
            'payment.paymentProof' => 'required|image|max:2048'
        ]);

        // Checking Validator
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            // Handle document upload
            $documentPath = null;
            if ($request->hasFile('enrollment.document_path')) {
                $document = $request->file('enrollment.document_path');
                $documentName = time() . '_' . $document->getClientOriginalName();
                $documentPath = $document->storeAs('documents', $documentName, 'public');
            }

            // Handle payment proof upload
            $paymentProofPath = null;
            if ($request->hasFile('payment.paymentProof')) {
                $paymentProof = $request->file('payment.paymentProof');
                $paymentProofName = time() . '_' . $paymentProof->getClientOriginalName();
                $paymentProofPath = $paymentProof->storeAs('payment_proofs', $paymentProofName, 'public');
            }

            // Create enrollment record
            $enrollment = Enrollment::create([
                'firstname' => $request->enrollment['firstName'],
                'lastname' => $request->enrollment['familyName'],
                'middlename' => $request->enrollment['middleName'],
                'address' => $request->enrollment['address'],
                'cellphone' => $request->enrollment['cellphone'],
                'email' => $request->enrollment['email'],
                'document_path' => $documentPath,
                'business_name' => $request->enrollment['business_name'],
                'business_email' => $request->enrollment['business_email'],
                'citizenship' => $request->enrollment['citizenship'],
                'age' => $request->enrollment['age'],
                'gender' => $request->enrollment['gender'],
                'birthday' => $request->enrollment['birthday'],
                'height' => $request->enrollment['height'],
                'weight' => $request->enrollment['weight'],
                'civil_status' => $request->enrollment['civilStatus'],
                'hair' => $request->enrollment['hairColor'],
                'build' => $request->enrollment['bodyBuild'],
                'complexion' => $request->enrollment['skinColor'],
                'education_attainment' => $request->enrollment['educationAttainment'],
                'school_name' => $request->enrollment['schoolName'],
                'school_address' => $request->enrollment['schoolAddress'],
                'spouse_name' => $request->enrollment['spouseName'],
                'father_name' => $request->enrollment['fatherName'],
                'mother_name' => $request->enrollment['motherName'],
                'employer_name' => $request->enrollment['employerName'],
                'employer_tel' => $request->enrollment['employerTel'],
                'employer_address' => $request->enrollment['employerAddress'],
                'course_enrolled' => $request->enrollment['courseEnrolled'],
                'amount' => $request->payment['amount'],
                'proof_image' => $paymentProofPath,
                'status' => 'pending'
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Enrollment submitted successfully',
                'document_path' => $documentPath,
                'payment_proof_path' => $paymentProofPath
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            // Delete uploaded files if they exist
            if (isset($documentPath)) {
                Storage::disk('public')->delete($documentPath);
            }
            if (isset($paymentProofPath)) {
                Storage::disk('public')->delete($paymentProofPath);
            }
    
            return response()->json([
                'message' => 'Error processing enrollment',
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
            'enrollment.email' => 'required|email|unique:enrollments,email',
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