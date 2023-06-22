import RunningTitle from '../RunningTitle/RunningTitle';
import '../App/App.css';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='project'>
      <div className='wrapper'>
        <RunningTitle text='О проекте' />
        <ul className='project__block'>
          <li className='item project__item'>
            <h3 className='item__title'>Дипломный проект включал 5&nbsp;этапов</h3>
            <p className='item__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </li>
          <li className='item project__item'>
            <h3 className='item__title'>На выполнение диплома ушло 5&nbsp;недель</h3>
            <p className='item__text'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className='time project__time'>
          <p className='time__item time__item_part_backend'>1 неделя</p>
          <p className='time__item time__item_part_frontend'>4 недели</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;