import React, { useState } from 'react'
import { Card, Modal, Label, Icon, Header, Loader } from 'semantic-ui-react'
import TaskDetails from '../pages/taskDetails'
import swal from 'sweetalert'
import '../static/css/task.css'
import { useDeleteTaskMutation } from '../redux/slices/task'

export default function TaskCard({ tasks, refreshData }: any) {
  const [doDelete, deleteProgress] = useDeleteTaskMutation()
  const [open, setOpen]: any = useState({})
  const linkTo = (item: any) => {
    console.log(item)
  }

  const onDelete = (task: any) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover the task',
      icon: 'warning',
      buttons: ['Cancel', 'Continue'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        doDelete(task.id)
          .unwrap()
          .then((res: any) => {
            refreshData()
            setOpen(task.status)
          })
      }
    })
  }

  return (
    <Card.Group>
      {tasks?.map((item: any) => (
        <Card key={item.title} onClick={() => linkTo(item)}>
          <Card.Content>
            <Card.Header className="card-header">
              <Modal
                onClose={() => setOpen({ [item.id]: false })}
                onOpen={() => setOpen({ [item.id]: true })}
                open={open[item.id]}
                size="small"
                trigger={
                  <Header as="h4" className="heaser-color">
                    {item.title}
                  </Header>
                }
                content={
                  <TaskDetails
                    task={item}
                    status={item.status}
                    refreshData={refreshData}
                    setIsopen={setOpen}
                  />
                }
              />
            </Card.Header>
            <Card.Meta>{item.status}</Card.Meta>
            <Card.Description>{item.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Loader active={deleteProgress.isLoading} />
            <Label onClick={() => onDelete(item)} as="a">
              {' '}
              Delete
              <Icon name="delete" />
            </Label>
            <Modal
              onClose={() => setOpen({ [item.id]: false })}
              onOpen={() => setOpen({ [item.id]: true })}
              open={open[item.id]}
              trigger={
                <Label as="a">
                  View &nbsp;
                  <Icon name="eye" />
                </Label>
              }
              content={
                <TaskDetails
                  task={item}
                  status={item.status}
                  refreshData={refreshData}
                  setIsopen={setOpen}
                />
              }
            />
            <Modal
              onClose={() => setOpen({ [item.id]: false })}
              onOpen={() => setOpen({ [item.id]: true })}
              open={open[item.id]}
              trigger={
                <Label as="a">
                  Edit &nbsp;
                  <Icon name="edit" />{' '}
                </Label>
              }
              content={
                <TaskDetails
                  task={item}
                  status={item.status}
                  refreshData={refreshData}
                  setIsopen={setOpen}
                />
              }
            />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}
