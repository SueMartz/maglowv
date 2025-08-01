import axios from "axios"
const base_api_url = import.meta.env.VITE_API_URL;
const authHeader = () => {
  const token = sessionStorage.getItem("token");
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

export default {
  // Auth
  getRegister: (data) => axios.post(`${base_api_url}/auth/register`, data),
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`, null, authHeader()),

  // ROL ADMIN
  getUserAll: () => axios.get(`${base_api_url}/admin/user`, authHeader()),
  getUserById: (id) => axios.get(`${base_api_url}/admin/user/${id}`, authHeader()),
  getUserUpdate: (data, id) => axios.put(`${base_api_url}/admin/user/${id}`, data, authHeader()),

  getCategoriaAll: () => axios.get(`${base_api_url}/admin/categoria`, authHeader()),
  getCategoriaStore: (data) => axios.post(`${base_api_url}/admin/categoria`, data, authHeader()),
  getCategoriaById: (id) => axios.get(`${base_api_url}/admin/categoria/${id}`, authHeader()),
  getCategoriaUpdate: (data, id) => axios.put(`${base_api_url}/admin/categoria/${id}`, data, authHeader()),
  getCategoriaDeleteById: (id) => axios.delete(`${base_api_url}/admin/categoria/${id}`, authHeader()),

  getProductoAll: () => axios.get(`${base_api_url}/admin/producto`, authHeader()),
  getProductoStore: (data) => axios.post(`${base_api_url}/admin/producto`, data, authHeader()),
  getProductoById: (id) => axios.get(`${base_api_url}/admin/producto/${id}`, authHeader()),
  getProductoUpdate: (data, id) => axios.put(`${base_api_url}/admin/producto/${id}`, data, authHeader()),
  getProductoDeleteById: (id) => axios.delete(`${base_api_url}/admin/producto/${id}`, authHeader()),

  //modelo Empresas
  getEmpresaAll: () => axios.get(`${base_api_url}/admin/empresa`, authHeader()),
  getEmpresaStoreAdmin: (data) => axios.post(`${base_api_url}/admin/empresa`, data, authHeader()),
  getEmpresaById: (id) => axios.get(`${base_api_url}/admin/empresa/${id}`, authHeader()),
  getEmpresaUpdate: (data, id) => axios.put(`${base_api_url}/admin/empresa/${id}`, data, authHeader()),
  getEmpresaDeleteById: (id) => axios.delete(`${base_api_url}/admin/empresa/${id}`, authHeader()),
  // SLIDES (admin)
  getSlidesAll: () => axios.get(`${base_api_url}/admin/slide`, authHeader()),
  getSlideById: (id) => axios.get(`${base_api_url}/admin/slide/${id}`, authHeader()),
  getSlideStore: (data) => axios.post(`${base_api_url}/admin/slide`, data, authHeader()),
  //getSlideStore: (data) => axios.post(`${base_api_url}/admin/slide`, data, authHeader()),
  getSlideUpdate: (data, id) => axios.post(`${base_api_url}/admin/slide/${id}?_method=PUT`, data, authHeader()), // para formData
  getSlideDeleteById: (id) => axios.delete(`${base_api_url}/admin/slide/${id}`, authHeader()),
  //POST

  getPostAll: () => axios.get(`${base_api_url}/admin/post`, authHeader()),
  getPostById: (id) => axios.get(`${base_api_url}/admin/post/${id}`, authHeader()),
  getPostStore: (data) => axios.post(`${base_api_url}/admin/post`, data, authHeader()),
  //getpostStore: (data) => axios.post(`${base_api_url}/admin/post`, data, authHeader()),
  getPostUpdate: (data, id) => axios.post(`${base_api_url}/admin/post/${id}?_method=PUT`, data, authHeader()), // para formData
  getPostDeleteById: (id) => axios.delete(`${base_api_url}/admin/post/${id}`, authHeader()),
  
  //paginas

  getPaginaAll: () => axios.get(`${base_api_url}/admin/pagina`, authHeader()),
  getPaginaById: (id) => axios.get(`${base_api_url}/admin/pagina/${id}`, authHeader()),
  getPaginaStore: (data) => axios.post(`${base_api_url}/admin/pagina`, data, authHeader()),
  getPaginaUpdate: (data, id) => axios.post(`${base_api_url}/admin/pagina/${id}?_method=PUT`, data, authHeader()),
  getPaginaDeleteById: (id) => axios.delete(`${base_api_url}/admin/pagina/${id}`, authHeader()),
  

  getEmpresaAllClient: () => axios.get(`${base_api_url}/client/empresa`, authHeader()),
  getEmpresaStoreClient: (data) => axios.post(`${base_api_url}/client/empresa`, data, authHeader()),
  getEmpresaByIdClient: (id) => axios.get(`${base_api_url}/client/empresa/${id}`, authHeader()),
  getEmpresaUpdateClient: (data, id) => axios.put(`${base_api_url}/client/empresa/${id}`, data, authHeader()),

  //public
  getEmpresas: (data) => axios.get(`${base_api_url}/public/empresas/${data}`),
  searchEmpresas: (data) => axios.post(`${base_api_url}/public/empresas/search`, data),
  CategoriasAll: () => axios.get(`${base_api_url}/public/categorias`),
  CategoriasBySlug: (slug) => axios.get(`${base_api_url}/public/categorias/${slug}`),
  getSlides: () => axios.get(`${base_api_url}/public/slides`),
  getCategoriasHome: () => axios.get(`${base_api_url}/public/categorias-home`),
  //getCategoriasHome: () => axios.get(`${base_api_url}/public/api/categorias-home`),
  getPostBySlug: (slug) => axios.get(`${base_api_url}/public/blog/post/${slug}`),
  getPaginaBySlug: (slug) => axios.get(`${base_api_url}/public/blog/pagina/${slug}`),
  getPublicPosts: () => axios.get(`${base_api_url}/public/blog/posts`),
  getPublicPaginas: () => axios.get(`${base_api_url}/public/blog/paginas`),



};
