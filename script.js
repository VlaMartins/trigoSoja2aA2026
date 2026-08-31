 const botaoTema = document.querySelector("#botao-tema");
        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "escuro") {
            document.body.classList.add("tema-escuro");
            botaoTema.textContent = "☀ Tema";
        }

        botaoTema.addEventListener("click", function () {
            document.body.classList.toggle("tema-escuro");

            if (document.body.classList.contains("tema-escuro")) {
                botaoTema.textContent = "☀ Tema";
                localStorage.setItem("tema", "escuro");
            } else {
                botaoTema.textContent = "🌙 Tema";
                localStorage.setItem("tema", "claro");
            }
        });
