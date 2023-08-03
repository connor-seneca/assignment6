import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function Artwork(props) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher);
    const imageURL = data && data.primaryImageSmall ? data.primaryImageSmall : `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`;

    if (!error && !data) {
        return null;
    }

    return (
        <>
            <div>
                {error ? <Error statusCode={404} /> :
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={imageURL} />
                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <Card.Text>
                                <strong>Date: </strong>{data.date ? data.date : "N/A"} <br />
                                <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
                                <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
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