import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    
    if(!favouritesList) return null;
    
    if (favouritesList === null || favouritesList.length === 0) {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>
                        Try adding some new artwork to the list.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }

    return (
        <>
            <Row className="gy-4">
                {favouritesList.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
            </Row>
        </>
    )
}