<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules()
    {
        return [
            'service' => 'required|string|in:kontraktor,konstruksi,alat-berat',
            'name' => 'required|string|max:100',
            'comment' => 'required|string|min:10|max:500',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|image|mimes:jpeg,jpg,png|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'service.required' => 'Service harus dipilih',
            'service.in' => 'Service yang dipilih tidak valid',
            'name.required' => 'Nama harus diisi',
            'name.max' => 'Nama maksimal 100 karakter',
            'comment.required' => 'Komentar harus diisi',
            'comment.min' => 'Komentar minimal 10 karakter',
            'comment.max' => 'Komentar maksimal 500 karakter',
            'rating.required' => 'Rating harus dipilih',
            'rating.integer' => 'Rating harus berupa angka',
            'rating.min' => 'Rating minimal 1',
            'rating.max' => 'Rating maksimal 5',
            'avatar.image' => 'Avatar harus berupa gambar',
            'avatar.mimes' => 'Avatar harus berformat JPEG, JPG, atau PNG',
            'avatar.max' => 'Ukuran avatar maksimal 2MB'
        ];
    }
}
