import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/cart_style.css"
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../service/order.service";
import Shared from "../utils/shared";
//import { useCartContext } from "../context/cart";
import cartService from "../service/cart.service";
//import { useAuthContext } from "../context/auth";
import { removeFromCart, fetchCartData } from "../state/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart(){
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const authData = useSelector((state) => state.auth.user);  
  const navigate = useNavigate();
  
    const [CartList, setCartList] = useState([]);
    const [ItemsInCart, setItemsInCart] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);
  
  
    const getTotalPrice = (ItemList) => {
      let totalPrice = 0;
      ItemList.forEach((item) => {
        const itemPrice = item.quantity * parseInt(item.book.price);
        totalPrice = totalPrice + itemPrice;
      });
      setTotalPrice(totalPrice);
    };
  
    useEffect(() => {
      setCartList(cartData);
      setItemsInCart(cartData.length);
      getTotalPrice(cartData);
    }, [cartData]);
  
    const removeItem = async (id) => {
      try {
        const res = await cartService.removeItem(id);
        if (res) {
          dispatch(removeFromCart(id));
        }
      } catch (error) {
        toast.error("Somthing went wrong!");
      }
    };
    const updateQuantity = async (cartItem, inc, e) => {
      const current_count = parseInt(
        e.target.closest(".qty-group").children[1].innerText
      );
      const quantity = inc ? current_count + 1 : current_count - 1;
      if (quantity === 0) {
        toast.error("Item quantity should not be zero");
        return;
      }
      cartService
        .updateItem({
          id: cartItem.id,
          userId: cartItem.userId,
          bookId: cartItem.book.id,
          quantity,
        })
        .then((res) => {
          if (res) {
            const item = CartList.find(
              (item) => item.book.id === cartItem.book.id
            );
            if (item) {
              const current_div_count = parseInt(
                e.target.closest(".qty-group").children[1].innerText
              );
              const newCount = inc
                ? current_div_count + 1
                : current_div_count - 1;
              e.target.closest(".qty-group").children[1].innerText = newCount;
              const newPrice = inc
                ? TotalPrice + parseInt(item.book.price)
                : TotalPrice - parseInt(item.book.price);
              setTotalPrice(newPrice);
            }
          }
        });
    };
  
    const PlaceOrder = async () => {
      if (authData.id) {
        const userCart = await cartService.getList(authData.id);
        if (userCart.length) {
          try {
            let cartIds = [];
            userCart.forEach((element) => {
              cartIds.push(element.id);
            });
            const newOrder = {
              userId: authData.id,
              cartIds,
            };
            const res = await orderService.placeOrder(newOrder);
            if (res) {
              dispatch(fetchCartData(authData.id));
              navigate("/booklist");
              toast.success(Shared.messages.ORDER_SUCCESS);
            }
          } catch (error) {
            toast.error(`Order cannot be placed ${error}`);
          }
        } else {
          toast.error("Your cart is empty");
        }
      }
    };
  
    return(
        <>
            <Header/>
            <div className="cartWrapper">
      <div className="container">
        <Typography variant="h4">Cart page</Typography>
        <div className="cart-heading-block">
          <Typography variant="h5">
            My Shopping Bag ({ItemsInCart} Items)
          </Typography>
          <div className="total-price">Total price: {TotalPrice}</div>
        </div>
        <div className="cart-list-wrapper">
          {CartList.map((cartItem) => {
            return (
              <div className="cart-list-item" key={cartItem.id}>
                <div className="cart-item-img">
                  <Link>
                    <img src={cartItem.book.base64image} alt="dummy-pic" />
                  </Link>
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-top-content">
                    <div className="cart-item-left">
                      <p className="brand">{cartItem.book.name}</p>
                      <Link>Cart item name</Link>
                    </div>
                    <div className="price-block">
                      <span className="current-price">
                        MRP &#8377; {cartItem.book.price}
                      </span>
                    </div>
                  </div>
                  <div className="cart-item-bottom-content">
                    <div className="qty-group">
                      <Button
                        className="btn pink-btn"
                        onClick={(e) => updateQuantity(cartItem, true, e)}
                      >
                        +
                      </Button>
                      <span className="number-count">{cartItem.quantity}</span>
                      <Button
                        className="btn pink-btn"
                        onClick={(e) => updateQuantity(cartItem, false, e)}
                      >
                        -
                      </Button>
                    </div>
                    <Link onClick={() => removeItem(cartItem.id)}>Remove</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-wrapper3">
          <Button className="btn pink-btn" onClick={PlaceOrder}>
            Place order
          </Button>
        </div>
      </div>
    </div>
            <Footer/>
        </>
    )
}
export default Cart;