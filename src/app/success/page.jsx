'use client';  // Asegúrate de que sea un componente de cliente

function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#d1d1d6] text-white py-4">
        <div className="container mx-auto flex items-center justify-center">
          <img src="/images/logo.png" alt="Logo" className="h-auto w-auto max-h-20" />
        </div>
      </header>

      {/* Contenido de éxito */}
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          {/* Mensaje de éxito */}
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold">¡Pago realizado con éxito!</h2>
            <p className="mt-2">Gracias por tu compra. ¡Tu pago ha sido procesado correctamente!</p>
          </div>

          {/* Botón para volver a comprar */}
          <div>
            <button
              onClick={() => window.location.href = '/pricing'}  // Redirige cuando se hace clic
              className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
            >
              Volver a comprar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuccessPage;
