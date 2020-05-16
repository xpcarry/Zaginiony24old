import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { RootStoreContext } from '../stores/rootStore';
import { IUserFormValues } from '../models/user';
import TextInput from '../form/TextInput';
import { FORM_ERROR } from 'final-form';
import {combineValidators, isRequired} from 'revalidate';
import ErrorMessage from '../form/ErrorMessage';


const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const Login = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Zaloguj się do Zaginiony24'
                        color='black'
                        textAlign='center'
                    />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} fluid type='submit'>Zaloguj</Button>
                    {submitError && !dirtySinceLastSubmit && 
                    <ErrorMessage error={submitError} text='Invalid username or password'/>}
                </Form>
            )}
        />
    );
};

export default Login;