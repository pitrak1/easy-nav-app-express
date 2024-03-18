import './NavButton.css';

function NavButton({text, onClick}) {
  return (
    <div className="NavButton-container">
      <input type="button" onClick={onClick} className="NavButton-button" value={text} />
    </div>
  );
}

export default NavButton;
