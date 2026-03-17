import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Form({ tarea }) {
    const esEdicion = !!tarea;

    const { data, setData, post, put, processing, errors } = useForm({
        titulo: tarea?.titulo ?? '',
        descripcion: tarea?.descripcion ?? '',
        estado: tarea?.estado ?? 'pendiente',
    });

    function submit(e) {
        e.preventDefault();
        esEdicion
            ? put(route('tareas.update', tarea.id))
            : post(route('tareas.store'));
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold">
                    {esEdicion ? 'Editar Tarea' : 'Nueva Tarea'}
                </h2>
            }
        >
            <Head title={esEdicion ? 'Editar Tarea' : 'Nueva Tarea'} />

            <div className="py-12">
                <div className="mx-auto max-w-xl px-4">
                    <form
                        onSubmit={submit}
                        className="space-y-4 rounded bg-white p-6 shadow"
                    >
                        {/* Título */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Título
                            </label>
                            <input
                                type="text"
                                value={data.titulo}
                                onChange={(e) =>
                                    setData('titulo', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2 text-sm"
                            />
                            {errors.titulo && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.titulo}
                                </p>
                            )}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Descripción
                            </label>
                            <textarea
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData('descripcion', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2 text-sm"
                                rows={3}
                            />
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Estado
                            </label>
                            <select
                                value={data.estado}
                                onChange={(e) =>
                                    setData('estado', e.target.value)
                                }
                                className="w-full rounded border px-3 py-2 text-sm"
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="en_progreso">En Progreso</option>
                                <option value="completada">Completada</option>
                            </select>
                            {errors.estado && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.estado}
                                </p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-3 pt-2">
                            <a
                                href={route('tareas.index')}
                                className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Cancelar
                            </a>
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
