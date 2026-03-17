<?php

namespace App\Http\Requests;

use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    use ProfileValidationRules;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $usuario = $this->route('usuario');
        $userId = $usuario instanceof User
            ? $usuario->id
            : (int) $usuario;

        return [
            ...$this->profileRules($userId),
            'password' => ['nullable', 'string', 'confirmed', Password::default()],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo es obligatorio.',
            'email.email' => 'El correo debe ser válido.',
            'email.unique' => 'Ese correo ya está registrado.',
            'password.confirmed' => 'La confirmación de contraseña no coincide.',
        ];
    }
}
