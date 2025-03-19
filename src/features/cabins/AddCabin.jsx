import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open open="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open open="table-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="table-form">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [openForm, setOpenForm] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setOpenForm((openForm) => !openForm)}>
//         Add cabin
//       </Button>
//       {openForm && (
//         <Modal onClose={() => setOpenForm(false)}>
//           <CreateCabinForm onCloseModal={() => setOpenForm(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
