import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function Artwork(props) {
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null, fetcher);
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
    const [ showAdded, setShowAdded ] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(props.objectID))
            setShowAdded(false);
        }
        else {
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true);
        }
    }

    if (!error && !data) {
        return null;
    }

    return (
        <>
            <div>
                {error ? <Error statusCode={404} /> :
                    <Card>
                        {data.primaryImage &&
                            <Card.Img variant="top" src={data.primaryImage} />
                        }
                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <Card.Text>
                                <strong>Date: </strong>{data.date ? data.date : "N/A"} <br />
                                <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
                                <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
                                <br />
                                <br />
                                <strong>Artist: </strong>{data.artistDisplayName ? <p>{data.artistDisplayName} (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)</p> : "N/A"}
                                <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"} <br />
                                <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"} <br />
                                <Button onClick={favouritesClicked} variant={showAdded ? "primary" : "outline-primary"}>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
                            </Card.Text>
                            <Link href={`/artwork/${props.objectID}`} passHref>
                                <Button>{props.objectID}</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                }
            </div>
        </>
    );
}