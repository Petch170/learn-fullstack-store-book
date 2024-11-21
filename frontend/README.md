# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# install template ใช้./ เพื่อสร้างไฟล์ที่โฟลเดอร์ปัจจุบัน

pnpm create vite@latest ./ -- --template react

# install reactrouter

https://reactrouter.com/en/main/start/tutorial
pnpm install react-router-dom

สร้างโฟลเดอร์ routers เพื่อเรีกใช้ router ในfile router แทน
ซึ่งถ้าในไฟล์router.jsx ใส่ children:[
{
path:"/",
element:<h1>Home</h1>
},
{
path:"/orders",
element:<h1>Orders</h1>
},
{
path:"/about",
element:<h1>aboutHome</h1>
},
] และในหน้า app เรียกใช้ outlet return (
<>

<nav>Navbar</nav>
<Outlet />
<footer>Footer</footer>
</>
); การแสดงผลของ path อื่นๆ จะเปลี่ยนแค่outlet ให้เป็น elementของpath นั้นๆ

# กำหนดตัวแปรสี,fontที่ใช้งานบ่อย ในtaiwindconfig

theme: {
extend: {
colors: {
"primary": '#FFCE1A',
"secondary": '#0D0842',
"blackbg":"#F3F3F3",
"favorite":"#ff5841"
}
},
},

เลิอกfront ที่ต้องการในgg front แล้ว import วางที่app.css
และ copy font family: จาก gg fornt ไว้ในtaiwindconfig extend fontfamily

# https://swiperjs.com/get-started

npm install swiper

#https://react-hook-form.com/
pnpm install react-hook-form

#https://redux-toolkit.js.org/introduction/getting-started
pnpm install @reduxjs/toolkit
pnpm install react-redux

สร้างCreate a Redux State Slice ด้วยชื่อfolder features(ชื่ออื่นได้) ตามด้วยชื่อfolderที่ต้องการ ตามด้วยชื่อไฟล์..Slice.js

### การใช้งาน `useDispatch` และ `useSelector` ใน Redux

| **Feature**      | **`useDispatch`**                                             | **`useSelector`**                                           |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| **วัตถุประสงค์** | ใช้ส่ง **Action** ไปยัง Redux store                           | ใช้ **ดึงข้อมูล** จาก Redux store                           |
| **การใช้งาน**    | ใช้ในกรณีที่ต้องการ **ส่ง Action** เช่น เพิ่มข้อมูล, ลบข้อมูล | ใช้ในกรณีที่ต้องการ **ดึงข้อมูล** เช่น แสดงรายการ, คำนวณค่า |
| **พารามิเตอร์**  | ฟังก์ชัน `dispatch` ที่ส่ง **Action**                         | ฟังก์ชันที่ใช้ดึงข้อมูลจาก **Redux store** (state)          |
| **ใช้ที่ไหน**    | ใช้ในคอมโพเนนต์ที่ต้องการ **เปลี่ยนแปลงข้อมูล**               | ใช้ในคอมโพเนนต์ที่ต้องการ **แสดงผลข้อมูล**                  |

#### คำอธิบายเพิ่มเติม:

- **`useDispatch`**: ใช้ในคอมโพเนนต์ที่ต้องการ **เปลี่ยนแปลงข้อมูล** ใน Redux store โดยการส่ง Action (เช่น การเพิ่มสินค้าในตะกร้า, การลบสินค้า, หรือการอัปเดตข้อมูลอื่นๆ)
- **`useSelector`**: ใช้ในคอมโพเนนต์ที่ต้องการ **แสดงผลข้อมูล** หรือ **คำนวณค่า** จากข้อมูลใน Redux store โดยไม่เปลี่ยนแปลงข้อมูล (เช่น การแสดงรายการสินค้าทั้งหมดในตะกร้า, การคำนวณยอดรวม, หรือการแสดงข้อมูลอื่นๆ ที่เกี่ยวข้องกับ state)

#alert https://sweetalert2.github.io/
pnpm install sweetalert2

#firebase
pnpm install firebase

สร้างfolder firebase และสร้างfile firebase.config.js แล้ว วาง SDKs for the products ที่ได้จากwebไว้ที่นี่

ctrl+shift >u == tranfrom uppercase ปรับอักษรให้เป็นตัวพิมพ์ใหญ่

Build > authenicaion > getstart >enable >add new provider

> email >enable
> google > enable

register createUserWithEmailAndPassword(auth, email, password)
มาจาก https://firebase.google.com/docs/auth/web/start?hl=th

#pnpm install axios
