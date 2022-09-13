import { useRouter } from 'next/router'

type Params = {
  id: string
}

export default function Product() {
  const { query } = useRouter()

  const { id } = query as Params

  return <h1>ID: {id}</h1>
}