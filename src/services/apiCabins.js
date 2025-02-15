import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Problem with fetch cabins!");
  }
  return data;
}

export async function addCabin(formData) {
  //https://qiaysrzbsxpcwybjzdwd.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${formData.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create cabin
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...formData, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Problem with adding cabin");
  }
  //2. Uploading image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, formData.image);

  //3. Delete a cabin with error
  if (storageError) {
    console.error(storageError);
    throw new Error("Problen with uploading file,cabin was not created.");
  }

  await supabase.from("Cabins").delete().eq("id", formData.id);

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
