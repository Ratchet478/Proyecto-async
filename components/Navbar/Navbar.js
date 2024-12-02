import "./Navbar.css"

export const Navbar = () => `
<nav>
  <h2>${import.meta.env.VITE_APP_NAME}</h2>
  <ul>
    <li>
      <a href="" id="Home">Inicio</a>
    </li>
    <li>
      <a href="" id="Search">Explorar</a>
    </li>
    <li id="SearchBar" class="search-with-settings">
      <form class="search-form">
        <input type="search" class="search-input" placeholder="Buscar..." aria-label="Campo de búsqueda" id="SearchInput">
        <button type="button" popovertarget="advSettingsMenu" id="AdvSettings">⚙️</button>
      </form>
    </li>
    <li>
      <div popover id="advSettingsMenu">
        <div>
          <label for="pageSize">Cantidad de imágenes</label>
          <input type="number" id="pageSize" name="pageSize" min="1" max="30" value="10">
        </div>
        <div>
          <label for="orientation">Orientación</label>
          <select id="orientation" name="orientation">
            <option value="">Cualquiera</option>
            <option value="landscape" selected>Paisaje</option>
            <option value="portrait">Retrato</option>
            <option value="squarish">Cuadrado</option>
          </select>
        </div>
        <div>
          <label for="contentFilter">Filtro de contenido</label>
          <select id="contentFilter" name="contentFilter">
            <option value="low" selected>Bajo</option>
            <option value="high">Alto</option>
          </select>
        </div>
        <div>
          <label for="color">Color</label>
          <select id="color" name="color">
            <option value="" selected>Cualquiera</option>
            <option value="black_and_white">Blanco y negro</option>
            <option value="black">Negro</option>
            <option value="white">Blanco</option>
            <option value="yellow">Amarillo</option>
            <option value="orange">Naranja</option>
            <option value="red">Rojo</option>
            <option value="purple">Púrpura</option>
            <option value="magenta">Magenta</option>
            <option value="green">Verde</option>
            <option value="teal">Verde azulado</option>
            <option value="blue">Azul</option>
          </select>
        </div>
        <div>
          <label for="orderBy">Orden (orderBy)</label>
          <select id="orderBy" name="orderBy">
            <option value="relevant" selected>Relevante</option>
            <option value="latest">Últimos</option>
          </select>
        </div>
      </div>
    </li>
    <li>
      <button id="themeBtn">☀</button>
    </li>
    <li>
      <a href="https://github.com/Ratchet478/Proyecto-async" id="github"><i class="fab fa-github"></i></a>
    </li>
  </ul>
</nav>`