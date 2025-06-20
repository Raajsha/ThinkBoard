import { useState } from 'react'
import Navbar from '../components/navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useEffect } from 'react';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setisRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        console.log(response.data);
        setNotes(response.data);
        setisRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if(error.response?.status === 429) {
          setisRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally{
        setLoading(false);
      }
    };

    fetchNotes();
  },[])

  return (
    <div className='min-h-screen '>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary p-10'>Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes = {setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
