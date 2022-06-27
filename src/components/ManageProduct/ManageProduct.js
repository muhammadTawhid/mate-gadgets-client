import React, { useContext, useEffect, useState } from 'react';
import "./ManageProduct.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from '../Admin/Admin';
import Spinner from '../Spinner/Spinner';

const ManageProduct = () => {
  const { setEditProductId, setSuccessMessage, selectedComponent, setSelectedComponent } = useContext(MyContext)

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://mate-gadgets.herokuapp.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [products])

  const handleEditProduct = id => {
    const showComponent = { ...selectedComponent }
    showComponent.editProduct = true;
    showComponent.manageProduct = false;
    showComponent.addProduct = false;
    setSelectedComponent(showComponent)
    setEditProductId(id)
    setSuccessMessage(false)
  }

  const handleDeleteProduct = id => {
    fetch("https://mate-gadgets.herokuapp.com/delete/" + id, {
      method: "DELETE"
    })
      .then(res => console.log(res))
  }

  return (
    <div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">{selectedComponent.editProduct ? "Product" : "No."}</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && <Spinner />}
          {products.map((product, index) => (
            <tr key={product._id}>
              {selectedComponent.editProduct ? (<th><img className="product-img" src={product.img} alt="" /></th>) : <th scope="row" >{index + 1}</th>}

              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <div className="d-flex">
                  <button onClick={() => handleEditProduct(product._id)} className="edit-icon" ><FontAwesomeIcon icon={faEdit} /></button> <button className="trash-icon" onClick={() => handleDeleteProduct(product._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;