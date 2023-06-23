import '../App/App.css';
import './AboutMe.css';
import RunningTitle from '../RunningTitle/RunningTitle';
import studentPhoto from '../../images/my_photo.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='wrapper'>
        <RunningTitle text='Студент' />
        <div className='about-me__block'>
          <div className='about-me__desription'>
            <h2 className='about-me__title'>Виктор</h2>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 29 лет</p>
            <p className='about-me__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam maxime rerum, iste similique ab repellendus. Eligendi possimus, necessitatibus repellat delectus ut porro unde dignissimos iste explicabo nesciunt reprehenderit saepe. Soluta?
              Dolorem alias recusandae officia, nulla atque similique. Vitae fugit, optio corporis, quia reiciendis nemo.</p>
            <a className='about-me__link' href='https://github.com/vsgofman'>Github</a>
          </div>
          <img className='about-me__photo' src={studentPhoto} alt='фото студента' />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;