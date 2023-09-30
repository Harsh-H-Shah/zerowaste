// This function returns the color based on the selected parameter, current layer and the value of that parameter

// Zustand imports
import { useStore } from "../store/store.js";

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

export default function getColor(value) {
  // get the selected parameter from the store to determine the color scale
  const selectedParameter = useStore((state) => state.selectedParameter);
  const currentLayer = useStore((state) => state.currentLayer);
  const selectedColorPalette = useStore((state) => state.selectedColorPalette);

  // define some variables

  // get the color schema on a variable to be added to the selected parameter
  let colorSchema;

  // get the value range of the selected parameter
  let valueRange;

  // get the color scale of the selected parameter
  let colorScale;

  // function to assign the value range and color scale based on the selected parameter and current layer
  function assignRangesAndColorScale(selectedParameter, params) {
    if(params.hasOwnProperty(selectedParameter)) {
      valueRange = params[selectedParameter].slice(0, 2);
      colorScale = params[selectedParameter][2];
    } else {
      throw new Error(`Invalid parameter: ${selectedParameter}`);
    }
  }

  // assign the color schema based on the selected color palette
  switch (selectedColorPalette) {
    case "Magma":
      colorSchema = magma;
      break;
    case "Viridis":
      colorSchema = viridis;
      break;
    case "Turbo":
      colorSchema = turbo;
      break;
    case "Inferno":
      colorSchema = inferno;
      break;
    case "Plasma":
      colorSchema = plasma;
      break;
    default:
      throw new Error(`Invalid color palette: ${selectedColorPalette}`);
  }

  // switch cases
  switch (currentLayer) {
    case "ward":
      assignRangesAndColorScale(selectedParameter, {
        "population": [18000, 180000, colorSchema],
        "dry_waste": [12000, 120000, colorSchema],
        "wet_waste": [18000, 180000, colorSchema],
        "total_waste": [24000, 240000, colorSchema],
        "weight": [1, 10, colorSchema]
      });
      break;
    case "prabhag":
      assignRangesAndColorScale(selectedParameter, {
        "population": [1800, 18000, colorSchema],
        "dry_waste": [1200, 12000, colorSchema],
        "wet_waste": [1800, 18000, colorSchema],
        "total_waste": [2400, 24000, colorSchema],
        "weight": [1, 10, colorSchema]
      });
      break;
    case "region":
      assignRangesAndColorScale(selectedParameter, {
        "population": [180, 1800, colorSchema],
        "dry_waste": [120, 1200, colorSchema],
        "wet_waste": [180, 1800, colorSchema],
        "total_waste": [240, 2400, colorSchema],
        "weight": [1, 10, colorSchema]
      });
      break;
    case "building":
      assignRangesAndColorScale(selectedParameter, {
        "population": [18, 180, colorSchema],
        "dry_waste": [12, 120, colorSchema],
        "wet_waste": [18, 180, colorSchema],
        "total_waste": [24, 240, colorSchema],
        "weight": [1, 10, colorSchema]
      });
      break;
    default:
      throw new Error(`Invalid layer: ${currentLayer}`);
  }

  // get the relative value based on the value range
  let relativeValue = (value - valueRange[0]) / (valueRange[1] - valueRange[0]);
  relativeValue = Math.max(0, Math.min(1, relativeValue)); // clamp between 0 and 1

  // get the color index based on the relative value
  let colorIndex = Math.floor(relativeValue * colorScale.length);

  // return the color
  return colorScale[colorIndex];
}