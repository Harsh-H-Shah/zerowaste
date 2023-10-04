// define the color scale
const magma = [
  "#000004",
  "#140e36",
  "#3b0f70",
  "#641a80",
  "#8c2981",
  "#b73779",
  "#de4968",
  "#f66e5d",
  "#fe9444",
  "#ffb62b",
  "#ffdc27",
  "#f6f64e",
];

const viridis = [
  "#fde725",
  "#c2df23",
  "#86d549",
  "#52c569",
  "#2ab07f",
  "#1e9b8a",
  "#25858e",
  "#2d708e",
  "#38588c",
  "#433e85",
  "#482173",
  "#440154"
];

const turbo = [
  "#30126a",
  "#2c4e7e",
  "#237e8c",
  "#1fa088",
  "#28c485",
  "#3fdc7e",
  "#65f875",
  "#9df971",
  "#d4fe77",
  "#f6fe85",
  "#fefa8a",
  "#fcf392",
];


const inferno = [
  "#000004",
  "#0a1040",
  "#2a1d68",
  "#502b79",
  "#743e7f",
  "#965b75",
  "#b87c63",
  "#d9a151",
  "#f7c440",
  "#fec72e",
  "#f9ea17",
  "#fcffa4",
];


const plasma = [
  "#0d0887",
  "#3701a3",
  "#6200a8",
  "#8e03a8",
  "#b63f97",
  "#d76c6d",
  "#e8965e",
  "#f7bc45",
  "#f0e96f",
  "#fefc97",
  "#fcffa4",
  "#fcfdbf",
];


export function getColorSchemas() {
return {
  "Magma": magma,
  "Viridis": viridis,
  "Turbo": turbo,
  "Inferno": inferno,
  "Plasma": plasma
}
}