import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

export default function Form({ usuario }) {
    const esEdicion = !!usuario;

    const { data, setData, post, put, processing, errors } = useForm({
        name: usuario?.name ?? '',
        email: usuario?.email ?? '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        if (esEdicion) {
            put(route('usuarios.update', usuario.id));
        } else {
            post(route('usuarios.store'));
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold">
                    {esEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h2>
            }
        >
            <Head title={esEdicion ? 'Editar Usuario' : 'Nuevo Usuario'} />

            <div className="py-12">
                <div className="mx-auto max-w-xl px-4">
                    <form
                        onSubmit={submit}
                        className="space-y-4 rounded bg-white p-6 shadow"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium"
                            >
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium"
                            >
                                {esEdicion
                                    ? 'Nueva contraseña (dejar en blanco para no cambiar)'
                                    : 'Contraseña'}
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1 block text-sm font-medium"
                            >
                                Confirmar contraseña
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route('usuarios.index')}
                                className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {esEdicion ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
