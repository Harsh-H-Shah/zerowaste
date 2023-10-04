// This component is responsible for rendering the sidebar and its content.

// React imports
import { useState } from 'react';

// Zustand imports
import { useStore } from '../store/store.js';

// Import styles
import '../styles/Sidebar.css';

// Import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faSlidersH,
  faChartBar,
  faCircleInfo as faInfo,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Import custom components
import LayersContent from './LayersContent';
import ControlsContent from './ControlsContent';
import Chart from './Chart';
import AboutContent from './AboutContent';

// Function to format the date for the date picker
const defaultStartDate = new Date('2023-06-30');

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Sidebar = () => {
  // State to keep track of which tab is active
  const activeTab = useStore((state) => state.activeTab);
  const updateActiveTab = useStore((state) => state.updateActiveTab);

  // Function to toggle the active tab
  const toggleTab = (index) => {
    updateActiveTab(activeTab === index ? null : index);
  };

  // Tabs for the sidebar
  const tabs = [
    {
      icon: (
        <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#aba8a8' }} />
      ),
      label: 'Layers',
    },
    {
      icon: <FontAwesomeIcon icon={faSlidersH} style={{ color: '#aba8a8' }} />,
      label: 'Controls',
    },
    {
      icon: <FontAwesomeIcon icon={faChartBar} style={{ color: '#aba8a8' }} />,
      label: 'Chart',
    },
    {
      icon: <FontAwesomeIcon icon={faInfo} style={{ color: '#aba8a8' }} />,
      label: 'About',
    },
  ];

  // Function to render the sidebar content based on the active tab
  const renderSidebarContent = () => {
    switch (activeTab) {
      case 0:
        return <LayersContent />;
      case 1:
        return <ControlsContent />;
      case 2:
        return <Chart />;
      case 3:
        return <AboutContent />;
      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`sidebar-tab ${activeTab === index ? 'active' : ''}`}
          >
            <button className="tab-button" onClick={() => toggleTab(index)}>
              {tab.icon}
            </button>
          </div>
        ))}
      </div>
      <div className={`sidebar-content ${activeTab !== null ? 'visible' : ''}`}>
        {activeTab !== null && (
          <>
            <div className="sidebar-content-heading">
              <h2>{tabs[activeTab]?.label}</h2>
            </div>
            <div className="sidebar-content-body">{renderSidebarContent()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
