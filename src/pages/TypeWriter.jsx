import { Typewriter } from 'react-simple-typewriter';

const TypeWriter = () => {
    return (
        <div className='p-2 rounded-lg text-2xl text-white font-semibold bg-teal-400 w-[300px]'>
            <Typewriter
        words={['Visit Popular Services..']} 
        loop={true}
        cursor
      />
        </div>
    );
};

export default TypeWriter;