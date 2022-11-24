// npm i react-router-dom
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

const Index = () => <h1>나 index야!</h1>
const One = () => <h1>나 One야!</h1>
const Two = () => <h1>나 Two야!</h1>
const Three = () => <h1>나 Three야!</h1>
const BlogDetail = () => {
  const { id } = useParams()
  const [items, setItems] = useState([])

  useEffect(()=>{
    const getData = async () => {
      const res = await fetch(`http://test.api.weniv.co.kr/mall/${id}`)
      const result = await res.json()
      setItems(result)
    }
    getData()
  }, [items])

  return (
    <div>
      <h1>나 BloeDetails야!</h1>
      <p>{id} 블로그 내용</p>
      <p>{items.productName}</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Link to="/"> home </Link><br />
      <Link to="/one"> one </Link><br />
      <Link to="/two"> two </Link><br />
      <Link to="/three"> three </Link><br />
      <Link to="/blog/1"> 1번 게시물 </Link><br />
      <Link to="/blog/2"> 2번 게시물 </Link><br />
      <Link to="/blog/3"> 3번 게시물 </Link><br />
      <Link to="/blog/4"> 4번 게시물 </Link><br />
      {/* 라우트를 감싸줍니다. */}
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/one" element={<One name='licat' />}/>
        <Route path="/two" element={<Two />}/>
        <Route path="/three" element={<Three />}/>
        <Route path="/blog/:id" element={<BlogDetail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
