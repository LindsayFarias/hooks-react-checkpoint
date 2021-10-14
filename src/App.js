import './App.css';
import { useState, useEffect } from "react";
import ProductCard from './ProductCard';

function App() {
  const [products, updateProducts] = useState({ products: [] });
  const [data, updateData] = useState({ features: [], image: '' });


  useEffect(() => {
    async function collectProducts() {
      let res = await fetch('http://52.26.193.201:3000/products/list');
      let data = await res.json();
      console.log('newProductArray: ', data)
      updateProducts((products) => ({ ...products, products: [...products.products, data] }))
    }
    collectProducts();
  }, [])

  async function retrieveOther(id) {
    let res = await fetch('http://52.26.193.201:3000/products/' + id);
    let data = await res.json();
    let newFeatures = [];

    for (let i = 0; i < data.features.length; i++) {
      if (data.features[i].value === null) newFeatures.push(data.features[i].feature);
      else newFeatures.push(`${data.features[i].value} ${data.features[i].feature}`);
    }

    res = await fetch('http://52.26.193.201:3000/products/' + id + '/styles');
    data = await res.json();
    let newImage = data.results[0].pictures[0].tumbnail_img;

    updateData({ ...data, features: [...data.features, newFeatures], image: newImage })
  }

  return (
    <div className="App">
      <header>
      </header>
      <ProductCard products={products.products} dataFunc={retrieveOther} data={data} />
    </div>
  );
}

export default App;


