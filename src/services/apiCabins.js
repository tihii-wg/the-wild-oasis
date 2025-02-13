import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Problem with fetch cabins!");
  }
  return data;
}

export async function addCabin(formData) {
  const { data, error } = await supabase
    .from("Cabins")
    .insert([formData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Problem with adding cabin");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Problem with delete cabin");
  }

  return data;
}
