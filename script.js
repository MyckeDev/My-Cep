const form = document.getElementById("registrationForm");
const userList = document.getElementById("userList");
const cepInput = document.getElementById("cep");
const addressField = document.getElementById("address");

// ---- CEP AUTO-PREENCHIMENTO ----
cepInput.addEventListener("blur", async () => {
  const cep = cepInput.value.trim();
  
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.logradouro) {
        addressField.value = `${data.logradouro}, ${data.bairro}, ${data.localidade}`;
      } else {
        alert("CEP não encontrado!");
        addressField.value = "";
      }

    } catch (error) {
      alert("Erro ao buscar CEP!");
      addressField.value = "";
    }
  }
});

// ---- SUBMIT DO FORM ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = addressField.value.trim();

  if (!name || !email || !address) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, address })
    });

    const result = await response.json();
    alert(result.message);

    form.reset();
    addressField.value = "";

    showUsers();

  } catch (error) {
    alert("Erro ao cadastrar usuário!");
  }
});

// ---- CARREGAR USUÁRIOS ----
async function showUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    userList.innerHTML = "<h3>Usuários cadastrados:</h3>";

    users.forEach((u) => {
      userList.innerHTML += `
        <p>
          <strong>${u.name}</strong> - ${u.email}<br>
          ${u.address}
        </p>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

showUsers();
