// Note: ColorPicker component
import { useState } from 'react';
import '../styles/ColorPicker.css';

// Import custom components
import { getColorSchemas } from '../utils/getColor';
import { useEffect } from 'react';

// zustand imports
import { useStore } from '../store/store.js';

// Import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';

const ColorPicker = () => {
  // State to keep track of which color palette is selected
  const selectedColorPalette = useStore((state) => state.selectedColorPalette);
  const updateSelectedColorPalette = useStore(
    (state) => state.updateSelectedColorPalette
  );

  // State to keep track of the color schema
  const [colorSchema, setColorSchema] = useState(null);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);

  // Get the color schemas
  const colorSchemas = getColorSchemas();

  useEffect(() => {
    setColorSchema(colorSchemas[selectedColorPalette]);
  }, [selectedColorPalette, colorSchemas]);

  // Function to toggle the color picker
  const toggleModal = () => {
    setToggleColorPicker(!toggleColorPicker);
  };

  return (
    <div className="color-picker-parent">
      {toggleColorPicker && (
        <div className="color-picker-container">
          {colorSchemas &&
            Object.keys(colorSchemas).map((key, index) => {
              return (
                <div className="color-schema-container" key={index}>
                  <h3>{key}</h3>
                  <div
                    className="color-schema"
                    onClick={() => {
                      updateSelectedColorPalette(key);
                      toggleModal();
                    }}
                  >
                    {colorSchemas[key].map((color, index) => {
                      return (
                        <div
                          key={index}
                          className="color-schema-element"
                          style={{ backgroundColor: color }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <div className="color-picker">
        <h3>Low</h3>
        <div className="color-schema">
          {colorSchema &&
            colorSchema.map((color, index) => {
              return (
                <div
                  key={index}
                  className="color-schema-element"
                  style={{ backgroundColor: color }}
                ></div>
              );
            })}
        </div>
        <h3>High</h3>
        <div className="palette-icon" onClick={toggleModal}>
          {!toggleColorPicker && (
            <FontAwesomeIcon icon={faPalette} style={{ color: '#fff' }} />
          )}
          {toggleColorPicker && (
            <FontAwesomeIcon
              icon={faTimes}
              style={{ color: '#fff' }}
              onClick={toggleModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
