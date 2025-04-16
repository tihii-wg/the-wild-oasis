import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";

import { useDeleteCabin } from "./useDeleteCabin";
import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/Confirmdelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

/* eslint-disable react/prop-types */
function CabinRow({ cabin }) {
  const { cabins } = useCabins();
  const { id, image, name, maxCapacity, discount, regularPrice, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isWorking = isDeleting || isCreating;

  function handleCreate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      discount,
      regularPrice,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} quests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              {/* <button onClick={handleCreate}>
              <HiSquare2Stack />
            </button> */}

              <Menus.Button onClick={handleCreate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>

              <Modal.Open open="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                {/* <button>
                <HiPencil />
              </button> */}
              </Modal.Open>

              <Modal.Open open="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                {/* <button>
                <HiTrash />
              </button> */}
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(id)}
                disabled={isWorking}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
