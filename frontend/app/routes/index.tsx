import Header from "~/components/base/Header";


export default function Index() {

  return (
    <>
      <Header />
      <footer>
        <div>
          <ul>
            <li>
              <img src="assets/home_active.svg" alt="" />
            </li>
            <li>
              <img src="assets/write_disable.svg" alt="" />
            </li>
            <li>
              <img src="assets/bubble_disable.svg" alt="" />
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}