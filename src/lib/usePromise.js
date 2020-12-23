import { useEffect, useState } from "react";

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  /*
    프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 이렇게 src디렉터리에 lib 디렉터리를 만든 후 그 안에 작성한다.

    방금만든 usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아온다.
    deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정된다.
    하지만 이 배열을 설정하는 부분에서 ESLint 경고가 나타난다.
  */
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
