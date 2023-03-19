import React, { useState } from 'react'
import { Container, Grid, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import '../static/css/task.css'
import Task from '../components/taskCard'
import { useGetTasksQuery } from '../redux/slices/task'
import TaskDetails from './taskDetails'
import statuseOptions from '../utils'

export default function Tasks() {
  const getTasks = useGetTasksQuery({})
  const [open, setOpen]: any = useState({})

  const tasks = getTasks.data?.data || []

  const refreshData = () => {
    getTasks.refetch()
  }

  return (
    <Container>
      <Header as="h2"> General Task Boared</Header>
      <br />
      <Grid columns="equal">
        <Loader active={getTasks.isLoading} />
        {statuseOptions.map((item: any) => (
          <Grid.Column className="task-section" link>
            {item.text}
            <Modal
              onClose={() => setOpen({ [item.value]: false })}
              onOpen={() => setOpen({ [item.value]: true })}
              open={open[item.value]}
              trigger={
                <span>
                  &nbsp; <Icon className="cursor" name="add"></Icon>
                </span>
              }
              content={
                <TaskDetails
                  status={item.value}
                  refreshData={refreshData}
                  setIsopen={setOpen}
                />
              }
            />
            <br />
            <br />
            <Task
              tasks={tasks.filter((task: any) => task.status === item.value)}
              refreshData={refreshData}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  )
}
