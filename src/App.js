import React from "react";
import { Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
// import Categories from "./components/Categories";
// import NewsList from "./components/NewsList";

const App = () => {
  // const [category, setCategory] = useState("all"); // catecory 상태관리
  // const onSelect = useCallback(category => setCategory(category), []); //catecory 값을 업데이트
  return (
    <>
      {/* category와 onSelect 함수를 Categories 컴포넌트에게 props로 전달,  category값을 NewsList 컴포넌트에게도 전달*/}
      {/* <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} /> */}
      <Route path="/:category?" component={NewsPage} />
      {/*
        path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어가 있다.
        category값이 선택적(optional)이라는 의미.
        즉 있을 수도 있고 없을 수도 있다 라는 뜻.
        category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주.
      */}
    </>
  );
};

export default App;
