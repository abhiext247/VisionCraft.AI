import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [Image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => { 
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)

      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }
  return (
    <motion.form onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div>
        <div className='relative'>

          <img src={Image} alt="" className='max-w-sm rounded' />

          <span className={`absolute bottom-0 l-0 h-1 bg-first ${loading ? 'w-full transition-all duration-[10s] rounded-full' : 'w-0'}`}></span>
        </div>

        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>

      {!isImageLoaded &&
        <div className="flex w-full max-w-xl bg-neutral-300 text-black text-md p-0.5 mt-10 rounded-full border border-zinc-400">
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            type="text" placeholder='Describe your vision' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 ' />
          <button type='submit' className='bg-first px-8 sm:px-12 py-3 rounded-full text-white  ml-1'>Generate</button>
        </div>
      }

      {isImageLoaded &&

        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0 mt-10 rounded-full'>
          <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border border-zinc-900 text- px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a href={Image} download className='bg-green-500 px-10 py-3 rounded-full cursor-pointer hover:bg-green-600 transition-all'>Download</a>
        </div>
      }
    </motion.form>
  )
}

export default Result
