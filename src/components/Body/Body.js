import React, { Fragment, useState } from 'react';

function Body() {
  const [shoeInfo, setShoeInfo] = useState({
    shoeName: '',
    description: '',
    price: '',
    sizes: {
      large: '',
      medium: '',
      small: '',
    },
  });

  const [enteredValues, setEnteredValues] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // Added state for showing/hiding cart screen

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'large' || name === 'medium' || name === 'small') {
      setShoeInfo((prevInfo) => ({
        ...prevInfo,
        sizes: {
          ...prevInfo.sizes,
          [name]: value,
        },
      }));
    } else {
      setShoeInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleAddProducts = () => {
    const newProduct = { ...shoeInfo };
    setEnteredValues((prevValues) => [...prevValues, newProduct]);
    setShoeInfo({
      shoeName: '',
      description: '',
      price: '',
      sizes: {
        large: '',
        medium: '',
        small: '',
      },
    });
  };

  const handleSizeChange = (index, size) => {
    setEnteredValues((prevValues) => {
      const updatedValues = [...prevValues];
      const updatedItem = { ...updatedValues[index] };
      const newSize = parseInt(updatedItem.sizes[size], 10);

      if (!isNaN(newSize) && newSize > 0) {
        updatedItem.sizes[size] = newSize - 1;
        setCartItems((prevItems) => [...prevItems, updatedItem]);
      }

      updatedValues[index] = updatedItem;
      return updatedValues;
    });
  };

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleHideCart = () => {
    setShowCart(false);
  };

  // Render confirmation screen
  if (showCart) {
    return (
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Shoe Name: {item.shoeName}</p>
              <p>Description: {item.description}</p>
              <p>
                Large: {item.sizes.large}
                Medium: {item.sizes.medium}
                Small: {item.sizes.small}
              </p>
              <hr />
            </li>
          ))}
        </ul>
        <div>
          <p>Do you want to confirm your order?</p>
          <button onClick={handleHideCart}>Cancel</button>
          <button>Confirm</button>
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <Fragment>
      <div>
        <label>Shoe Name</label>
        <input type='text' name='shoeName' value={shoeInfo.shoeName} onChange={handleChange} />
        <label>Description</label>
        <input type='text' name='description' value={shoeInfo.description} onChange={handleChange} />
        <label>Price</label>
        <input type='number' name='price' value={shoeInfo.price} onChange={handleChange} />
      </div>
      <div>
        <label>Large</label>
        <input type='number' name='large' value={shoeInfo.sizes.large} onChange={handleChange} />
        <label>Medium</label>
        <input type='number' name='medium' value={shoeInfo.sizes.medium} onChange={handleChange} />
        <label>Small</label>
        <input type='number' name='small' value={shoeInfo.sizes.small} onChange={handleChange} />
      </div>
      <button onClick={handleAddProducts}>Add Products</button>

      {/* Display entered values using map */}
      <div>
        <h2>Entered Values</h2>
        <ul>
          {enteredValues.map((item, index) => (
            <li key={index}>
              <p>Shoe Name: {item.shoeName}</p>
              <p>Description: {item.description}</p>
              <p>
                Large: {item.sizes.large > 0 && <button onClick={() => handleSizeChange(index, 'large')}>{item.sizes.large}</button>}
                Medium: {item.sizes.medium > 0 && <button onClick={() => handleSizeChange(index, 'medium')}>{item.sizes.medium}</button>}
                Small: {item.sizes.small > 0 && <button onClick={() => handleSizeChange(index, 'small')}>{item.sizes.small}</button>}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleShowCart}>
        <span>Your Cart</span>
        <span>{cartItems.length}</span>
      </button>
    </Fragment>
  );
}

export default Body;



















