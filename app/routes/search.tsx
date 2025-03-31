import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Muzlinkverse" },
    {
      name: "description",
      content: "Share the music you listening with us :)",
    },
  ];
};

export default function Search() {
  const handleSubmit = (param) => {
    console.log("param", param);
  };
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input></input>
        <button type="submit">검색</button>
      </form>
    </div>
  );
}
