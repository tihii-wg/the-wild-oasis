import { Link } from "react-router-dom";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <div>
        <Link to="/login">LOGIN</Link>
        <p>TEST</p>
      </div>
    </Row>
  );
}

export default Dashboard;
