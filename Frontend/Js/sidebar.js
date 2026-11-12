fetch("../components/sidebar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar sidebar: " + response.status);
        }

        return response.text();
    })
    .then(data => {
        document.querySelector("#sidebar-container").innerHTML = data;

        const paginaAtual = window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "")
            .toLowerCase();

        console.log("Página atual:", paginaAtual);

        const links = document.querySelectorAll(".nav-item");

        links.forEach(link => {
            console.log("Link:", link.dataset.page);

            if (link.dataset.page === paginaAtual) {
                link.classList.add("active");
            }
        });
    })
    .catch(error => console.error(error));