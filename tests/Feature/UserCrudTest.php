<?php

use App\Models\User;

test('guests cannot access usuarios index', function () {
    $response = $this->get(route('usuarios.index'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit usuarios index', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('usuarios.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Usuarios/Index')
        ->has('usuarios')
    );
});

test('authenticated users can visit create usuario form', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('usuarios.create'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('Usuarios/Form'));
});

test('authenticated users can store a new usuario', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('usuarios.store'), [
        'name' => 'Nuevo Usuario',
        'email' => 'nuevo@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('usuarios.index'));
    $this->assertDatabaseHas('users', [
        'name' => 'Nuevo Usuario',
        'email' => 'nuevo@example.com',
    ]);
});

test('store usuario validates required fields', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('usuarios.store'), [
        'name' => '',
        'email' => '',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertSessionHasErrors(['name', 'email', 'password']);
});

test('store usuario validates unique email', function () {
    $existing = User::factory()->create(['email' => 'existente@example.com']);
    $this->actingAs($existing);

    $response = $this->post(route('usuarios.store'), [
        'name' => 'Otro',
        'email' => 'existente@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('authenticated users can visit edit usuario form', function () {
    $user = User::factory()->create();
    $target = User::factory()->create(['name' => 'Editable']);
    $this->actingAs($user);

    $response = $this->get(route('usuarios.edit', $target));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Usuarios/Form')
        ->has('usuario')
    );
});

test('authenticated users can update usuario', function () {
    $user = User::factory()->create();
    $target = User::factory()->create(['name' => 'Viejo', 'email' => 'viejo@example.com']);
    $this->actingAs($user);

    $response = $this->put(route('usuarios.update', $target), [
        'name' => 'Actualizado',
        'email' => 'nuevoemail@example.com',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertRedirect(route('usuarios.index'));
    $target->refresh();
    expect($target->name)->toBe('Actualizado');
    expect($target->email)->toBe('nuevoemail@example.com');
});

test('authenticated users can update usuario password', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();
    $this->actingAs($user);

    $response = $this->put(route('usuarios.update', $target), [
        'name' => $target->name,
        'email' => $target->email,
        'password' => 'new-secure-password',
        'password_confirmation' => 'new-secure-password',
    ]);

    $response->assertRedirect(route('usuarios.index'));
    $target->refresh();
    expect(password_verify('new-secure-password', $target->password))->toBeTrue();
});

test('authenticated users can destroy usuario', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();
    $targetId = $target->id;
    $this->actingAs($user);

    $response = $this->delete(route('usuarios.destroy', $target));

    $response->assertRedirect(route('usuarios.index'));
    $this->assertDatabaseMissing('users', ['id' => $targetId]);
});
