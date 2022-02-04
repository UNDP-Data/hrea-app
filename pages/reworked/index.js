import {vectorTiles} from "../../data/vector-tiles";
import HomeLayout from "../../components/home_layout";

const Index = () => {
    return (
        <>
            <HomeLayout data={vectorTiles}/>
        </>
    )
}

export default Index
