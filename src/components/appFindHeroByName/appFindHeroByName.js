import { useState } from 'react';
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService';
import './appFindHeroByName.scss'


const FindHeroByName = () => {
   const [char, setChar] = useState(null);
   const { getHeroByName } = useMarvelService();

   const getHero = (name) => {
      getHeroByName(name).then(res => {
         setChar(res)
      })
   }

   const result = !char ? null : char.length > 0 ?
      <div className='newHero'>
         {`There is! Visit ${char[0].name} page?`}
         <Link className="button button__secondary" to={`/${char[0].name}`}>
            <div className="inner">TO PAGE</div>
         </Link>
      </div> : <div className='errorMessage'>The character was not found. Check the name and try again</div>

   return (
      <div className='findHero'>
         <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'Minimum 2 symbol')
                  .required('This field is required ')
            })}
            onSubmit={({ name }) => {
               getHero(name);
            }}
         >
            <Form>
               <label htmlFor="name">Or find a character by name:</label>
               <div className='findHero-wrapp'>
                  <Field
                     required
                     placeholder='Enter name'
                     id='name'
                     name='name'
                     type='text'>
                  </Field>
                  <button
                     className="button button__main"
                     type='submit'>
                     <div className="inner">FIND</div>
                  </button>
               </div>
               <ErrorMessage component='div' name='name' className='errorMessage' />
               {result}
            </Form>
         </Formik>
      </div>

   )
}

export default FindHeroByName