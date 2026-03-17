import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ tareas }) {
    function handleDelete(id) {
        if (confirm('¿Estás seguro de querer eliminar esta tarea?')) {
            router.delete(route('tareas.destroy', id));
        }
    }

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4">
                    {/* Botón crear */}
                    <div className="mb-4 flex justify-end">
                        <Link
                            href={route('tareas.create')}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            + Nueva Tarea
                        </Link>
                    </div>

                    {/* Tabla */}
                    <table className="w-full rounded bg-white text-sm shadow">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Título</th>
                                <th className="p-3">Descripción</th>
                                <th className="p-3">Estado</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareas.map((tarea) => (
                                <tr
                                    key={tarea.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-3">{tarea.titulo}</td>
                                    <td className="p-3 text-gray-500">
                                        {tarea.descripcion ?? '—'}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`rounded px-2 py-1 text-xs font-medium ${
                                                tarea.estado === 'completada'
                                                    ? 'bg-green-100 text-green-700'
                                                    : tarea.estado ===
                                                        'en_progreso'
                                                      ? 'bg-yellow-100 text-yellow-700'
                                                      : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {tarea.estado}
                                        </span>
                                    </td>
                                    <td className="flex gap-2 p-3">
                                        <Link
                                            href={route(
                                                'tareas.edit',
                                                tarea.id,
                                            )}
                                            className="rounded bg-yellow-400 px-3 py-1 text-xs text-white hover:bg-yellow-500"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(tarea.id)
                                            }
                                            className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tareas.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-6 text-center text-gray-400"
                                    >
                                        No hay tareas aún.
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
