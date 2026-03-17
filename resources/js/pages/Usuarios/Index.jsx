import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ usuarios }) {
    function handleDelete(id) {
        if (confirm('¿Estás seguro de querer eliminar este usuario?')) {
            router.delete(route('usuarios.destroy', id));
        }
    }

    return (
        <AppLayout>
            <Head title="Usuarios" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="mb-4 flex justify-end">
                        <Link
                            href={route('usuarios.create')}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            + Nuevo Usuario
                        </Link>
                    </div>

                    <table className="w-full rounded bg-white text-sm shadow">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr
                                    key={usuario.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-3">{usuario.name}</td>
                                    <td className="p-3 text-gray-600">
                                        {usuario.email}
                                    </td>
                                    <td className="flex gap-2 p-3">
                                        <Link
                                            href={route(
                                                'usuarios.edit',
                                                usuario.id,
                                            )}
                                            className="rounded bg-yellow-400 px-3 py-1 text-xs text-white hover:bg-yellow-500"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(usuario.id)
                                            }
                                            className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {usuarios.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="p-6 text-center text-gray-400"
                                    >
                                        No hay usuarios aún.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
