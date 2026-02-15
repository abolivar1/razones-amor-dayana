// Variables globales
let razones = [];
let razonesFiltradas = [];

// Cargar razones al iniciar
async function cargarRazones() {
    try {
        const respuesta = await fetch('razones.json');
        const datos = await respuesta.json();
        razones = datos.razones;
        razonesFiltradas = [...razones];
        
		const respuestafrases = await fetch('frases.json');
        const datosfrases = await respuestafrases.json();
        frases = datosfrases.frases;
		
		const indice = Math.floor(Math.random() * frases.length);
		const frase = frases[indice];
        // Actualizar UI
		document.getElementById('frase').textContent = frase.texto;
        document.getElementById('total-razones').textContent = razones.length;
        mostrarRazonAleatoria();
        
        // Actualizar fecha
        const hoy = new Date();
        document.getElementById('fecha-actualizacion').textContent = 
            hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            
    } catch (error) {
        console.error('Error cargando razones:', error);
        document.getElementById('tarjeta-razon').innerHTML = 
            '<p class="error">💔 Error cargando las razones. Pero el amor sigue aquí.</p>';
    }
}

// Mostrar razón aleatoria
function mostrarRazonAleatoria() {
    if (razonesFiltradas.length === 0) {
        document.getElementById('tarjeta-razon').innerHTML = 
            '<p class="aviso">No hay razones en esta categoría... ¡pero te quiero igual! 💕</p>';
        return;
    }
    
    const indice = Math.floor(Math.random() * razonesFiltradas.length);
    const razon = razonesFiltradas[indice];
    
	if (razon.categoria === 'intimidad'){
		document.getElementById('tarjeta-razon').innerHTML = `
      <div class="razon privada">
        <p class="aviso" onclick="revelarRazon(this)">⚠️ +18</p>
        <div class="contenido-privado">
          <p class="texto-razon">${razon.texto}</p>
          <p class="meta-razon">Añadida: ${new Date(razon.fecha).toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    `;

	}else{
		document.getElementById('tarjeta-razon').innerHTML = `
        <div class="razon">
            <p class="texto-razon">${razon.texto}</p>
            <p class="meta-razon">Añadida: ${new Date(razon.fecha).toLocaleDateString('es-ES')}</p>
        </div>
    `;
	}
    
}

// Filtrar por categoría
function filtrarPorCategoria(categoria) {
    if (categoria === 'todas') {
        razonesFiltradas = [...razones];
    } else {
        razonesFiltradas = razones.filter(r => r.categoria === categoria);
    }
    mostrarRazonAleatoria();
}

function revelarRazon(elemento) {
  const contenido = elemento.nextElementSibling;
  contenido.classList.toggle('visible');
}


// Event listeners
document.addEventListener('DOMContentLoaded', cargarRazones);
document.getElementById('razon-aleatoria').addEventListener('click', mostrarRazonAleatoria);
document.getElementById('filtro-categoria').addEventListener('change', (e) => {
    filtrarPorCategoria(e.target.value);
});