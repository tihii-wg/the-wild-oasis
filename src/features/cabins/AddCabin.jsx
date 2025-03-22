import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open open="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
