import React, { Fragment, useState } from 'react';

function Body() {
  const [shirtInfo, setshirtInfo] = useState({
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
  const [showCart, setShowCart] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'large' || name === 'medium' || name === 'small') {
      setshirtInfo((prevInfo) => ({
        ...prevInfo,
        sizes: {
          ...prevInfo.sizes,
          [name]: value,
        },
      }));
    } else {
      setshirtInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleAddProducts = () => {
    const newProduct = { ...shirtInfo };
    setEnteredValues((prevValues) => [...prevValues, newProduct]);
    setshirtInfo({
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
      const newSize = updatedItem.sizes[size];
  
      if (!isNaN(newSize) && newSize > 0) {
        updatedItem.sizes[size] = newSize - 0.5;
  
        setCartItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex((item) => item.shoeName === updatedItem.shoeName);
  
          if (existingItemIndex !== -1) {
            // If the item is already in the cart, update its quantity by 1
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              sizes: {
                ...updatedItems[existingItemIndex].sizes,
                [size]: Math.floor(updatedItems[existingItemIndex].sizes[size] || 0) + 1,
              },
            };
            return updatedItems;
          } else {
            // If the item is not in the cart, add it with quantity 1
            return [...prevItems, { ...updatedItem, sizes: { [size]: 1 } }];
          }
        });
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
  let totalPrice = 0;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => {
          const { shoeName, description, sizes } = item;

          // Calculate total price for the item
          const totalItemPrice = Object.keys(sizes).reduce((total, size) => {
            return total + (sizes[size] || 0) * item.price;
          }, 0);

          // Accumulate total price for all items
          totalPrice += totalItemPrice;

          return (
            <li key={index}>
              <p>Shirt Name: {shoeName}</p>
              <p>Description: {description}</p>
              <p>
                Large: {sizes.large}
                Medium: {sizes.medium}
                Small: {sizes.small}
              </p>
              <p>Total Price: {totalItemPrice}</p>
              <hr />
            </li>
          );
        })}
      </ul>
      <div>
        <p>Total Cart Price: {totalPrice}</p>
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
        <label>Shirt Name</label>
        <input type='text' name='shoeName' value={shirtInfo.shoeName} onChange={handleChange} />
        <label>Description</label>
        <input type='text' name='description' value={shirtInfo.description} onChange={handleChange} />
        <label>Price</label>
        <input type='number' name='price' value={shirtInfo.price} onChange={handleChange} />
      </div>
      <div>
        <label>Large</label>
        <input type='number' name='large' value={shirtInfo.sizes.large} onChange={handleChange} />
        <label>Medium</label>
        <input type='number' name='medium' value={shirtInfo.sizes.medium} onChange={handleChange} />
        <label>Small</label>
        <input type='number' name='small' value={shirtInfo.sizes.small} onChange={handleChange} />
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
              <p>Price: {item.price}</p>
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



















