
import MyRoomCard from '@/components/MyHouse';
import getMyRooms from '../actions/getMyHouse';

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
  
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p>You have no room listings</p>
      )}
    </>
  );
};

export default MyRoomsPage;
