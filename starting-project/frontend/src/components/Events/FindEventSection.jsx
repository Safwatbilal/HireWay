import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDate } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem';
export default function FindEventSection() {
  const searchElement = useRef();
  const [searchParams,setSearchParams]=useState()
  const {data,isLoading}= useQuery({
    queryKey:['events',{search:searchParams} ],
    queryFn:({signal})=>fetchDate({searchParams,signal}),
    enabled:searchParams!==undefined
  })
  function handleSubmit(event) {
    event.preventDefault();
    setSearchParams(searchElement.current.value)
  }
  let content=<p>Please enter a search term and to find events.</p>
  if(isLoading){
   content=  <LoadingIndicator></LoadingIndicator>
  }

  
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
