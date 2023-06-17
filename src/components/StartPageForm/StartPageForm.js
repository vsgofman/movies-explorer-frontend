import './StartPageForm.css';

function StartPageForm({ children }) {

  return (
      <form className="form start-page__form" id="start-page__form">
        {children}
      </form>
  )
}

export default StartPageForm;