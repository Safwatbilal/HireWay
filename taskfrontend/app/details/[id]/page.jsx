'use client'
import ApplyJobDetails from "@/components/Apply/ApplyJobDetails"
import { use } from "react"
const page = ({params}) => {
    const {id}=use( params)
  return (
    <ApplyJobDetails id={id}></ApplyJobDetails>
  )
}

export default page