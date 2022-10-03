import React from 'react'
import axios from "axios";
import { Formik, Form, Field, } from 'formik';
import { useAppDispatch, useAppSelector } from '../hook';
import { IAuthorizationData, IAuthorizedUserState } from '../types/types';
import { setIsAuth } from '../store/authSlice';
import './AuthorizationPage.css'

export const AuthorizationPage: React.FC<{}> = () => {
  const initialValues: IAuthorizationData = { email: '', password: '' };

  const dispatch = useAppDispatch()

  async function login(email: string, password: string) {
    try {
      const { data } = await axios.post<IAuthorizedUserState>(
        'http://localhost:3001/login',
        {
          "email": `${email}`,
          "password": `${password}`
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      dispatch(setIsAuth(data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  const isAuth = useAppSelector(state => state.auth.user.accessToken)

  return (
    <div> {isAuth
      ? <div>
        <h1>Поздравляем, Вы авторизованы</h1>
        <div>Теперь Вы можете просматривать, редактировать, удалять и добавлять контакты</div>
      </div>
      : <div className='authWindow'>
        <h1>Авторизация</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            login(values.email, values.password)
            actions.setSubmitting(false);
          }}
        >
          <Form className='inputElements'>
            <Field className='authField' id="email" name="email" placeholder="Введите email" />
            <Field className='authField' type='password' id="password" name="password" placeholder="Введите пароль" />
<br />
            <button className='authSubmitButton' type="submit">Авторизоваться</button>
          </Form>
        </Formik>
      </div>}
    </div>
  );
};

export default AuthorizationPage