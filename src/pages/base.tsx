import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Headers'
import { setCredentials } from '../redux/slices/auth'

const BaseRoute = ({ Component }: any) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let user = useSelector((state: any) => state.auth)
  const checkAuth = () => {
    if (!user?.user?.email) {
      user = localStorage.getItem('user')
      user = user ? JSON.parse(user) : false
      if (user) {
        dispatch(
          setCredentials({
            user,
            jwtToken: localStorage.getItem('jwtToken'),
          }),
        )
      } else {
        navigate('/login')
      }
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Header />
      <Container>{Component ? <Component /> : ''}</Container>
    </>
  )
}
BaseRoute.prototypes = {
  Component: PropTypes.func.isRequired,
}
export default BaseRoute
