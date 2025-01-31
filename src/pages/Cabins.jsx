import { useQuery } from "@tanstack/react-query";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const { data: cabins, status } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(cabins);
  return (
    <div>
      {status === "loading" && <Spinner />}

      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
        <img src="https://qiaysrzbsxpcwybjzdwd.supabase.co/storage/v1/object/public/Cabibs%20image//cabin-001.jpg" />
      </Row>
    </div>
  );
}

export default Cabins;
