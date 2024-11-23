export function toggleDarkMode() {
    const body = document.body;
    if (!body.classList.contains("dark") || !body.classList.contains("light")) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { body.classList.add("dark"); }
        else { body.classList.add("light"); }
    }

}

if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
}
if (!body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
}