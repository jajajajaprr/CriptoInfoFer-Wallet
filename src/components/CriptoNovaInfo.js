import React from 'react';

const CriptoNovaInfo = () => {
  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-700 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Centro de Información Cripto</h2>

        <div className="space-y-8">
          {/* Sección 1: ¿Qué son las Criptomonedas? */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">¿Qué son las Criptomonedas?</h3>
            <p className="text-gray-300 leading-relaxed">
              Las criptomonedas son monedas digitales o virtuales que utilizan criptografía para asegurar sus transacciones y controlar la creación de nuevas unidades. Son descentralizadas, lo que significa que no están sujetas al control del gobierno o de instituciones financieras. Bitcoin, lanzado en 2009, fue la primera criptomoneda y sigue siendo la más conocida.
            </p>
          </div>

          {/* Sección 2: ¿Cómo funcionan? */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">¿Cómo funcionan?</h3>
            <p className="text-gray-300 leading-relaxed">
              Las criptomonedas operan en una tecnología llamada blockchain, que es un libro de contabilidad distribuido y público. Cada transacción se registra como un "bloque" y se añade a una cadena de bloques anterior, creando un registro inmutable. Los "mineros" verifican estas transacciones, y una vez validadas, se hacen permanentes en la blockchain.
            </p>
          </div>

          {/* Sección 3: Tipos de Criptomonedas Populares */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Tipos de Criptomonedas Populares</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="font-medium text-white">Bitcoin (BTC):</span> La criptomoneda original y la de mayor capitalización de mercado.</li>
              <li><span className="font-medium text-white">Ethereum (ETH):</span> La segunda más grande, conocida por su plataforma para contratos inteligentes y aplicaciones descentralizadas (dApps).</li>
              <li><span className="font-medium text-white">Ripple (XRP):</span> Enfocada en pagos transfronterizos rápidos y de bajo costo.</li>
              <li><span className="font-medium text-white">Litecoin (LTC):</span> A menudo llamada la "plata digital" en comparación con el "oro digital" de Bitcoin, con transacciones más rápidas.</li>
              <li><span className="font-medium text-white">Cardano (ADA):</span> Una plataforma blockchain con un enfoque en la seguridad y la escalabilidad a través de la investigación académica.</li>
            </ul>
          </div>

          {/* Sección 4: Consejos de Seguridad */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Consejos de Seguridad</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Usa contraseñas fuertes y únicas.</li>
              <li>Habilita la autenticación de dos factores (2FA) siempre que sea posible.</li>
              <li>Ten cuidado con los intentos de phishing y estafas.</li>
              <li>Investiga antes de invertir en cualquier criptomoneda.</li>
              <li>No compartas tus claves privadas o frases de recuperación.</li>
            </ul>
          </div>

          {/* Sección 5: Noticias Recientes (Simuladas) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Noticias Recientes (Simuladas)</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white font-medium">El Salvador adopta Bitcoin como moneda de curso legal.</p>
                <p className="text-gray-400 text-sm">Fecha: 7 de septiembre de 2021</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white font-medium">Grandes empresas invierten en tecnología blockchain para optimizar cadenas de suministro.</p>
                <p className="text-gray-400 text-sm">Fecha: 15 de octubre de 2023</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white font-medium">Nuevas regulaciones propuestas en la UE buscan mayor claridad para el mercado cripto.</p>
                <p className="text-gray-400 text-sm">Fecha: 20 de enero de 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriptoNovaInfo;