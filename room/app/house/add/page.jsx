'use client';
import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import createRoom from '@/app/actions/createHouse';

const AddRoomPage = () => {
  const [state, formAction] = useActionState(createRoom, {});
  const [isSubmitting, setIsSubmitting] = useState(false); // إضافة حالة لتتبع الإرسال
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      setIsSubmitting(false); // إعادة تعيين الحالة إذا حدث خطأ
    }
    if (state.success) {
      toast.success('Room created successfully!');
      setIsSubmitting(false); // إعادة تعيين الحالة عند النجاح
      router.push('/');
    }
  }, [state]);

  const handleSubmit = (e) => {
    setIsSubmitting(true); // تحديد أن النموذج قيد الإرسال
  };

  return (
    <> 
      <div className='bg-white shadow-lg rounded-lg p-6 w-full'>
        <form action={formAction} onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-gray-700 font-bold mb-2'
            >
              Room Name
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='border rounded w-full py-2 px-3'
              placeholder='Enter a name (Large Conference Room)'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-gray-700 font-bold mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='border rounded w-full h-24 py-2 px-3'
              placeholder='Enter a description for the room'
              required
            ></textarea>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-gray-700 font-bold mb-2'
            >
              Price 
            </label>
            <input
              type='number'
              id='price'
              name='price'
              className='border rounded w-full py-2 px-3'
              placeholder='Enter price'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='location'
              className='block text-gray-700 font-bold mb-2'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              className='border rounded w-full py-2 px-3'
              placeholder='Location (Building, Floor, Room)'
              required
            />
          </div>

          <div className='mb-8'>
            <label
              htmlFor='image'
              className='block text-gray-700 font-bold mb-2'
            >
              Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              className='border rounded w-full py-2 px-3'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
              disabled={isSubmitting} // تعطيل الزر عند الإرسال
            >
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoomPage;
