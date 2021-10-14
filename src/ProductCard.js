import {CardGroup, Card} from "react-bootstrap";

const ProductCard = ({products, dataFunc, data}) => {
    
    let productCards = products?.[0]?.map((product) => {
        return(
            <Card>
                <Card.Body>
                    <Card.Title>Product: {product.name}</Card.Title>
                    <Card.Text>{product.slogan}</Card.Text>
                </Card.Body>
                <Card.Footer onClick={()=>{dataFunc(product.id)}}> <small className="text-muted">See Details</small> </Card.Footer>
            </Card>
        )
    })

    return(
        <CardGroup>
            {productCards}
        </CardGroup>
    )
}

export default ProductCard;