import React from "react";
import styled from "styled-components";
import axios from "axios";

import NewsItem from "./NewsItem";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 10%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  // 현재 props로 받아 온 category에 따라 카테고리를 지정하여 API를 요청
  /*
        화면에 보이는 시점에 API를 요청했다. 이떄 useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청.
        여기서 주의할 점은 useEffect에 등록하는 함수에 async를 붙이면 안된다.
        useEffect에서 반환해야 하는 값은 뒷정리 함수이기 떄문이다.
        따라서 useEffect 내부에서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해야 한다.
    */
  // const [articles, setArticles] = useState(null);
  // const [loading, setLoading] = useState(false); // loading이라는 상태도 관리하여 API 요청이 대기 중인지 판별

  // useEffect(() => {
  //   // async를 사용하는 함수 따로 선언
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const query = category === "all" ? "" : `&category=${category}`;
  //       const response = await axios.get(
  //         // axios.get 함수는 파라미터로 전달된 주소에 GET요청을 해준다. 그리고 이에 대한 결과는 .then을 통해 비동기적으로 확인할 수 있다.
  //         `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f6e5e57285ad4b20aa02fdfe2d8b2905`
  //       );
  //       /*
  //         현재 category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있다.
  //         category 값이 all이라면 query값을 공백으로 설정하고, all이 아니라면 "&category=카테고리" 형태의 문자열을 만들도록 했다. 그리고 이 query에를 요청할 때 주소에 포함시켜주었다.
  //         추가로 category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 떄문에 useEffect의 의존 배열 (두 번쨰 파라미터로 설정하는 배열)에 category를 넣어 주어야 한다.

  //         만약 이 컴포넌트를 클래스형 컴포넌트로 만들게 된다면 componentDidMount와 componentDidUpdata에서 요청을 시작하도록 설정해 주어야한다.
  //         함수형 컴포넌트라면 이렇게 useEffect 한 번을 컴포넌트가 맨 처음 렌더링도리 때, 그리고 category값이 바뀔 떄 요청하도록 설정해 줄수있다.
  //       */
  //       setArticles(response.data.articles);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [category]);

  const [loading, response, error] = usePromise(() => {
    // usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로 코드가 훨씬 간결해진다.
    // 요청 상태를 관리할 때 무조건 커스텀 Hook을 만들어서 사용해야 하는 것은 아니지만, 상황에 따라 적절히 사용하면 좋은 코드를 만들어 갈 수 있다.
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f6e5e57285ad4b20aa02fdfe2d8b2905`
    );
  }, [category]);

  // 대기 중일 떄
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  // 아직 articles 값이 설정되지 않았을 때
  // if (!articles) {
  //   return null;
  // }

  // 아직 articles 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }
  // 에러가 발행했을 때
  if (error) {
    return <NewsListBlock>에러발생!</NewsListBlock>;
  }
  // articles 값이 유효할 때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {/* NewsItem에서 title, urlToImage, url, description 을 article에 한번에 담아서 props전달  */}
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
      {/*
          데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때 신경 써야 할 부분이 있다.
          map 함수를 사용하기 전에 꼭 !artucles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다.
          이 작업을 하지 않으면, 아직 데이터가 없을떄 null에는 map 함수가 없기 떄문에 렌더링 과정에서 오류가 발생한다.
          그래서 애플리케이션이 제대로 나타나지 않고 흰 페이지만 보이게 된다.
      */}
    </NewsListBlock>
  );
};

export default NewsList;
