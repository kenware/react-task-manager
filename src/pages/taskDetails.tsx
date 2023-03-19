import React, { useState } from 'react'
import {
  Segment,
  Container,
  Grid,
  Message,
  Breadcrumb,
  Form,
  Button,
  TextArea,
  Loader,
} from 'semantic-ui-react'
import Dropdown from '../components/dropdown'
import { Link } from 'react-router-dom'
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '../redux/slices/task'
import statuseOptions from '../utils'

export default function TaskDetails({
  status,
  setIsopen,
  task = {},
  refreshData = null,
}: any) {
  const [selectedStatus, setSelectedStatus] = useState(status)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [createTask, createprogress] = useCreateTaskMutation()
  const [updateTask, updateProgress] = useUpdateTaskMutation()
  const [error, setError] = useState('')

  const submit = () => {
    const data = {
      status: selectedStatus,
      title,
      description,
    }
    if (task.id) {
      updateTask({ id: task.id, task: data })
        .unwrap()
        .then((res: any) => {
          if (refreshData) {
            refreshData()
          }
          setIsopen({ [task.id ? task.id : status]: false })
        })
        .catch((err) => {
          console.log(err?.data)
          const message: string = err?.data?.message
          setError(message)
        })
    } else {
      createTask(data)
        .unwrap()
        .then((res: any) => {
          if (refreshData) {
            refreshData()
          }
          setIsopen({ [task.id ? task.id : status]: false })
        })
        .catch((err) => {
          console.log(err?.data)
          const message: string = err?.data?.message
          setError(message)
        })
    }
  }

  return (
    <Container style={{ margin: '2rem' }}>
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={14}>
          <Breadcrumb size="large">
            <Breadcrumb.Section link>
              <Link to="/tasks">Tasks</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>
              {task.title ? task.title : 'Create'}
            </Breadcrumb.Section>
          </Breadcrumb>
          <Message hidden={!error} warning>
            <p>{error}</p>
          </Message>
          <Segment>
            <Form size="large" onSubmit={() => submit()}>
              <Form.Input
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                label="Title"
                placeholder="Title"
              />
              <Dropdown
                title="Status"
                value={selectedStatus}
                onChange={(e, { value }) => setSelectedStatus(value)}
                options={statuseOptions}
              />
              <br />
              <TextArea
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
                placeholder="description"
                style={{ minHeight: 200 }}
              />
              <br />
              <br />
              <Loader
                active={createprogress.isLoading || updateProgress.isLoading}
              />
              <Button
                disabled={!title || !selectedStatus || !description}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}
