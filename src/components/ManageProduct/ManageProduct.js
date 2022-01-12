import React, { useContext, useEffect, useState } from 'react';
import "./ManageProduct.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from '../Admin/Admin';

const ManageProduct = () => {
    const {setEditProductId, setSuccessMessage,  selectedComponent, setSelectedComponent} = useContext(MyContext)

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [products])

    const handleEditProduct = id => {
      const showComponent = {...selectedComponent}
      showComponent.editProduct = true;
      showComponent.manageProduct = false;
      showComponent.addProduct = false;
      setSelectedComponent(showComponent)
      setEditProductId(id)
      setSuccessMessage(false)
    }

    const handleDeleteProduct = id =>{
      fetch("http://localhost:5000/delete/" + id, {
        method: "DELETE"
      })
      .then(res => console.log(res))
    }
    
    return (
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
        { products.map((product, index) => ( 
                         <tr key={product._id}>
                           { selectedComponent.editProduct ? (<th><img className="w-25" src={product.img} alt="" /></th>) : <th scope="row" >{index + 1}</th> }
                     
                     <td>{product.name}</td>
                     <td>{product.category}</td>
                     <td>${product.price}</td>
                     <td>
                       <div className="d-flex">
                       <button onClick={() => handleEditProduct(product._id)} className="edit-icon" ><FontAwesomeIcon icon={faEdit} /></button> <button  className="trash-icon" onClick={() => handleDeleteProduct(product._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                       </div>
                     </td>
                   </tr>
        ))}
        </tbody>
      </table>
    );
};

export default ManageProduct;