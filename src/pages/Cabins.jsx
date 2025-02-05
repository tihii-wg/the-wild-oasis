import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setVisible((visible) => !visible)}>
          Add cabin
        </Button>
        {visible && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
