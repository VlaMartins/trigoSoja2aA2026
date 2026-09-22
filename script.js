//  const botaoTema = document.querySelector("#botao-tema");
//         const temaSalvo = localStorage.getItem("tema");

//         if (temaSalvo === "escuro") {
//             document.body.classList.add("tema-escuro");
//             botaoTema.textContent = "☀ Tema";
//         }

//         botaoTema.addEventListener("click", function () {
//             document.body.classList.toggle("tema-escuro");

//             if (document.body.classList.contains("tema-escuro")) {
//                 botaoTema.textContent = "☀ Tema";
//                 localStorage.setItem("tema", "escuro");
//             } else {
//                 botaoTema.textContent = "🌙 Tema";
//                 localStorage.setItem("tema", "claro");
//             }
//         });


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

        const formulario = document.querySelector("#formulario-contato");
        const resposta = document.querySelector("#resposta-formulario");
        const botao = formulario.querySelector("button");
        const campoTelefone = document.querySelector("#telefone");

        campoTelefone.addEventListener("input", function () {
            let numeros = campoTelefone.value.replace(/\D/g, "");

            numeros = numeros.slice(0, 11);

            if (numeros.length <= 2) {
                campoTelefone.value = numeros.replace(/(\d{0,2})/, "($1");
            } else if (numeros.length <= 3) {
                campoTelefone.value = numeros.replace(/(\d{2})(\d{0,1})/, "($1) $2");
            } else if (numeros.length <= 7) {
                campoTelefone.value = numeros.replace(/(\d{2})(\d{1})(\d{0,4})/, "($1) $2 $3");
            } else {
                campoTelefone.value = numeros.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
            }
        });

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            botao.disabled = true;
            botao.textContent = "Enviando...";
            resposta.textContent = "";

            fetch(formulario.action, {
                method: "POST",
                body: new FormData(formulario),
                headers: { "Accept": "application/json" }
            })
                .then(function (retorno) {
                    return retorno.json();
                })
                .then(function (dados) {
                    if (dados.success === "false") {
                        throw new Error();
                    }

                    resposta.textContent = "Mensagem enviada com sucesso!";
                    resposta.className = "aviso-formulario sucesso";
                    formulario.reset();
                })
        })
            .catch(function () {
                resposta.textContent = "Não foi possível enviar. Verifique a internet e tente novamente.";
                resposta.className = "aviso-formulario erro";
            })
            .finally(function () {
                botao.disabled = false;
                botao.textContent = "Enviar";
            });
        });