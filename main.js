import './style.css';
import '@oddbird/popover-polyfill';
import { Navbar } from "./components/Navbar/Navbar.js";
import { Footer } from "./components/Footer/Footer.js";
import { changeTheme } from "./utils/changeTheme.js";
import { linkPage } from "./utils/linkPage.js";
import { Home } from "./Pages/Home/Home.js";
import { Explore } from "./Pages/Explore/Explore.js";

const header = document.querySelector('header');
header.innerHTML = Navbar();
const footer = document.querySelector("footer");
footer.innerHTML = Footer();

linkPage("#Home", Home)
linkPage("#Search", Explore)
Home()
changeTheme()