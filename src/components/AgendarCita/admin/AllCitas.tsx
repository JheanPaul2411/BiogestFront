import useCitas from "@/helpers/hooks/useCitas"
import CardCitas from "./CardCitas"


function AllCitas() {
    const {citas} = useCitas()
        
    return (
        <>
            <CardCitas citas={citas}/>
        </>
      )
}

export default AllCitas