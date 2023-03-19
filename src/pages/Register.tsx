import React, { useState } from 'react'
import {
  Button,
  Form,
  Container,
  Header,
  Grid,
  Segment,
  Loader,
  Message,
} from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUpAccountMutation } from '../redux/slices/user'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState({
    email: '',
    lastName: '',
    message: '',
    firstName: '',
  })
  const [SignUpAccount, loginProgress] = useSignUpAccountMutation()
  const navigate = useNavigate()

  const onSubmit = () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    }
    console.log(data)
    SignUpAccount(data)
      .unwrap()
      .then(async (res: any) => {
        navigate('/login')
      })
      .catch((err) => {
        console.log(err?.data)
        const message: string = err?.data?.message
        setError({ ...error, message })
      })
  }

  const validateEmail = (targetEmail: string) => {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    if (!regexp.test(targetEmail)) {
      setError({ ...error, email: 'Invalid email address' })
    } else {
      setEmail(targetEmail)
      setError({ ...error, email: '' })
    }
  }

  return (
    <Container>
      <br />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header as="h2" center>
              User Signup
            </Header>
            <Message hidden={!error.message} warning>
              <p>{error.message}</p>
            </Message>
            <Form size="large" onSubmit={() => onSubmit()}>
              <Form.Input
                onChange={(e) => setFirstName(e.target.value)}
                error={error.firstName ? error.firstName : false}
                label="First name"
                placeholder="First name"
              />
              <Form.Input
                onChange={(e) => setLastName(e.target.value)}
                label="Last name"
                placeholder="Last name"
              />
              <Form.Input
                onChange={(e) => validateEmail(e.target.value)}
                error={error.email ? error.email : false}
                label="Email"
                placeholder="Email"
              />
              <Form.Input
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Loader active={loginProgress.isLoading} />
              <Button
                disabled={!firstName || !email || !password}
                type="submit"
              >
                Submit
              </Button>
              <br />
              <br />
              Already have an account? <Link to="/login">Login</Link>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}
