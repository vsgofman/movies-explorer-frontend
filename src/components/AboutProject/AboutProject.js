import RunningTitle from '../RunningTitle/RunningTitle';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='project'>
      <RunningTitle text='О проекте' />
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
        <p className='time__item time__item_backend'>1 неделя</p>
        <p className='time__item time__item_frontend'>4 недели</p>
      </div>
    </section>
  )
}

export default AboutProject;