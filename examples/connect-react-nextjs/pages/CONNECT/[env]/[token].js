import { RIBBITConnect } from 'react-ribbit-connect/'
import { useRouter } from 'next/router'


export default function CONNECT(){
    const router = useRouter()

    return (
        <RIBBITConnect 
            token={router.query.token}
            environment={router.query.env}
        />
    )
}