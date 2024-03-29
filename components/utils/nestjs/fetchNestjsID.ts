import axios from "axios";

export default async function fetchNestjsId(_id: any) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nestjs/${_id}`
  );
  return data.nestjs;
}
