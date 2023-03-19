import React, { useState, useEffect } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/auth'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  let user = useSelector((state: any) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [email, setEmail] = useState(user?.user?.user?.email)

  useEffect(() => {
    setEmail(user?.user?.user?.email || '')
  }, [user])

  return (
    <Segment>
      <Menu secondary size="huge">
        <Menu.Item
          className="ui primary"
          name="home"
          active={location.pathname === '/tasks'}
          onClick={() => navigate('/tasks')}
        >
          Task Manager
        </Menu.Item>

        <Menu.Menu position="right">
          {email ? (
            <Menu.Item
              name="tasks"
              active={location.pathname === '/tasks'}
              onClick={() => navigate('/tasks')}
            >
              Tasks
            </Menu.Item>
          ) : (
            ''
          )}
          {!email ? (
            <Menu.Item
              name="signup"
              active={location.pathname === '/register'}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Menu.Item>
          ) : (
            ''
          )}
          {!email ? (
            <Menu.Item
              name="login"
              active={location.pathname === '/login'}
              onClick={() => navigate('/login')}
            >
              Login
            </Menu.Item>
          ) : (
            ''
          )}
          {email ? (
            <Menu.Item
              name="logout"
              active={location.pathname === '/login'}
              onClick={() => {
                dispatch(logout())
                navigate('/login')
              }}
            >
              Logout {user?.user?.firstName}
            </Menu.Item>
          ) : (
            ''
          )}
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}
