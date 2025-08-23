<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'position' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'avatar' => ['nullable', 'image', 'max:1024'], // Max 1MB
            'is_featured' => ['boolean'],
        ];
    }
}
