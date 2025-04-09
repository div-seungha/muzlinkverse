import { contentContainer } from "~/styles/info.css";
import { searchFormText } from "~/styles/search.css";

const Hello = () => {
  return (
    <div
      className={contentContainer}
      style={{
        textAlign: "left",
        display: "block",
        padding: 20,
        paddingTop: 100,
        paddingBottom: 200,
      }}
    >
      <p className={searchFormText}>
        안녕하세요. 저는 올해로 만 4년을 갓 넘긴, 주니어도 아닌 시니어도 아닌,
        중니어라고 부르기도 애매한 그냥 그 사이 어딘가쯤에 걸쳐 있는 평범한
        개발자입니다.
      </p>
      <p
        className={searchFormText}
        style={{ marginBottom: 40, fontWeight: 600 }}
      >
        이 사이트는 개인적으로 제가 인디씬에서 열심히 음악을 하고 있는, 그러나
        세상에 널리 알려지지 않은 사람들에게 조금이나마 도움이 되고 싶은
        마음에서 만들게 되었습니다.
      </p>

      <p
        className={searchFormText}
        style={{ marginBottom: 40, fontWeight: 800 }}
      >
        “URL 한 줄만 공유하면 사람들은 각자 자신이 이용하는 스트리밍 플랫폼에서
        음악을 곧장 들을 수 있다.”
      </p>

      <p className={searchFormText}>
        에스파나 아이브, 블랙핑크 같은 유명한 K-POP 아이돌 아티스트의 노래들은
        자연스레 찾아 듣게 되지만 사람들에게 그닥 널리 알려지지 않은 음악의
        경우엔 직접 앱을 열어서 그 이름을 검색해보는 것조차 진입장벽이 될 수
        있다고 생각했기 때문입니다.
      </p>
      <p className={searchFormText}>
        조금이나마 사람들이 이들의 음악에 보다 편리하게, 쉽게 다가갈 수 있었으면
        하는 마음에서 직접 구상했고, 기획했고, 데이터베이스를 구축하는
        것에서부터 화면단에 이르기까지 모든 요소들을 제가 직접 코드로
        구현했습니다.
      </p>

      <p className={searchFormText}>……</p>

      <p className={searchFormText}>
        그런데 제가 그렇게 엄청 실력이 뛰어난 개발자는 아니다 보니…
      </p>

      <p className={searchFormText}>
        사실 저는 화면을 주로 개발하는 프런트엔드 개발자였습니다. DB나 서버 쪽은
        아주 가아아아끔 만져보기는 했지만 제대로 공부해서 써먹어 보기는 이 웹
        사이트 구축이 처음입니다.
        <br />
        그래서 사용하시다 보면 버그도 잦을 테고, 특히 데이터가 이상하게 나오는
        경우들이 종종 있을 것입니다.
        <br />
        아직은 “곡명”과 “아티스트명”을 정확히 입력해주셔야 그나마 검색 결과가
        바르게 나올 텐데…….
        <br />
        부족한 부분들은 앞으로 점차 개선해 나가도록 하겠습니다.
      </p>

      <p className={searchFormText}>
        혹시나 잘못된 정보가 올라가 있는 걸 발견하시면 좌측의 느낌표 아이콘을
        눌러서 제보해주시면 제가 틈틈이 확인해서 올바른 정보로 업데이트
        하겠습니다.
      </p>
      <p className={searchFormText}>
        부족한 웹 사이트이지만 부디 여러분께 도움이 되었으면 좋겠습니다.
      </p>
    </div>
  );
};

export default Hello;
