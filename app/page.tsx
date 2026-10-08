"use client";

import { useState } from "react";

export default function Home() {
  const [persona, setPersona] = useState("");
  const [instrumento, setInstrumento] = useState("");
  const [parte, setParte] = useState("");
  const [serie, setSerie] = useState("");
  const [foto, setFoto] = useState("");
  const [registros, setRegistros] = useState<any[]>([]);

  function guardarInstrumento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nuevoInstrumento = {
      id: Date.now(),
      persona,
      instrumento,
      parte,
      serie,
      foto,
    };

    setRegistros([...registros, nuevoInstrumento]);

    setPersona("");
    setInstrumento("");
    setParte("");
    setSerie("");
    setFoto("");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 rounded-2xl bg-slate-900 p-8 text-white">
          <h1 className="text-3xl font-bold">InstrumentsData</h1>
          <p className="mt-2 text-slate-300">
            Sistema de registro de instrumentos
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold">
            Registrar instrumento
          </h2>

          <form onSubmit={guardarInstrumento} className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">
                Nombre de la persona que carga
              </label>
              <input
                required
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="Ej.: Juan Pérez"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Nombre del instrumento
              </label>
              <input
                required
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="Ej.: Multímetro"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Número de parte
              </label>
              <input
                required
                value={parte}
                onChange={(e) => setParte(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="Ej.: MUL-001"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Número de serie
              </label>
              <input
                required
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="Ej.: SN-12345"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Fotografía del instrumento
              </label>
              <input
                type="file"
                accept="image/*"
                required
                className="block w-full rounded-lg border p-3"
                onChange={(e) => {
                  const archivo = e.target.files?.[0];

                  if (!archivo) {
                    setFoto("");
                    return;
                  }

                  if (!archivo.type.startsWith("image/")) {
                    alert("Seleccioná un archivo de imagen.");
                    e.target.value = "";
                    setFoto("");
                    return;
                  }

                  if (archivo.size > 2 * 1024 * 1024) {
                    alert("La imagen debe pesar menos de 2 MB.");
                    e.target.value = "";
                    setFoto("");
                    return;
                  }

                  const lector = new FileReader();

                  lector.onload = () => {
                    setFoto(lector.result as string);
                  };

                  lector.readAsDataURL(archivo);
                }}
              />
              <p className="mt-1 text-sm text-slate-500">
                Formatos de imagen habituales. Máximo: 2 MB.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 p-3 font-bold text-white hover:bg-blue-800"
            >
              Guardar instrumento
            </button>
          </form>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            Instrumentos registrados ({registros.length})
          </h2>

          {registros.length === 0 ? (
            <p className="text-slate-500">
              Todavía no hay instrumentos registrados.
            </p>
          ) : (
            <div className="space-y-4">
              {registros.map((registro) => (
                <article
                  key={registro.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row"
                >
                  {registro.foto && (
                    <img
                      src={registro.foto}
                      alt={registro.instrumento}
                      className="h-32 w-32 rounded-lg border object-cover"
                    />
                  )}

                  <div>
                    <h3 className="text-lg font-bold">
                      {registro.instrumento}
                    </h3>
                    <p>Persona que carga: {registro.persona}</p>
                    <p>Número de parte: {registro.parte}</p>
                    <p>Número de serie: {registro.serie}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}