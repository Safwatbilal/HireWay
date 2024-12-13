import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchEvent, updateEvent ,queryClient} from '../../util/http.js';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params=useParams()
  const{data,isPending}=useQuery({
    queryFn:({signal})=>fetchEvent({id:params.id,signal}),
    queryKey:['events',params.id]
  })
  const {mutate}=useMutation({
    mutationFn:updateEvent,
    onMutate: async(data)=>{
      const newEvent=data.event
      await queryClient.cancelQueries({queryKey:['events',params.id]})
      const privous=queryClient.getQueryData(['events',params.id])
      queryClient.setQueryData(['events',params.id],newEvent)
      return{privous}
    },
    onError:(error,data,context)=>{
      queryClient.setQueryData(['events',params.id],context.privous)
    },
    onSettled:()=>{
      queryClient.invalidateQueries(['events',params.id])
    }
  })
  function handleSubmit(formData) {
    mutate({id:params.id,event:formData})
    navigate('../')
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      {isPending&&<LoadingIndicator></LoadingIndicator>}
      {!isPending&&
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>}
    </Modal>
  );
}
