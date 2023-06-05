import './RunningTitle.css';

function RunningTitle({ text }) {
  return (
    <article className='running-title'>
      <p className='running-title__text'>{text}</p>
    </article>
  )
}

export default RunningTitle;