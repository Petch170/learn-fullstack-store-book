สร้างไฟล์ package.json
npm init -y

pnpm install express

pnpm install -g nodemon

pnpm install --save-dev nodemon

#ติดตั้ง Mongoose
npm install mongoose --save

pnpm install dotenv --save

npm install cors

frontend=> backend server =>controller => book schema => database => send to server => back to the frontend

.sort({ createAt: -1 }); =-1 หมายถึงเรียงจากใหม่ไปเก่า (Descending Order)


create admin & verify token
folder user

install bcrypt
#pnpm install bcrypt
#pnpm install jsonwebtoken

generate crypto random
https://stackoverflow.com/questions/70566188/node-js-crypto-randombytes-is-not-a-function

ที่terminal ใหม่ หลังจากได้ tokenที่genมา ให้ใส่ในenv JWT_SECRET_KEY
#node
#require('crypto').randomBytes(64).toString('hex') 

หลังจากเทสlogin admin เสร้จ
สร้าง verifyAdmin ที่ middle ware