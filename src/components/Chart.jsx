// Contains content for the controls tab

// React Imports
import { useState } from 'react';

// zustand Imports
import { useStore } from '../store/store.js';

// Library Imports
import DatePicker from 'react-datepicker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// utils Imports
import formatDate from '../utils/formatDate.js';
import { format } from 'date-fns';

// Import styles
import '../styles/Chart.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// Custom Date Picker component
const CustomDatePicker = ({
  idPrefix,
  label,
  dateValue,
  onDateChange,
  minDate,
  maxDate,
}) => (
  <>
    <label htmlFor={`${idPrefix}-date`}>{label}</label>
    <div className="datepicker-container">
      <DatePicker
        autocomplete="off" // to disable the browser's autocomplete
        name={Math.random().toString()} // to disable the browser's autocomplete
        dateFormat="dd-MM-yyyy"
        id={`${idPrefix}-date`}
        selected={dateValue}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown
        showMonthDropdown
      />
    </div>
  </>
);

// Custom Sampling Period Selector component
const SamplingPeriodSelector = ({ value, onChange }) => (
  <>
    <label htmlFor="sampling-period">Sampling Period</label>
    <select
      id="sampling-period"
      name="sampling-period"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </>
);

// Custom Parameter Selector component
const ParameterSelector = ({ value, onChange }) => (
  <>
    <label htmlFor="parameter">Parameter</label>
    <select
      id="parameter"
      name="parameter"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      <option value="dry_waste">Dry Waste</option>
      <option value="wet_waste">Wet Waste</option>
      <option value="total_waste">Total Waste</option>
      <option value="population">Population</option>
      <option value="weight">Weight</option>
    </select>
  </>
);

// ControlsContent component
const Chart = () => {
  // default start date for the date pickers
  const defaultStartDate = new Date('2023-06-30');
  const defaultEndDate = new Date('2023-06-30');

  // local state for the date pickers and sampling period selector
  const [startDateValue, setStartDateValue] = useState(
    formatDate(defaultStartDate)
  );
  const [endDateValue, setEndDateValue] = useState(formatDate(defaultEndDate));
  const [localSamplingPeriod, setLocalSamplingPeriod] = useState('daily');

  // global state for the date pickers and sampling period selector
  const updateStartDate = useStore((state) => state.updateStartDate);
  const updateEndDate = useStore((state) => state.updateEndDate);
  const updateSamplingPeriod = useStore((state) => state.updateSamplingPeriod);
  const toggleChart = useStore((state) => state.toggleChart);
  const updateToggleChart = useStore((state) => state.updateToggleChart);

  // local state for the parameter selector
  const [localParameter, setLocalParameter] = useState('total_waste');

  // global state for the parameter selector
  const selectedParameter = useStore((state) => state.selectedParameter);
  const updateSelectedParameter = useStore(
    (state) => state.updateSelectedParameter
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
        position: 'top',
        color: '#fff',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set the color of the x-axis labels
        },
      },
      y: {
        ticks: {
          color: 'white', // Set the color of the y-axis labels
        },
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: `${selectedParameter}`,
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        color: '#fff',
      },
    ],
  };

  const toggleModal = () => {
    updateToggleChart(false);
  };

  // Function to handle the submit event of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    if (localSamplingPeriod === 'daily') {
      if (new Date(endDateValue) - new Date(startDateValue) > 2592000000) {
        alert('Sampling Period cannot be greater than 30 days.');
        return;
      }
    }
    if (localSamplingPeriod === 'monthly') {
      if (new Date(endDateValue) - new Date(startDateValue) > 31536000000) {
        alert('Sampling Period cannot be greater than 1 year.');
        return;
      }
    }
    updateToggleChart(true);
    updateStartDate(startDateValue);
    updateEndDate(endDateValue);
    updateSamplingPeriod(localSamplingPeriod);
    updateSelectedParameter(localParameter);
    console.log('Form submitted');
    console.log('Start Date: ', startDateValue);
    console.log('End Date: ', endDateValue);
    console.log('Sampling Period: ', localSamplingPeriod);
    console.log('Parameter: ', localParameter);
  };

  return (
    <div>
      <form className="controls" onSubmit={handleSubmit}>
        <div>
          <CustomDatePicker
            idPrefix="start"
            label="Select Start Date:"
            dateValue={new Date(startDateValue)}
            onDateChange={(date) => {
              const formattedDate = formatDate(date);
              if (new Date(formattedDate) <= new Date(endDateValue)) {
                setStartDateValue(formattedDate);
              } else {
                alert('Start Date cannot be greater than End Date.');
              }
            }}
            minDate={new Date('2020-01-01')}
            maxDate={new Date(endDateValue)} // max date for startDate is endDate
          />

          <CustomDatePicker
            idPrefix="end"
            label="Select End Date:"
            dateValue={new Date(endDateValue)}
            onDateChange={(date) => {
              const formattedDate = formatDate(date);
              if (new Date(formattedDate) >= new Date(startDateValue)) {
                setEndDateValue(formattedDate);
              } else {
                alert('End Date cannot be less than Start Date.');
              }
            }}
            minDate={new Date(startDateValue)} // min date for endDate is startDate
            maxDate={new Date('2023-06-30')}
          />

          <SamplingPeriodSelector
            value={localSamplingPeriod}
            onChange={setLocalSamplingPeriod}
          />

          <ParameterSelector
            value={localParameter}
            onChange={setLocalParameter}
          />
        </div>
        <button className="submitbtn" type="submit">
          Submit
        </button>
      </form>
      {toggleChart && (
        <div className="chart-container">
          <div className="chart-content">
            <div className="palette-icon" onClick={toggleModal}>
              {!toggleChart ? (
                <FontAwesomeIcon icon={faPalette} style={{ color: '#fff' }} />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: '#fff' }}
                  onClick={toggleModal}
                />
              )}
            </div>
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
