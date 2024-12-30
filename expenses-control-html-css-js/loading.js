function showLoading() {
    // Verifica se já existe um loading na página para evitar múltiplos elementos
    const existingLoading = document.querySelector(".loading");
    if (existingLoading) {
        return;  // Se já existir, não cria outro
    }

    const div = document.createElement("div");
    div.classList.add("loading", "centralize");
    
    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);
    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}