import './AboutProject.css';

function AboutProject() {
  return (
    <section className='project'>
      <h2 className='project__title'>О проекте</h2>
      <ul className='project__block'>
        <li className='project__item'>
          <h3 className='item__title'>Дипломный проект включал 5 этапов</h3>
          <p className='item__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='project__item'>
          <h3 className='item__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='item__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='project__time'>
        <div className='time__backend'>1 неделя</div>
        <div className='time__frontend'>4 недели</div>
      </div>
    </section>
  )
}

export default AboutProject;