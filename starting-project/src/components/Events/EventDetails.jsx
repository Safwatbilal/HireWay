import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { fetchEvent ,deleteEvent,queryClient} from '../../util/http.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
export default function EventDetails() {
  const [isDeleting,setISDeleting]=useState(false)
  function handleOpenDeleting(){
    setISDeleting(true)
  }
  function handleClose(){
    setISDeleting(false)
  }
const params=useParams()
  const navgaite=useNavigate()
const{data,isPending}=useQuery({
    queryKey:['events',params.id],
    queryFn:({signal})=>fetchEvent({id:params.id,signal}),
  })
  console.log(data)
  const{mutate,isPending:x}= useMutation({
    mutationFn:deleteEvent,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['events'],refetchType:'none'}),
      navgaite('/events')
    }
  })
  function handleEdit(){

      mutate({id:params.id})
  
  }
  return (
    <>
    {
    isDeleting&&
    <Modal onClose={handleClose}>
      <p>Are You Sure To deleted this.</p>
      {x&&<p>Deleteing wait.....</p>}
      {!x&&<>
      
        <button onClick={handleClose}>NO</button>
        <button onClick={handleEdit}>YES</button>
      </>
    }
      </Modal>
    }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending&&<LoadingIndicator></LoadingIndicator>}
      {!isPending&&
      <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleOpenDeleting}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>
}
    </>
  );
}
