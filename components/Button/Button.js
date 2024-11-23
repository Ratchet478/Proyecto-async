import "./Button.css"

export function Button(label="",id="", iconLight = "", iconDark="") {
    const body = document.body;
    const button = document.createElement("button");
    button.classList.add("button");
    button.id = id;

    // Crear el encabezado (h4)
    const heading = document.createElement("h4");
    heading.innerText = label;

    // Verificar si hay íconos proporcionados
    if (iconLight && iconDark) {
        const img = document.createElement("img");
        img.alt = `${label} icon`;

        // Determina qué icono mostrar según la clase del body
        img.src = body.classList.contains("light") ? iconLight : iconDark;
        button.appendChild(img);
    }

    button.appendChild(heading);
    return button;
}