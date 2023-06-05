import './Techs.css';
import RunningTitle from '../RunningTitle/RunningTitle';

function Techs() {
  return (
    <section className='techs'>
      <RunningTitle text='Технологии' />
      <h2 className='techs__title'>7 технологий</h2>
      <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__block'>
        <li className='techs__item'>HTML</li>
        <li className='techs__item'>CSS</li>
        <li className='techs__item'>JS</li>
        <li className='techs__item'>React</li>
        <li className='techs__item'>Git</li>
        <li className='techs__item'>Express.js</li>
        <li className='techs__item'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;