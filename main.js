import { Slider } from "./src/components/Slider";
import { data } from "./src/data";
import "./style.css";

const app = document.querySelector("#app");
const slider = new Slider(app, data, 3);
