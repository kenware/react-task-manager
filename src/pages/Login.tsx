import React, { useState } from 'react'
import {
  Button,
  Form,
  Container,
  Header,
  Grid,
  Segment,
  Message,
  Loader,
} from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/slices/user'
import { setCredentials } from '../redux/slices/auth'
import { useDispatch } from 'react-redux'

export default function Register() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState({
    email: '',
    message: '',
  })
  const [loginAccount, loginProgress] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const onSubmit = () => {
    const data = {
      email,
      password,
    }
    loginAccount(data)
      .unwrap()
      .then(async (res: any) => {
        console.log(res)
        dispatch(
          setCredentials({ user: res.data.user, jwtToken: res.data.token }),
        )
        navigate('/tasks')
      })
      .catch((err) => {
        console.log(err?.data)
        const message: string = err?.data?.message
        setError({ ...error, message })
      })
  }

  return (
    <Container>
      <br />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header as="h2" center>
              User Login
            </Header>
            <Message hidden={!error.message} warning>
              <p>{error.message}</p>
            </Message>
            <Form size="large" onSubmit={() => onSubmit()}>
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
              <Loader active={loginProgress.isLoading} />
              <Button type="submit">Submit</Button>
              <br />
              <br />
              Not Registered? <Link to="/register">Sign Up</Link>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}
