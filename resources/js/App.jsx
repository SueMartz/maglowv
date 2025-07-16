import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/app.css'
//LAYOUTS

import LayoutPublic from './layouts/LayoutPublic';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutClient from './layouts/LayoutClient';

//PUBLIC
import Home from './pagepublic/Home';
import ProtectedRoutes from "./Pageauth/ProtectedRoutes";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Categorias from "./pagepublic/Categorias";
import Categoria from "./pagepublic/Categoria";
import NotFound from "./pagepublic/NoFound";
import Blog from "./pagepublic/Blog";
import PostDetail from "./pagepublic/PostDetail";
import PaginaDetail from "./pagepublic/PaginaDetail";


//AUTH
import Login from './Pageauth/Login';
import Register from "./Pageauth/Register";
import PanelAdmin from "./pageadmin/PanelAdmin";

//ROL ADMIN
import UserAll from "./pageadmin/UserAll";
import UserUpdate from "./pageadmin/UserUpdate";
import CategoriaAll from "./pageadmin/CategoriaAll";
import CategoriaStore from "./pageadmin/CategoriaStore";
import CategoriaUpdate from "./pageadmin/CategoriaUpdate";
import EmpresaAll from "./pageadmin/EmpresaAll";
import EmpresaStoreAdmin from "./pageadmin/EmpresaStore"
import EmpresaUpdate from "./pageadmin/EmpresaUpdate";
import SlideAll from  "./pageadmin/SlideAll";
import SlideStore from "./pageadmin/SlideStore";
import SlideUpdate from "./pageadmin/SlideUpdate";
import PostAll from  "./pageadmin/PostAll";
import PostStore from "./pageadmin/PostStore";
import PostUpdate from "./pageadmin/PostUpdate";



import PaginaAll from "./pageadmin/PaginaAll";
import PaginaStore from "./pageadmin/PaginaStore";
import PaginaUpdate from "./pageadmin/PaginaUpdate";


// ROL CLIENTE 
import PanelClient from "./pageclient/PanelClient";
import EmpresaAllClient from "./pageclient/EmpresaAll";
import EmpresaStoreClient from "./pageclient/EmpresaStore";
import EmpresaUpdateClient from "./pageclient/EmpresaUpdate";






const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element ={<LayoutPublic/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/*' element={< NotFound/>}/>
          <Route index element = {<Home/>} />
          <Route path='/categorias' element ={<Categorias/>}></Route>
          <Route path='/categorias/:slug' element ={<Categoria/>}></Route>
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/post/:slug' element={<PostDetail />} />
          <Route path='/blog/pagina/:slug' element={<PaginaDetail />} />
          
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/pagina/:slug" element={<PaginaDetail />} />


        </Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/admin" element ={<LayoutAdmin/>}>
              <Route index element = {<PanelAdmin/>} />
              <Route path ='user' element= {<UserAll/>} />
               <Route path ='user/edit/:id' element= {<UserUpdate/>} />
               <Route path ='categoria' element= {<CategoriaAll/>} />
                <Route path ='categoria/create' element= {<CategoriaStore/>} />
                <Route path ='categoria/edit/:id' element= {<CategoriaUpdate/>} />
                <Route path ='empresa' element={<EmpresaAll/>}/>
                <Route path ='empresa/create' element={<EmpresaStoreAdmin/>}/> 
                <Route path ='empresa/edit/:id' element= {<EmpresaUpdate/>} />
                <Route path ='slide' element= {<SlideAll/>} />
                <Route path ='slide/create' element= {<SlideStore/>} />
                <Route path ='slide/edit/:id' element= {<SlideUpdate/>} />
                <Route path ='post' element= {<PostAll/>} />
                <Route path ='post/create' element= {<PostStore/>} />
                <Route path ='post/edit/:id' element= {<PostUpdate/>} />
                <Route path= 'pagina' element={<PaginaAll />} />
                <Route path='pagina/create' element={<PaginaStore />} />
                <Route path='pagina/edit/:id' element={<PaginaUpdate />} />

                
        </Route>
            <Route path="/cliente" element ={<LayoutClient/>}>
              <Route index element = {<PanelClient/>}/>
              <Route path="empresa" element={<EmpresaAllClient/>}/>
              <Route path='empresa/create' element={<EmpresaStoreClient/>}/>
              <Route path='empresa/edit/:id' element={<EmpresaUpdateClient/>}/>
            </Route>  
        </Route>
           
      </Routes>
    </Router>
  );
};

export default App;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        
            <App/>
        
    )
}