import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  // ใช้ [] เพื่อเตรียมพื้นที่สำหรับการเก็บข้อมูลสินค้าที่ผู้ใช้จะเพิ่มเข้ามาในตะกร้า
  cartItem: [],
};

const CartSlice = createSlice({
  name: "cart", //จะใช้ชื่อนี้อ้างอิงใน Redux store
  initialState, //กำหนดสถานะเริ่มต้นที่สร้างไว้ด้านบน (ในที่นี้คือ { cartItem: [] })
  reducers: {
    // addToCart ทำหน้าที่เพิ่มสินค้าใหม่เข้าไปในตะกร้า (cartItem) เมื่อได้รับ action แบบ addToCart
    // state คือสถานะปัจจุบันของข้อมูลในstore
    addToCart: (state, action) => {
      const existingItem = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      //   ตรวจสอบว่ามีสินค้าที่มี _id ตรงกับ _id ของ action.payload อยู่ใน cartItem
      //action.payload คือข้อมูลสินค้าที่ต้องการเพิ่มลงในตะกร้า เช่น { _id: "123", name: "Product A", price: 100 }
      if (!existingItem) {
        state.cartItem.push(action.payload);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product added to a Cart Successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        // alert("Item added to cart Successfully");
      } else
        Swal.fire({
          title: "Product already in cart",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     Swal.fire({
      //       title: "Deleted!",
      //       text: "Your file has been deleted.",
      //       icon: "success",
      //     });
      //   }
      // });
      // Swal.fire({
      //   position: "top-center",
      //   icon: "error",
      //   title: "Item already in cart",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      // alert("Item already in cart");
    },

    // removeFromCart ทำหน้าที่ลบสินค้าออกจากตะกร้า (cartItem) เมื่อได้รับ action แบบ removeFromCart
    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

// export the actions
export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
