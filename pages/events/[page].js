import { useRouter } from 'next/router'
import React from 'react'

function page() {

    const router =useRouter()
    console.log(router)
    const{page}=router.query
    

  return (
    <div>{page}</div>
  )
}

export default page