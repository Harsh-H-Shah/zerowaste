import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  const handleBackClick = () => {
    window.location.href = 'http://mumbai.nowastes.in/'; // Replace '#' with your desired URL
  };

  return (
    <header className="header">
      <div className="back-button" onClick={handleBackClick}>
        <span>&larr;</span> Back
      </div>
      <div className="header-title">
        <p className="name">ZeroWaste Dashboard 3.0</p>
        <p className="city-tag">Mumbai</p>
      </div>
    </header>
  );
};

export default Header;
