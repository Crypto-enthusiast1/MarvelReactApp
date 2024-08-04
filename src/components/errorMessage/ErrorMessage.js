import errorImg from './giphy.webp'
import './errorMessage.scss'
const ErrorMessage = () => {
   return (
      <img src={errorImg} alt='error' className='error' />
   )
};


export default ErrorMessage;