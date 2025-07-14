
import PageMeta from '@/components/blogs/PageMeta';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Failed = () => {
  return (
    <div className="bg-gray-100 w-full  h-[100vh] flex flex-col gap-7 justify-center items-center ">
        <PageMeta
        title='Failed'
        description=''
      /> 
            <X className="text-red-500 text-6xl font-extrabold"/>
            <h2 className="text-center text-2xl m-6 font-bold text-red-500">
                Payment Failed
            </h2>
            <button
            className="p-3 rounded-full bg-black text-slate-100 font-bold text-lg flex justify-center items-center px-12 hover:bg-gray-900"
            >
            <Link to="/">Home</Link>
            </button>
      
    </div>
  )
}

export default Failed