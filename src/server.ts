import { App } from "./app";

const port:any = process.env.PORT || 3000;

(function (){
  try {
    new App().server.listen(port, () => console.log(`Server listening on port: ${port}`))
  } catch (e){
    console.log(e)
  }
})()