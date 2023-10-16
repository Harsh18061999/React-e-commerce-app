import Directory from "../../components/directory/direcotry.component";
import {Outlet} from "react-router-dom";
function Home() {
  console.log("Home component render")
  return (
    <div>
        <Directory/>
        <Outlet />
    </div>
  );
}

export default Home;