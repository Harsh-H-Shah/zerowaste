import { useState, useEffect, useCallback } from 'react';
import '../styles/ColorPicker.css';
import { getColorSchemas } from '../utils/getColorSchema.js';
import { useStore } from '../store/store.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';

const ColorPicker = () => {
  const activeTab = useStore((state) => state.activeTab);
  const selectedColorPalette = useStore((state) => state.selectedColorPalette);
  const updateSelectedColorPalette = useStore(
    (state) => state.updateSelectedColorPalette
  );

  const [colorSchema, setColorSchema] = useState(null);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);

  const colorSchemas = getColorSchemas();

  useEffect(() => {
    setColorSchema(colorSchemas[selectedColorPalette]);
  }, [colorSchemas, selectedColorPalette]);

  const toggleModal = useCallback(() => {
    setToggleColorPicker((prevToggle) => !prevToggle);
  }, []);

  return (
    <div
      className={`color-picker-parent ${
        activeTab in [0, 1, 2, 3] ? 'left' : ''
      }`}
    >
      {toggleColorPicker && (
        <div className="color-picker-container">
          {Object.entries(colorSchemas).map(([key, colors], index) => (
            <div className="color-schema-container" key={index}>
              <h3>{key}</h3>
              <div
                className="color-schema"
                onClick={() => {
                  updateSelectedColorPalette(key);
                  toggleModal();
                }}
              >
                {colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="color-schema-element"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="color-picker">
        <h3>Low</h3>
        <div className="color-schema">
          {colorSchema &&
            colorSchema.map((color, index) => (
              <div
                key={index}
                className="color-schema-element"
                style={{ backgroundColor: color }}
              ></div>
            ))}
        </div>
        <h3>High</h3>
        <div className="palette-icon" onClick={toggleModal}>
          {!toggleColorPicker ? (
            <FontAwesomeIcon icon={faPalette} style={{ color: '#fff' }} />
          ) : (
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
