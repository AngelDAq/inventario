document.addEventListener("DOMContentLoaded", function () {
    cargarDatosGuardados();
});

// Función para guardar los datos y agregarlos al HTML
function guardarDatos(nombre, caja, folios) {
    let fecha = new Date().toLocaleString();
    let array = [nombre, caja, folios, fecha];
    creacionPlantillaElementos(array);
}

// Función para crear los elementos en la interfaz de forma compacta con etiquetas
function creacionPlantillaElementos(elementosAlmacenados) {
    let info = document.getElementById("mostrarInfo");

    let div = document.createElement("div");
    div.classList.add("registro", "list-group-item");

    div.innerHTML = `
        <span><strong>Nombre:</strong> ${elementosAlmacenados[0]}</span>
        <span><strong>Cajas:</strong> ${elementosAlmacenados[1]}</span>
        <span><strong>Folios:</strong> ${elementosAlmacenados[2]}</span>
        <span><strong>Fecha:</strong> ${elementosAlmacenados[3]}</span>
        <button class="btn btn-success btn-sm botonElemento">Guardar</button>
        <button class="btn btn-danger btn-sm botonElementoEliminar">Eliminar</button>
    `;

    info.appendChild(div);
}

// Función para eliminar un registro y también eliminarlo del localStorage
function eliminarDatos(e) {
    let registro = e.target.closest(".registro");
    if (!registro) return;

    // Obtener los valores del registro
    let nombre = registro.querySelector("span:nth-child(1)").textContent.replace("Nombre: ", "").trim();
    let cajas = registro.querySelector("span:nth-child(2)").textContent.replace("Cajas: ", "").trim();
    let folios = registro.querySelector("span:nth-child(3)").textContent.replace("Folios: ", "").trim();
    let fecha = registro.querySelector("span:nth-child(4)").textContent.replace("Fecha: ", "").trim();

    // Eliminar del DOM
    registro.remove();

    // Eliminar del localStorage
    let datosPrevios = JSON.parse(localStorage.getItem("datosGuardados")) || [];
    let datosActualizados = datosPrevios.filter(
        (dato) => !(dato.nombre === nombre && dato.cajas === cajas && dato.folios === folios && dato.fecha === fecha)
    );

    localStorage.setItem("datosGuardados", JSON.stringify(datosActualizados));

    // Mostrar mensaje
    mostrarMensaje("Registro eliminado correctamente", "danger");
}

// Función para guardar datos en localStorage
function guardarDatosLocal(e) {
    let registro = e.target.closest(".registro");

    let nombre = registro.querySelector("span:nth-child(1)").textContent.replace("Nombre: ", "").trim();
    let cajas = registro.querySelector("span:nth-child(2)").textContent.replace("Cajas: ", "").trim();
    let folios = registro.querySelector("span:nth-child(3)").textContent.replace("Folios: ", "").trim();
    let fecha = registro.querySelector("span:nth-child(4)").textContent.replace("Fecha: ", "").trim();

    let nuevoDato = { nombre, cajas, folios, fecha };

    let datosPrevios = JSON.parse(localStorage.getItem("datosGuardados")) || [];
    datosPrevios.push(nuevoDato);
    localStorage.setItem("datosGuardados", JSON.stringify(datosPrevios));

    mostrarMensaje("Datos guardados correctamente", "success");
}

// Función para mostrar mensajes con Bootstrap
function mostrarMensaje(mensaje, tipo) {
    let alerta = document.createElement("div");
    alerta.classList.add("alert", `alert-${tipo}`, "mt-2", "text-center");
    alerta.textContent = mensaje;

    document.getElementById("mostrarInfo").prepend(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

// Función para cargar los datos almacenados en localStorage
function cargarDatosGuardados() {
    let datosPrevios = JSON.parse(localStorage.getItem("datosGuardados")) || [];

    datosPrevios.forEach((dato) => {
        creacionPlantillaElementos([dato.nombre, dato.cajas, dato.folios, dato.fecha]);
    });
}

// Evento para enviar datos
document.getElementById("enviado").addEventListener("click", (e) => {
    e.preventDefault();
    guardarDatos(
        document.getElementById("nombrePersona").value,
        document.getElementById("totalCajas").value,
        document.getElementById("totalFolios").value
    );
});

// Delegación de eventos para manejar botones dinámicos
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("botonElemento")) {
        guardarDatosLocal(e);
    } else if (e.target.classList.contains("botonElementoEliminar")) {
        eliminarDatos(e);
    }
});
